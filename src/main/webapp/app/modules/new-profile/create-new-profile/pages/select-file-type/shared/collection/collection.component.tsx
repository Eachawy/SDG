import { DropDownComponent, InputComponent } from "@eachawy/frontend-library";
import React, { useEffect } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import { useForm } from "react-hook-form";

const Collection = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("inputForm", "collection");
  }, [setValue]);

  const lang = useAppSelector((state) => state.locale.currentLocale);

  const currencyList = [
    { name: { ar: "دينا اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
  ];

  return (
    <div className="collection">
      <h4>بيانات حالة المدعي عليه</h4>
      <div className="collectionInputFormDiv">
        <div className="amountToCollect">
          <InputComponent
            id="amountToBeCollected"
            type="amountToBeCollected"
            name="amountToBeCollected"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("amountToBeCollected", e.target.value)}
            label="اصل الذمة"
          />
          <DropDownComponent
            id="collectionCurrencyList"
            name="currencyList"
            register={register}
            watch={watch}
            setValueMethod={setValue}
            options={currencyList}
            optionLabel={`name.${lang}`}
            errors={errors}
            onChange={(e) => setValue("currencyList", e.value as object)}
            placeholder="دينار"
            rules={{ required: "You must select the currency" }}
          />
        </div>

        <InputComponent
          id="amountToBeCollected"
          type="amountToBeCollected"
          name="amountToBeCollected"
          placeholder={translate("createNewProfile.exm") + "20,000"}
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("amountToBeCollected", e.target.value)}
          label="المبلغ المراد تحصيله"
          rules={{ required: "You must enter the amount to be collected" }}
        />
      </div>
    </div>
  );
};

export default Collection;
