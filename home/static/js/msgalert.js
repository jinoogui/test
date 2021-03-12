/* 消息框*/
function rea_alert(msgtxt,msgtit,type,btn_sure,btn_cancel,ok,cle){
    //msgtit:消息标题
    //msgtxt:消息内容
    //type:2-有确定取消按钮，1-确定按钮
    //btn_sure:按钮一名称
    //btn_cancle:按钮二名称
    //ok:按钮一回调函数
    //cle:按钮二回调函数
    msgtit=msgtit||"消息";
    msgtxt=msgtxt||"";
    type=type||"1";
    btn_sure=btn_sure||"确定";
    btn_cancel=btn_cancel||"取消";
    var s = '<div class="cover" id="msg_alert"><div class="msgbox"><div class="msgcont"><div class="tit">'+msgtit+'</div><div class="txt">'+msgtxt+'</div>';
    if(type==2){
        //两按钮
        s+='<div class="btn clearfix"><div class="btn1"><a href="javascript:void(0);" class="btn_sure">'+btn_sure+'</a></div><div class="btn2"><a href="javascript:void(0);"  class="btn_cancel">'+btn_cancel+'</a></div></div>';
    }
    if(type==1){
        //一个按钮
        s+='<div class="btn clearfix"><div class="btn3"><a href="javascript:void(0);" class="btn_sure">'+btn_sure+'</a></div></div><div class="close">X</div>';
    }
    if(type==0){
    //0个按钮
        s+='';
    }
    s+='</div></div><div class="cover_bg"></div></div>';
    $("body").append(s);
    $("#msg_alert").show();
    function close_msg(){
        //关闭提示窗口
        $("#msg_alert").fadeOut("fast",function(){
            $("#msg_alert").remove();
            $(this).remove();
        });
    }
    $(".btn_sure").click(function(){
        close_msg();
        if(typeof(ok)=="function")ok();
    });
    $(".btn_cancel").click(function(){
        if(typeof(cle)=="function")cle();
        close_msg();
    });
    $(".close").click(function(){
        close_msg();
    });
    $(".cover_bg").click(function(){
        close_msg();
    });
}
/*气泡提示*/
function pop_alert(msgtxt,msgtime){
    msgtime=msgtime||2000; //自动关闭时间，默认2秒
    msgtxt=msgtxt||"";
    var s = '<div class="cover" id="pop_alert"><div class="popmsg">'+msgtxt+'</div></div>';
    $("body").append(s);
    $("#pop_alert").show();
    setTimeout(function(){
        $("#pop_alert").remove();
    },msgtime)
}
