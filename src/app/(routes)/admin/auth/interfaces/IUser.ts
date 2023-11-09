export interface IUser {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
