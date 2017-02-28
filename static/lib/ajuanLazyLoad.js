/**
 * Created by 2144 on 2016/11/4.
 */
//懒加载工具类
;(function (win,doc,_a,undefined) {
    var options,
        DEFAULT = {
            lazyBox:doc.body,
            attrName:'s'
        };
    function ajuanLazyLoad(opt){
        options = opt || {};
        this.lazyBox = options.lazyBox || DEFAULT.lazyBox;
        this.attrName = options.attrName || DEFAULT.attrName;
        this.imgObjArr = [];
    }
    ajuanLazyLoad.prototype = {
        init: function () {
            achieveEleData(this);
            addEvent(this);
            scrollEvent(this);
            return this;
        }
    };
    //获取元素数据
    function achieveEleData(that){
        that.imgEleArr = _a(that.lazyBox.getElementsByTagName('img')).reduceDimension();
        _a(that.imgEleArr).forEach(function (item) {
            if(item.getAttribute(that.attrName)){
                var imgObj = {};
                imgObj.imgEle = item;
                imgObj.src = item.getAttribute(that.attrName);
                imgObj.top = item.getBoundingClientRect().top;
                imgObj.type = false;
                that.imgObjArr.push(imgObj);
            }
        });
    }
    //绑定事件
    function addEvent(that){
        _a(win).addEventListener('scroll', function () {
            scrollEvent(that);
        })
    }
    //
    function scrollEvent(that){
        var top = doc.documentElement.scrollTop || doc.body.scrollTop,
            clientH = document.documentElement.clientHeight || doc.body.clientHeight;
        if(!that.imgObjArr.length) return;
        _a(that.imgObjArr).forEach(function (item) {
            if((top + clientH) >= item.top){
                if(item.type) return;
                item.type = true;
                replaceSrc(item,that.attrName,item.src);
            };
        });
    }
    //替换src
    function replaceSrc(item,attrName,src){
        item.imgEle.src = src;
        item.imgEle.removeAttribute(attrName);
    }
    win.ajuanLazyLoad = function (options) {
        return new ajuanLazyLoad(options).init();
    }
}(this,document,_a));