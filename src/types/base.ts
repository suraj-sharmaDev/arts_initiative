export type ApiError = {
  code?: string;
  message: string;
  values: { [key: string]: string };
};

export type Role = "owner" | "admin" | "member";

export type ApiResponse<T = unknown> = {
  data: T | null;
  error: ApiError | null;
};
