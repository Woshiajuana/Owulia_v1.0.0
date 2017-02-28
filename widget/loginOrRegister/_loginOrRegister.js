/**
 * Created by 2144 on 2016/11/11.
 * zhigang.chen@owulia.com
 * 用户登录与注册模块
 */
;(function (win, doc, _a, undefined) {
    //注册和登录
    'use strict';
    var THAt = null,
        options = null,
        DEFAULT = {
            time:59,
            IE:_a().IETester(),
            str: '' +
            '<!--登录主体-->' +
    '<div class="lr-login-box">' +
    '<!--关闭按钮-->' +
    '<i class="lr-close">' +
    '<em class="lr-close-icon"></em>' +
    '</i>' +
    '<!--/关闭按钮-->' +
    '<!--标题-->' +
    '<h3 class="lr-box-title">登录</h3>' +
    '   <!--/标题-->' +
            '<span class="lr-switch-box">' +
    '切换注册' +
    '<i class="lr-switch-icon"></i>' +
    '</span>' +
    '<p class="lr-prompt" id="lr-login-prompt"></p>' +
    '<!--内容-->' +
    '<p class="lr-input-box no-top">' +
    '<input class="lr-input" id="username" AUTOCOMPLETE="OFF" aria-invalid="true" aria-required="true" required="required" type="text" placeholder="请输入用户名"/>' +
    '<label class="lr-label lr-user-icon" for="username"></label>' +
    '<label class="lr-error" for="username"></label>' +
    '</p>' +
    '<p class="lr-input-box">' +
    '<input class="lr-input" id="password" AUTOCOMPLETE="OFF" aria-invalid="true" aria-required="true" required="required" type="password" placeholder="请输入密码"/>' +
    '<label class="lr-label lr-pwd-icon" for="password"></label>' +
    '<label class="lr-error" for="password"></label>' +
    '</p>' +
    '<p class="lr-input-box">' +
    '<span class="lr-rem-box" id="lr-rem-box">' +
    '<i class="lr-rem-con">' +
    '<em class="lr-rem-icon"></em>' +
    '</i>' +
    '<span class="lr-rem-prompt">记住我的登录</span>' +
    '</span>' +
    '<a class="lr-retrieve-link" href="#">忘记密码？</a>' +
    '</p>' +
    '<i class="lr-sub-btn" id="lr-l-btn">登录</i>' +
    '<p class="lr-tripartite-title">您也可以使用第三方帐号快捷登录</p>' +
    '<div class="lr-tripartite-box">' +
    '<a href="#" title="QQ登录" class="lr-tri-item lr-qq-login"></a>' +
    '<a href="#" title="微信登录" class="lr-tri-item lr-wx-login"></a>' +
    '<a href="#" title="微博登录" class="lr-tri-item lr-wb-login"></a>' +
    '<a href="#" title="GitHub登录" class="lr-tri-item lr-gh-login"></a>' +
    '</div>' +
    '<!--/内容-->' +
    '</div>' +
    '<!--/登录主体-->' +
    '<!--注册主体-->' +
    '<div class="lr-register-box">' +
    ' <!--关闭按钮-->' +
    '<i class="lr-close">' +
    '<em class="lr-close-icon"></em>' +
    '</i>' +
    '<!--/关闭按钮-->' +
    '<!--标题-->' +
    '<h3 class="lr-box-title">注册</h3>' +
    '<!--/标题-->' +
            '<span class="lr-switch-box">' +
    '切换登录' +
    '<i class="lr-switch-icon"></i>' +
    '</span>' +
    '<p class="lr-prompt" id="lr-register-prompt"></p>' +
    '<!--内容-->' +
    '<p class="lr-input-box no-top">' +
    '<input class="lr-input" id="re-username" aria-invalid="true" AUTOCOMPLETE="OFF" aria-required="true" required="required" type="text" placeholder="4-10个字母或数字组成的用户名"/>' +
    '<label class="lr-label lr-user-icon" for="re-username"></label>' +
    '<label class="lr-error" for="re-username"></label>' +
    '</p>' +
    '<p class="lr-input-box">' +
    '<input class="lr-input" id="re-password" aria-invalid="true" AUTOCOMPLETE="OFF" aria-required="true" required="required" type="password" placeholder="6-20个字符"/>' +
    '<label class="lr-label lr-pwd-icon" for="re-password"></label>' +
    '<label class="lr-error" for="re-password"></label>' +
    '</p>' +
    '<p class="lr-input-box">' +
    '<input class="lr-input" id="re-password-too" aria-invalid="true" AUTOCOMPLETE="OFF" aria-required="true" required="required" type="password" placeholder="再确认一下咯"/>' +
    '<label class="lr-label lr-sure-icon" for="re-password-too"></label>' +
    '<label class="lr-error" for="re-password-too"></label>' +
    '</p>' +
    '<p class="lr-input-box">' +
    '<input class="lr-input error" id="re-tel" aria-invalid="true" AUTOCOMPLETE="OFF" aria-required="true" required="required" type="text" placeholder="手机号码，用于找回密码嘛"/>' +
    '<label class="lr-label lr-tel-icon" for="re-tel"></label>' +
    '<label class="lr-error" for="re-tel"></label>' +
    '</p>' +
    '<p class="lr-input-box">' +
    '<input class="lr-input lr-input-code" id="re-code" aria-invalid="true" AUTOCOMPLETE="OFF" aria-required="true" required="required" type="text" placeholder="验证码怼一下"/>' +
    '<i class="lr-send-out">获取验证码</i>' +
    '<label class="lr-label lr-code-icon" for="re-code"></label>' +
    '<label class="lr-error" for="re-code"></label>' +
    '</p>' +
            '<i class="lr-sub-btn" id="lr-r-btn">注册</i>' +
            '<!--/内容-->' +
            '</div>' +
                '<!--/注册主体-->'
        };
    function LR(opt){
        options = opt || {};
        this.callback = options.callback;
        this.IE = options.IE || DEFAULT.IE;
        this.type = null;
        this.temp = null;
        this.time = options.time || DEFAULT.time;
    };
    LR.prototype = {
        init: function () {
            return this;
        },
        L: function (callback) {
            this.type = 0;
            createEle(this);
            getUserLR()
            addEvent();
            if(callback) this.callback = callback;
        },
        R: function (callback) {
            this.type = 1;
            createEle(this,1);
            addEvent();
            if(callback) this.callback = callback;
        }
    };
    //显示错误提示信息
    function promptMsgShow( parentNode , txt ){
        var lrError = _a().getByClass('lr-error',parentNode)[0];
        lrError.innerHTML = txt;
        _a(parentNode).addClass('lr-err');
    };
    //隐藏错误信息
    function promptMsgHide( parentNode ){
        var lrError = _a().getByClass('lr-error',parentNode)[0];
        lrError.innerHTML = '';
        _a(parentNode).removeClass('lr-err');
    };
    //登录验证信息事件
    function loginCheckMsg(){
        var type = true;
        if(!_a('username').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('username').getEle().parentNode,'账号不能为空');
            type = false;
        }
        if(!_a('password').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('password').getEle().parentNode,'密码不能为空');
            type = false;
        }
        return type;
    };
    //注册验证信息事件
    function registerCheckMsg(){
        var type = true;
        if(!_a('re-username').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('re-username').getEle().parentNode,'4-10个字母或数字组成的用户名');
            type = false;
        }
        if(!/^[0-9a-zA-Z]{4,10}$/g.test(_a('re-username').getEle().value.replace(/(^\s*)|(\s*$)/g, ''))){
            promptMsgShow(_a('re-username').getEle().parentNode,'4-10个字母或数字组成的用户名');
            type = false;
        }
        if(!_a('re-password').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('re-password').getEle().parentNode,'6-20个字符');
            type = false;
        }
        if(_a('re-password').getEle().value.replace(/(^\s*)|(\s*$)/g, '').length < 6 ||
            _a('re-password').getEle().value.replace(/(^\s*)|(\s*$)/g, '').length > 20){
            promptMsgShow(_a('re-password').getEle().parentNode,'6-20个字符');
            type = false;
        }
        if(!_a('re-password-too').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('re-password-too').getEle().parentNode,'再确认一下咯');
            type = false;
        }
        if(_a('re-password').getEle().value.replace(/(^\s*)|(\s*$)/g, '') != _a('re-password-too').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('re-password-too').getEle().parentNode,'两次密码不一致');
            type = false;
        }
        if(!_a('re-tel').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('re-tel').getEle().parentNode,'请输入常用手机号码');
            type = false;
        }
        if(_a('re-tel').getEle().value.replace(/(^\s*)|(\s*$)/g, '') &&
            !/^1[3578]\d{9}$/g.test(_a('re-tel').getEle().value.replace(/(^\s*)|(\s*$)/g, ''))){
            promptMsgShow(_a('re-tel').getEle().parentNode,'手机号码格式不正确');
            type = false;
        }
        if(!_a('re-code').getEle().value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(_a('re-code').getEle().parentNode,'验证码怼一下');
            type = false;
        }
        return type;
    };
    //获取验证倒计时
    function countDown(target){
        var telInput = _a('re-tel').getEle();
        if(!telInput.value.replace(/(^\s*)|(\s*$)/g, '')){
            promptMsgShow(telInput.parentNode,'请输入常用手机号码');
            return;
        }
        if(!/^1[3578]\d{9}$/g.test(telInput.value.replace(/(^\s*)|(\s*$)/g, ''))) return;
        target.className = 'lr-send-out-after';
        target.innerHTML = '（<em>'+ THAt.time +'</em>s）重发';
        var emEle = target.getElementsByTagName('em')[0];
        THAt.temp = setInterval(function () {
            if(+emEle.innerHTML > 0){
                emEle.innerHTML = parseInt(emEle.innerHTML) - 1;
            }else{
                target.className = 'lr-send-out';
                target.innerHTML = '获取验证码';
                clearInterval(THAt.temp);
            }
        },1000);
    };
    //获取验证码
    function achieveCode(){

    };
    //点击事件
    function clickEvent(event) {
        var target = _a(event).target();
        //关闭按钮
        if(target.className == 'lr-close'||
            target.className == 'lr-close-icon'||
            target.id == 'lr-mask'){
            closeLR(THAt);
            return;
        }
        //切换按钮
        if(target.className == 'lr-switch-box'||
            target.className == 'lr-switch-icon'){
            switchLR(THAt);
            return;
        }
        //记住我的登录
        if(target.className == 'lr-rem-prompt'||
            target.className == 'lr-rem-con'||
            target.className == 'lr-rem-box'||
            target.className == 'lr-rem-icon'){
            rememberLR(THAt);
            return;
        }
        //发送验证码
        if(target.className == 'lr-send-out'){
            countDown(target);
            achieveCode();
            return;
        }
        //登录按钮
        if(target.id == 'lr-l-btn'){
            if(!loginCheckMsg()) return;
            userLoginLR();
            return;
        }
        //注册按钮
        if(target.id == 'lr-r-btn'){
            if(!registerCheckMsg()) return;
            userRegisterLR();
            return;
        }
    };
    //键盘监听事件
    function keyDownEvent (event) {//键盘监听事件
        var event = _a(event).event();
        //登录
        if ( THAt.type === 0 && event.keyCode == 13 ) {
            if(!loginCheckMsg()) return;
            userLoginLR();
            return;
        }
        //注册
        if ( THAt.type === 1 && event.keyCode == 13 ) {
            if(!registerCheckMsg()) return;
            userRegisterLR();
            return;
        }
    };
    //输入框事件
    function inputEvent (event) {//输入框事件
        var target = _a(event).target();
        //登录
        if(target.id == 'username'){
            //验证用户名是否
           return;
        }
    };
    //聚焦事件
    function focusEvent(event){
        var target = _a(event).target(),
            parentNode = target.parentNode;
        if(!_a(parentNode).hasClass('lr-cur')){
            _a(parentNode).addClass('lr-cur');
        }
        if(target.id == 'username'){
            promptMsgHide(parentNode);
            return;
        }
        if(target.id == 'password'){
            promptMsgHide(parentNode);
            return;
        }
        if(target.id == 're-username'){
            promptMsgHide(parentNode);
            return;
        }
        if(target.id == 're-password'){
            promptMsgHide(parentNode);
            return;
        }
        if(target.id == 're-password-too'){
            promptMsgHide(parentNode);
            return;
        }
        if(target.id == 're-tel'){
            promptMsgHide(parentNode);
            return;
        }
        if(target.id == 're-code'){
            promptMsgHide(parentNode);
            return;
        }
    };
    //失焦事件
    function blurEvent(event){
        var target = _a(event).target(),
            parentNode = target.parentNode;
        if(_a(parentNode).hasClass('lr-cur')){
            _a(parentNode).removeClass('lr-cur');
        }
        if(target.id == 'username'){
            var value = target.value.replace(/(^\s*)|(\s*$)/g, '');
            if(!value){
                promptMsgShow(parentNode,'账号不能为空');
            }
            return;
        }
        if(target.id == 'password'){
            var value = target.value.replace(/(^\s*)|(\s*$)/g, '');
            if(!value){
                promptMsgShow(parentNode,'密码不能为空');
            }
            return;
        }
        if(target.id == 're-username'){
            var value = target.value.replace(/(^\s*)|(\s*$)/g, ''),
                re =  /^[0-9a-zA-Z]{4,10}$/g;
            if(!value){
                promptMsgShow(parentNode,'4-10个字母或数字组成的用户名');
            }
            if(!re.test(value)){
                promptMsgShow(parentNode,'4-10个字母或数字组成的用户名');
            }
            return;
        }
        if(target.id == 're-password'){
            var value = target.value.replace(/(^\s*)|(\s*$)/g, '');
            if(!value){
                promptMsgShow(parentNode,'6-20个字符');
            }
            if(value.length < 6 || value.length > 20){
                promptMsgShow(parentNode,'6-20个字符');
            }
            return;
        }
        if(target.id == 're-password-too'){
            var value = target.value.replace(/(^\s*)|(\s*$)/g, '');
            if(!value){
                promptMsgShow(parentNode,'再确认一下咯');
            }
            if(_a('re-password').getEle().value.replace(/(^\s*)|(\s*$)/g, '') != value){
                promptMsgShow(parentNode,'两次密码不一致');
            }
            return;
        }
        if(target.id == 're-tel'){
            var value = target.value.replace(/(^\s*)|(\s*$)/g, ''),
                re = /^1[3578]\d{9}$/g;
            if(!value){
                promptMsgShow(parentNode,'请输入常用手机号码');
            }
            if(value && !re.test(value)){
                promptMsgShow(parentNode,'手机号码格式不正确');
            }
            return;
        }
        if(target.id == 're-code'){
            if(!target.value.replace(/(^\s*)|(\s*$)/g, '')){
                promptMsgShow(parentNode,'验证码怼一下');
            }
            return;
        }
    };
    //绑定事件
    function addEvent(){
        _a().addEventListener('click',clickEvent);
        _a().addEventListener('keydown',keyDownEvent);

        _a(_a('username').getEle()).addEventListener('blur',blurEvent);
        _a(_a('password').getEle()).addEventListener('blur',blurEvent);
        _a(_a('re-username').getEle()).addEventListener('blur',blurEvent);
        _a(_a('re-password').getEle()).addEventListener('blur',blurEvent);
        _a(_a('re-password-too').getEle()).addEventListener('blur',blurEvent);
        _a(_a('re-tel').getEle()).addEventListener('blur',blurEvent);
        _a(_a('re-code').getEle()).addEventListener('blur',blurEvent);

        _a(_a('username').getEle()).addEventListener('focus',focusEvent);
        _a(_a('password').getEle()).addEventListener('focus',focusEvent);
        _a(_a('re-username').getEle()).addEventListener('focus',focusEvent);
        _a(_a('re-password').getEle()).addEventListener('focus',focusEvent);
        _a(_a('re-password-too').getEle()).addEventListener('focus',focusEvent);
        _a(_a('re-tel').getEle()).addEventListener('focus',focusEvent);
        _a(_a('re-code').getEle()).addEventListener('focus',focusEvent);

        if (THAt.IE && THAt.IE <= 8) {
            _a().addEventListener('keyup', inputEvent);
        } else {
            _a().addEventListener('input', inputEvent);
        }
    };
    //移除事件
    function removeEvent(){
        _a().removeEventListener('click',clickEvent);
        _a().removeEventListener('keydown',keyDownEvent);

        _a(_a('username').getEle()).removeEventListener('blur',blurEvent);
        _a(_a('password').getEle()).removeEventListener('blur',blurEvent);
        _a(_a('re-username').getEle()).removeEventListener('blur',blurEvent);
        _a(_a('re-password').getEle()).removeEventListener('blur',blurEvent);
        _a(_a('re-password-too').getEle()).removeEventListener('blur',blurEvent);
        _a(_a('re-tel').getEle()).removeEventListener('blur',blurEvent);
        _a(_a('re-code').getEle()).removeEventListener('blur',blurEvent);

        _a(_a('username').getEle()).removeEventListener('focus',focusEvent);
        _a(_a('password').getEle()).removeEventListener('focus',focusEvent);
        _a(_a('re-username').getEle()).removeEventListener('focus',focusEvent);
        _a(_a('re-password').getEle()).removeEventListener('focus',focusEvent);
        _a(_a('re-password-too').getEle()).removeEventListener('focus',focusEvent);
        _a(_a('re-tel').getEle()).removeEventListener('focus',focusEvent);
        _a(_a('re-code').getEle()).removeEventListener('focus',focusEvent);

        if (THAt.IE && THAt.IE <= 8) {
            _a().removeEventListener('keyup', inputEvent);
        } else {
            _a().removeEventListener('input', inputEvent);
        }
    };
    //切换按钮
    function switchLR(that){
        if(_a(that.lrBox).hasClass('lr-login')){
            that.type = 1;
            _a(that.lrBox).removeClass('lr-login').addClass('lr-register');
        }else{
            that.type = 0;
            _a(that.lrBox).removeClass('lr-register').addClass('lr-login');
        }
    };
    //注册
    function userRegisterLR(){
        var lrPrompt = _a('lr-register-prompt').getEle();
        lrPrompt.innerHTML = '正在注册中···';
    };
    //登录
    function userLoginLR(){
        var username = _a('username').getEle().value.replace(/(^\s*)|(\s*$)/g, ''),
            password = _a('password').getEle().value.replace(/(^\s*)|(\s*$)/g, ''),
            lrPrompt = _a('lr-login-prompt').getEle();
        if(THAt.remType){
            keepUserLR(username,password);
        }else{
            clearUserLR(username,password);
        }
        lrPrompt.innerHTML = '正在登录中···';
    };
    //清空我的登录信息
    function clearUserLR(username,password){
        var date = new Date();
        date.setDate(date.getDate() - 7);
        doc.cookie = 'username='+ username +'^password='+ password +'^;expires=' + date.toGMTString();
    };
    //取回我的登录信息
    function getUserLR(){
        var cookieStr = new String(doc.cookie);
        if(!cookieStr.length) return;
        var icoEle = _a('lr-rem-box').getEle();
        THAt.remType = true;
        _a(icoEle).addClass('lr-cur');
        cookieStr = cookieStr.split('^');
        _a('username').getEle().value = cookieStr[0].split('=')[1];
        _a('password').getEle().value = cookieStr[1].split('=')[1];
    }
    //记住我的登录信息
    function keepUserLR(username,password){
        var date = new Date();
        date.setDate(date.getDate() + 7);
        doc.cookie = 'username='+ username +'^password='+ password +'^;expires=' + date.toGMTString();
    };
    //记住我的登录按钮
    function rememberLR(that){
        //操作DOM
        var icoEle = _a('lr-rem-box').getEle();
        if(_a(icoEle).hasClass('lr-cur')){
            that.remType = false;
            _a(icoEle).removeClass('lr-cur');
        }else{
            that.remType = true;
            _a(icoEle).addClass('lr-cur');
        }
    };
    //关闭窗口
    function closeLR(that){
        if(that.temp) clearInterval(that.temp);
        _a(that.lrMask).removeClass('lr-fadeIn').addClass('lr-fadeOut');
        _a(that.lrBox).removeClass('lr-fadeInDown').addClass('lr-fadeOutUp');
        removeEvent();
        if(that.IE && that.IE <= 9){
            that.lrMask.style.display = 'none';
            that.lrBox.style.display = 'none';
            doc.body.removeChild(that.lrMask);
            doc.body.removeChild(that.lrBox);
        }else{
            setTimeout(function () {
                that.lrMask.style.display = 'none';
                that.lrBox.style.display = 'none';
                doc.body.removeChild(that.lrMask);
                doc.body.removeChild(that.lrBox);
            },1000);
        }
        if(that.callback) that.callback();
    };
    //创建元素
    function createEle(that,num){
        var df = doc.createDocumentFragment();
        that.lrMask = doc.createElement('div');
        that.lrMask.className = 'lr-mask lr-fadeIn';
        that.lrMask.id = 'lr-mask';
        that.lrBox = doc.createElement('div');
        that.lrBox.id = 'login-or-register';
        if(num){
            that.lrBox.className = 'login-or-register lr-fadeInDown lr-register';
        }else{
            that.lrBox.className = 'login-or-register lr-fadeInDown lr-login';
        }
        that.lrBox.innerHTML = DEFAULT.str;
        df.appendChild(that.lrBox);
        df.appendChild(that.lrMask);
        doc.body.appendChild(df);
    };
    win.LR = function (options) {
        THAt = new LR(options).init();
        return THAt;
    };
}(this,document,_a));