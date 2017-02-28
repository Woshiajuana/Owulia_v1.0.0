/**
 * Created by 2144 on 2016/11/4.
 */
__inline('../../static/lib/ajuanCommon.js');//工具js类
__inline('../../widget/nav/_nav.js');//导航条工具js类
__inline('../../widget/header/_header.js');//头部js类
__inline('../../widget/toolbar/_toolbar.js');//返回顶部js类
;(function (win,doc,_a,undefined) {
    //评论控制器
    var CommentController = (function () {
        var data = [
                {name:'ajuan',comment:'小小猪',time:'【9:00 10/1】'},
                {name:'ajuan',comment:'小小猪',time:'【9:00 10/1】'}
            ],
            clickEvent = function (event){
                var target = _a(event).target();
                //点击展开回复
                if(_a(target).hasClass('num-reply')||
                    target.className == 'num-reply-icon'){
                    var ele = target.className == 'num-reply-icon' ? target.parentNode : target,
                        divEle = ele.parentNode.parentNode;
                    if(_a(ele).hasClass('cur')){
                        closeReply(divEle);
                        _a(ele).removeClass('cur');
                        ele.innerHTML = '<i class="num-reply-icon"></i>3个回复';
                    }else{
                        openReply(divEle);
                        _a(ele).addClass('cur');
                        ele.innerHTML = '<i class="num-reply-icon"></i>收起回复'
                    }
                    return;
                }
                //点击回复别人
                if(target.className == 'reply-btn'){
                    var ele = target.parentNode.parentNode,
                        name = _a().getByClass('item-name',ele)[0].innerHTML,
                        textareaEle = ele.parentNode.parentNode.getElementsByTagName('textarea')[0];
                    textareaEle.innerHTML = '回复 ' + name + ' ：';
                    textareaEle.focus();
                    return;
                }
            },
            openReply = function (divEle) {
                var inputStr = '<i class="header-img"></i><div class="input-item">' +
                    '<label class="title-prompt nc-icon"></label>' +
                    '<input class="input-con" type="text" placeholder="好汉请留大名（必填）"/></div>' +
                    '<div class="input-item"><label class="title-prompt yx-icon"></label>' +
                    '<input class="input-con" type="text" placeholder="好汉请留邮箱（必填）"/></div>' +
                    '<div class="input-item"><label class="title-prompt zd-icon"></label>' +
                    '<input class="input-con" type="text" placeholder="好汉请留链接地址（可填可不填）"/></div> ' +
                    '<div class="input-item"><textarea  placeholder="好汉请说点什么吧（必填）"></textarea>' +
                    '</div><div class="btn-box"><i class="btn-item tj-icon">提交</i>' +
                    '<i class="btn-item cx-icon">重写</i></div>',
                    inputBoxEle = _a().getByClass('reply-input',divEle)[0],
                    replyBoxEle = _a().getByClass('reply-box',divEle)[0],
                    str = '';
                if(!replyBoxEle){
                    replyBoxEle = doc.createElement('ul');
                    _a(data).forEach(function (item) {
                        str += '<li class="reply-item"><i class="header-img"></i>' +
                        '<h4 class="item-name-box"><em class="item-name">'+ item.name +'</em> 回复 <em class="item-name">'+ item.name +'</em> ：</h4> ' +
                        '<p class="item-con">'+ item.comment +'</p>' +
                        '<p class="operation-box"><i class="reply-btn" title="回复"></i>' +
                        '<span class="reply-time">'+ item.time +'</span></p></li>';
                    });
                    replyBoxEle.innerHTML = str;
                    replyBoxEle.className = 'reply-box';
                    divEle.appendChild(replyBoxEle);
                }else{
                    replyBoxEle.style.display = 'block';
                }
                if(!inputBoxEle){
                    inputBoxEle = doc.createElement('div');

                    inputBoxEle.className = 'reply-input';
                    inputBoxEle.innerHTML = inputStr;
                    divEle.appendChild(inputBoxEle);
                }else{
                    inputBoxEle.style.display = 'block';
                }
            },
            closeReply = function (divEle) {
                var inputBoxEle = _a().getByClass('reply-input',divEle)[0],
                    replyBoxEle = _a().getByClass('reply-box',divEle)[0];
                inputBoxEle.style.display = 'none';
                replyBoxEle.style.display = 'none';
            },
            init = function () {
                _a().addEventListener('click',clickEvent);
            };
        init();
    }());
}(this,document,_a));
