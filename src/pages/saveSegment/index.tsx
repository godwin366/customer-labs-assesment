import React, { useMemo, useRef } from "react";
import "./style.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, FormProvider, Controller, useFieldArray } from "react-hook-form";
import InputField from "../../components/InputField";
import Dropdown from "../../components/select";
import AppButton from "../../components/button";
import Link from "../../components/link";
import AddIcon from '@mui/icons-material/Add';
import { notifyError, notifySuccess } from "../../utils/notify";
import Header from "../../components/header";
import { segmentSave } from "../../services/segmentService";

interface IProps {
  handleClose: () => void;
}

interface ISchemaValue { value: string }
interface ISchema {
  segment_name: string;
  schema: ISchemaValue[]
}


const SaveSegment: React.FC<IProps> = ({ handleClose }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const methods = useForm<ISchema>({
    defaultValues: {
      segment_name: "",
      schema: [{ value: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    name: "schema" as never,
    control: methods.control,
  })

  const schemaOptions = useMemo(() => [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ], []);

  const onSubmit = async (data: any) => {
    const manipulatedData = data.schema.map((each: ISchemaValue) => {
      const getFieldLabel = schemaOptions.find(x => x.value === each.value);
      return { [getFieldLabel?.value || "label"]: getFieldLabel?.label }
    })
    const response = await segmentSave({ ...data, schema: manipulatedData })
    if (response?.data || !response?.error) {
      notifySuccess("Segment saved successfully");
      return
    }
    notifyError(response.message);
    
  };

  const externalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  }

  return (
    <div className="edit-agent-main">
      <FormProvider {...methods}>
        <div className="top-container">
          <div className="header">
            <Header>Save Segment</Header>
            <div className="header-icons">
              <CheckIcon
                className="check-icon"
                onClick={externalSubmit}
              />
              <CloseIcon className="close-icon" onClick={handleClose} />
            </div>
          </div>
          <div className="edit-body">
            <form
              ref={formRef}
              onSubmit={methods.handleSubmit(onSubmit)}
              className="edit-agent-form"
            >
              <Controller
                name="segment_name"
                rules={{ required: "This field is required" }}
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <InputField
                    variant="outlined"
                    preLabel="Enter the name of the segment"
                    placeholder="Name of the segment"
                    errorMessage={error?.message || ""}
                    onChange={(e) => onChange(e.target.value)}
                    {...rest}
                  />
                )}
              />

              <p className="segment-description">To save your segment, you need to add the schemas to build the query</p>

              {fields.map((field, index) => (
                <div className="schema-fields" key={index}>
                  <Controller
                    key={field.id}
                    name={`schema.${index}.value`}
                    rules={{
                      validate: {
                        require: (value) => !value ? "This field is Required or Delete" : true
                      }
                    }}
                    render={({
                      field: { onChange, value, ...rest },
                      fieldState: { error },
                    }) => {
                      const dropDownOptions = schemaOptions.filter(schema => {
                        return !methods.getValues("schema")?.some((val: ISchemaValue) => (val.value === schema.value && val.value !== value))
                      })
                      const handleChange = (option: string) => {
                        if (methods.getValues("schema")?.some((val: ISchemaValue) => (val.value === option))) {
                          notifyError("You cant choose the same option again")
                          return;
                        }
                        onChange(option)
                      }
                      return (
                        <Dropdown
                          placeHolder="Add schema to segment"
                          className="segment-dropdown"
                          options={dropDownOptions}
                          labelkey="label"
                          valueKey="value"
                          errorMessage={error?.message}
                          onChange={(e: any) => handleChange(e.target.value)}
                          value={value}
                          {...rest}
                        />
                      )
                    }}
                  />
                  <AppButton variant="outlined" label="Delete" onClick={() => {
                    if (fields.length > 1) remove(index)
                  }} />
                </div>
              ))}
              <Link onClick={() => append({ value: "" })}>
                <div style={{ display: "flex", alignItems: "center" }}><AddIcon fontSize="small" /> Add new schema</div>
              </Link>
            </form>
          </div>
        </div>
        <div className="segment-button-container">
          <AppButton label="Save segment" variant="contained" className="segment-submit" onClick={externalSubmit} />
          <AppButton label="Cancel" variant="outlined" className="segment-cancel" customVariant="cancel" onClick={handleClose} />
        </div>
      </FormProvider>
    </div>
  );
};

export default SaveSegment;
