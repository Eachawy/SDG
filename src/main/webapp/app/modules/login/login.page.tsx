import React, { useEffect } from "react";
import { translate } from "react-jhipster";
import { useForm } from "react-hook-form";
import { ButtonComponent, CheckBoxComponent, InputComponent } from "@eachawy/frontend-library";
import { login } from "app/shared/reducers/authentication";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { useNavigate } from "react-router";
import { Storage } from "react-jhipster";
import { setLocale } from "app/shared/reducers/locale";
import { setTextDirection } from "app/config/translation";

const LoginPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({ mode: 'onTouched', });

  const $isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  const forgetThePasswordFn = () => { };
  
  const handleLogin = (data) => {
    dispatch(login(data.user,data.password));
  };

  React.useEffect(() => {
        Storage.session.set("locale", 'ar');
        dispatch(setLocale('ar'));
        setTextDirection('ar');
  },[]);

  if($isAuthenticated) {
    navigate('/dashoard');

  //   <Navigate
  //   to={{
  //     pathname: "/login",
  //     search: pageLocation.search,
  //   }}
  //   replace
  //   state={{ from: pageLocation }}
  // />
  }

  return (
    <div className="loginPage">
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <div className="loginContainer">
          <p>{translate("loginPage.hello")}</p>

          <InputComponent
            id="user"
            type="text"
            name="user"
            label={translate("loginPage.email")}
            placeholder={translate("loginPage.emailPlaceholder")}
            register={register}
            rules={{ required: 'You must enter your first name.' }}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("user", e.target.value)}
            className="col-md-12 flex-1 mb-12"
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
            className="col-md-12 flex-1 mb-12"
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