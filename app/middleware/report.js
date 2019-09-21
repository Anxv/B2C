module.exports = (option,app) => {
    return async  (ctx, next)=> {
      var startTime = Date.now();
      //console.log('开始时间'+startTime);
      
     // app.logger.info('开始时间'+startTime);
      await next();

      var endTime = Date.now();
      //console.log('结束时间'+endTime);
       


      // 上报请求时间
     const reportTime = (Date.now() - startTime); 
     //console.log('经历时间'+reportTime);
     
     //app.logger.info('经历时间'+reportTime);
    }
  };