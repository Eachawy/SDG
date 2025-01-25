import React from "react";
import { translate, Translate } from "react-jhipster";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export const LoginPage = () => {
  {/* prettier-ignore */ }
  // const account = useAppSelector(state => state.authentication.account);
  const [value, setValue] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState({});
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div>
      Login Page
      {translate("home.subtitle")}
      <Translate contentKey="home.subtitle">This is your homepage</Translate>
      <InputText value={value} onChange={(e) => setValue(e.target.value)} />
      <Dropdown
        value={selectedCity}
        onChange={(e: any) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default LoginPage;
