import { Response } from "express";

interface SuccessResponse<T = any> {
  status: "success";
  success: boolean;
  data: T;
  code: number;
}

interface ErrorResponse {
  status: "error";
  success: boolean;
  message: string;
  code?: number;
}

class ResponseClass {
  success<T = any>(res: Response, data: T): Response<SuccessResponse<T>> {
    const responseObj: SuccessResponse<T> = {
      status: "success",
      success: true,
      data,
      code: 200,
    };
    return res.status(200).json(responseObj);
  }

  error(res: Response, message: string, code?: number): Response<ErrorResponse> {
    const responseObj: ErrorResponse = {
      status: "error",
      success: false,
      message,
      code,
    };
    return res.status(code || 400).json(responseObj);
  }
}

export const CResponse = new ResponseClass();
