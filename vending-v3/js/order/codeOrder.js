import '../../MyCss/order/codeOrder.scss';
layui.use(['laydate', 'table', 'tree', 'flow', 'layer', 'form'], function () {
    // 日期选择
    var startTime = '';
    //结束时间
    var endTime = '';
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test6',
        range: true,
        done: function (value) {
            var timerKey = value.split(' - ');
            startTime = timerKey[0];
            endTime = timerKey[1];
        }
    });
    var token = sessionStorage.token,
        tree = layui.tree,
        flow = layui.flow,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        orderTable = table.render({
            elem: '#moneyData',
            url: `/api/order/getCodeOrder`,
            method: 'post',
            contentType: "application/json",
            headers: {
                token,
            },
            cols: [[
                { field: 'activity_name', width: 160, title: '活动名', align: 'center' },
                { field: 'good_code', width: 210, title: '取货码', align: 'center' },
                { field: 'machineName', width: 210, title: '终端名', align: 'center' },
                { field: 'machineAddress', width: 210, title: '终端地址', align: 'center' },
                {
                    field: 'ship_info', width: 250, title: '出货情况', align: 'center', templet: function (d) {
                        if (d.code_status == 0) {
                            return '-'
                        } else {
                            var str = '';
                            d.ship_info.forEach(item => {
                                str += `<div>${item.goods_Name + (item.ship_error == 0 ? '全部出货成功' : '出货（' + ((item.ship_total - item.ship_error) + '/' + item.ship_total) + ')')}</div>`
                            });
                            return str
                        }
                    }
                },
                { field: 'operate_time', width: 250, title: '取货时间', templet:function(d){
                    if (d.operate_time) {
                        return timeStamp(d.operate_time)
                    } else {
                        return '-';
                    }
                }},
            ]],
            page: true,
            loading: true,
            // limits: [10, 20, 50],
            request: {
                'pageName': 'pageNum',
                'limitName': 'pageSize'
            },
            where: {
                merchant_id: Number(sessionStorage.machineID) ,
            },
            parseData: function (res) {
                // console.log(res)
                //res 即为原始返回的数据
                if (res.code == 200) {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.data.total, //解析数据长度
                        "data": res.data.list //解析数据列表
                    };
                } else if (res.code == 403) {
                    window.parent.location.href = "login.html";
                }
                else {
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message,   //解析提示文本
                    }
                }

            },
            response: {
                statusCode: 200 //规定成功的状态码，默认：0
            },
            done: function (res) {
            }
        });


    function getFlow() {
        flow.load({
            elem: '#demo',
            isAuto: true, //流加载容器
            scrollElem: '#demo',
            end: ' ',
            done: function (page, next) { //执行下一页的回调
                //模拟数据插入
                setTimeout(function () {
                    var lis = [];
                    // for (var i = 0; i < 3; i++) {
                    //   lis.push('<span>荔湾西堤邮政支局' + page + '</span>')
                    // }
                    next(lis.join(''), page < 3); //假设总页数为 10
                    var machineData = JSON.stringify({
                        pageNum: page,
                        pageSize: 10,
                    })
                    loadingAjax('/api/activity/getActivityList', 'post', machineData, sessionStorage.token).then(res => {
                        res.data.list.forEach((item, index) => {
                            lis.push(`<span activityID="${item.id}">${item.activity_name}</span>`)
                        })
                        next(lis.join(''), res.data.list >= 10);
                    }).catch(err => {
                        console.log(err)
                        layer.msg(err.message, { icon: 7 })
                        next(lis.join(''), err.code == 200); //假设总页数为 10
                    })
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多

                }, 200);
            }
        });
    }
    getFlow();

      //查询
  $('.queryBtn').click(function () {
      if(startTime){
        orderTable.reload({
            where: {
              start_time: startTime,
              end_time: endTime,
            }
          })
      }else{
        orderTable.reload({
            where: {
                start_time: null,
              end_time: null,
            }
          })
      }
  });

//   点击活动
var activeCode='';
  $('body').on('click','.activityArr span',function(){
    $('.allmachine').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
    activeCode=$(this).attr('activityID');
    orderTable.reload({
        where: {
            activity_id:Number(activeCode) 
        }
      });
  });
  $('.allmachine').click(function () {
    $(this).addClass('active');
    $('.activityArr span').removeClass('active');
    activeCode = '';
    orderTable.reload({
      where: {
        activity_id: null
      }
    })
  })
})