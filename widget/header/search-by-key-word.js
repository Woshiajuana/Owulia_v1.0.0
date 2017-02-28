/**
 * Created by 2144 on 2016/8/23.
 * zhigang.chen@owulia.com
 * 关键字搜索模块
 */
;(function () {

    var searchByKeyWordFun = (function () {

        var searchInputEle = _a('search-input').getEle(),

            IE = _a().IETester(),

            clickEvent = function (event) {

                var target = _a(event).target();

                if(target.className == 'clear-btn'){

                    searchInputEle.value = '';

                    target.style.display = 'none';

                    return;
                }

                if(target.id == 'search-btn'){


                    return;
                }


            },
            inputEvent = function (event) {

                var target = _a(event).target();

                if(target.id == 'search-input'){

                    _a(target.parentNode).getByClass('clear-btn')[0].style.display = target.value ? 'block' : 'none';

                    return;

                }
            },
            mouseOverEvent = function (event) {

                var target = _a(event).target();

                if(target.id == 'search-btn'){

                    searchInputEle.focus();

                    return;
                }

            },

            init = function () {

                _a().addEventListener('click',clickEvent);


                _a().addEventListener('mouseover',mouseOverEvent);

                if(IE && IE <= 9){

                    _a().addEventListener('keyup',inputEvent);

                }else{

                    _a().addEventListener('input',inputEvent);

                }

            };

        init();

    }());

}());