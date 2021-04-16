import '../../MyCss/indexCss/homePage.css'

window.onload = function () {
    layui.use(['form'], function () {
        var $ = layui.jquery;
        // var sevenDayEcharts = echarts.init$($('#my-seven-day-echarts-canvas'));
        // 七天折线图
        var sevenDayEcharts = echarts.init(document.getElementById('my-seven-day-echarts-canvas'));
        var SevenOption = {
            color: 'skyblue',
            title: {
                text: `近七天售货机销售金额`,
                subtext: `                 金额(元)`,
                x: 'legend',
                y: 'top',
            },
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },

            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [{
                type: 'category',

                boundaryGap: false,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '销售量  ' + params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ['03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24']
            }, {
                type: 'category',
                axisTick: {
                    alignWithLabel: false
                },
                axisLine: {
                    onZero: false,
                    show: false
                },

            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },

            ],
            series: [{
                name: '2020 销售量',
                type: 'line',
                smooth: true,
                data: [200, 1600, 900, 1300, 600.3, 200.2, 300.6],
                areaStyle: {},

            }]

        }; // 使用刚指定的配置项和数据显示图表。
        sevenDayEcharts.setOption(SevenOption)
        // 占比饼图图表
        var percentageEcharts = echarts.init(document.getElementById('my-percentage-echarts-canvas'))
        var percentageOption = {
            title: {
                text: `支付总比占`,
                textStyle: {
                    fontSize: 16
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },

            legend: {
                orient: 'vertical',
                top: 240,
                left: 30,
                itemWidth: 8, // 设置图例图形的宽
                itemHeight: 8,

                icon: "circle",
                data: [{
                    value: 335,
                    name: '现金'
                },
                {
                    value: 310,
                    name: '微信'
                },
                {
                    value: 234,
                    name: '支付宝'
                },
                {
                    value: 135,
                    name: '会员余额'
                },
                {
                    value: 1548,
                    name: '其他'
                }
                ],
            },

            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                center: ['40%', '50%'],
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    lineStyle: {
                        //                     color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 20,
                    length2: 20
                },

                data: [{
                    value: 335,
                    name: '现金'
                },
                {
                    value: 310,
                    name: '微信'
                },
                {
                    value: 234,
                    name: '支付宝'
                },
                {
                    value: 135,
                    name: '会员余额'
                },
                {
                    value: 1548,
                    name: '其他'
                }
                ],
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        };
        percentageEcharts.setOption(percentageOption)

        //  三十天退款图表
        var refundEcahrts = echarts.init(document.getElementById('my-thirty-refund-echarts-canvas'))
        var refundOption = {
            title: {
                text: `支付总比占`,
                textStyle: {
                    fontSize: 16
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },

            legend: {
                orient: 'vertical',
                top: 240,
                left: 30,
                itemWidth: 8, // 设置图例图形的宽
                itemHeight: 8,

                icon: "circle",
                data: ['现金', '微信', '支付宝', '会员余额', '其他'],
            },

            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['30%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                center: ['40%', '50%'],
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    lineStyle: {
                        //                     color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 20,
                    length2: 20
                },

                data: [{
                    value: 335,
                    name: '现金'
                },
                {
                    value: 310,
                    name: '微信'
                },
                {
                    value: 234,
                    name: '支付宝'
                },
                {
                    value: 135,
                    name: '会员余额'
                },
                {
                    value: 1548,
                    name: '其他'
                }
                ],
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        };
        refundEcahrts.setOption(refundOption)
    });
}
