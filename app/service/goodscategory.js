const {
    Service
} = require('egg');

class goodsCategoryService extends Service {
    //增加分类操作
    async insert(goodscategory) {
        try {
            var goodsCategoryModel = new this.ctx.model.GoodsCategory(goodscategory);
            await goodsCategoryModel.save();
            return {
                flag: true,
                msg: '增加商品分类成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，增加商品分类失败'
            };
        }

    }
    //查询所有商品分类
    async findAll() {
        try {
            var goodscategorys = await this.ctx.model.GoodsCategory.aggregate(
                [{
                    $match: {
                        data_status: 1,
                        cate_pid: '0'
                    }
                }, {
                    $lookup: {
                        from: 'goods_categorys',
                        localField: '_id',
                        foreignField: 'cate_pid',
                        as: 'subCategorys'
                    }
                }, {
                    $project: {
                        _id: 1,
                        cate_name: 1,
                        cate_icon: 1,
                        cate_keys: 1,
                        cate_desc: 1,
                        cate_url: 1,
                        cate_template: 1,
                        cate_pid: 1,
                        cate_status: 1,
                        data_sort: 1,
                        data_status: 1,
                        subCategorys:{
                            $filter:{
                                input:'$subCategorys',  
                                as:'item',
                                cond:{$eq:["$$item.data_status",1]}
                            }
                        }
                    }
                }]
            );
            return {
                flag: true,
                data: goodscategorys,
                msg: '查询所有商品分类成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有商品分类失败'
            }

        }
    }
    //查询所有顶级分类
    async findAllTopCates() {
        try {
            var topCates = await this.ctx.model.GoodsCategory.find({
                cate_pid: '0',data_status:1
            });
            return {
                flag: true,
                data: topCates,
                msg: '数据异常，查询所有顶级分类失败'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有顶级分类失败'
            }
        }
    }
    async findByPId(pid) {
        try {
            var pid = this.app.mongoose.Types.ObjectId(pid);
            var catePId = await this.ctx.model.GoodsCategory.find({
                cate_pid:pid
            });
            return {
                flag: true,
                data: catePId,
                msg: '数据异常，查询所有子分类失败'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有子分类失败'
            }
        }
    }
    //依据id查询商品分类
    async findById(_id) {

        try {
            var goodscategorys = await this.ctx.model.GoodsCategory.findById(_id);
            if (goodscategorys) {
                return {
                    flag: true,
                    data: goodscategorys,
                    msg: '依据id查询商品分类成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询商品分类失败'
            }
        }
    }
    //修改商品分类操作
    async update(_id, goodscatetory) {

        try {
            await this.ctx.model.GoodsCategory.update({
                _id: _id
            }, goodscatetory);
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
    //依据id删除商品分类
    async deleteById(_id) {
        try {
            var object = await this.ctx.model.GoodsCategory.findOne({
                _id: _id
            }, {
                _id: 0,
                cate_pid: 1
            });
            var catePid = object.cate_pid;
            if (catePid == '0') {
                var _id = this.app.mongoose.Types.ObjectId(_id);
                await this.ctx.model.GoodsCategory.updateMany({
                    cate_pid: _id
                }, {
                    data_status: 0
                });
                await this.ctx.model.GoodsCategory.updateOne({
                    _id: _id
                }, {
                    data_status: 0
                });
            } else {
                await this.ctx.model.GoodsCategory.update({
                    _id: _id
                }, {
                    data_status: 0
                });
            }
            return {
                flag: true,
                msg: '删除商品分类成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除商品分类失败'
            };
        }
    }
}

module.exports = goodsCategoryService;