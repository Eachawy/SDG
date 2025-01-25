import React from "react";
import { translate, Translate } from "react-jhipster";

export const LoginPage = () => {
  {/* prettier-ignore */ }
  // const account = useAppSelector(state => state.authentication.account);

  return (
    <div>
      Login Page
      {translate("home.subtitle")}
      <Translate contentKey="home.subtitle">This is your homepage</Translate>
    </div>
  );
};

export default LoginPage;
