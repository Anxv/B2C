const {
    Service
} = require('egg');

class accessService extends Service {
    async findModules() {
        try {
            var accessModules = await this.ctx.model.Access.find({
                access_module_id: "0"
            });
            return {
                flag: true,
                data: accessModules,
                msg: '权限模块查询成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，权限模块查询失败'
            }
        }

    }
    //增加权限保存到数据库
    async insert(access) {
        var accessModel = new this.ctx.model.Access(access);
        try {
            await accessModel.save();
            return {
                flag: true,
                msg: '增加权限成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，增加权限失败'
            };
        }

    }
    //权限列表显示
    async findAll() {

        try {
            var accesses = await this.ctx.model.Access.aggregate(
                [{
                    $lookup: {
                        from: 'accesses',
                        localField: '_id',
                        foreignField: 'access_module_id',
                        as: 'subAccess'
                    },

                }, {
                    $match: {
                        access_module_id: '0'
                    }
                }, {
                    $sort: {
                        data_sort: 1
                    }
                }]);

            function jsonsort(key, sortType) {
                return function (a, b) {
                    return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key])
                } 
            }
            if (accesses) {
                accesses = accesses.map((item) => {
                    item.subAccess.sort(jsonsort('data_sort',false))
                    return item;
                })
                return {
                    flag: true,
                    data: accesses,
                    msg: '查询所有权限成功'
                }
            }
        } catch (error) {
            console.log(error);  
            return {
                flag: false,
                msg: '数据异常，查询权限失败'
            }

        }
    }
    //修改权限页面显示
    async findById(_id) {

        try {
            var access = await this.ctx.model.Access.findById(_id);
            if (access) {
                return {
                    flag: true,
                    data: access,
                    msg: '查询权限成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询权限失败'
            }
        }
    }
    //修改权限操作
    async update(_id, access) {

        try {
            await this.ctx.model.Access.updateOne({
                _id: _id
            }, access);
            return {
                flag: true,
                msg: '修改权限成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改权限失败'
            };
        }

    }
    //依据id删除权限
    async deleteById(_id) {

        try {
            await this.ctx.model.Access.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除权限成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除权限失败'
            };
        }
    }

    async findByRoleId(role_id) {
        try {
            var roleAccessArray = await this.ctx.model.RoleAccess.find({
                role_id: role_id
            });
            return {
                flag: true,
                data: roleAccessArray,
                msg: '依据角色id查询成功'
            }
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，依据角色id查询失败'
            };
        }
    }
    //依据URL查询权限
    async findByUrl(access_url) {
        try {
            var access = await this.ctx.model.Access.findOne({
                access_url: access_url
            });
            return {
                flag: true,
                data: access,
                msg: '依据url查询成功'
            }
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，依据url查询失败'
            };
        }
    }
    async findAllwithChecked(role_id) {
        var result1 = await this.findAll();
        var result2 = await this.findByRoleId(role_id);
        if (result1.flag && result2.flag) {
            var accessArray = result1.data;
            var accessCkecked = result2.data;
            var accessCkeckedArray = [];
            accessCkecked.forEach(element => {
                accessCkeckedArray.push(element.access_id.toString());
            });
            for (const module of accessArray) {
                if (accessCkeckedArray.indexOf(module._id.toString()) != -1) {
                    module.checked = true;
                }
                for (const access of module.subAccess) {
                    if (accessCkeckedArray.indexOf(access._id.toString()) != -1) {
                        access.checked = true;
                    }
                }
            }
            return {
                flag: true,
                data: accessArray,
                msg: '权限查询成功'
            };
        } else {
            return {
                flag: false,
                msg: '数据异常，查询所有权限和选中失败'
            };
        }
    }
}

module.exports = accessService;