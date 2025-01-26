/* eslint-disable prettier/prettier */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { Translate, translate } from "react-jhipster";

const createNewProfileStepsComponent = ({step}) => {
    return (
        <div className="createProfileSteps" >
            <div className="createProfileStep">
                <span>1</span>
                <div>
                    <h4>انشاء ملف جديد</h4>
                    <p>قم انشاء ملف جديد (شركة / أفراد)</p>
                </div>
            </div>

            <div className="createProfileStep">
                <span>2</span>
                <div>
                    <h4>تحديد نوع الملف</h4>
                    <p>تحديد نوع الملف (قضايا / طلب مستعجل / تحصيل)</p>
                </div>
            </div>

            <div className="createProfileStep">
                <span>3</span>
                <div>
                    <h4>تحديد المسؤولية والمتابعة</h4>
                    <p>شارك البيانات مع الشخص المسؤول للمتابعة</p>
                </div>
            </div>
        </div>
    )
};

export default createNewProfileStepsComponent;
