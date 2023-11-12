export interface IUpdateAUserBody {
  readonly updateToEmail: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  password?: string;
  readonly confirmPassword?: string;
}
