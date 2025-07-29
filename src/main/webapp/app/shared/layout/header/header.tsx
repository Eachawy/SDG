import React, { useEffect } from "react";
import { Storage, translate } from "react-jhipster";
import { useAppDispatch } from "app/config/store";
import { setLocale } from "app/shared/reducers/locale";
import { isRTL, setTextDirection } from "app/config/translation";
import { useNavigate } from "react-router";

export interface IHeaderProps {
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {

  const navigate = useNavigate();

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

  const logOut = () => {
    Storage.session.set("token", '');
    Storage.session.set("viewFilesFileID", '');
    Storage.session.set("viewFilesMasterFileID", '');
    navigate('/login');
  }

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
          <span onClick={handleLocaleChange}>
            {translate('global.local')}
          </span>
        </div>
        -
        <div className="part_3">
          <span onClick={logOut}>
            {translate('global.logOut')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
