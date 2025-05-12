export type ApiErrorType = {
  status: number;
  message: string;
};

export type Pagination = {
  current?: number;
  pageSize?: number;
};

export type Sorter = {
  field?: string;
  order?: string;
};

export type QueryParams = {
  page?: number;
  limit?: number;
  sort_field?: string;
  sort_order?: string;
};

export type GetOtpPayload = {
  phonenumber: number;
  is_admin: boolean;
}
