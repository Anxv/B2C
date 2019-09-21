 const {
     Service
 } = require('egg');

 class userService extends Service {
     //会员查询
     async findAll() {
         const {
             ctx
         } = this;
         try {
             var users = await this.ctx.model.User.find({
                 data_status: 1
             });
             for (const user of users) {
                 var score = user.user_totalscore;
                 var rank_name = await ctx.service.userrank.getUserRankByScore(score);
                 user.user_rank = rank_name;
             }
             return {
                 flag: true,
                 data: users,
                 msg: '查询所有会员成功'
             }

         } catch (error) {
             return {
                 flag: false,
                 msg: '数据异常，查询所有会员失败'
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
     //修改会员操作
     async update(_id, user) {

         try {
             await this.ctx.model.User.updateOne({
                 _id: _id
             }, user);
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
     //依据id删除会员
     async deleteById(user_id) {

         try {
             await this.ctx.model.User.update({
                 _id: user_id
             }, {
                 data_status: 0
             });
             return {
                 flag: true,
                 msg: '删除会员成功'
             };

         } catch (error) {
             return {
                 flag: false,
                 msg: '数据异常，删除会员失败'
             };
         }
     }
 }

 module.exports = userService;