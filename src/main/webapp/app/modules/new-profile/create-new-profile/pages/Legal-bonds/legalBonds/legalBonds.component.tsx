import {
  DropDownComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cheque from "./shared/cheque";
import DefendantInfoComponent from "./shared/defendantInfo/defendantInfo.component.tsx";
import Draft from "./shared/draft";
import MortgageBond from "./shared/mortgageBond.component";
import AccountStatement from "./shared/accountStatement.component";
import Invoice from "./shared/Invoice.component";
import WrittenAcknowledgmentTrustBond from "./shared/writtenAcknowledgmentTrustBond.component";
import LeaseContract from "./shared/leaseContractcomponent";
import { BondTypes } from "app/modules/shared/constants";
import { Storage } from "react-jhipster";
import { getFileDetails } from './legalBonds.reducer';
import { useAppDispatch, useAppSelector } from "app/config/store";
import LoaderComponent from "app/modules/shared/loaderComponent/loaderComponent";

const LegalBonds = (props) => {

  const [showlegalBondPopup, setShowlegalBondPopup] = useState(false);
  const [fileResponse, setFileResonse] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useAppDispatch();

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $fileId = $createFileResponse?.id ?? Storage.session.get('selectFileId');
  const $fileDetailsResponse = useAppSelector(state => state.legalBonds.fileDetailsResponse);

  const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: "onTouched" });

  useEffect(() => {
    getFileDetailsFn();
  }, []);

  useEffect(() => {
    setValue("inputForm", "legalBonds");
    if ($fileDetailsResponse) {
      setFileResonse($fileDetailsResponse);
    }
  }, [setValue, $fileDetailsResponse]);

  const closepopUpFn = (e) => {
    setShowlegalBondPopup(e);
    if (!e) {
      getFileDetailsFn();
    }
  }

  const legalBondFn = () => {
    if ((watch("legalBondsList")?.code)) {
      setShowlegalBondPopup(true);
    }
  };

  const getFileDetailsFn = async () => {
    setShowLoader(true);
    await dispatch(getFileDetails($fileId));
    setShowLoader(false);
  }

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
          options={BondTypes}
          optionLabel={`name.${$lang}`}
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
      {(watch("legalBondsList")?.code === "PN" && showlegalBondPopup) && <Draft closepopUpFn={closepopUpFn} />}
      {/* {(watch("legalBondsList")?.code === "WTB" && showlegalBondPopup) && <WrittenAcknowledgmentTrustBond closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "LC" && showlegalBondPopup) && <LeaseContract closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "MB" && showlegalBondPopup) && <MortgageBond closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "AS" && showlegalBondPopup) && <AccountStatement closepopUpFn={closepopUpFn} />}
      {(watch("legalBondsList")?.code === "INV" && showlegalBondPopup) && <Invoice closepopUpFn={closepopUpFn} />} */}

      <DefendantInfoComponent fileResponse={fileResponse} />
      <LoaderComponent show={showLoader} />
    </div>
  );
};

export default LegalBonds;
