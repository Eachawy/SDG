
import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import $ from 'jquery';
import { translate } from 'react-jhipster';
import { useAppSelector } from "app/config/store";
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';
import QRCode from "react-qr-code";
import { Tooltip } from 'primereact/tooltip';



export const DailyFollowUpsFileTable = (props: { dataList: any; }) => {
    const [attachmentListRow, setAttachmentListRow] = React.useState(null);
    const [first, setFirst] = React.useState(0);
    const [showLoader, setShowLoader] = React.useState(false)
    const dataTAble = props.dataList

    const $lang = useAppSelector((state) => state.locale.currentLocale);

    useEffect(() => {
        const handleDocClick = (e: MouseEvent) => {
            if (!$(e.target as HTMLElement).closest(".notes-cell, .action-column").length) {
                $(".noteList, .actionList").removeClass("show");
            }
        };
        $(document).on("click", handleDocClick);
        return () => $(document).off("click", handleDocClick);
    }, []);

    const actionList = (rowData) => {
        return (
            <div
                className="action-column"
                onClick={(e) => {
                    e.stopPropagation();
                    $(".noteList, .actionList").removeClass("show");
                    $(e.currentTarget).find(".actionList").toggleClass("show");
                }}
            >
                <span className="dots-menu" />
                <div className="actionList">
                    <span onClick={() => { }}>
                        {translate("dailyFollowUps.viewFollowUps")}
                    </span>
                    <span onClick={() => { }}>
                        {translate("dailyFollowUps.edit")}
                    </span>
                    <span className='qrSpan' onClick={() => { }}>
                        {translate("dailyFollowUps.attachments")}

                        <QRCode
                            value={"01111111111"}
                        />

                        <p>{translate('dailyFollowUps.contactData')}</p>
                    </span>
                </div>
            </div>
        );
    };

    const onPage = (e) => {
        setFirst(e.first);
    };

    const notesDropdown = (rowData) => {
        const text = rowData?.notes ? rowData.notes : translate('dailyFollowUps.noNotes');

        return (
            <div
                className="notes-cell"
                onClick={(e) => {
                    e.stopPropagation();
                    $(".noteList, .actionList").removeClass("show");
                    $(e.currentTarget).find(".noteList").toggleClass("show");
                }}
            >
                <span className="notes-text" title={text}>{text}</span>
                <div className="noteList">
                    <div className="notes-full">{rowData?.notes}</div>
                </div>
            </div>
        );
    };

    const followUpStatus = (rowData: any) => {
        const status = rowData.followUpStatus?.fileStatus;

        const statusText =
            status === 'inProgress' ? translate('dailyFollowUps.statusUnderFollowUp') :
                status === 'completed' ? translate('dailyFollowUps.statusCompleted') :
                    status === 'notProceeded' ? translate('dailyFollowUps.statusNotFollowed') : '';

        const reminderDays = rowData.followUpStatus?.reminder;
        const phoneText = `${translate('dailyFollowUps.phoneNo')} ` +  rowData.followUpStatus?.phone;

        return (
            <div className="followUpStatusDiv">
                <i
                    className={
                        `${status === 'inProgress' ? 'inProgress tooltip-inProgress' :
                            status === 'completed' ? 'completed tooltip-completed' :
                                status === 'notProceeded' ? 'notProceeded tooltip-notProceeded' : ''}`
                    }
                    data-pr-tooltip={statusText}
                />
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
        );
    };

    // for Testing only
    // useEffect(() => {
    //   const selector = '.followUpStatusDiv i[data-pr-tooltip]';

    //   const getVariant = (el: HTMLElement) => {
    //     if (el.classList.contains('completed')) return 'completed';
    //     if (el.classList.contains('notProceeded')) return 'notProceeded';
    //     if (el.classList.contains('inProgress')) return 'inProgress';
    //     if (el.classList.contains('reminder')) return 'reminder';
    //     if (el.classList.contains('phone')) return 'phone';
    //     return 'default';
    //   };

    //   const tagActiveTooltip = (variant: string) => {
    //     requestAnimationFrame(() => {
    //       document
    //         .querySelectorAll<HTMLElement>('.p-tooltip.p-tooltip-active')
    //         .forEach((tt) => tt.setAttribute('data-variant', variant));
    //     });
    //   };

    //   const open = (el: HTMLElement) => {
    //     el.dataset.tooltipOpen = '1';
    //     el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    //     tagActiveTooltip(getVariant(el));
    //   };

    //   const close = (el: HTMLElement) => {
    //     delete el.dataset.tooltipOpen;
    //     el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    //   };

    //   const handleClick = (e: MouseEvent) => {
    //     const t = e.target;
    //     if (!(t instanceof Element)) return;

    //     const maybeIcon = t.closest(selector); // Element | null
    //     if (maybeIcon instanceof HTMLElement) {
    //       e.stopPropagation();

    //       if (maybeIcon.dataset.tooltipOpen === '1') {
    //         close(maybeIcon);
    //       } else {
    //         document
    //           .querySelectorAll(`${selector}[data-tooltip-open="1"]`) // NodeListOf<Element>
    //           .forEach((node) => {
    //             if (node instanceof HTMLElement) close(node);
    //           });
    //         open(maybeIcon);
    //       }
    //       return;
    //     }

    //     // Click outside → close all
    //     document
    //       .querySelectorAll(`${selector}[data-tooltip-open="1"]`)
    //       .forEach((node) => {
    //         if (node instanceof HTMLElement) close(node);
    //       });
    //   };

    //   const blockMouseLeave = (e: Event) => {
    //     const ct = e.currentTarget;
    //     if (ct instanceof HTMLElement && ct.dataset.tooltipOpen === '1') {
    //       e.stopImmediatePropagation(); // available on Event
    //       e.stopPropagation();
    //       e.preventDefault();
    //     }
    //   };

    //   const addLeaveBlockers = () => {
    //     document.querySelectorAll(selector).forEach((el) => {
    //       el.removeEventListener('mouseleave', blockMouseLeave, true);
    //       el.addEventListener('mouseleave', blockMouseLeave, true);
    //     });
    //   };
    //   addLeaveBlockers();

    //   const handleKeydown = (e: KeyboardEvent) => {
    //     if (e.key === 'Escape') {
    //       document
    //         .querySelectorAll(`${selector}[data-tooltip-open="1"]`)
    //         .forEach((node) => {
    //           if (node instanceof HTMLElement) close(node);
    //         });
    //     }
    //   };

    //   const observer = new MutationObserver(() => addLeaveBlockers());
    //   observer.observe(document.body, { childList: true, subtree: true });

    //   document.addEventListener('click', handleClick);
    //   document.addEventListener('keydown', handleKeydown);

    //   return () => {
    //     document.removeEventListener('click', handleClick);
    //     document.removeEventListener('keydown', handleKeydown);
    //     observer.disconnect();
    //     document.querySelectorAll(selector).forEach((el) => {
    //       el.removeEventListener('mouseleave', blockMouseLeave, true);
    //     });
    //   };
    // }, []);

    return (
        <div className='files-table  _followUps'>
            <div className="table-container">
                <Tooltip target=".followUpStatusDiv [data-pr-tooltip]" position="bottom"
                    appendTo={document.body}
                />
                <DataTable
                    value={dataTAble}
                    dataKey="id"
                    className="custom-table"
                    rows={10}
                    paginator
                    first={first}
                    onPage={onPage}
                >
                    <Column field="lawsuitNo" header={translate('dailyFollowUps.caseNumber')} className="columnStyle fileNo" />
                    <Column field="fileType" header={translate('dailyFollowUps.fileType')} className="columnStyle" />
                    <Column field="clientName" header={translate('dailyFollowUps.clientName')} className="columnStyle" />
                    <Column field="defendant" header={translate('dailyFollowUps.opponent')} className="columnStyle" />
                    <Column field="followUpAddDate" header={translate('dailyFollowUps.followUpAddDate')} className="columnStyle" />
                    <Column field="amountToBeCollected" header={translate('dailyFollowUps.amountToBeCollected')} className="columnStyle"
                        body={(rowData) => {
                            return `${rowData.amountToBeCollected} ${$lang === "ar" ? "دينار" : "JOD"}`;
                        }}
                    />
                    <Column
                        field="notes"
                        header={translate('dailyFollowUps.notes')}
                        className="columnStyle"
                        body={notesDropdown}
                    />
                    <Column field="followUpBy" header={translate('dailyFollowUps.followUpAddedBy')} className="columnStyle" />
                    <Column body={followUpStatus} className="columnStyle" />
                    <Column body={actionList} className="actionList-col" style={{ width: '40px' }} />
                </DataTable>
            </div>

            <LoaderComponent show={showLoader} />

            {attachmentListRow &&
                <AttachmentPopupComponent attachList={attachmentListRow} closeAttachmentPopupFn={() => setAttachmentListRow(null)} />
            }
        </div>
    );
};