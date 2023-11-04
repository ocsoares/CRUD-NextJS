import { PropsWithChildren } from "react";
import { CheckIfUserJwtExpired } from "../../(with-auth)/components/CheckIfUserJwtExpired";
import { Metadata } from "next";
import { AppBar } from "@/shared/components/AppBar";

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
};

export default function UsersLayout({ children }: PropsWithChildren) {
  return (
    <>
      <CheckIfUserJwtExpired>
        <AppBar>{children}</AppBar>
      </CheckIfUserJwtExpired>
    </>
  );
}
