const {
    Service
} = require('egg');

class commentService extends Service {
    //查找所有评论数据
    async findAll(page, pageSize) {
        try {
            var totalNum = await this.ctx.model.Comment.count({
                data_status: 1
            });
            var totalPage = Math.ceil(totalNum / pageSize);
            if (page > totalPage) {
                page = totalPage;
            }
            var comments = await this.ctx.model.Comment.find({
                data_status: 1
            }).skip((page - 1) * pageSize).limit(pageSize);
            return {
                flag: true,
                data: {
                    comments: comments,
                    totalPage: totalPage,
                    page: page
                },
                msg: '查询所有评论成功'
            }

        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，查询所有评论失败'
            }

        }
    }
    //查询商品 依据页数和条数
    async findAllWithPage(page, pageSize) {
        try {
            var totalNum = await this.ctx.model.Comment.count({});
            var totalPage = Math.ceil(totalNum / pageSize);
            if (page > totalPage) {
                page = totalPage;
            }
            var comments = await this.ctx.model.Comment.find({}).skip((page - 1) * pageSize).limit(pageSize);
            return {
                flag: true,
                data: {
                    comments: comments,
                    totalPage: totalPage,
                    page: page
                },
                msg: '查询所有评论成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有评论失败'
            }

        }
    }
    //依据id查找数据
    async findById(_id) {
        try {
            var comments = await this.ctx.model.Comment.findById(_id);
            return {
                flag: true,
                data: comments,
                msg: '查询详情数据成功'
            }
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，查询详情数据失败'
            }
        }
    }
    //依据商品ID查询详情
    async findByGoodsId(goods_id) {
        try {
            var comments = await this.ctx.model.Comment.find({
                comment_type: 0,
                comment_object: goods_id
            });
            return {
                flag: true,
                data: comments,
                msg: '依据商品ID查询详情数据成功'
            }
        } catch (error) {
            console.log(error);
            return {
                flag: false,
                msg: '数据异常，依据商品ID查询详情数据失败'
            }
        }
    }
    //审核更新
    async updateDetail(_id, comment_status) {
        try {
            await this.ctx.model.Comment.update({
                _id: _id
            }, {
                comment_status: comment_status
            });
            return {
                flag: true,
                msg: '审核成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '审核失败'
            }
        }
    }
    //依据id删除评论
    async deleteById(_id) {
        try {
            await this.ctx.model.Comment.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除评论成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: ',数据异常，删除评论失败'
            }
        }
    }
}



module.exports = commentService;