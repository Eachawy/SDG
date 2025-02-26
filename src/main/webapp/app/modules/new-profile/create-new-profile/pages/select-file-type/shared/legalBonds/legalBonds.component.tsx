import {
  DropDownComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import { useForm } from "react-hook-form";
import Cheque from "./shared/cheque";
import DefendantInfoComponent from "./shared/defendantInfo/defendantInfo.component.tsx";
import PromissoryNote from "./shared/promissoryNote";
import MortgageBond from "./shared/mortgageBond.component";
import AccountStatement from "./shared/accountStatement.component";
import Invoice from "./shared/Invoice.component";
import WrittenAcknowledgmentTrustBond from "./shared/writtenAcknowledgmentTrustBond.component";
import LeaseContract from "./shared/leaseContractcomponent";

const LegalBonds = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("inputForm", "legalBonds");
  }, [setValue]);

  const [showlegalBondPopup, setShowlegalBondPopup] = useState(false);

  const closepopUpFn = (e) => {
    setShowlegalBondPopup(e)
  }

  const lang = useAppSelector((state) => state.locale.currentLocale);

  const bondTypes = [
    { name: { ar: "شيك", en: "Cheque" }, code: "CHQ" },
    { name: { ar: "كمبيالة", en: "Promissory Note" }, code: "PN" },
    {
      name: {
        ar: "اقرار خطي/ سند امانة",
        en: "Written Acknowledgment / Trust Bond",
      },
      code: "WTB",
    },
    { name: { ar: "سند رهن", en: "Mortgage Bond" }, code: "MB" },
    { name: { ar: "كشف حساب", en: "Account Statement" }, code: "AS" },
    { name: { ar: "عقد ايجار", en: "Lease Contract" }, code: "LC" },
    { name: { ar: "فاتوره", en: "Invoice" }, code: "INV" },
  ];

  const legalBondFn = () => {
    if ((watch("legalBondsList")?.code)) {
      setShowlegalBondPopup(true);
    }
  };

  return (
    <div className="legalBonds">

      {/* legalBondsRowDiv */}
      <div className="row g-4 gy-4 mb-4">
        <DropDownComponent
          id="legalBondsList-id"
          name="legalBondsList"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={bondTypes}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) => setValue("legalBondsList", e.value as object)}
          placeholder="اختر السند القانوني"
          rules={{ required: "يجب اختيار السند القانوني" }}
          className="col-md-6"
        />
        <div onClick={legalBondFn} className="btnStyle _saveAndAdd">
          إضافة
        </div>
      </div>

      {(watch("legalBondsList")?.code === "CHQ" && showlegalBondPopup) && <Cheque closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "PN" && showlegalBondPopup) && <PromissoryNote closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "WTB" && showlegalBondPopup) && <WrittenAcknowledgmentTrustBond closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "LC" && showlegalBondPopup) && <LeaseContract closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "MB" && showlegalBondPopup) && <MortgageBond closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "AS" && showlegalBondPopup) && <AccountStatement closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "INV" && showlegalBondPopup) && <Invoice closepopUpFn={closepopUpFn} />}

      <DefendantInfoComponent />
    </div>
  );
};

export default LegalBonds;
