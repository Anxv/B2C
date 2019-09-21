const {
    Service
} = require('egg');
const fs = require('fs');

class articleService extends Service {
    //上传文件
    async upload(parts) {
        try {
            var links = [];
            var fromStream;
            while ((fromStream = await parts()) != null) {
                if (fromStream.filename) {
                    var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                    var dbPath = filePath.dbPath;
                    var targetPath = filePath.targetPath;
                    await this.ctx.service.tool.uploadFile(fromStream, targetPath);
                    links.push(dbPath)
                } else {
                    continue
                }
            }
            return {
                flag: true,
                data: links,
                msg: '上传图片成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，上传图片失败'
            };
        }

    }
    //增加文章操作
    async insert(fromStream) {
        try {
            var body = fromStream.fields;
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                body.article_img = filePath.dbPath;
                await this.ctx.service.tool.uploadFile(fromStream, filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
            }
            var articleModel = new this.ctx.model.Article(body);
            await articleModel.save();
            return {
                flag: true,
                msg: '增加文章成功'
            };
        } catch (error) {
            console.log(error);
            return {
                flag: false,
                msg: '数据异常，增加文章失败'
            };
        }
    }
    //查询文章 依据页数和条数
    async findAllWithPage(page, pageSize) {
        try {
            var articles = [];
            var totalNum = await this.ctx.model.Article.count({});
            if (totalNum >0) {
            var totalPage = Math.ceil(totalNum / pageSize);
            if (page > totalPage) {
                page = totalPage;
            }
            var articles = await this.ctx.model.Article.aggregate([{
                $lookup: {
                    from: 'article_categorys',
                    localField: 'article_cateid',
                    foreignField: '_id',
                    as: 'category'
                },
            }, {
                $skip: (page - 1) * pageSize
            }, {
                $limit: pageSize
            },
            {
                $unwind: '$category'
            },
            {
                $sort: {
                    data_sort: 1
                }
            }
        ])
            }   
            return {
                flag: true,
                data: {
                    articles: articles,
                    totalPage: totalPage,
                    page: page
                },
                msg: '查询所有文章成功'
            }
        } catch (error) {
            console.log(error);
            return {
                flag: false,
                msg: '数据异常，查询所有文章失败'
            }

        }
    }
    //依据id查询文章
    async findById(_id) {
        try {
            var article = await this.ctx.model.Article.findById(_id);
            if (article) {
                return {
                    flag: true,
                    data: article,
                    msg: '依据id查询文章成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询文章失败'
            }
        }
    }
    //修改文章操作
    async update(fromStream) {
        try {
            var body = fromStream.fields;
            // console.log('body====' + JSON.stringify(body));
            var _id = body._id;
            //console.log('==='+_id);
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                var dbPath = filePath.dbPath;
                var targetPath = filePath.targetPath;
                await this.ctx.service.tool.uploadFile(fromStream, targetPath);
                await this.ctx.service.tool.jimp(targetPath);
                body.article_img = dbPath;
                await this.ctx.model.Article.updateOne({
                    _id: _id
                }, body);
                var targetPath = 'app' + body.history_img;
                var targetPath200 = this.ctx.helper.url200('app' + body.history_img);
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                }
                if (fs.existsSync(targetPath200)) {
                    fs.unlinkSync(targetPath200);
                }
            } else {
                await this.ctx.model.Article.updateOne({
                    _id: _id
                }, body);
            }
            return {
                flag: true,
                msg: '修改文章成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，修改文章失败'
            };
        }
    }
    //依据id删除文章
    async deleteById(_id) {
        try {
            var object = await this.ctx.model.Article.findById({
                _id: _id
            }, {
                _id: 0,
                article_img: 1
            });
            var article_img = object.article_img;
            if (article_img) {
                var targetPath = 'app' + article_img;
                var targetPath200 = this.ctx.helper.url200('app' + article_img);
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                }
                if (fs.existsSync(targetPath200)) {
                    fs.unlinkSync(targetPath200);
                }
            }
            await this.ctx.model.Article.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除文章成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，删除文章失败'
            };
        }
    }

}
module.exports = articleService;