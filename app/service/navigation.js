const {
    Service
} = require('egg');

class navigationService extends Service {
    //添加导航
    async insert(navigation) {
        var navigationModel = new this.ctx.model.Navigation(navigation);
        try {
            await navigationModel.save();
            return {
                flag: true,
                msg: '添加导航成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，添加导航失败'
            };
        }

    }
    //导航查询
    async findAll() {

        try {
            var navigations = await this.ctx.model.Navigation.find({}).sort({data_sort:1});
            if (navigations) {
                return {
                    flag: true,
                    data: navigations,
                    msg:'查询所有导航成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有导航失败'
            }

        }
    }
    async findAllWithPage(page, pageSize) {
        try {
            var totalNum = await this.ctx.model.Navigation.count({});
            var totalPage = Math.ceil(totalNum / pageSize);
            if (page > totalPage) {
                page = totalPage;
            }
            var navigations = await this.ctx.model.Navigation.find({}).skip((page - 1) * pageSize).limit(pageSize).sort({data_sort:1});
            return {
                flag: true,
                data: {
                    navigations: navigations,
                    totalPage: totalPage,
                    page: page
                },
                msg: '查询所有导航成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有导航失败'
            }

        }
    }
    //修改导航页面查询
    async findById(_id) {

        try {
            var navigation = await this.ctx.model.Navigation.findById(_id);
            if (navigation) {
                return {
                    flag: true,
                    data: navigation,
                    msg:'依据id查询导航成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询导航失败'
            }
        }
    }
    //修改导航操作
    async update(_id, navigation) {

        try {
            await this.ctx.model.Navigation.updateOne({
                _id: _id
            }, navigation);
            return {
                flag: true,
                msg: '修改导航成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改导航失败'
            };
        }

    }
   //依据id删除导航
    async deleteById(_id) {

        try {
            await this.ctx.model.Navigation.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除导航成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除导航失败'
            };
        }
    }

    //前台 查询中间导航
    async findNavPosition(position) {

        try {
            var navigations = await this.ctx.model.Navigation.find({nav_position:position,nav_status:1}).sort({data_sort:1});
            if (navigations) {
                return {
                    flag: true,
                    data: navigations,
                    msg:'查询所有导航成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有导航失败'
            }

        }
    }
}

module.exports = navigationService;