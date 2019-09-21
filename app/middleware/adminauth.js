module.exports = option => {
    return async (ctx, next) => {

        var userinfo = ctx.session.userinfo;
        var pathname = ctx.request.path;
        ctx.locals.lastPage = ctx.request.header.referer;
        ctx.locals.csrf = ctx.csrf;
        ctx.locals.userinfo = userinfo;
        // let randomNum = await ctx.service.tool.randomNumber();
        // await ctx.service.tool.md5Secret('123456',randomNum);
        if (userinfo != null) {
            var authResult = await ctx.service.staff.ckeckAuth(userinfo.role_id, pathname);
            if (authResult.flag) {
                var result = await ctx.service.access.findAllwithChecked(userinfo.role_id);
                if (result.flag) {
                    ctx.locals.authList = result.data;
                    await next();
                } else {
                    ctx.redirect('/admin/login'); 
                }
            } else {
                ctx.body = authResult.msg;
            }
        } else {
            if (pathname === '/admin/login' || pathname === '/admin/doLogin' || pathname === '/admin/verify') {
                await next();

            } else {
                ctx.redirect('/admin/login');
            }
        }

    }

}