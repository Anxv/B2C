module.exports = app =>{
    const {
        router,
        controller
    } = app;

    let lowercase = app.middleware.lowercase();

    router.get('/api/goods',lowercase,controller.api.goods.goodsList);

}