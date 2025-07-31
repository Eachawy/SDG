import { ButtonComponent } from "@eachawy/frontend-library";
import React from "react";


const DeleteRowPopup = props => {


    return (
        <>
            <div className='deletePopupContainer'>
                <div className='dialogBoxContent'>
                    <h4>هل أنت متأكد أنك تريد حذف بيانات هذا المستند</h4>
                    <p>في حاله تاكيد الحذف سوف يتم حذف جميع بيانات هذا المستند ولا يمكن التراجع عن هذا الإجراء.</p>
                    <div className="actionRowBtns">
                        <ButtonComponent Class={'BtnStyle '} onClick={props.cancelPopup}>
                            لا اريد الحذف
                        </ButtonComponent>
                        <ButtonComponent onClick={props.deleteFN} Class={'BtnStyle BtnCancel'}>
                            نعم اريد الحذف
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </>
    );
}


export default DeleteRowPopup;