import { AxiosError, AxiosResponse } from "axios";

export const errorResponse = (error: AxiosError) => {
   return {
      data: null,
      error: true,
      message: error.message || "Something went wrong"
   }
}
export const dataResponse = (response: AxiosResponse) => {
   return {
      data: response?.data,
      error: false,
      message: "OK"
   }
}