const {
    Service
} = require('egg');

class roleService extends Service {
    //添加角色
    async insert(role) {
        var roleModel = new this.ctx.model.Role(role);
        try {
            await roleModel.save();
            return {
                flag: true,
                msg: '添加角色成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，添加角色失败'
            };
        }

    }
    //角色列表
    async findAll() {

        try {
            var roles = await this.ctx.model.Role.find({});
            if (roles) {
                return {
                    flag: true,
                    data: roles
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '角色列表数据查询错误'
            }

        }
    }
    //修改页面查询
    async findById(_id) {

        try {
            var role = await this.ctx.model.Role.findById(_id);
            if (role) {
                return {
                    flag: true,
                    data: role
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '访问异常'
            }
        }
    }
    //修改操作
    async update(_id, role) {

        try {
            await this.ctx.model.Role.updateOne({
                _id: _id
            }, role);
            return {
                flag: true,
                msg: '修改角色成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改角色失败'
            };
        }

    }

    async deleteById(_id) {

        try {
            await this.ctx.model.Role.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除角色成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除角色失败'
            };
        }
    }
    async insertManyRoleAccess(role_id,roleAccessArray) {
        try {
            await this.ctx.model.RoleAccess.deleteMany({role_id:role_id});
            await this.ctx.model.RoleAccess.insertMany(roleAccessArray);
            return {
                flag: true,
                msg: '角色授权成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，角色授权失败'
            }
        }
    }
}

module.exports = roleService;