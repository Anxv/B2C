const {
    Service
} = require('egg');
const fs = require('fs');

class goodsAttrService extends Service {
    //保存属性值到数据库
    async insert(goodsAttr) {
        try {
            var goodsAttrModel = new this.ctx.model.GoodsAttr(goodsAttr);
            await goodsAttrModel.save();
            return {
                flag: true,
                msg: '增加商品属性值成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，增加商品属性值失败'
            };
        }
    }
    // 根据type_id查询所有商品属性值
    // async findByTypeId(type_id) {
    //     try {
    //         var goodsAttrs = await this.ctx.model.GoodsAttr.find({
    //             type_id: type_id
    //         });
    //         return {
    //             flag: true,
    //             data: goodsAttrs,
    //             msg: '根据Type_id查询所有商品属性值成功'
    //         }
    //     } catch (error) {
    //         return {
    //             flag: false,
    //             msg: '数据异常，根据Type_id查询所有商品属性值失败'
    //         }
    //     }
    // }

    //根据goods_id查询所有商品属性值
    async findByGoodsId(goods_id) {
        try {
            var goods_obj_id = this.app.mongoose.Types.ObjectId(goods_id);
            var goodsAttrs = await this.ctx.model.GoodsAttr.find({
                goods_id: goods_obj_id
            });
            return {
                flag: true,
                data: goodsAttrs,
                msg: '查询所有商品属性值成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有商品属性值失败'
            }
        }
    }

    //依据goods_id删除所有关联属性
    async deleteByGoodsId(goods_id) {
        try {
            await this.ctx.model.GoodsAttr.deleteMany({
                goods_id: goods_id
            });
            return {flag:true,msg:'删除成功'}
        } catch (error) {
            console.log(error);
            return {flag:false,msg:'删除失败'}
        }
    }
}
module.exports = goodsAttrService;