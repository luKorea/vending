layui.use(['form', 'layer', 'laydate','table'], function () {
    ImagePreview.init({id:$("#ImgFlex img")})
    // tab切换
    $('.navTab li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        let that = $(this);
        $('.tabLine').animate({
            left: (that.offset().left) + 'px'
        }, 500);
        if ($(this).index() == 0) {
            onStep('VideoContnet','ImgContnet');
        } else {
            nextStep('ImgContnet','VideoContnet')
        }
    });


    //   时间选择器
    var laydate = layui.laydate;
    laydate.render({
        elem: '#itemrs1',
        value: new Date(),
        max: '0'
    });
    laydate.render({
        elem: '#itemrs2',
        value: new Date(),
        max: '0'
    });
    $('.videoList video').click(function(){
        // console.log($(this))
        $('.playVideo video').attr('src',$(this).attr('src'))
        $('.videoPlay').fadeIn();
    });


    // 关闭视频弹窗
    $('.mask').click(function(){
        $('.videoPlay').fadeOut(function(){
            $('.playVideo video').attr('src','')
        });   
    });
    // 添加图片弹出框
    $('.ImgContnet .add-btn').click(function(){
        $('.addImgCont').fadeIn();
        $('.addImgBox').removeClass('margin0')
    })
    // 关闭添加图片
    $('.addImgFooter .cancel-btn').click(function(){
        $('.addImgBox').addClass('margin0');
        $('.addImgCont').fadeOut();
    })
    // 添加视频弹出框
    $('.VideoContnet .add-btn').click(function(){
        $('.addVideoCont').fadeIn();
        $('.addVideoBox').removeClass('margin0')
    });
    // 关闭添加视频
    $('.addVideoFooter .cancel-btn').click(function(){
        $('.addVideoCont').fadeOut();
        $('.addVideoBox').addClass('margin0')
    })

    var table=layui.table,
        advertisingLis = table.render({
        elem: '#ImgData',
        method:'post',
        url:'/api/good_material/getGoodMaterial',
        contentType: "application/json",
        headers: {
            token,
          },
         cols: [[
            { field: 'Img', width: 150, title: '图片',templet: "#imgtmp" },
            { field: 'name', width: 180, title: '图片名', },
            { field: 'name', width: 180, title: '图片状态', },
            { field: 'number', width: 200, title: '图片编号', },
            { field: 'publishTime', width: 180, title: '发布时间', sort: true },
            { field: 'addUser', width: 150, title: '发布人', },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo',},

        ]]
        , page: true
        , id: 'ImgListData'
        , loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
          },
          parseData: function (res) {
            // console.log(res)
            //res 即为原始返回的数据
            if (res.code == 200) {
              return {
                "code": res.code, //解析接口状态
                "msg": '', //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.list //解析数据列表
              };
            } else {
              return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
              }
            }
      
          },
          where:{
            conditionFour:'0'    
          },
          response: {
            statusCode: 200 //规定成功的状态码，默认：0
          },
          done: function (res) {
            if (res.code == 403) {
              window.history.go(-1)
            } else {
      
            }
          }
    });
  var  videoTable = table.render({
        elem: '#VideoData',
        method:'post',
        url:'/api/good_material/getGoodMaterial',
        contentType: "application/json",
        headers: {
            token,
          },
         cols: [[
            // { field: 'Img', width: 150, title: '素材图',templet: "" },
            { field: 'name', width: 180, title: '素材名', },
            { field: 'name', width: 180, title: '素材状态', },
            { field: 'number', width: 200, title: '素材编号', },
            { field: 'publishTime', width: 180, title: '发布时间', sort: true },
            { field: 'addUser', width: 150, title: '发布人', },
            // {field:'operation', width:120, title: 'caozuo', sort: true, fixed: 'right'}
            { field: 'operation', width: 150, title: '操作', toolbar: '#barDemo',},

        ]]
        , page: true
        , id: 'ImgListData'
        , loading: true,
        request: {
            'pageName': 'pageNum',
            'limitName': 'pageSize'
          },
          parseData: function (res) {
            // console.log(res)
            //res 即为原始返回的数据
            if (res.code == 200) {
              return {
                "code": res.code, //解析接口状态
                "msg": '', //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.list //解析数据列表
              };
            } else {
              return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
              }
            }
      
          },
          where:{
            conditionFour:'1'    
          },
          response: {
            statusCode: 200 //规定成功的状态码，默认：0
          },
          done: function (res) {
            if (res.code == 403) {
              window.history.go(-1)
            } else {
      
            }
          }
    });
})