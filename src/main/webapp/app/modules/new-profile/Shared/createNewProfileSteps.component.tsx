/* eslint-disable prettier/prettier */
import React from "react";
import { translate } from "react-jhipster";

const CreateNewProfileStepsComponent = (props) => {
    const { step} = props;

    return (
        <div className='createProfileSteps' >
            <div>
                <span className={
                    step === 1 ? 'current':
                    step > 1 ? 'passed' : ''
                }>1</span>
                <div>
                    <h4>{translate("createNewProfile.createNewFile")}</h4>
                    <p>{translate("createNewProfile.createNewFileDescription")}</p>
                </div>
            </div>

            <div>
                <span className={
                    step === 2 ? 'current':
                    step > 2 ? 'passed' : ''
                }>2</span>
                <div>
                    <h4>{translate("createNewProfile.selectFileType")}</h4>
                    <p>{translate("createNewProfile.selectFileTypeDescription")}</p>
                </div>
            </div>

            <div>
                <span className={
                    step === 3 ? 'current':
                    step > 3 ? 'passed' : ''
                }>3</span>
                <div>
                    <h4>{translate("createNewProfile.assignResponsibility")}</h4>
                    <p>{translate("createNewProfile.assignResponsibilityDescription")}</p>
                </div>
            </div>
       </div>
    )
};

export default CreateNewProfileStepsComponent;

