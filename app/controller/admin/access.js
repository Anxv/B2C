const
    baseController = require('./base');

class accessController extends baseController {
    //显示添加权限页面
    async add() {
        var result = await this.ctx.service.access.findModules();
        if (result.flag) {
            var modules = result.data;
            await this.ctx.render('/admin/access/add', {
                modules: modules
            })
        } else {
            await this.fail('/admin/access/add', result.msg);
        }

    }
    //添加权限到数据库
    async doAdd() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var module_id = body.access_module_id;
        if (module_id != '0') {
            body.access_module_id = this.app.mongoose.Types.ObjectId(module_id);
        }
        var result = await ctx.service.access.insert(body);
        if (result.flag) {
            await this.success('/admin/access', result.msg);
        } else {
            await this.fail('/admin/access/add', result.msg);
        }

    }
    //权限列表
    async list() {
        var result = await this.ctx.service.access.findAll();

        if (result.flag) {
            var modules = result.data;
            await this.ctx.render('/admin/access/list', {
                modules
            })
        } else {
            await this.fail('/admin/access', result.msg);
        }


    }
    //修改页面显示
    async edit() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result1 = await ctx.service.access.findById(_id);
        var result2 = await ctx.service.access.findModules();
        if (result1.flag&&result2.flag) {
            var access = result1.data;
            var modules = result2.data;
            await this.ctx.render('/admin/access/edit', {
                access,modules
            })
        } else {
            if (!result1.flag) {
                await this.fail('/admin/access', result1.flag);
            }
            if (!result2.flag) {
                await this.fail('/admin/access', result1.flag);
            }
            
        }

    }
    //修改权限操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var module_id = body.access_module_id;
        if (module_id != '0') {
            body.access_module_id = this.app.mongoose.Types.ObjectId(module_id);
        }
        var result = await ctx.service.access.update(_id, body);
        if (result.flag) {
            await this.success('/admin/access', result.msg)
        } else {
            await this.fail('/admin/access',result.msg);
        }
    }
    //删除权限
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.access.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage,result.msg)
        } else {
            await this.fail(ctx.locals.lastPage,result.msg);
        }
    }

};
module.exports = accessController;