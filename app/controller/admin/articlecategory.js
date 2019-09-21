const BaseController = require('./base');

class articleCategoryController extends BaseController {
    //文章分类列表
    async list() {
        var result = await this.ctx.service.articlecategory.findAll();       
        if (result.flag) {
            var categorys = result.data; 
            await this.ctx.render('/admin/articlecategory/list', {
                categorys
            });
        } else {
            this.ctx.body = result.msg;
        }
    }
    //增加文章分类显示
    async add() {
        var result = await this.ctx.service.articlecategory.findAllTopCates();
        if (result.flag) {
            var topCategorys = result.data;
            await this.ctx.render('/admin/articlecategory/add', {
                topCategorys
            });
        }else{
            this.ctx.body = '回显页面失败'
        }
    }
    //增加文章分类操作
    async doAdd() {
        var body = this.ctx.request.body;
        var acate_pid = body.acate_pid;
        if (acate_pid !=0 ) {
            body.acate_pid = this.app.mongoose.Types.ObjectId(acate_pid);
        }
        var result = await this.ctx.service.articlecategory.insert(body);
        if (result.flag) {
            await this.success('/admin/articlecategory', result.msg);
        } else {
            await this.fail('/admin/articlecategory/add', result.msg);
        }
    }
    //修改文章分类显示
    async edit() {
        const {
            ctx
        } = this;
        var acate_id = ctx.request.query._id;
        var acateTopResult = await this.ctx.service.articlecategory.findAllTopCates();
        var acateResult = await ctx.service.articlecategory.findById(acate_id);
        if (acateResult.flag && acateTopResult.flag) {
            var acate = acateResult.data;
            var topCates = acateTopResult.data;
            await this.ctx.render('/admin/articlecategory/edit', {
                acate,topCates
            })
        } else {
            await this.fail('/admin/articlecategory', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id; 
        var acate_pid = body.acate_pid;
        if (acate_pid != 0 ) {
            body.acate_pid = this.app.mongoose.Types.ObjectId(acate_pid);
        }
        var result = await ctx.service.articlecategory.update(_id,body);
        if (result.flag) {
            await this.success('/admin/articlecategory', result.msg)
        } else {
            await this.fail('/admin/articlecategory', result.msg);
        }
    }
    //删除文章类型
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.articlecategory.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
}

module.exports = articleCategoryController;