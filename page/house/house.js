/**
 * Created by 2144 on 2016/10/9.
 */
__inline('../../static/lib/jquery-1.11.1.min.js');//工具js类
__inline('../../static/lib/jquery.sliphover.min.js');//工具js类
__inline('../../static/lib/ajuanCommon.js');//工具js类
__inline('../../widget/nav/_nav.js');//导航条工具js类
__inline('../../widget/header/_header.js');//头部js类
__inline('../../widget/toolbar/_toolbar.js');//返回顶部js类
__inline('../../widget/wuliren-header/_wulirenHeader.js');//轮播工具js类
__inline('../../widget/flow/_flow.js');//瀑布流工具js类

;(function($){
    $('#container-flow').sliphover({
        fontColor:'#d14',
        duration:200
    });
}(jQuery));