const {
    Service
} = require('egg');

class goodsTypeService extends Service {
    //增加商品类型操作
    async insert(goodstype) {
        var goodsTypeModel = new this.ctx.model.GoodsType(goodstype);
        try {
            await goodsTypeModel.save();
            return {
                flag: true,
                msg: '增加商品类型成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，增加商品类型失败'
            };
        }

    }
//查询所有商品类型
    async findAll(){
        try {
            var goodstypes = await this.ctx.model.GoodsType.find({});                  
            return {flag:true,data:goodstypes,msg:'查询所有商品类型成功'}
        } catch (error) {
            return {flag:false,msg:'数据异常，查询所有商品类型失败'}
        }
    }
    //依据id查询商品类型
    async findById(_id) {

        try {
            var goodstypes = await this.ctx.model.GoodsType.findById(_id);
            if (goodstypes) {
                return {
                    flag: true,
                    data: goodstypes,
                    msg:'依据id查询商品类型成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询商品类型失败'
            }
        }
    }
    //修改商品类型操作
    async update(_id, goodstype) {

        try {
            await this.ctx.model.GoodsType.updateOne({
                _id: _id
            }, goodstype);
            return {
                flag: true,
                msg: '修改商品类型成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改商品类型失败'
            };
        }

    }
   //依据id删除会员等级
    async deleteById(_id) {

        try {
            await this.ctx.model.GoodsType.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除商品类型成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除商品类型失败'
            };
        }
    }
}

module.exports = goodsTypeService;