import { AxiosError } from "axios";
import { webHookInstance } from ".";
import { dataResponse, errorResponse } from "./helper";
import { ISegmentData } from "./interface";

export const segmentSave = async (data: ISegmentData) => {
   try {
      const response = await webHookInstance.post("", data);
      return dataResponse(response);
   } catch (error) {
      console.error(error);
      return errorResponse(error as AxiosError);
   }
}