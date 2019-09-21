const BaseController = require('./base');
class navigationController extends BaseController {
    //添加导航显示
    async add() {

        await this.ctx.render('/admin/navigation/add')
    }
    //添加导航操作
    async doAdd() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var result = await ctx.service.navigation.insert(body);
        if (result.flag) {
            await this.success('/admin/navigation', result.msg);
        } else {
            await this.fail('/admin/navigation/add', result.msg);
        }

    }
    //导航列表
    async list() {
        const {
            ctx
        } = this;
        var page = ctx.request.query.page || 1;
        var pageSize = 4;
        var result = await ctx.service.navigation.findAllWithPage(page, pageSize);
        // console.log('==='+JSON.stringify(result.data));
        if (result.flag) {
            var navigations = result.data.navigations;
            var totalPage = result.data.totalPage;
            var page = result.data.page;
            await ctx.render('/admin/navigation/list', {
                navigations,
                totalPage,
                page
            })
        } else {
            ctx.body = '回显页面失败'
        }
    }
    //修改页面显示
    async edit() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var targetPage = ctx.locals.lastPage;
        var result = await ctx.service.navigation.findById(_id);
        if (result.flag) {
            var navigation = result.data;
            await this.ctx.render('/admin/navigation/edit', {
                navigation,targetPage
            })
        } else {
            await this.fail('/admin/navigation', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var targetPage = body.targetPage;
        var result = await ctx.service.navigation.update(_id, body);

        if (result.flag) {
            await this.success(targetPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
    //删除导航
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.navigation.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }

}

module.exports = navigationController;