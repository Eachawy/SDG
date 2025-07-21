import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { useAppSelector } from 'app/config/store';
import { translate } from 'react-jhipster';

interface ChartData {
    xAxis?: string[];
    series?: number[];
}

interface FileChartProps {
    chartTitle: string;
    lastMonth: string | number;
    currentMonth: string | number;
    chartData: ChartData;
    color: string
}

export const FileChart: React.FC<FileChartProps> = ({ chartTitle, lastMonth, currentMonth, chartData, color }) => {

    const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    useEffect(() => {
        const chartElement = document.getElementById(chartId);
        if (chartElement) {
            const chartInstance = echarts.init(chartElement);

            const arabicMonths = [
                'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
              ];

            const englishMonths = [
                'Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul',
                'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'
            ];

            const defaultData = [250, 300, 450, 280, 180, 250, 200, 80, 150, 30, 40, 20];

            const xAxisData = chartData?.xAxis || ($lang === 'ar' ? arabicMonths : englishMonths);

            const seriesData = chartData?.series || defaultData;

            const option: echarts.EChartsOption = {
                grid: {
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisData,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#e0e0e0',
                            width: 1
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#666',
                        fontSize: 12,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    position: 'right',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#666',
                        fontSize: 12
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        type: 'line',
                        data: seriesData,
                        smooth: false,
                        symbol: 'none',
                        lineStyle: {
                            color: `${color === 'orange' ? '#fb8c8c' : '#22c561'}`,
                            width: 2
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: `${color === 'orange' ? 'rgba(251, 140, 140, 0.8)' : 'rgba(34, 197, 94, 0.9)'}`
                                },
                                {
                                    offset: 0.5,
                                    color: `${color === 'orange' ? 'rgba(251, 140, 140, 0.4)' : 'rgba(34, 197, 94, 0.3)'}`
                                },
                                {
                                    offset: 1,
                                    color: `${color === 'orange' ? 'rgba(251, 140, 140, 0.02)' : 'rgba(255, 255, 255, 0)'}`
                                }
                            ])
                        }
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: `${color === 'orange' ? '#fb8c8c' : '#22c561'}`,
                    borderWidth: 1,
                    textStyle: {
                        color: '#333'
                    }
                }
            };

            chartInstance.setOption(option);

            const handleResize = (): void => {
                if (chartInstance && !chartInstance.isDisposed()) {
                    chartInstance.resize();
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (chartInstance && !chartInstance.isDisposed()) {
                    chartInstance.dispose();
                }
            };
        }
    }, [chartTitle, chartData, chartId]);

    return (
        <div className='col-md-12 col-lg-6'>
            <div className='file-chart'>
                <div className='chartHeader'>
                    <h4>{chartTitle}</h4>
                    <div>
                        <p><label>{translate('mainDashboard.previousMonth')}</label> {lastMonth}</p>
                        <p><label>{translate('mainDashboard.currentMonth')}</label> {currentMonth}</p>
                    </div>
                </div>

                <div
                    id={chartId}
                    className='largeAreaChart'
                />
            </div>
        </div>
    );
};