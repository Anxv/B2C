const {
    Service
} = require('egg');

class articleCategoryService extends Service {
    //增加分类操作
    async insert(articlecategory) {
        try {
            var articleCategoryModel = new this.ctx.model.ArticleCategory(articlecategory);
            await articleCategoryModel.save();
            return {
                flag: true,
                msg: '增加文章分类成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，增加文章分类失败'
            };
        }

    }
    //查询所有文章分类
    async findAll() {
        try {
            var articlecategorys = await this.ctx.model.ArticleCategory.aggregate(
                [{
                    $match: {
                        data_status: 1,
                        acate_pid: '0'
                    }
                }, {
                    $lookup: {
                        from: 'article_categorys',
                        localField: '_id',
                        foreignField: 'acate_pid',
                        as: 'subCategorys'
                    }
                }, {
                    $project: {
                        _id: 1,
                        acate_title: 1,
                        acate_icon: 1,
                        acate_subtitle: 1,
                        acate_link: 1,
                        acate_pid: 1,
                        acate_keys: 1,
                        acate_desc: 1,
                        acate_status: 1,
                        data_sort: 1,
                        data_status: 1,
                        subCategorys: {
                            $filter: {
                                input: '$subCategorys',
                                as: 'item',
                                cond: {
                                    $eq: ["$$item.data_status", 1]
                                }
                            },
                        }
                    }
                },{
                    $sort:{
                        data_sort:1
                    }
                }
            ]
            );
            return {
                flag: true,
                data: articlecategorys,
                msg: '查询所有文章分类成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有文章分类失败'
            }

        }
    }
    //查询所有顶级分类
    async findAllTopCates() {
        try {
            var topCates = await this.ctx.model.ArticleCategory.find({
                acate_pid: '0',
                data_status: 1
            });
            return {
                flag: true,
                data: topCates,
                msg: '数据异常，查询所有顶级分类成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有顶级分类失败'
            }
        }
    }
    //依据id查询文章类型
    async findById(_id) {

        try {
            var articlecategorys = await this.ctx.model.ArticleCategory.findById(_id);
            if (articlecategorys) {
                return {
                    flag: true,
                    data: articlecategorys,
                    msg: '依据id查询文章分类成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询文章分类失败'
            }
        }
    }
    //修改文章分类操作
    async update(_id, articlecatetory) {

        try {
            await this.ctx.model.ArticleCategory.update({
                _id: _id
            }, articlecatetory);
            return {
                flag: true,
                msg: '修改文章类型成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改文章类型失败'
            };
        }

    }
    //依据id删除文章分类
    async deleteById(_id) {
        try {
            var object = await this.ctx.model.ArticleCategory.findOne({
                _id: _id
            }, {
                _id: 0,
                acate_pid: 1
            });
            var acatePid = object.acate_pid;
            if (acatePid == '0') {
                var _id = this.app.mongoose.Types.ObjectId(_id);
                await this.ctx.model.ArticleCategory.updateMany({
                    acate_pid: _id
                }, {
                    data_status: 0
                });
                await this.ctx.model.ArticleCategory.updateOne({
                    _id: _id
                }, {
                    data_status: 0
                });
            } else {
                await this.ctx.model.ArticleCategory.update({
                    _id: _id
                }, {
                    data_status: 0
                });
            }
            return {
                flag: true,
                msg: '删除文章分类成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除文章分类失败'
            };
        }
    }
}

module.exports = articleCategoryService;