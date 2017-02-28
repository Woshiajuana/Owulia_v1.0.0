/**
 * Created by 2144 on 2016/10/24.
 */
;(function (window,doc,undefined) {
    //导航条控制器
    var navController = (function () {
        var scrollTop,
            navTopEle = doc.getElementById('nav-top'),
            navCenterEle = doc.getElementById('nav-center'),
            navCenterTop = navCenterEle.offsetTop,
            scrollDir = navCenterEle.offsetTop - navTopEle.offsetTop,
            headerBgEle = doc.getElementById('header-carousel'),
            //滚动事件
            scrollEvent = function () {
                scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
                if(scrollTop < scrollDir){
                    navTopEle.style.display = 'block';
                    _a(navCenterEle).removeClass('nav-center-fixed').removeClass('nav-center-static');
                }
                if(scrollTop >= scrollDir && scrollTop < navCenterTop){
                    navTopEle.style.display = 'none';
                    _a(navCenterEle).addClass('nav-center-static').removeClass('nav-center-fixed');
                }
                if(scrollTop >= navCenterTop){
                    navTopEle.style.display = 'none';
                    _a(navCenterEle).addClass('nav-center-fixed').removeClass('nav-center-static');
                }
                if(headerBgEle) {
                    var liEle = _a(headerBgEle.getElementsByTagName('li')).reduceDimension();
                    _a(liEle).forEach(function (item) {
                        item.style.backgroundPosition = 'center ' + (Math.floor(scrollTop / 2)) + 'px'
                    });
                    //headerBgEle.style.top = Math.floor(scrollTop / 1.2) + 'px';
                }
            },
            //点击事件
            clickEvent = function (event) {
                var target = _a(event).target();
                if(target.className == 'logo-text'){
                    ajuanAnchor().anchorPosition('header',500);
                    return;
                }
            },
            //初始化函数
            init = function () {
                _a(window).addEventListener('scroll',scrollEvent);
                _a().addEventListener('click',clickEvent);
            };
        init();
    }())
}(this,document));