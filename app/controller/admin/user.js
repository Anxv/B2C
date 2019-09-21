const
    baseController = require('./base');
class userController extends baseController {
    //会员列表显示
    async list() {
        const {
            ctx
        } = this;
        var result = await ctx.service.user.findAll();

        if (result.flag) {
            var users = result.data;
            await ctx.render('admin/user/list', {
                users
            })
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }

 
    }
    //修改页面显示
    async edit() {
        const {
            ctx
        } = this;
        var user_id = ctx.request.query._id;
        var result = await ctx.service.user.findById(user_id);
        if (result.flag) {
            var user = result.data;           
            await this.ctx.render('/admin/user/edit', {
                user
            })
        } else {
            await this.fail('/admin/user', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var result = await ctx.service.user.update(_id, body);

        if (result.flag) {
            await this.success('/admin/user', result.msg)
        } else {
            await this.fail('/admin/user', result.msg);
        }
    }
    //软删除会员
    async delete() {
        const {
            ctx
        } = this;
        var user_id = ctx.request.query._id;
        var result = await ctx.service.user.deleteById(user_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }

};
module.exports = userController;