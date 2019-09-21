const {
    Service
} = require('egg');

class staffService extends Service {
    async insert(staff) {
        var staffModel = new this.ctx.model.Staff(staff);
        try {
            await staffModel.save();
            return {
                flag: true,
                msg: '添加用户成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，添加用户失败'
            };
        }

    }

    async find(login_name, login_pwd) {
        try {
            var result = await this.ctx.model.Staff.findOne({
                login_name: login_name,
                login_pwd: login_pwd,
            }, {
                staff_name: 1,
                staff_status: 1,
                role_id: 1,
                is_super: 1,
                _id: 0
            })

            return {
                flag: true,
                data: result,
                msg: '查询成功'
            };
        } catch (error) {
            return {
                flag: false,
                data: result,
                msg: '数据异常，登录失败'
            };
        }


    }
    //账号查询
    async findByUserName(login_name) {
        var user_result = await this.ctx.model.Staff.findOne({
            login_name: login_name
        });
        if (user_result) {
            return {
                flag: false,
                msg: '账户名已存在'
            };
        } else {
            return {
                flag: true
            };
        }
    }

    async findAll() {
        try {
            var staffs = await this.ctx.model.Staff.aggregate([{
                $lookup: {
                    from: 'roles',
                    localField: 'role_id',
                    foreignField: '_id',
                    as: 'role'
                }
            }]);
            if (staffs) {
                return {
                    flag: true,
                    data: staffs
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常'
            }

        }
    }

    async findById(_id) {
        try {
            var staff = await this.ctx.model.Staff.findById(_id);
            if (staff) {
                return {
                    flag: true,
                    data: staff
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常'
            }
        }
    }

    async updateById(_id, staff) {
        try {
            await this.ctx.model.Staff.updateOne({
                _id: _id
            }, staff);
            return {
                flag: true,
                msg: '更新用户成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，更新用户失败'
            };
        }
    }

    async deleteById(_id) {
        try {
            await this.ctx.model.Staff.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除数据成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除数据成功'
            };
        }
    }
    //检测当前用户访问权限
    async ckeckAuth(role_id, path) {
        var is_super = this.ctx.locals.userinfo.is_super;
        var ignoreUrl = ['/admin/login','/admin/doLogin','/admin/verify','/admin/logout','/admin','/admin/welcome'];
        if (ignoreUrl.indexOf(path) != -1 || is_super == 1) {
            return {flag:true,msg:'拥有访问权限'};
        }
            var result1 = await this.ctx.service.access.findByRoleId(role_id);
            var result2 = await this.ctx.service.access.findByUrl(path);  
            if (result1.flag && result2.flag) {
                var accessArray = result1.data;
                var access = result2.data;
                var accessAll = [];
                accessArray.forEach(element => {
                    accessAll.push(element.access_id.toString());
                });
                if (accessAll.indexOf(access._id.toString()) != -1) {
                    return {flag:true,msg:'拥有访问权限'};
                }else{
                    return {flag:false,msg:'没有访问权限，请联系管理员'};
                }    
            }
    }
}

module.exports = staffService;