/**
 * Created by 2144 on 2016/11/1.
 */
__inline('../../static/lib/ajuanBarrageEffect.js');//工具js类
__inline('../../static/lib/ajuanLazyLoad.js');//工具js类
;(function(win,doc,_a,undefined){
    //视频播放类控制器
    var VideoController = (function () {
        var barEle = _a('barrage-box').getEle(),
            inputEle = _a('input-text').getEle(),
            ajuanBarrage = null,
            barrage = {
                boxEle: barEle,
                show: function () {
                    barrage.boxEle.style.zIndex = '0';
                },
                hide: function () {
                    barrage.boxEle.style.zIndex = '-1';
                },
                start: function () {
                    ajuanBarrage = ajuanBarrageEffect({
                        mainEleBox: barEle,
                        isRepeat:true
                    })
                }
            },
            videoCon = {
                IE:_a().IETester(),
                boxEle:_a('video-con').getEle(),
                start: function () {
                    videoCon.pop(-1, function () {
                        setTimeout(function () {
                            if(videoCon.IE && videoCon.IE < 10){
                                videoCon.pop(0);
                                return;
                            }
                            videoCon.pop(1);
                        },3000);
                    });
                },
                pop: function (type,callback) {
                    if(type == 0){//看不了
                        videoCon.boxEle.innerHTML = '' +
                        '<p class="prompt-box">' +
                        '<i class="prompt-icon"></i>' +
                        '<span class="prompt-text">' +
                        '看不了 浏览器太挫了 发个弹（dan）幕狠狠吐槽一下吧</span></p>';
                    }else if(type == 1){//成功
                        videoCon.boxEle.innerHTML = '' +
                        '<p class="prompt-box">' +
                        '<i class="prompt-icon"></i>' +
                        '<span class="prompt-text">' +
                        '太懒 还没做 发个弹（dan）幕狠狠吐槽一下吧</span></p>';
                    }else if(type == -1){//加载中
                        videoCon.boxEle.innerHTML = '' +
                        '<p class="load-box">' +
                        '<i class="load-icon"></i>' +
                        '<span class="load-text">' +
                        '正在为你拼命加载中</span></p>';
                    }
                    if(callback) callback();
                }

            },
            clickEvent = function (event) {
                var target = _a(event).target();
                //开始播放
                if(target.className == 'play-icon' ||
                    target.className == 'play-btn'){
                    var divEle = target.parentNode.id == 'play-box' ? target.parentNode : target.parentNode.parentNode;
                    _a(divEle).removeClass('fadeIn').addClass('fadeOut');
                    setTimeout(function () {
                        divEle.style.display = 'none';
                    },600);
                    barrage.start();
                    videoCon.start();
                    return;
                }
                //发送弹幕按钮
                if(target.className == 'input-btn'){
                    var value = inputEle.value.replace(/(^\s*)|(\s*$)/g,'');
                    if(!value){return;}
                    ajuanBarrage.addItemEle(value, function () {
                        inputEle.value = '';
                    });
                    return;
                }
                //弹幕开关
                if(target.parentNode && target.parentNode.id == 'switch-box'){
                    var boxEle = target.parentNode;
                    if(_a(boxEle).hasClass('on')){
                        barrage.hide();
                        boxEle.setAttribute('title','弹幕开');
                        _a(boxEle).removeClass('on').addClass('off');
                    }else{
                        barrage.show();
                        boxEle.setAttribute('title','弹幕关');
                        _a(boxEle).removeClass('off').addClass('on');
                    }
                    return;
                }
            },
            init = function () {
                _a().addEventListener('click',clickEvent);
                _a(doc).addEventListener('keydown', function (event) {
                    var e = _a(event).event();
                    if(e.keyCode == 13 && doc.activeElement.className == 'input-text'){
                        var value = inputEle.value.replace(/(^\s*)|(\s*$)/g,'');
                        if(!value){return;}
                        ajuanBarrage.addItemEle(value, function () {
                            inputEle.value = '';
                        });
                        return;
                    }
                });
            };
        init();
    }());
    //懒加载
    ajuanLazyLoad();
}(this,document,_a));