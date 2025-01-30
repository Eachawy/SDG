/* eslint-disable */
// prettier-ignore

import React, { useState } from "react";
import { translate } from "react-jhipster";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router";
export const LoginPage = () => {
  const [email, seEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleLocaleChange = () => {
  //   window.location.reload();
  //   const sessionLocale = sessionStorage.getItem("locale");
  //   const langKey =
  //     sessionLocale === "en" || typeof sessionLocale === "undefined"
  //       ? "ar"
  //       : "en";
  //   sessionStorage.setItem("locale", langKey);
  //   dispatch(setLocale(langKey));
  //   setTextDirection(langKey);
  // };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    console.log("checkbox Test :", e.target.checked)
  };


  const forgetThePasswordFn = () => {

  }

  const logInBtn = () => {
    navigate("/create-new-profile");
  };

  return (
    <div className="loginPage">
      {/* <button onClick={handleLocaleChange}>🌐 Lang</button> */}
      <div className="loginContainer">
        <p>{translate("loginPage.hello")}</p>

        <label>{translate("loginPage.email")}</label>
        <InputText placeholder={translate("loginPage.emailPlaceholder")} value={email} onChange={(e) => seEmail(e.target.value)} />

        <div className="passDiv">
          <label>{translate("loginPage.password")}</label>
          <InputText type={showPassword ? "text" : "password"} placeholder={translate("loginPage.passwordPlaceholder")} value={password} onChange={(e) => setPassword(e.target.value)} />

          <span
            onClick={togglePasswordVisibility}
            className={showPassword ? "passIconOn" : "passIconOff"}
          />
        </div>

        <div className="rememberAndForgetPassDiv">
          <div className="checkboxDiv">
            <input
              type="checkbox"
              id="rememberMe"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="rememberMe">{translate("loginPage.rememberMe")}</label>
          </div>
          <span onClick={forgetThePasswordFn}>{translate("loginPage.forgotThePassword")}</span>
        </div>
        <div onClick={logInBtn} className="btnStyle">{translate("loginPage.logIn")}</div>
      </div>
    </div>
  );
};

export default LoginPage;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

function setLocale(langKey: string): any {
  throw new Error("Function not implemented.");
}

function setTextDirection(langKey: string) {
  throw new Error("Function not implemented.");
}
