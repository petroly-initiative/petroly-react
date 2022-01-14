import React from "react";
import { useRouter } from "next/router";
import ConfirmAccount from "../../components/ConfirmAccount";

const resetPasswordPage = () => {
  const router = useRouter();

  return <ConfirmAccount token={router.query.token} />;
};

export default resetPasswordPage;
