module.exports = option => {
    return async (ctx, next) => {
        ctx.request.query.name = ctx.request.query.name&&ctx.request.query.name.toLowerCase();
        
        console.log( ctx.request.query.name);
        

        await next();
    }

}