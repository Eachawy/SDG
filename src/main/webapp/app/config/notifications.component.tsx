import React from 'react';


const NotificationsComponent = (type, message) => {

    const notificationTitle = (t: string) => {
        switch (type) {
            case 'error':
                return "خطأ نأسف للازعاج!"
                break;
            case 'success':
                return "العملية تمت بنجاح"
                break;
            case 'info':
                return "استفسار"
                break;
            case 'warning':
                return "طلبك تحت المراجعة"
                break;
            default:
                return "خطأ نأسف للازعاج!"
                break;
        }
    }

    return (
        <>
            <div className="messageContiner">
                <h1>{notificationTitle(type)}</h1>
                {/* <p>{message}</p> */}
            </div>
        </>
    )
}

export default NotificationsComponent;