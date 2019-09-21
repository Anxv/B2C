module.exports = app =>{
    const {
        router,
        controller
    } = app;
    //注册
    router.get('/regist',controller.index.login.registOne);
    router.get('/verify',controller.index.login.verify);
    router.get('/login/phoneCode',controller.index.login.phoneCode);

    // var timeMiddleware = app.middleware.report();
    var initMiddleware = app.middleware.indexinit({},app);
    router.get('/',controller.index.home.index);
    router.get('/user',controller.index.user.index);
    router.get('/article',initMiddleware,controller.index.article.index);
    //商品列表
    router.get('/goods_list',initMiddleware,controller.index.goods.list);
    //商品列表
    router.get('/goodsdetail',initMiddleware,controller.index.goods.detail);
    


}