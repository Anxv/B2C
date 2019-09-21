const {
    Controller
} = require('egg');

class loginController extends Controller {
    //注册
    async registOne() {
        const {
            ctx
        } = this;
        await ctx.render('/index/login/regist_step1')
    }
    //验证码
    async verify() {
        var captcha = await this.ctx.service.tool.captcha();
        this.ctx.session.code = captcha.text;
        this.ctx.response.type = 'image/svg+xml';
        this.ctx.body = captcha.data;
    }
    //手机短信
    async phoneCode() {
        const {
            ctx
        } = this;
        var phone = ctx.request.query.phone;
        var identify_code = ctx.request.query.identify_code;
        var ip = ctx.request.ip.replace(/::ffff:/,'');
        var day = ctx.service.tool.getDay();
        var add_time = ctx.ctx.service.tool.getTime();
        var sign = ctx.service.tool.md5Sign(phone+day);
        var localCode = ctx.session.code;
        if (identify_code.toUpperCase() == localCode.toUpperCase()) {
            var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (reg.test(phone)) {
                var userTemp = await ctx.model.UserTemp.find({sign,day});
                var ipCount = await ctx.model.UserTemp.find({ip,day}).count();

                if (userTemp.length>0) {
                    if (userTemp[0].send_count<10 && ipCount<10) {
                        var send_count = userTemp[0].send_count + 1;
                        await ctx.model.UserTemp.update({sign:sign},{send_count,add_time:Date.now()});
                    }else{
                        ctx.body = {
                            flag: false,
                            msg: '当前手机号获取验证码已达上限，请24小时后重试'
                        }
                    }
                } else {
                    var newUserTemp = new ctx.model.UserTemp({
                        phone,sign,day,ip,add_time,send_count:1
                    })    
                    newUserTemp.save();
                    var randomNum = await ctx.service.tool.randomNumber();
                    ctx.session.phoneCode = randomNum;
                    ctx.body = {flag:true,msg:'获取验证码成功',sign:sign};
                }
            }else{
                ctx.body = {
                    flag: false,
                    msg: '请输入正确的手机号码'
                }
            }
        } else {
            ctx.body = {
                flag: false, 
                msg: '图形验证码错误'
            }
        }
    }
}
module.exports = loginController;