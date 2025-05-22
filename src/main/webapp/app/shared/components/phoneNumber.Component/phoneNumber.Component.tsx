import { DropDownComponent, InputComponent } from '@eachawy/frontend-library';
import { countryCode } from 'app/shared/util/date-utils';
import React from 'react';
import { translate } from 'react-jhipster';

const PhoneNumberComponent = props => {


    const selectedCountryCodeTemplate = (option) => {
        if (option) {
            return (
                <div className="countryCodeTemplate">
                    <span className={`flag-icon flag-icon-${option.code.toLowerCase()} `}></span>
                    <div>{option.name}</div>
                </div>
            );
        }
    };

    const countryCodeOptionTemplate = (option) => {
        return (
            <div className="countryCodeTemplate">
                <span className={`flag-icon flag-icon-${option.code.toLowerCase()} `}></span>
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <div className={`phoneNumber ${props.class}`}>
            <label>
                {translate("createNewProfile.phoneNumber")}
                {props.error && <span>*</span>}
            </label>
            <div>
                <DropDownComponent
                    id="countryCode"
                    name={props.listName ? props.listName : "countryCode"}
                    register={props.register}
                    watch={props.watch}
                    setValueMethod={props.setValue}
                    options={countryCode}
                    optionLabel={`name.${props.lang}`}
                    errors={props.errors}
                    rules={props.rules}
                    onChange={(e) => props.setValue(props.listName ? props.listName : "countryCode", e.value as object)}
                    setValue={countryCode[0]}
                    valueTemplate={selectedCountryCodeTemplate}
                    itemTemplate={countryCodeOptionTemplate}
                />
                <InputComponent
                    id="phoneNumber"
                    type="text"
                    name={props.name ? props.name : "phoneNumber"}
                    placeholder={translate("createNewProfile.exm") + "1234567"}
                    register={props.register}
                    errors={props.errors}
                    rules={props.rules}
                    setValueMethod={props.setValue}
                    watch={props.watch}
                    onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, "");
                        props.setValue(props.name ? props.name : "phoneNumber", numericValue);
                    }}
                />
            </div>
        </div>
    )
}

export default PhoneNumberComponent;