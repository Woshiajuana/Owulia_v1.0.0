/**
 * Created by 2144 on 2016/11/21.
 * zhigang.chen@owulia.com
 *
 * 示例：
    $("#container").ajuanScroll({
        conEle:$('.container-con'),//内容
        barEle:$('.container-bar'),//滚动条
        sliderEle:$('.container-slider'),//滑块
        barUpBtn:$('.container-up-btn'),//滚动条上按钮
        barDownBtn:$('.container-down-btn'),//滚动条下按钮
        minHSlider:10,//滑块最小高度
        scrollTime:100,//点击滚动条，内容滚动的速度
        Fn:function(){}//滚动时候触发的方法
    });
 */
$.fn.extend({
    //添加滚轮事件
    mousewheel:function(Func){
        return this.each(function(){
            var _self = this;
            _self.D = 0;
            if($.browser.msie||$.browser.safari){
                _self.onmousewheel=function(){
                    _self.D = event.wheelDelta;
                    event.returnValue = false;
                    Func && Func.call(_self);
                };
            }else{
                _self.addEventListener("DOMMouseScroll",function(e){
                    _self.D = e.detail>0?-1:1;
                    e.preventDefault();
                    Func && Func.call(_self);
                },false);
            }
        });
    }
});
$.fn.extend({
    ajuanScroll:function(options){
        return this.each(function(){
            var opt = options || {};
            var _self = this;
            var Stime,
                Sp=0,
                Isup=0,
                conEle = opt.conEle,
                barEle = opt.barEle,
                sliderEle = opt.sliderEle,
                scrollTime = opt.scrollTime || 100,
                barUpBtn = opt.barUpBtn,
                barDownBtn = opt.barDownBtn,
                dh = $(this).height(),
                bw = barDownBtn ? barDownBtn.height() : 0,
                sch = conEle.height(),
                sh = (dh-2*bw)*dh / sch;
            //if($.browser.msie){document.execCommand("BackgroundImageCache", false, true);}
            if(sh < 10){ sh = 10}
            //滚动时候跳动幅度
            var wh = sh/ 6,
                curT = 0,
                allowS=false;
            opt.Fn = opt.Fn || function () {};
            sliderEle.height(sh);
            if( sch <= dh ){ conEle.css({padding:0});barEle.css({display:"none"})}else{allowS=true;}
            sliderEle.bind("mousedown",function(e){
                opt['Fn'] && opt['Fn'].call(_self);
                Isup=1;
                var pageY = e.pageY ,t = parseInt($(this).css("top"));
                $(document).mousemove(function(e2){
                    curT =t+ e2.pageY - pageY;
                    setT();
                });
                $(document).mouseup(function(){
                    Isup=0;
                    $(document).unbind();
                });
                return false;
            });
            if(barUpBtn && barDownBtn){
                barUpBtn.bind("mousedown",function(e){
                    opt['Fn'] && opt['Fn'].call(_self);
                    Isup=1;
                    _self.timeSetT("u");
                    $(document).mouseup(function(){
                        Isup=0;
                        $(document).unbind();
                        clearTimeout(Stime);
                        Sp=0;
                    });
                    return false;
                });
                barDownBtn.bind("mousedown",function(e){
                    opt['Fn'] && opt['Fn'].call(_self);
                    Isup=1;
                    _self.timeSetT("d");
                    $(document).mouseup(function(){
                        Isup=0;
                        $(document).unbind();
                        clearTimeout(Stime);
                        Sp=0;
                    });
                    return false;
                });
            }
            _self.timeSetT = function(d){
                var self=this;
                if(d=="u"){curT-=wh;}else{curT+=wh;}
                setT();
                Sp+=2;
                var t =500 - Sp*50;
                if(t<=0){t=0}
                Stime = setTimeout(function(){self.timeSetT(d);},t);
            };
            barEle.bind("mousedown",function(e){
                opt['Fn'] && opt['Fn'].call(_self);
                curT = curT + e.pageY - sliderEle.offset().top - sh/2;
                asetT();
                return false;
            });
            function asetT(){
                if(curT<bw){curT=bw;}
                if(curT>dh-sh-bw){curT=dh-sh-bw;}
                sliderEle.stop().animate({top:curT},100);
                var scT = -((curT-bw)*sch/(dh-2*bw));
                conEle.stop().animate({top:scT},scrollTime);
            }
            function setT(){
                if(curT<bw){curT=bw;}
                if(curT>dh-sh-bw){curT=dh-sh-bw;}
                sliderEle.css({top:curT});
                var scT = -((curT-bw)*sch/(dh-2*bw));
                conEle.css({top:scT});
            }
            $(_self).mousewheel(function(){
                if(allowS!=true) return;
                opt['Fn'] && opt['Fn'].call(_self);
                if(this.D>0){curT-=wh;}else{curT+=wh;}
                setT();
            })
        });
    }
});
