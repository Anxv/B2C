const
    baseController = require('./base');
class userRankController extends baseController {
    //添加角色
    async add() {

        await this.ctx.render('/admin/userrank/add')

    }
    //添加会员等级到数据库
    async doAdd() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var result = await ctx.service.userrank.insert(body);
        if (result.flag) {
            await this.success('/admin/userrank', result.msg);
        } else {
            await this.fail('/admin/userrank/add', result.msg);
        }

    }
    //会员等级列表
    async list() {
        var result = await this.ctx.service.userrank.findAll();

        if (result.flag) {
            var userranks = result.data;
            await this.ctx.render('/admin/userrank/list', {
                userranks
            })
        } else {
            await this.fail('/admin/userrank', result.msg);
        }


    }
    //修改页面显示
    async edit() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.userrank.findById(_id);
        if (result.flag) {
            var userrank = result.data;
            await this.ctx.render('/admin/userrank/edit', {
                userrank
            })
        } else {
            await this.fail('/admin/userrank', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var result = await ctx.service.userrank.update(_id, body);

        if (result.flag) {
            await this.success('/admin/userrank', result.msg)
        } else {
            await this.fail('/admin/userrank', result.msg);
        }
    }
    //删除会员等级
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.userrank.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }

};
module.exports = userRankController;