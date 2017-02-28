/**
 * Created by 2144 on 2016/8/2.
 * zhigang.chen@owulia.com
 * 兼容的js库
 */
;(function (window,doc,undefined) {

    var ajuan = function (aj) {

        //没有new就new一个对象
        if (!(this instanceof ajuan)) return new ajuan(aj);

        //默认为doc.body
        this.aj = aj || doc.body;

    };

    ajuan.prototype = {

        //判断浏览器是否是IE，是则返回IE版本号，不是则返回false
        IETester: function (userAgent) {

            var UA = userAgent || navigator.userAgent;

            if (/msie/i.test(UA)) {

                return UA.match(/msie (\d+\.\d+)/i)[1];

            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {

                return UA.match(/rv:(\d+\.\d+)/)[1];

            }

            return false;

        },

        //事件绑定
        addEventListener: function(type,handler){

            if(this.aj.addEventListener){

                this.aj.addEventListener(type, handler, false);

            }else if(this.aj.attachEvent){

                this.aj.attachEvent('on' + type,handler);

            }else{

                this.aj['on' + type] = handler;

            }

            return this;

        },

        //事件移除
        removeEventListener: function(type,handler){

            if(this.aj.removeEventListener){

                this.aj.removeEventListener(type, handler, false);

            }else if(this.aj.attachEvent){

                this.aj.detachEvent('on' + type,handler);

            }else{

                this.aj["on" + type] = null;

            }

            return this;
        },

        //获取事件event
        event: function(){

            return this.aj ? this.aj : window.event;

        },

        //获取事件target
        target: function(){

            var event = this.event();

            return event.target || event.srcElement;

        },

        //阻止浏览器默认事件
        preventDefault: function(){

            var event = this.event();

            if(event.preventDefault){

                event.preventDefault();

            }else{

                event.returnValue = false;

            }

        },

        //阻止冒泡事件
        stopPropagation: function(){

            var event = this.event();

            if(event.stopPropagation){

                event.stopPropagation();

            }else{

                event.cancelBubble = true;

            }

        },

        //判断一个元素是否含有这个类名样式
        hasClass: function (className) {

            return this.aj.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));

        },

        //给一个元素增加一个类名样式
        addClass: function(className){

            if(this.hasClass(className)) return this;

            if(this.aj.classList){

                this.aj.classList.add(className);

            }else{

                this.aj.className += ' ' + className;

            }

            return this;

        },

        //给一个元素删除一个类名样式
        removeClass: function(className){

            if(!this.hasClass(className)) return this;

            if(this.aj.classList){

                this.aj.classList.remove(className);

            }else{

                this.aj.className = this.aj.className.replace(className,'');

            }

            return this;

        },

        //根据类名样式查找元素
        getElementsByClassName: function () {

            return doc.querySelectorAll ? doc.querySelectorAll('.' + this.aj) : (function(ele){

                var ele = ele.getElementsByTagName('*'),

                    Result = [],

                    re = new RegExp('\\b'+this.aj+'\\b','i'),

                    i = 0;

                for(;i < ele.length;i++){

                    if(re.test(ele[i].className)){

                        Result.push(ele[i]);

                        alert(ele[i])

                    }

                }

                return Result;

            }(doc));

        },


        //根据类名样式查找元素,在指定的区域内
        getByClass : function(Classname,ele){

            var ele = ele ? ele : document;

            return ele.querySelectorAll ? ele.querySelectorAll('.'+Classname) : (function(ele){

                var ele = ele.getElementsByTagName('*'),

                    Result = [],

                    re = new RegExp('\\b'+Classname+'\\b','i'),

                    i = 0;

                for(;i < ele.length;i++){

                    if(re.test(ele[i].className)){

                        Result.push(ele[i]);

                    }
                }

                return Result;

            }(ele));

        },

        getElementByClass: function(className){

            return this.aj.querySelectorAll ? this.aj.querySelectorAll('.'+className) : (function(ele){

                var ele = ele.getElementsByTagName('*'),

                    Result = [],

                    re = new RegExp('\\b'+className+'\\b','i'),

                    i = 0;

                for(;i < ele.length;i++){

                    if(re.test(ele[i].className)){

                        Result.push(ele[i]);

                    }
                }

                return Result;

            }(this.aj));

        },

        //根据元素ID获取DOM对象
        getEle: function () {

            return doc.getElementById(this.aj);

        },

        //类数组转化成数组对象
        reduceDimension: function(){

            var reduced = [],

                i = 0,

                len = this.aj.length;

            for (; i < len; i++){

                reduced = reduced.concat(this.aj[i]);

            }

            return reduced;

        },

        //遍历数组的方法
        forEach: (function(){

            return  function(callback){

                if(typeof Array.prototype.forEach == "function"){

                    this.aj.forEach(function(value,index,a){

                        callback.call(this.aj,value,index,a);

                    });

                }else{// 对于古董浏览器，如IE6-IE8

                    for(var k = 0, length = this.aj.length; k < length; k++) {

                        callback.call(this.aj,this.aj[k],k,this.aj);

                    }

                }

            };

        })()

    };

    window._a = ajuan;

}(this,document));