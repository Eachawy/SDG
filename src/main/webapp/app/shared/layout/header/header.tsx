import React, { useEffect, useState } from "react";
import { Storage } from "react-jhipster";
import { useAppDispatch } from "app/config/store";
import { setLocale } from "app/shared/reducers/locale";
import { isRTL, setTextDirection } from "app/config/translation";

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
    setTextDirection(langKey);
  };

  return (
    <div className="sdg_Header">
      <div className="container">
        <div className="part_1">
          <span className="navbar_toggler" />
          <span className="logo" />
        </div>
        <div className="part_2">
          <div className="search_container">
            <span className="search" />
            <input type="text" placeholder="ادخل كلمه البحث" />
          </div>
        </div>
        <div className="part_3">
          <span onClick={handleLocaleChange}>Change Lang</span>
          {/* {props.currentLocale} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
