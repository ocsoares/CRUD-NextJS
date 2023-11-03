import { PropsWithChildren } from "react";
import { CheckIfUserJwtExpired } from "../../(with-auth)/components/CheckIfUserJwtExpired";

export default function UsersLayout({ children }: PropsWithChildren) {
  return <CheckIfUserJwtExpired>{children}</CheckIfUserJwtExpired>;
}
