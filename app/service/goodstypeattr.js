const {
    Service
} = require('egg');

class goodsTypeAttrService extends Service {
    //增加商品类型属性操作
    async insert(goodstypeattr) {
        var goodsTypeAttrModel = new this.ctx.model.GoodsTypeAttr(goodstypeattr);
        try {
            await goodsTypeAttrModel.save();
            return {
                flag: true,
                msg: '增加商品类型属性成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，增加商品类型属性失败'
            };
        }
    }
    //根据id查询所有类型属性
    async findAllByTypeId(type_id) {
        try {
            var allAttrs = await this.ctx.model.GoodsTypeAttr.find({
                type_id: type_id
            }).sort({data_sort:1});
            return {
                flag: true,
                data: allAttrs,
                msg: '根据id查询所有类型属性成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，根据id查询所有类型属性失败'
            }
        }
    }
    async findAttrWithType(attr_id) {     
        var attr_id = this.app.mongoose.Types.ObjectId(attr_id);
        try {
            var typeAttr = await this.ctx.model.GoodsTypeAttr.aggregate([{
                    $match: {
                        '_id': attr_id
                    }
                },
                {
                    $lookup: {
                        from: 'goods_types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'goodstype'
                    }
                }
            ])
            return {flag:true,data:typeAttr[0],msg:'属性关联类型查询成功'}
        } catch (error) {
            return {flag:false,msg:'数据异常，属性关联类型查询失败'}
        }
    }

    //修改商品类型属性操作
        async update(_id, goodstypeattr) {
            try {
                await this.ctx.model.GoodsTypeAttr.updateOne({
                    _id: _id
                }, goodstypeattr);
                return {
                    flag: true,
                    msg: '修改商品类型属性成功'
                };
            } catch (error) {
                return {
                    flag: false,
                    msg: '数据异常，修改商品类型属性失败'
                };
            }

        }
       //依据id删除商品类型属性
        async deleteById(_id) {

            try {
                await this.ctx.model.GoodsTypeAttr.deleteOne({
                    _id: _id
                });
                return {
                    flag: true,
                    msg: '删除商品类型属性成功'
                };

            } catch (error) {
                return {
                    flag: false,
                    msg: '数据异常，删除商品类型属性失败'
                };
            }
        }
}

module.exports = goodsTypeAttrService;