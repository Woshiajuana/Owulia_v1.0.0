/**
 * Created by 2144 on 2016/10/8.
 * 修改用户信息部分js
 */
;(function (win,doc,_a,undefined) {
    var OPTELE_HEIGHT = 228,
        clickEvent = function (event) {
            var target = _a(event).target();
            if(target.className == 'select-input'){
                var optEle = target.parentNode.getElementsByTagName('ul')[0];
                optEle.style.height = OPTELE_HEIGHT + 'px';
                optEle.style.marginTop = '-' + (OPTELE_HEIGHT/2) + 'px';
                return;
            }
            if(target.parentNode.className == 'options-box'){
                var optEle = target.parentNode,
                    txt = target.innerHTML;
                optEle.parentNode.getElementsByTagName('span')[0].innerHTML = txt;
                optEle.style.height = 0 ;
                optEle.style.marginTop = 0;
                return;
            }
        },
        initFun = function () {
            _a().addEventListener('click',clickEvent);
        };
    initFun();
}(this,document,_a));