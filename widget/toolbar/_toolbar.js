/**
 * Created by Administrator on 2016/10/2.
 */
__inline('../../static/lib/ajuanAnchor.js');//锚点工具js类
;(function () {

    var aAnchor = ajuanAnchor(),
        clickEvent = function (event) {
            var target = _a(event).target();
            if(target.id == 'returnTop'){
                aAnchor.returnTop(0.2,20);
                return;
            }
            if(target.id == 'returnOne'){
                aAnchor.anchorPosition('section-one',300,50);
                return;
            }
            if(target.id == 'returnTwo'){
                aAnchor.anchorPosition('section-two',300,50);
                return;
            }
            if(target.id == 'returnThree'){
                aAnchor.anchorPosition('section-three',300,50);
                return;
            }
        };

    _a().addEventListener('click',clickEvent);

    _a(window).addEventListener('scroll', function () {
        var top = +(document.documentElement.scrollTop || document.body.scrollTop);
        _a('returnTop').getEle().style.display = top ?  'block' : 'none';
    });

}());