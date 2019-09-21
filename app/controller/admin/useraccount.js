const
    baseController = require('./base');
class userAccountController extends baseController {
    //会员账号列表
    async list() {
        const {
            ctx
        } = this;
        var result = await ctx.service.useraccount.findAllAccount();
        if (result.flag) {
            var userAccounts = result.data;
            await ctx.render('/admin/useraccount/list', {
                userAccounts
            })
        } else {
            await this.fail('/admin/useraccount', result.msg);
        }
    }
    //修改页面显示
    async edit() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.useraccount.findById(_id);
        if (result.flag) {
            var useraccount = result.data;
            await this.ctx.render('/admin/useraccount/edit', {
                useraccount
            })
        } else {
            await this.fail('/admin/useraccount', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var pwd = body.login_pwd;
        if (pwd) {
            var secretResult = await ctx.service.useraccount.findSecret(_id);       
            if (secretResult.flag) {
                var secret = secretResult.data;
                var newPwd = await ctx.service.tool.md5Secret(pwd, secret);
                var useraccount = {
                    login_name: body.login_name,
                    login_pwd: newPwd,
                    user_status: body.user_status
                }
            } else {
                ctx.body = secretResult.msg;
            }
        } else {
            var useraccount = {
                login_name: body.login_name,
                user_status: body.user_status
            }
        }
        var result = await ctx.service.useraccount.updateById(_id, useraccount);
        if (result.flag) {
            await this.success('/admin/useraccount', result.msg);
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
};
module.exports = userAccountController;