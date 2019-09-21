module.exports = (option, app) => {
    return async (ctx, next) => {
        // console.log('初始化数据');
        //导航
        const NAV_MIDDLE = 'nav-middle';
        const TIME = 10;
        const NAV_BOTTOM = 'nav-bottom';
        var navMiddleResult = await ctx.service.cache.get(NAV_MIDDLE);
        if (!navMiddleResult) {
            navMiddleResult = await ctx.service.navigation.findNavPosition(2);
            await ctx.service.cache.set(NAV_MIDDLE, navMiddleResult, TIME);
        }

        var navBottomResult = await ctx.service.cache.get(NAV_BOTTOM);
        if (!navBottomResult) {
            navBottomResult = await ctx.service.navigation.findNavPosition(3);
            await ctx.service.cache.set(NAV_BOTTOM, navBottomResult, TIME);
        }
        var navigationMiddles = navMiddleResult.data;
        var navigationBottoms = navBottomResult.data;
        ctx.locals.navigationMiddles = navigationMiddles;
        ctx.locals.navigationBottoms = navigationBottoms;
        await next();
        // console.log('已经完成');

    }

}