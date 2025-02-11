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
    <div className="collection container p-0">
      <h4>بيانات حالة المدعي عليه</h4>
      {/* del=> collectionInputFormDiv */}
      <div className="row g-4 gy-4 d-flex mb-4">
        <div className="amountToCollect row p-0 col-md-6 mb-5 ">
          <InputComponent
            id="amountToBeCollected"
            type="text"
            name="originalOfTheConscience"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setValue("originalOfTheConscience", numericValue);
            }}
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
            rules={{ required: "يجب ادخال العملة" }}
          />
        </div>

        <InputComponent
          id="amountToBeCollected"
          type="text"
          name="amountToBeCollected"
          placeholder={translate("createNewProfile.exm") + "20,000"}
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setValue("amountToBeCollected", numericValue);
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
