/* eslint-disable */
// prettier-ignore
import React from "react";
import { translate } from "react-jhipster";
import { useForm } from "react-hook-form";
import { ButtonComponent, CheckBoxComponent, InputComponent } from "@eachawy/frontend-library";

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({ mode: 'onTouched', });
  const forgetThePasswordFn = () => { };
  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <div className="loginPage">
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <div className="loginContainer">
          <p>{translate("loginPage.hello")}</p>

          <InputComponent
            id="email"
            type="email"
            name="email"
            label={translate("loginPage.email")}
            placeholder={translate("loginPage.emailPlaceholder")}
            register={register}
            rules={{ required: 'You must enter your first name.' }}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("email", e.target.value)}
          />

          <InputComponent
            id="password"
            type="text"
            name="password"
            label={translate("loginPage.password")}
            placeholder={translate("loginPage.passwordPlaceholder")}
            register={register}
            rules={{
              required: "This is required.",
            }}
            errors={errors}
            password
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("password", e.target.value)}
          />

          <div className="rememberAndForgetPassDiv">
            <CheckBoxComponent
              id="rememberMe"
              name="rememberMe"
              label={translate("loginPage.rememberMe")}
              register={register}
              setValueMethod={setValue}
              setValue={true}
              watch={watch}
              onChange={(e) => setValue("rememberMe", e.value)}
            />
            <span className="forgetPassword" onClick={forgetThePasswordFn}>{translate("loginPage.forgotThePassword")}</span>
          </div>

          <ButtonComponent Class={'btnStyle'} >{translate("loginPage.logIn")}</ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;