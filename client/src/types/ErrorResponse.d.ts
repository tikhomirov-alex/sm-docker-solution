export interface ErrorResponse {
  errors: { [key: string]: string };
  message: string;
  statusCode: number;
}