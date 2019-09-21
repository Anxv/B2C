const baseController = require('./base');


class loginController extends baseController {
  //显示login
  async index() {
    await this.ctx.render('admin/login');
  }
  //login操作
  async doLogin() {
    const {
      ctx
    } = this;
    let username = ctx.request.body.username;   
    let password = await ctx.service.tool.md5(ctx.request.body.password);
    let code = ctx.request.body.code;
    var result = await ctx.service.login.find(username,password,code);
    if (result.flag) {
      await this.success('/admin',result.msg);
    } else {
      await this.fail('/admin/login',result.msg);
    }
  }
  //验证码
  async verifyCode() {
    var captcha = await this.ctx.service.tool.captcha();
    this.ctx.session.code = captcha.text
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }

  async logout() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }
};

module.exports = loginController;