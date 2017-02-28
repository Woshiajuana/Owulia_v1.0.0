/**
 * Created by 2144 on 2016/10/8.
 */
;(function (win,doc,_a,undefined) {

    var clickEvent = function (event) {
            var target = _a(event).target();
            if(target.className == 'year-data' || target.parentNode.className == 'year-data'){
                var Ele = _a(target.parentNode);
                if(Ele.hasClass('close-year')){
                    Ele.removeClass('close-year')
                }else{
                    Ele.addClass('close-year')
                }
                return;
            }
        },

        initFun = function () {
            _a().addEventListener('click',clickEvent);
        };

    initFun();

}(this,document,_a));