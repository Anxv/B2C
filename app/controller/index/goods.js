const {
    Controller
} = require('egg');

class goodsController extends Controller {
    async list() {
        const {
            ctx
        } = this;
        var cate_id = ctx.request.query._id;
        var cateResult = await ctx.service.goodscategory.findById(cate_id);
        var cate = cateResult.data;
        //console.log('cate===' + cate);

        var goodsResult;
        if (cate && cate.cate_pid == '0') {
            //console.log('333333');

            var subCateResult = await ctx.service.goodscategory.findByPId(cate_id);

            var subCates = subCateResult.data;
            //console.log('subCates===' + subCates);

            if (subCates) {
                var cateIdArray = [];
                for (const cate of subCates) {
                    cateIdArray.push({
                        category_id: cate._id
                    });
                }
            } else {
                goodsResult = await ctx.service.goods.findByCateId(cate_id);
            }
            goodsResult = await ctx.service.goods.findByCateIds(cateIdArray);
        } else {
            goodsResult = await ctx.service.goods.findByCateId(cate_id);
        }
            //console.log('goodsResult=='+ JSON.stringify(goodsResult.data));
            
        if (goodsResult.flag) {
            let goodss = goodsResult.data;
            await this.ctx.render('index/goods/list', {
                goodss
            });
        } else {
            this.ctx.body = result.msg;
        }

    }
    //详情
    async detail(){
        const ctx = this.ctx;
        var goods_id = ctx.request.query._id;
        var goodsResult = await ctx.service.goods.findById(goods_id);
        if (goodsResult.flag) {
            var goods = goodsResult.data;
            var relate_goods_ids = goods.relate_goods;
            //关联商品
            var relate_goods_obj = [];
            for (const goods_id of relate_goods_ids) {
                relate_goods_obj.push({_id:goods_id});
            }
            var relate_goods_result = await ctx.service.goods.findByIds(relate_goods_obj);
            var relate_goodss = relate_goods_result.data;

            //商品属性
            var goodsAttrResult = await ctx.service.goodsattr.findByGoodsId(goods_id);
            var goodsAttrs = goodsAttrResult.data;

            var commentResult = await ctx.service.comment.findByGoodsId(goods_id);
            var comments = commentResult.data;
            await ctx.render('index/goods/detail',{goods,relate_goodss,goodsAttrs,comments});
        }
    }
}
module.exports = goodsController;