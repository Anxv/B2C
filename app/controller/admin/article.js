const BaseController = require('./base');
class articleController extends BaseController {
    //文章列表显示
    async list() {
        const {
            ctx
        } = this;
        var page = ctx.request.query.page || 1;
        var pageSize = 2;
        var result = await ctx.service.article.findAllWithPage(page, pageSize);
        if (result.flag) {
            var articles = result.data.articles;
            var totalPage = result.data.totalPage;
            var page = result.data.page;
            await this.ctx.render('/admin/article/list', {
                articles,
                totalPage,
                page
            });

        } else {
            ctx.body = result.msg;
        }
    }
    //显示添加
    async add() {
        const {
            ctx
        } = this;
        var acateResult = await this.ctx.service.articlecategory.findAll();
        if (acateResult.flag) {
            var acates = acateResult.data;
            await ctx.render('admin/article/add', {
                acates,
            });
        } else {
            await this.fail('/admin/article', '显示增加页面失败');
        }
    }
    //表单提交操作
    async doAdd() {
        var formStream = await this.ctx.getFileStream({
            requireFile: false
        });
        var result = await this.ctx.service.article.insert(formStream);
        if (result.flag) {
            await this.success('/admin/article', result.msg);
        } else {
            await this.fail('/admin/article', result.msg);
        }

    }
    //图片上传
    async doUpload() {
        const {
            ctx
        } = this;
        var parts = await ctx.multipart({
            autoFields: true
        });
        var result = await this.ctx.service.article.upload(parts);
        if (result.flag) {
            var links = result.data;
            this.ctx.body = {
                link: links[0]
            };
        } else {
            var msg = result.msg;
            this.ctx.body = {
                msg: msg
            }
        }
    }
    //修改文章显示
    async edit() {
        const {
            ctx
        } = this;
        var article_id = ctx.request.query._id;
        var acateResult = await ctx.service.articlecategory.findAll();
        var articleResult = await ctx.service.article.findById(article_id);
        var lastPage = ctx.locals.lastPage;
        if (acateResult.flag && articleResult.flag) {
            var acates = acateResult.data;
            var article = articleResult.data;
            await ctx.render('admin/article/edit', {
                acates,
                article,
                lastPage
            });
        } else {
            // await ctx.fail('/admin/article',result.msg);
            ctx.body = "36666";
        }

    }
    //修改文章提交操作
    async doEdit(){
        const {ctx} = this;
        var fromStream = await this.ctx.getFileStream({
            requireFile: false
        });
        var targetPage = fromStream.fields.lastPage;
        var result = await this.ctx.service.article.update(fromStream);
        if (result.flag) {
            await this.success(targetPage, result.msg);
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
   //删除文章
   async delete() {
    const {
        ctx
    } = this;
    var _id = ctx.request.query._id;
    var result = await ctx.service.article.deleteById(_id);
    if (result.flag) {
        await this.success(ctx.locals.lastPage, result.msg)
    } else {
        await this.fail(ctx.locals.lastPage, result.msg);
    }
}
}
module.exports = articleController;