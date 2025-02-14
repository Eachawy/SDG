import { DropDownComponent, InputComponent } from "@eachawy/frontend-library";
import React from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";

const Collection = (props) => {

  const $lang = useAppSelector((state) => state.locale.currentLocale);

  const currencyList = [
    { name: { ar: "دينا اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
  ];

  return (
    <div className="collection container p-0">
      <h4>بيانات طلب التحصيل</h4>
      {/* del=> collectionInputFormDiv */}
      <div className="row g-4 gy-4 d-flex mb-4">
        <div className="amountToCollect row p-0 col-md-6 mb-5 ">
          <InputComponent
            id="amountToBeCollected"
            type="text"
            name="originalOfTheConscience"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={props.register}
            errors={props.errors}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              props.setValue("originalOfTheConscience", numericValue);
            }}
            label="اصل الذمة"
            rules={{ required: "يجب ادخال اصل الذمة" }}
          />
          <DropDownComponent
            id="collectionCurrencyList"
            name="currencyList"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={currencyList}
            optionLabel={`name.${$lang}`}
            errors={props.errors}
            onChange={(e) => props.setValue("currencyList", e.value as object)}
            placeholder="دينار"
          />
        </div>

        <InputComponent
          id="amountToBeCollected"
          type="text"
          name="amountToBeCollected"
          placeholder={translate("createNewProfile.exm") + "20,000"}
          register={props.register}
          errors={props.errors}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            props.setValue("amountToBeCollected", numericValue);
          }}
          label="المبلغ المراد تحصيله"
          rules={{ required: "يجب ادخال المبلغ المراد تحصيله" }}
          className="col-md-6 mb-4"
        />
      </div>
    </div>
  );
};

export default Collection;
