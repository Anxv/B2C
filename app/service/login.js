const {Service} = require('egg');

class loginService extends Service{
    async find(login_name,login_pwd,code){
        var sessionCode = this.ctx.session.code;
        if (code.toUpperCase() == sessionCode.toUpperCase()) {
        var result = await this.ctx.service.staff.find(login_name,login_pwd);
        if (result.flag) {
            var staff = result.data;
            if(staff.staff_status == 1){
            this.ctx.session.userinfo = staff;
            return {flag:true,msg:'登陆成功'};
            }else{
                return{flag:false,msg:'该用户异常，请联系管理员'}
            }
        } else {
            return {flag:false,msg:'用户名或密码错误'};          
        }
    }else{
      return {flag:false,msg:'验证码错误'}
    }

}
}

module.exports = loginService;