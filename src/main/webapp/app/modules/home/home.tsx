import React from "react";
import { Link } from "react-router-dom";
import { translate, Translate } from "react-jhipster";
import { Alert, Col, Row } from "reactstrap";

import { useAppSelector } from "app/config/store";
import { transform } from "lodash";

export const Home = () => {
  {/* prettier-ignore */ }
  // const account = useAppSelector(state => state.authentication.account);

  return (
    <div>
      Home
      {translate("home.subtitle")}
      <Translate contentKey="home.subtitle">This is your homepage</Translate>
    </div>
  );
};

export default Home;
