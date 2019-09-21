const {
    Controller
} = require('egg');

class HomeController extends Controller {
    async index() {
        const {
            ctx
        } = this;
        const NAV_MIDDLE = 'nav-middle';
        const TIME = 10;

        const NAV_BOTTOM = 'nav-bottom';
        const ADS_TOP = 'ads-top';
        const ADS_MIDDLE = 'ads-middle';
        const GOODS_HOT = 'goods-hot';
        const GOODS_NEW = 'goods-new';
        const GOODS_BEST = 'goods-best';
        // 导航
        // 1 redis 通过 key 获取缓存数据
        // 2 有 直接返回； 没有 访问数据库，请求返回数据 并且返回数据设置到redis缓存
        // 3 注意：设置缓存时间

        //导航
        var navMiddleResult = await ctx.service.cache.get(NAV_MIDDLE);
        if (!navMiddleResult) {
            navMiddleResult = await ctx.service.navigation.findNavPosition(2);
            await ctx.service.cache.set(NAV_MIDDLE,navMiddleResult,TIME);
        }
        var navBottomResult = await ctx.service.cache.get(NAV_BOTTOM);
        if (!navBottomResult) {
            navBottomResult = await ctx.service.navigation.findNavPosition(3);
            await ctx.service.cache.set(NAV_BOTTOM,navBottomResult,TIME);
        }
        //轮播
        var adsTopResult = await ctx.service.cache.get(ADS_TOP);
        if (!adsTopResult) {
            adsTopResult = await ctx.service.advertise.findAdsPosition(1, 3)
            await ctx.service.cache.set(ADS_TOP,adsTopResult,TIME);
        }
        var adsMiddleResult = await ctx.service.cache.get(ADS_MIDDLE);
        if (!adsMiddleResult) {
            adsMiddleResult =await ctx.service.advertise.findAdsPosition(2, 3);
            await ctx.service.cache.set(ADS_MIDDLE,adsMiddleResult,TIME);
        }
        var goodsHotResult = await ctx.service.cache.get(GOODS_HOT);
        if (!goodsHotResult) {
            goodsHotResult =await ctx.service.goods.findGoodsCondition('is_hot', 4);
            await ctx.service.cache.set(GOODS_HOT,goodsHotResult,TIME);
        }
        var goodsNewResult = await ctx.service.cache.get(GOODS_NEW);
        if (!goodsNewResult) {
            goodsNewResult =await ctx.service.goods.findGoodsCondition('is_new', 4);
            await ctx.service.cache.set(GOODS_NEW,goodsNewResult,TIME);
        }
        var goodsBestResult = await ctx.service.cache.get(GOODS_BEST);
        if (!goodsBestResult) {
            goodsBestResult = await ctx.service.goods.findGoodsCondition('is_best', 4);
            await ctx.service.cache.set(GOODS_BEST,goodsBestResult,TIME);
        }
            var navigationMiddles = navMiddleResult.data;
            var navigationBottoms = navBottomResult.data;
            var advertiseTops = adsTopResult.data;
            var advertiseSub = adsMiddleResult.data;
            var goodsHot = goodsHotResult.data;
            var goodsNew = goodsNewResult.data;
            var goodsBest = goodsBestResult.data;
            // await ctx.render('index/common/navgation',{navigationMiddles});
            // await ctx.render('index/common/footer',{navigationBottoms});
            // await ctx.render('index/home/swiper',{advertiseTops});
            // await ctx.render('index/home/subbanner',{advertiseSub});
            await ctx.render('index/home/home', {
                navigationMiddles,
                navigationBottoms,
                advertiseTops,
                advertiseSub,
                goodsHot,
                goodsNew,
                goodsBest
            });
            
    }
}
module.exports = HomeController;