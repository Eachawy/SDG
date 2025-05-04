import { DropDownComponent, InputComponent } from "@eachawy/frontend-library";
import React from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import { CurrencyList } from "app/modules/shared/constants";

const Collection = (props) => {

  const $lang = useAppSelector((state) => state.locale.currentLocale);


  return (
    <div className="collection container p-0">
      <h4>بيانات طلب التحصيل</h4>
      <div className="row g-4 gy-4 d-flex mb-4">
        <div className="amountToCollect row p-0 col-md-6 mb-5 ">
          <InputComponent
            id="collectionAmount"
            type="text"
            name="collectionAmount"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={props.register}
            // errors={props.errors}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              props.setValue("collectionAmount", numericValue);
            }}
            label="اصل الذمة"
            // rules={{ required: "يجب ادخال اصل الذمة" }}
          />
          <DropDownComponent
            id="collectionCurrencyList"
            name="currencyList"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={CurrencyList}
            optionLabel={`name.${$lang}`}
            // errors={props.errors}
            onChange={(e) => props.setValue("currencyList", e.value as object)}
            placeholder="دينار"
            setValue={CurrencyList[0]}
          />
        </div>

        <InputComponent
          id="requiredCollectionAmount"
          type="text"
          name="requiredCollectionAmount"
          placeholder={translate("createNewProfile.exm") + "20,000"}
          register={props.register}
          errors={props.errors}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            props.setValue("requiredCollectionAmount", numericValue);
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
