$(function () {
    //changemenu();
    //FastClick.attach(document.body);
    /*if (window.innerWidth > 700 && !$("#index").hasClass("onepage")) {
        scrolly.init({
            wrapper: '#index',
            targets: '.scr-el',
            wrapperSpeed: 0.08
        });
    };*/
    $(".popnav .hassub").click(function () {
		    if($(this).hasClass("active")){
		    	$(this).removeClass("active");
		    }else{
		    	$(".popnav .hassub").removeClass("active");
			    $(this).addClass("active");
		    }
    });
    $(".popnav .hassub2").click(function () {
	    if($(this).hasClass("active")){
		    	$(this).removeClass("active");
		    }else{
		    	$(".popnav .hassub2").removeClass("active");
			    $(this).addClass("active");
		    }
    });
    $(".c-nav .close").click(function () {
        $(".c-nav").removeClass("is-nav-active");
    });
    $(".menuicon .hmenu").click(function () {
	    $(this).children(".icon-menu").toggleClass("active");
        $(".c-nav").toggleClass("is-nav-active");
    });
    $(".rightbar .search-icon").click(function () {
        $(".searchbar").addClass("active");
        $(".rightbar").addClass("hide");
    });
    $(".fnav .tit").click(function () {
		    if($(this).hasClass("active")){
		    	$(this).removeClass("active");
		    }else{
		    	$(".fnav .tit").removeClass("active");
			    $(this).addClass("active");
		    }
    });
    $(".searchclose").click(function () {
        $(".searchbar").removeClass("active");
        $(".rightbar").removeClass("hide");
        $(".menuicon").removeClass("hide");
    });
    $(".hsearch").click(function () {
        $(".searchbar").addClass("active");
        $(".menuicon").addClass("hide");
    });
    $(".searchinput .search-icon").click(function(){
	    $("#searchform").submit();
    });    
    $(".kefu img").click(function(){
	    $(".kefupop").removeClass("hide");
    });
    $(".kefupop .popclose").click(function(){
	    $(".kefupop").addClass("hide");
    });
    /*$(window).scroll(function () {
        changemenu();
    });*/
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    };
    /*$('#index').stellar({
        horizontalScrolling: false,
        verticalScrolling: true,
        responsive: true,
        verticalOffset: 200,
        hideDistantElements: false,
        scrollProperty: 'transform',
        positionProperty: 'transform',
        parallaxElements: true, //默认开启元素滚动
    });*/
    $(".mainform input").focus(function () {
        $(this).siblings("label").addClass("hide");
    });
    $(".mainform input").blur(function () {
        $(this).siblings("label").removeClass("hide");
    });
    $(".mainform textarea").focus(function () {
        $(this).siblings("label").addClass("hide");
    });
    $(".mainform textarea").blur(function () {
        $(this).siblings("label").removeClass("hide");
    });
});
$(window).load(function(){
    $(".loading").addClass("ani");
    setTimeout(function(){
        $(".loading").remove();
    },2000);
});
//阻止浏览器滚动事件
function disabledMouseWheel() {
    document.body.addEventListener('touchmove', this.scrollFunc, { passive: false });
    document.body.addEventListener('mousewheel', this.scrollFunc, { passive: false });
}
//取消阻止浏览器滚动事件
function cancelDisMouseWheel() {
    document.body.removeEventListener('touchmove', this.scrollFunc, { passive: false });
    document.body.removeEventListener('mousewheel', this.scrollFunc, { passive: false });
}
function scrollFunc(evt) {
    evt = evt || window.event;
    if (evt.preventDefault) {
        // Firefox  
        evt.preventDefault();
        evt.stopPropagation();
    } else {
        // IE  
        evt.cancelBubble = true;
        evt.returnValue = false;
    }
    return false;
}
//改变菜单按钮样式
/*function changemenu() {
    var winScrollTop = $(window).scrollTop();
    var menuHeight = $(".menuicon").position().top;
    var winHeight = $(window).height();
    if (winScrollTop > winHeight) {
        $(".fixmenu").removeClass("hide");
    } else {
        $(".fixmenu").addClass("hide");
    }
}*/
