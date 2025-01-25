import React, { useEffect, useState } from "react";
import { Storage } from "react-jhipster";
import { useAppDispatch } from "app/config/store";
import { setLocale } from "app/shared/reducers/locale";
import { isRTL } from "app/config/translation";

export interface IHeaderProps {
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  useEffect(() =>
    document
      .querySelector("html")
      .setAttribute(
        "dir",
        isRTL(Storage.session.get("locale")) ? "rtl" : "ltr",
      ),
  );

  const dispatch = useAppDispatch();

  const handleLocaleChange = () => {
    const sessionLocale = Storage.session.get("locale");
    const langKey =
      sessionLocale === "en" || typeof sessionLocale === "undefined"
        ? "ar"
        : "en";
    Storage.session.set("locale", langKey);
    dispatch(setLocale(langKey));
    document
      .querySelector("html")
      .setAttribute("dir", isRTL(langKey) ? "rtl" : "ltr");
  };

  return (
    <div className="sdg_Header">
      <div>
        <span onClick={handleLocaleChange}>Change Lang</span>
        {props.currentLocale}
      </div>
    </div>
  );
};

export default Header;
