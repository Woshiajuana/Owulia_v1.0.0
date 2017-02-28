/**
 * Created by 2144 on 2016/9/22.
 */
__inline('../../widget/loginOrRegister/_loginOrRegister.js');//登录的js类
__inline('search-by-key-word.js');
;(function () {

    var loginOrRegisterFun = (function () {

        var loginBtnEle = _a('login-btn').getEle(),

            wrapperEle = _a('wrapper').getEle(),

            type = true,//标记，只为请求一次登录与注册弹窗的css样式表

            dynamicLoading = {

                css: function(path){

                    if(!path || path.length === 0){

                        throw new Error('argument "path" is required !');

                    }

                    var head = document.getElementsByTagName('head')[0];

                    var link = document.createElement('link');

                    link.href = path;

                    link.rel = 'stylesheet';

                    link.type = 'text/css';

                    head.appendChild(link);

                },

                js: function(path){

                    if(!path || path.length === 0){

                        throw new Error('argument "path" is required !');

                    }

                    var head = document.getElementsByTagName('head')[0];

                    var script = document.createElement('script');

                    script.src = path;

                    script.type = 'text/javascript';

                    head.appendChild(script);

                }
            },

            addCssAndJs = function () {

                if(!type) return;

                var css = __uri('/static/sass/login-or-register.css');

                console.log(css)
                dynamicLoading.css( css);

                //dynamicLoading.js('./src/login-or-register.js');

                type = false;

            },

            loginFun = function () {
                loginBtnEle.style.top = 0;
                LR({
                    callback: function () {
                        loginBtnEle.style.cssText = '';
                    }
                }).L();
            },

            registerFun = function () {
                LR().R();
            },

            clickEvent = function (event) {

                var target = _a(event).target();

                if(target.id == 'login-btn' || target.className == 'login-btn'){

                    loginFun();

                    return;

                }
                if(target.className == 'register-btn'){

                    registerFun();

                    return;

                };

            };

        _a().addEventListener('click', clickEvent);

    }());

}());