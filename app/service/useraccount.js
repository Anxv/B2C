const {
    Service
} = require('egg');

class userAccountService extends Service {
    //查询所有会员账号
    async findAllAccount() {
        const {
            ctx
        } = this;
        try {
            var userAccounts = await ctx.model.User.find({
                data_status: 1
            }, {
                _id: 1,
                login_name: 1,
                login_secret: 1,
                user_name: 1,
                user_email: 1,
                last_ip: 1,
                last_time: 1,
                user_status: 1
            });
            return {
                flag: true,
                data: userAccounts,
                msg: '查询所有会员账号成功'
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常,查询所有会员账号失败'
            }
        }

    }
    //修改会员页面查询
    async findById(user_id) {

        try {
            var user = await this.ctx.model.User.findById(user_id);
            if (user) {
                return {
                    flag: true,
                    data: user,
                    msg: '依据id查询会员成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询会员失败'
            }
        }
    }
    //依据id查询安全码
    async findSecret(user_id) {
        try {
            var secret = await this.ctx.model.User.findOne({
                _id: user_id
            }, {
                _id: 0,
                login_secret: 1
            });
            if (secret) {
                return {
                    flag: true,
                    data: secret,
                    msg: '获取安全码成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，获取安全码失败'
            }
        }
    }
    //修改会员操作
    async updateById(_id, useraccount) {

        try {
            await this.ctx.model.User.updateOne({
                _id: _id
            }, useraccount);
            return {
                flag: true,
                msg: '修改会员成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改会员失败'
            };
        }
    }
}

module.exports = userAccountService;