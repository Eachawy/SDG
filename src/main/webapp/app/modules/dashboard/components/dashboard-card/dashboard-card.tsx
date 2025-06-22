
import React from 'react';

export const DashboardCard = ({ count = 2500, label = "إجمالي الملفات", mode }) => {

    return (
        <div className={`dashboard-card ${mode} `}>
            <div>
                <span>
                    {label}
                </span>
                <span className='total'>
                    {count}
                </span>
            </div>
        </div>
    )
}