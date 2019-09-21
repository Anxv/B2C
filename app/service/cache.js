const {
    Service
} = require('egg');
class cacheService extends Service {
    //设置缓存
    async set(key,value,time){
        const {app} = this;
        var valueString = JSON.stringify(value);
        //redis key -value 存储
        if (app.redis) {
            await app.redis.set(key,valueString,'EX',time);
        }
        
    }
    //获取缓存
    async get(key){
        const {app} = this;
        if(app.redis){
           var valueString = await app.redis.get(key);
           return JSON.parse(valueString);
        }
    }


}
module.exports = cacheService;