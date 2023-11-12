export interface IUpdateAUserResponse {
  readonly updatedUser?: boolean;
  readonly statusCode?: 400 | 409;
}
