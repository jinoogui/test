
window.onresize=function(){
    watchChangeSize();
} 

function watchChangeSize (){    
    var clientWidth = document.documentElement.clientWidth;
    if(clientWidth>=750){
         document.getElementsByTagName('html')[0].style['font-size'] = 100 * (clientWidth / 1920) + 'px';//屏幕大于750，按1920设计稿
     }else{
         document.getElementsByTagName('html')[0].style['font-size'] = 100 * (clientWidth / 750) + 'px';//屏幕小于750，按750设计稿
     }
}

/*根据屏幕适配font-size*/
;(function (doc, win) {
     var docEl     = doc.documentElement,
         resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
         recalc    = function () {
             var clientWidth = docEl.clientWidth;
             if (!clientWidth) return;
             if(clientWidth>=750){
                 docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';//屏幕大于750，按1920设计稿
             }else{
                 docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';//屏幕小于750，按750设计稿
             }
         };
         //setTimeout(function(){console.log($('header').height());},1);
     if (!doc.addEventListener) return;
     win.addEventListener(resizeEvt, recalc, false);
     doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


;(function($, window, document,undefined) {

    "use strict";

    var Tfn = function() {
        this.header            = $('header'),
        this.center            = $('#wrapper'),
        this.footer            = $('footer'),
        this.windowWidth       = ('innerWidth' in window) ? window.innerWidth : document.documentElement.clientWidth,//屏幕宽度
        this.windowHeight      = ('innerHeight' in window) ? window.innerHeight : document.documentElement.clientHeight,//屏幕高度
        this.IEnum             = null;//如果是ie浏览器，ie的版本数
        this.isAnimating       = false,//判断轮播动画是否进行中
        this.isAnimating1      = false,//判断下拉动画是否进行中
        this.isAnimating2      = false,//判断webGl动画是否进行中
        this.aniTime           = 600,  //动画时间
        this.isPc              = null,//是否为pc端
        this.rowNode           = [],//页面块节点存储
        this.appDirection      = null,//手机端触摸滑动方向
        this.support           = { animations : Modernizr.cssanimations },//是否支持1，animations
        this.animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
        this.animEndEventName = this.animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
        this.onEndAnimation    = function( el, callback ) {//动画所属元素，如果不支持animations回调函数。
            var self = this;
            var onEndCallbackFn = function( ev ) {
                if( self.support.animations ) {
                    if( ev.target != this ) return;
                    this.removeEventListener( self.animEndEventName, onEndCallbackFn );
                }
                if( callback && typeof callback === 'function' ) { callback.call(); }
            };
            if( self.support.animations ) {
                el.addEventListener( self.animEndEventName, onEndCallbackFn );
            }
            else {
                onEndCallbackFn();
            }
        };
        this.init();
        /*var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        },
        this.transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ]; //transition结束事件*/
    };
    Tfn.prototype = {
        //初始化
        init  : function() {
            var self = this;
            if (!!window.ActiveXObject || "ActiveXObject" in window){
                $('body').addClass("ie");
                this.IEnum = parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""));
                if(this.IEnum<9){
                    alert("您的浏览器版本过低，请下载IE9及以上版本");return false;
                }else if(this.IEnum==9){
                    $('body').addClass("ie9");
                }else if(this.IEnum==10){
                    $('body').addClass("ie10");
                }else if(this.IEnum==11){
                    $('body').addClass("ie11");
                }
            }
            this.IsPC();
            this.storage();
            this.contentInit();
            // imagesLoaded(document.querySelectorAll('img'), function () {
            //     self.picMove();
            //     // self.webGl_picMove();
            // });
            // this.picCut();
            this.scrolly();
            this.toTop();
            if(!this.isPc){
                // this.touchMove();
            }else{
            }
        },
        //内容层min-height
        contentInit:function(){
            var self      = this,
                minHeight =self.windowHeight - (self.header.height() + self.footer.height());
            self.center.css('min-height',minHeight+'px');
            $('[data-hei]').each(function(index,e){
                var wid=$(this).width(),
                    hei=parseInt(wid*($(this).attr('data-hei')));
                $(this).css('height',hei+"px");
            });
            $("[data-ahref]").on('click',function () {
                var src = $(this).attr('data-ahref');
                var type = $(this).attr('data-target');
                if(type==1){
                    window.open(src);
                }else{
                    window.location.href=src;
                }
            });
        },

        // 浏览器版本
        version:function(){
            var explorer = window.navigator.userAgent ;
            if (explorer.indexOf("MSIE") >= 0||explorer.indexOf("Trident")>0 ) {
                if(explorer.indexOf("MSIE 5")>0||explorer.indexOf("MSIE 6")>0||explorer.indexOf("MSIE 7")>0||explorer.indexOf("MSIE 8")>0) {
                    return 'LowerIEVersion';
                }else{
                    return 'EdgeOrTrident';
                }
            }
            else if (explorer.indexOf("Maxthon") >= 0) {return 'Maxthon';}
            else if (explorer.indexOf("Firefox") >= 0) {return 'FireFox';}
            else if(explorer.indexOf("Chrome") >= 0){ return 'Chrome';}
            else if(explorer.indexOf("Opera") >= 0){ return 'Opera';}
            else if(explorer.indexOf("Safari") >= 0){ return 'Safari';}
        },

        // 网站标识
        one:function(){
            if(this.version()!='LowerIEVersion'&&this.version()=="Chrome") {
                console.log('%c12ONE DESIGN','display:block;padding: 0 50px;line-height: 76px;background:#000;color: #fff; font-size: 40px;border-radius: 6px;')
                console.log('Powered by 12ONE DESIGN%c.','color:#000;font-weight: 900;','');
                console.log('Learn more about us \nplease visit %chttp://www.12-one.cn','text-decoration: underline;');
            }
        },

        //对sessionStorage的操作（只有第一次对浏览网站：有loading动画 ）
        storage:function () {
            var self = this,
                loading = $('.loading'),
                stor = JSON.parse(sessionStorage.getItem('key')),
                info ={call:null};//对网站浏览次数存储
            if(stor==null){
                info.call=1;
                self.one();
                sessionStorage.setItem('key',JSON.stringify(info));
            }else{
                info.call=stor.call+1;
                sessionStorage.setItem('key',JSON.stringify(info));
                loading.remove();
            }
        },

        //判断是否为pc端
        IsPC:function(){
            var self = this;
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            self.isPc = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { self.isPc = false; break; }
            }
            return self.isPc;
        },

        //页面切换（针对setinterval）
        VisibilityChange:function ( gofn , backfn ) {
            var hiddenProperty = 'hidden' in document ? 'hidden' :
                'webkitHidden' in document ? 'webkitHidden' :
                    'mozHidden' in document ? 'mozHidden' :
                        null;
            var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            var onVisibilityChange = function(){
                if (!document[hiddenProperty]) {
                    backfn.call();
                }else{
                    gofn.call();
                }
            };
            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        },

        

        //transform滚动惯性视差（背景滚动视差）
        scrolly:function () {
            var defaults = {
                wrapper: '#scrolly',
                parent_move : true,//容器跟随惯性滚动
                targets : '.scrolly-el',
                bgParallax : false,//背景惯性滚动
                wrapperSpeed: 0.08,
                targetSpeed: 0.02,
                targetPercentage: 0.1
            };
            var requestAnimationFrame =
                window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
            var extend = function () {
                // Variables
                var extended = {};
                var deep = false;
                var i = 0;
                var length = arguments.length;
                // Merge the object into the extended object
                var merge = function (obj) {
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            extended[prop] = obj[prop];
                        }
                    }
                };
                // Loop through each object and conduct a merge
                for ( ; i < length; i++ ) {
                    var obj = arguments[i];
                    merge(obj);
                }

                return extended;

            };
            var scrolly = function(){
                this.Targets = [];
                this.TargetsLength = 0;
                this.wrapper = '';
                this.windowHeight = 0;
                this.wapperOffset = 0;
            };
            scrolly.prototype = {
                isAnimate: false,
                isResize : false,
                scrollId: "",
                resizeId: "",
                init : function(options){
                    this.settings = extend(defaults, options || {});
                    this.wrapper = document.querySelector(this.settings.wrapper);

                    if(this.wrapper==="undefined"){
                        return false;
                    }
                    this.targets = document.querySelectorAll(this.settings.targets);
                    document.body.style.height = this.wrapper.clientHeight + 'px';

                    this.windowHeight = window.clientHeight;
                    this.attachEvent();
                    this.apply(this.targets,this.wrapper);
                    this.animate();
                    this.resize();
                },
                apply : function(targets,wrapper){
                    if(this.settings.parent_move){
                        this.wrapperInit();
                    }
                    this.targetsLength = targets.length;
                    for (var i = 0; i < this.targetsLength; i++) {
                        var attr = {
                            offset : targets[i].getAttribute('data-offset'),
                            speedX : targets[i].getAttribute('data-speed-x'),
                            speedY : targets[i].getAttribute('data-speed-Y'),
                            percentage : targets[i].getAttribute('data-percentage'),
                            horizontal : targets[i].getAttribute('data-v')
                        };
                        this.targetsInit(targets[i],attr);
                    }
                },
                wrapperInit: function(){
                    this.wrapper.style.width = '100%';
                    this.wrapper.style.position = 'fixed';
                },
                targetsInit: function(elm,attr){

                    this.Targets.push({
                        elm : elm,
                        offset : attr.offset ? attr.offset : 0,
                        offsetTop : $(elm).offset().top,
                        hei : $(elm).height(),
                        horizontal : attr.horizontal ? attr.horizontal : 0,
                        top : 0,
                        left : 0,
                        speedX : attr.speedX ? attr.speedX : 1,
                        speedY : attr.speedY ? attr.speedY : 1,
                        percentage :attr.percentage ? attr.percentage : 0
                    });
                },
                scroll : function(){
                    var scrollTopTmp = document.documentElement.scrollTop || document.body.scrollTop;
                    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var offsetBottom = this.scrollTop + this.windowHeight;
                    if(this.settings.parent_move){
                        this.wrapperUpdate(this.scrollTop);
                    }
                    for (var i = 0; i < this.Targets.length; i++) {
                        this.targetsUpdate(this.Targets[i]);
                    }
                },
                animate : function(){
                    this.scroll();
                    this.scrollId = requestAnimationFrame(this.animate.bind(this));
                },
                wrapperUpdate : function(){

                    this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
                    this.wrapper.style.transform = 'translate3d(' + 0 + ',' +  Math.round(-this.wapperOffset* 100) / 100 + 'px ,' + 0 + ')';
                },
                targetsUpdate : function(target){
                    var wH = $(window).height();
                    target.offsetTop = $(target.elm).offset().top;
                    target.top += ((this.scrollTop - target.offsetTop + (wH-target.hei)/2) * Number(this.settings.targetSpeed) * Number(target.speedY) - target.top) * this.settings.targetPercentage;
                    target.left += ((this.scrollTop - target.offsetTop + (wH-target.hei)/2) * Number(this.settings.targetSpeed) * Number(target.speedX) - target.left) * this.settings.targetPercentage;
                    var targetOffsetTop = ( parseInt(target.percentage) - target.top - parseInt(target.offset) );
                    var offsetY = Math.round(targetOffsetTop * -100) / 100;
                    var offsetX = 0;
                    if(target.horizontal){
                        var targetOffsetLeft = ( parseInt(target.percentage) - target.left - parseInt(target.offset) );
                        offsetX = Math.round(targetOffsetLeft * -100) / 100;
                    }
                    if(this.settings.bgParallax){
                        if(target.horizontal){
                            $(target.elm).css({backgroundPosition:  offsetX +'px 50%'});
                        }else{
                            $(target.elm).css({backgroundPosition: '50% ' + offsetY + 'px'});
                        }
                    }else{
                        target.elm.style.transform = 'translate3d(' + offsetX + 'px ,' + offsetY + 'px ,' + 0 +')';
                    }
                },
                resize: function(){
                    var self = this;
                    self.windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
                    if( parseInt(self.wrapper.clientHeight) != parseInt(document.body.style.height)){
                        document.body.style.height = self.wrapper.clientHeight + 'px';
                    }
                    self.resizeId = requestAnimationFrame(self.resize.bind(self));
                },
                attachEvent : function(){
                    var self = this;
                    window.addEventListener('resize',(function(){
                        if(!self.isResize){
                            cancelAnimationFrame(self.resizeId);
                            cancelAnimationFrame(self.scrollId);
                            self.isResize = true;
                            setTimeout((function(){
                                self.isResize = false;
                                self.resizeId = requestAnimationFrame(self.resize.bind(self));
                                self.scrollId = requestAnimationFrame(self.animate.bind(self));
                            }),200);
                        }
                    }));

                }
            };
            window.scrolly = new scrolly();
            return scrolly;
        },




        touchMove:function (el) {
            var self  = this;
            var move = {};
            el.on('touchstart',function(e){
                //获取接触屏幕时的X和Y
                move.startX = e.originalEvent.changedTouches[0].pageX;
                move.startY = e.originalEvent.changedTouches[0].pageY;
            });
            el.on('touchmove',function(e) {
                //获取滑动屏幕时的X,Y
                move.endX = e.originalEvent.changedTouches[0].pageX;
                move.endY = e.originalEvent.changedTouches[0].pageY;
            });
            el.on('touchend',function(e) {
                //获取滑动屏幕时的X,Y
                var distanceX = move.endX - move.startX;
                var distanceY = move.endY - move.startY;
                if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0) {
                    self.appDirection='right';
                }
                else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < 0) {
                    self.appDirection='left';
                }
                else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
                    self.appDirection='down';
                }
                else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
                    self.appDirection='up';
                }
            });
        },

        //回到顶部
        toTop:function () {
            var self      = this;
            var top_btn   = $('.toTop'),
                isHave = top_btn.length <= 0 ? true : false;
            if(isHave) return false;
            top_btn.on('click',function () {
                $("html,body").animate({scrollTop:0}, 600);
            });
            $(window).scroll(function(){
                if($(this).scrollTop()>(self.windowWidth/2)){
                    self.header.addClass('on');
                    top_btn.addClass('on');
                }else{
                    self.header.removeClass('on');
                    top_btn.removeClass('on');
                }
            });
        },


        //页面节点相互监听
        nodeName:function () {
            var self = this,
                node = $('.nodeItem'),
                ishave = node.length<=0 ? true : false;
            if(ishave) return false;
            var name = $('.rowName');
            for(var n=0;n<name.length;n++){
                var row = {};
                var _this = name[n];
                row.id = $(_this).parents('.row').attr('id');
                row.top = $(_this).offset().top - (data.win_h/2);
                self.rowNode.push(row);
            }
            nodeChange();
            function nodeChange(){
                var top = $(document).scrollTop();
                if(top>400){
                    node.addClass('on');
                }else{
                    node.removeClass('on');
                }
                for(var i=self.rowNode.length-1;i>=0;i--){
                    var _this = self.rowNode[i];
                    if(top>=_this.top){
                        $('.nodeItem > a').eq(i).addClass('on').siblings().removeClass('on');
                        break;
                    }
                }
            }
            $(window).scroll(function () {
                nodeChange();
            });
        }

    };

    window.base = new Tfn();
})(jQuery, window, document);


//input[type=range]

$.fn.RangeSlider = function(cfg){
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min)
        .attr('max', max)
        .attr('step', step);

    $input.bind("input", function(e){
        $input.attr('value', this.value);
        $input.css( 'background-size', this.value + '% 100%' );

        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};



