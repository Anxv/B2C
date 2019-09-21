const {
    Service
} = require('egg');

class userRankService extends Service {
    //添加会员等级
    async insert(userrank) {
        var userRankModel = new this.ctx.model.Userrank(userrank);
        try {
            await userRankModel.save();
            return {
                flag: true,
                msg: '添加会员等级成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，添加会员等级失败'
            };
        }

    }
    //会员等级查询
    async findAll() {

        try {
            var userranks = await this.ctx.model.Userrank.find({}).sort({data_sort:1});
            if (userranks) {
                return {
                    flag: true,
                    data: userranks,
                    msg:'查询所有会员等级成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有会员等级失败'
            }

        }
    }
    //修改会员等级页面查询
    async findById(_id) {

        try {
            var userRank = await this.ctx.model.Userrank.findById(_id);
            if (userRank) {
                return {
                    flag: true,
                    data: userRank,
                    msg:'依据id查询会员等级成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询会员等级失败'
            }
        }
    }
    //修改会员等级操作
    async update(_id, userrank) {

        try {
            await this.ctx.model.Userrank.updateOne({
                _id: _id
            }, userrank);
            return {
                flag: true,
                msg: '修改会员等级成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改会员等级失败'
            };
        }

    }
   //依据id删除会员等级
    async deleteById(_id) {

        try {
            await this.ctx.model.Userrank.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除会员等级成功'
            };

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除会员等级失败'
            };
        }
    }
    //根据积分返回会员等级
    async getUserRankByScore(score){
       var userrank = await this.ctx.model.Userrank.findOne({
            start_score:{
                $lte:score
            },
                end_score:{
                    $gt:score
                }
            
        });
        return userrank.rank_name;;
    }
}

module.exports = userRankService;