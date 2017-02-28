//启用fis-spriter-csssprites插件进行图片小精灵合成,分配属性 `useSprite`的文件才会压缩
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});
//编译scss为css
fis.match('*.scss', {
    rExt: '.css',//编译后scss文件替换成css文件引入
    parser: fis.plugin('node-sass', {}),//启用插件进行编译；需安装fis-parser-node-sass插件
    optimizer: fis.plugin('clean-css'),//启用css压缩；fis-optimizer-clean-css 插件进行压缩，已内置
    useSprite: true
});

//fis.match('*.css', {
//    optimizer: fis.plugin('clean-css'),// fis-optimizer-clean-css 插件进行压缩，已内置
//    useSprite: true// 给匹配到的文件分配属性 `useSprite`，进行图片小精灵合并
//});

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')//压缩js；fis-optimizer-uglify-js 插件进行压缩，已内置
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')//压缩png；fis-optimizer-png-compressor 插件进行压缩，已内置
});

////开启md5戳
//fis.match('*.{js,css,png,gif}',{
//    useHash: true//开启md5戳
//});

////所有的 html
//fis.match('/page/*/*.html', {
//    //发布到/static/js/xxx目录下
//    isHtmlLink : true,
//    release : '/$0'
//    //访问url是/mm/static/js/xxx
//    //url : '/static/$0'
//
//});

// 所有的 js
fis.match('/page/*/*.js', {
    //发布到/static/js/xxx目录下
    release : '/static/js$0'
    //访问url是/mm/static/js/xxx
    //url : '/static/$0'

});
// 所有的 scss
fis.match('/page/*/*.scss', {
    //发布到/static/js/xxx目录下
    isCssLink : true,
    release : '/static/css$0'

    //访问url是/mm/static/js/xxx
    //url : '/static/$0'

});
//fis.media('done').match('/pages/*/*.scss', {
//    optimizer: fis.plugin('clean-css'),
//    release : '/static/css$0'
//});
// 所有的 css
fis.match('/page/*/*.js', {
    //发布到/static/js/xxx目录下
    release : '/static/js$0'
    //访问url是/mm/static/js/xxx
    //url : '/static/$0'
});
// 所有的 png
fis.match('/page/*/*.png', {
    //发布到/static/js/xxx目录下
    release : '/static/icon$0'
    //访问url是/mm/static/js/xxx
    //url : '/static/$0'
});
//所有的组件部分,不发布
fis.match('/widget/*/*{.html,.js,.scss}',{
    release:false
});
//所有的组件部分,不发布
fis.match('/widget/*/*.png',{
    release:'/static/images$0'
});
//所有的组件部分,不发布
fis.match('/widget/*/*.jpg',{
    release:'/static/images$0'
});
//所有的组件库等js,不发布
fis.match('/static/lib/*.js',{
    release:false
});
//所有的组件部分,不发布
fis.match('*.iml',{
    release:false
});


//fis.config.set('settings.spriter.csssprites', {
//    htmlUseSprite: true,  //开启模板内联css处理,默认关闭
//    styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig, //默认<style></style>标签的匹配正则
//    scale: 1,  //雪碧图缩放比例
//    margin: 10,  //图之间的边距
//    layout: 'matrix'  //使用矩阵排列方式，默认为线性`linear`
//});













