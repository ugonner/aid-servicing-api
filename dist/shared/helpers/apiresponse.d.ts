export interface IApiResponse<TDATATYPE> {
    message: string;
    status: "success" | "error" | "processing";
    statusCode?: number;
    data?: TDATATYPE;
    error?: TDATATYPE;
}
export declare class ApiResponse {
    static success<T>(message: string, data: T, statusCode?: number): IApiResponse<T>;
    static fail<T>(message: string, error: T, statusCode?: number): IApiResponse<T>;
}
