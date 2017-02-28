/**
 * Created by 2144 on 2016/10/25.
 */
//瀑布流布局
;(function (win,doc,_a,undefined) {
    var options,
        DEFAULT = {
            eleTagName:'li',
            eleWidth:228,
            spacingTop:15,
            spacingRight:15,
            minWidth:1200,
            isLazyLoad:true,
            isResize:true,
            index:0
        };
    function ajuanFlow(opt){
        options = opt || {};
        this.boxEle = options.boxEle;
        this.eleTagName = options.eleTagName || DEFAULT.eleTagName;
        this.eleWidth = options.eleWidth || DEFAULT.eleWidth;
        this.spacingTop = options.spacingTop || DEFAULT.spacingTop;
        this.spacingRight = options.spacingRight || DEFAULT.spacingRight;
        this.minWidth = options.minWidth || DEFAULT.minWidth;
        this.isLazyLoad = options.isLazyLoad || DEFAULT.isLazyLoad;
        this.isResize = options.isResize || DEFAULT.isResize;
        this.heightArr = [];
        this.index = options.index || DEFAULT.index;
    }
    ajuanFlow.prototype = {
        init: function () {
            if(!this.boxEle) return this;
            achieveData(this);
            setElePosition(this,this.eleArr);
            if(this.isResize) this.resize();
            return this;
        },
        resize: function () {
            var that = this;
            window.addEventListener('resize', function() {
                if(doc.documentElement.clientWidth > that.minWidth){
                    that.index = 0;
                    achieveData(that);
                    setElePosition(that,that.eleArr);
                }
            }, false);
        },
        addEleArr: function (eleArr,callback) {
            setElePosition(this,eleArr,callback);
        }
    };

    //获取元素数据
    function achieveData(that){
        that.eleArr = _a(that.boxEle.getElementsByTagName(that.eleTagName)).reduceDimension();
        that.maxWidth = Math.max(doc.documentElement.clientWidth,that.minWidth);
        that.width = that.eleWidth + that.spacingRight;
        that.maxNum = Math.floor((that.maxWidth + that.spacingRight) / that.width);
        var w = that.width * that.maxNum - that.spacingRight;
        that.boxEle.style.width = Math.max(w,that.minWidth) + 'px';
        that.heightArr = [];
    }
    //设置元素的位置
    function setElePosition(that,eleArr,callback){
        _a(eleArr).forEach(function (item,index) {
            if(that.index < that.maxNum){
                item.style.top = 0;
                item.style.left = index * that.width + 'px';
                that.heightArr.push(item.offsetHeight + that.spacingTop);
            }else{
                that.minHeight = Math.min.apply(null,that.heightArr);
                that.minIndex = getIndexByItem(that.heightArr,that.minHeight);
                item.style.top = that.minHeight + 'px';
                item.style.left = that.minIndex * that.width + 'px';
                that.heightArr[that.minIndex] = that.minHeight + item.offsetHeight + that.spacingTop;
                that.boxEle.style.height = Math.max.apply(null,that.heightArr) + 'px';
            }
            that.index++;
        });
        if(callback) callback();
    }
    //查找元素的位置
    function getIndexByItem(arr,i){
        var num;
        _a(arr).forEach(function (item,index) {
            if(item == i) {
                num = index;
            }
        });
        return num;
    }
    win.ajuanFlow = function (options) {
        return new ajuanFlow(options).init();
    }
}(this,document,_a));
;(function (win,doc,_a,undefined) {

    //请求数据
    var data = [
        {url:'/static/images/widget/flow/1.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/2.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/3.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/4.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/5.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/6.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/7.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/8.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/9.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/10.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/11.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/12.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'},
        {url:'/static/images/widget/flow/13.jpg',about:'简介：我晕倒呀你没下降西欧啊进行偶怕啥惊喜',name:'AJUAN'}
    ];

    var MainController = (function () {
        var conEle = _a('container-flow').getEle(),
            i = 0,
            temp = null,
            Flow = ajuanFlow({
                boxEle:_a('container-flow').getEle()
            }),
            loadingEle = _a('loading-icon').getEle(),
            type = false,
            init = function () {
                if(type) return;
                type = true;
                addEle(data);
                _a(win).addEventListener('scroll',scrollEvent);
            },
            monitorFun = function (eleArr) {
                temp = setInterval(function () {
                    if(i == eleArr.length){
                        Flow.addEleArr(eleArr, function () {
                            type = false;
                        });
                        clearInterval(temp);
                    }
                },20);
            },
            scrollEvent = function () {
                var top = doc.documentElement.scrollTop || doc.body.scrollTop,
                    clientH = document.documentElement.clientHeight || doc.body.clientHeight,
                    scrollH = document.documentElement.scrollHeight || doc.body.scrollHeight;
                if((clientH + top) >= scrollH -250){
                    if(type) return;
                    type = true;
                    addEle(data);
                    loadingEle.style.display = 'block';
                }else{
                    loadingEle.style.display = 'none';
                }
            },
            addEle = function (data) {
                var eleArr = [],
                    fragEle = doc.createDocumentFragment();
                i = 0;
                //缓存图片
                _a(data).forEach(function (item) {
                    var img = new Image(); //创建一个Image对象，实现图片的预下载
                    img.src = item.url;
                    if (img.complete) {
                        i++;
                    }else{
                        img.onload = function () { //图片下载完毕时异步调用callback函数。
                            i++;
                        };
                        img.onerror = function () {
                            i++;
                        };
                    }
                    createEle(item,fragEle,eleArr);
                });
                conEle.appendChild(fragEle);
                monitorFun(eleArr);
            },
            createEle = function (item,fragEle,eleArr) {
                var ele = doc.createElement('li');
                ele.className = 'flow-item';
                ele.innerHTML = '<a class="flow-img" href="#">' +
                '<img src="' +item.url+ '" alt=""/></a>' +
                '<p class="flow-text">'+ item.about +'</p>' +
                '<h3>'+ item.name +'</h3>';
                fragEle.appendChild(ele);
                eleArr.push(ele);
            };
        init();
        return{
            addEle:addEle
        }
    }());

}(window,document,_a));