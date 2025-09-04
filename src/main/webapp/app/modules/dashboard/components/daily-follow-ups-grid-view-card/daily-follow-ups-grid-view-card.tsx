import React from "react";
import { Tooltip } from 'primereact/tooltip';
import QRCode from "react-qr-code";
import { translate } from "react-jhipster";

export default function DailyFollowUpsGridViewCard(props) {
    const status = props?.followUpStatus?.fileStatus;
    const reminderDays = props?.followUpStatus?.reminder;
    const phoneText = `${translate('dailyFollowUps.phoneNo')} ` + props?.followUpStatus?.phone;

    return (
        <div className="daily-follow-ups-grid-view-card">
            <Tooltip target=".daily-follow-ups-grid-view-card [data-pr-tooltip]" position="bottom" />

            <div className="header">
                <img src={props.imgURL} alt="User Avatar" width="150" height="150" />
                <div>
                    <h4>
                        {props.followUpBy}
                        <span
                            className={
                                `${status === 'inProgress' ? 'inProgress' :
                                    status === 'completed' ? 'completed' :
                                        status === 'notProceeded' ? 'notProceeded' : ''}`
                            }
                        >
                            {status === 'inProgress'
                                ? translate('dailyFollowUps.statusUnderFollowUp')
                                : status === 'completed'
                                    ? translate('dailyFollowUps.statusCompleted')
                                    : status === 'notProceeded'
                                        ? translate('dailyFollowUps.statusNotFollowed')
                                        : ''}
                        </span>
                    </h4>

                    <p>
                        <label>{translate('dailyFollowUps.fileNumber')}</label>
                        {props.fileNumber}
                    </p>
                </div>

                <div>
                    <div>
                        <i
                            className="reminder tooltip-reminder"
                            data-pr-tooltip={
                                typeof reminderDays === 'number'
                                    ? translate('dailyFollowUps.reminder', { reminderDays })
                                    : ''
                            }
                        />
                        <i
                            className="phone tooltip-phone"
                            data-pr-tooltip={phoneText || ''}
                        />
                    </div>
                    <p>{props.followUpAddDate}</p>
                </div>
            </div>

            <div className="content">
                <div>
                    <p><label>{translate('dailyFollowUps.clientName')}</label>{props.clientName}</p>
                    <p><label>{translate('dailyFollowUps.opponent')}</label>{props.defendant}</p>
                </div>
                <div>
                    <p><label>{translate('dailyFollowUps.amountToBeCollected')}</label>{props.amountToBeCollected} دينار</p>
                    <p className="fileType"><label>{translate('dailyFollowUps.fileType')}</label>{props.fileType}</p>
                </div>
                <div className="qrDiv">
                    <div className="notesDiv">
                        <label>{translate('dailyFollowUps.notes')}</label>
                        <p>{props.notes}</p>
                    </div>

                    <div className="qr-code">
                        <QRCode value={phoneText || ''} />
                        <p>{translate('dailyFollowUps.contactData')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
