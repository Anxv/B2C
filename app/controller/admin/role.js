const
    baseController = require('./base');
class roleController extends baseController {
    //添加角色
    async add() {

        await this.ctx.render('/admin/role/add')

    }
    //添加角色到数据库
    async doAdd() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var role = {
            role_name: body.role_name,
            role_desc: body.role_desc
        };
        var result = await ctx.service.role.insert(role);
        if (result.flag) {
            await this.success('/admin/role', result.msg);
        } else {
            await this.fail('/admin/role/add', result.msg);
        }

    }
    //角色列表
    async list() {
        var result = await this.ctx.service.role.findAll();

        if (result.flag) {
            var roles = result.data;
            await this.ctx.render('/admin/role/list', {
                roles
            })
        } else {
            await this.fail('/admin/role', result.msg);
        }


    }
    //修改页面显示
    async edit() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.role.findById(_id);
        if (result.flag) {
            var role = result.data;
            await this.ctx.render('/admin/role/edit', {
                role
            })
        } else {
            await this.fail('/admin/role', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        if (body.data_status == "on") {
            body.data_status = 1;
        } else {
            body.data_status = 0;
        }
        var result = await ctx.service.role.update(_id, body);

        if (result.flag) {
            await this.success('/admin/role', result.msg)
        } else {
            await this.fail('/admin/role', result.msg);
        }
    }
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.role.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
    //显示授权
    async auth() {
        const {
            ctx
        } = this;
        var role_id = ctx.request.query._id;
        var result = await ctx.service.access.findAllwithChecked(role_id);
        if (result.flag) {
            var accessArray = result.data;
            await this.ctx.render('/admin/role/auth', {
                role_id,
                accessArray
            });
        } else {
            await this.fail('/admin/role', result.msg)
        }
    }
    //提交授权
    async doAuth() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var role_id = body.role_id;
        if (body.access_checked) {
            var accessCheckedArray = body.access_checked;
        }else{
            var accessCheckedArray = [];
        }
        
        var role_access_array = [];
        accessCheckedArray.forEach(access_id => {
            var roleAccess = {
                role_id: role_id,
                access_id: access_id
            }
            role_access_array.push(roleAccess);
        });


        var result = await ctx.service.role.insertManyRoleAccess(role_id,role_access_array);
        if (result.flag) {
            await this.success('/admin/role', result.msg);
        } else {
            await this.fail('/admin/role/auth', result.msg);
        }
    }

};
module.exports = roleController;