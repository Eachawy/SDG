
import React from 'react';
import { useAppSelector } from "app/config/store";
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import DailyFollowUpsGridViewCard from '../daily-follow-ups-grid-view-card/daily-follow-ups-grid-view-card';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

export const DailyFollowUpsGridView = (props) => {
    const [showLoader, setShowLoader] = React.useState(false)
    const [first, setFirst] = React.useState(0);
    const [selectedCardId, setSelectedCardId] = React.useState<number | null>(null);
    const [page, setPage] = React.useState(0);
    const rows = 9;

    const $lang = useAppSelector((state) => state.locale.currentLocale);


    // for Testing only
    // useEffect(() => {
    //   const selector = '.daily-follow-ups-grid-view i[data-pr-tooltip]';

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

    const gridData = props.dataList

    React.useEffect(() => {
        const lastPage = Math.max(0, Math.ceil(gridData.length / rows) - 1);
        if (page > lastPage) setPage(lastPage);
    }, [gridData.length, page]);

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        setFirst(e.first);
        setPage(e.page);
    };

    const handleCardClick = (id: number) => {
        setSelectedCardId(id);
        console.log(`Card number ${id} was clicked`);
    };

    const paginated = gridData.slice(first, first + rows);

    return (
        <div className="daily-follow-ups-grid-view">
            {paginated.map((c, i) => (
                <div key={c.id} onClick={() => handleCardClick(c.id)}>
                    <DailyFollowUpsGridViewCard {...c} />
                </div>
            ))}

            <div className="paginatorDiv">
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={gridData.length}
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                />
            </div>
            <LoaderComponent show={showLoader} />
        </div>
    );
};