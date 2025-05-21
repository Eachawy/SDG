import {
  DropDownComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cheque from "./shared/cheque";
import DefendantInfoComponent from "./shared/defendantInfo/defendantInfo.component";
import Draft from "./shared/draft";
import MortgageBond from "./shared/mortgageBond.component";
import AccountStatement from "./shared/accountStatement.component";
import Invoice from "./shared/Invoice.component";
import WrittenAcknowledgmentTrustBond from "./shared/writtenAcknowledgmentTrustBond.component";
import RentContract from "./shared/rentContractcomponent";
import { BondTypes } from "app/modules/shared/constants";
import { Storage } from "react-jhipster";
import { getFileDetails, resetAddLegalBond } from './legalBonds.reducer';
import { useAppDispatch, useAppSelector } from "app/config/store";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";

const LegalBonds = (props) => {

  const [showlegalBondPopup, setShowlegalBondPopup] = useState(false);
  const [fileResponse, setFileResonse] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [rowDataEdit, setRowDataEdit] = useState(null);
  const [rowDataType, setRowDataType] = useState(null);

  const dispatch = useAppDispatch();

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $fileId = $createFileResponse?.id ?? Storage.session.get('selectFileId');
  const $fileDetailsResponse = useAppSelector(state => state.legalBonds.fileDetailsResponse);

  const { register, formState: { errors }, watch, setValue } = useForm({ mode: "onTouched" });

  useEffect(() => {
    dispatch(resetAddLegalBond());
  }, [$fileDetailsResponse])

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
    setRowDataEdit(null);
    setRowDataType(null);
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
        {(watch("legalBondsList")?.code) && (
          <div onClick={legalBondFn} className="btnStyle _saveAndAdd">
            إضافة
          </div>
        )}
      </div>

      {(watch("legalBondsList")?.code === "CHQ" && showlegalBondPopup) &&
        <Cheque closepopUpFn={(e) => closepopUpFn(e)} />
      }

      {((watch("legalBondsList")?.code === "DR" && showlegalBondPopup) || (rowDataType === 'DR')) &&
        <Draft 
          closepopUpFn={(e) => closepopUpFn(e)} 
          rowDataEdit={rowDataEdit}
        />
      }

      {(watch("legalBondsList")?.code === "WTB" && showlegalBondPopup) &&
        <WrittenAcknowledgmentTrustBond closepopUpFn={(e) => closepopUpFn(e)} />
      }

      {((watch("legalBondsList")?.code === "RC" && showlegalBondPopup) || (rowDataType === 'RC')) &&
        <RentContract 
          closepopUpFn={(e) => closepopUpFn(e)} 
          rowDataEdit={rowDataEdit}
        />
      }

      {((watch("legalBondsList")?.code === "MB" && showlegalBondPopup) || (rowDataType === 'MB')) &&
        <MortgageBond
          closepopUpFn={(e) => closepopUpFn(e)}
          rowDataEdit={rowDataEdit}
        />
      }

      {((watch("legalBondsList")?.code === "AS" && showlegalBondPopup) || (rowDataType === 'AS')) &&
        <AccountStatement
          closepopUpFn={(e) => closepopUpFn(e)}
          rowDataEdit={rowDataEdit}
        />
      }

      {((watch("legalBondsList")?.code === "INV" && showlegalBondPopup) || (rowDataType === 'INV')) &&
        <Invoice
          closepopUpFn={(e) => closepopUpFn(e)}
          rowDataEdit={rowDataEdit}
        />
      }

      <DefendantInfoComponent
        fileResponse={fileResponse}
        deleteIsDone={() => getFileDetailsFn()}
        editRecordData={(type, obj) => {
          setRowDataType(type);
          setRowDataEdit(obj);
        }}
      />

      <LoaderComponent show={showLoader} />
    </div>
  );
};

export default LegalBonds;
