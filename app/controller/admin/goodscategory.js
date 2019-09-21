const BaseController = require('./base');

class goodsCategoryController extends BaseController {
    //商品分类列表
    async list() {
        var result = await this.ctx.service.goodscategory.findAll();       
        if (result.flag) {
            var categorys = result.data; 
            await this.ctx.render('/admin/goodscategory/list', {
                categorys
            });
        } else {
            this.ctx.body = result.msg;
        }
    }
    //增加商品分类显示
    async add() {
        var result = await this.ctx.service.goodscategory.findAllTopCates();
        if (result.flag) {
            var topCategorys = result.data;
            await this.ctx.render('/admin/goodscategory/add', {
                topCategorys
            });
        }else{
            this.ctx.body = '回显页面失败'
        }
    }
    //增加商品分类操作
    async doAdd() {
        var body = this.ctx.request.body;
        var cate_pid = body.cate_pid;
        if (cate_pid !=0 ) {
            body.cate_pid = this.app.mongoose.Types.ObjectId(cate_pid);
        }
        var result = await this.ctx.service.goodscategory.insert(body);
        if (result.flag) {
            await this.success('/admin/goodscategory', result.msg);
        } else {
            await this.fail('/admin/goodscategory/add', result.msg);
        }
    }
    //修改商品分类显示
    async edit() {
        const {
            ctx
        } = this;
        var cate_id = ctx.request.query._id;
        var cateTopResult = await this.ctx.service.goodscategory.findAllTopCates();
        var cateResult = await ctx.service.goodscategory.findById(cate_id);
        if (cateResult.flag && cateTopResult.flag) {
            var cate = cateResult.data;
            var topCates = cateTopResult.data;
            await this.ctx.render('/admin/goodscategory/edit', {
                cate,topCates
            })
        } else {
            await this.fail('/admin/goodscategory', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id; 
        var cate_pid = body.cate_pid;
        if (cate_pid != 0 ) {
            body.cate_pid = this.app.mongoose.Types.ObjectId(cate_pid);
        }
        var result = await ctx.service.goodscategory.update(_id,body);
        if (result.flag) {
            await this.success('/admin/goodscategory', result.msg)
        } else {
            await this.fail('/admin/goodscategory', result.msg);
        }
    }
    //删除商品类型
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.goodscategory.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
}

module.exports = goodsCategoryController;