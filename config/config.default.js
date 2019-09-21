var config = {};

config.keys = '123456';
//中间件配置
config.middleware = ['adminauth'];
config.adminauth ={
  enable:true,
  match:'/admin'
}
//配置模板引擎
config.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.html': 'nunjucks',
  },
};
//安全
  config.security = {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  };
//数据
config.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1:27017/db_buka',
    options: {useNewUrlparser:true},
  },
};
//session配置
config.session = {
  key: 'EGG_SESS',
  maxAge: 24 * 3600 * 1000, // 1 day
  httpOnly: true,
  encrypt: true,
};
//多文件上传
config.multipart = {
  fields:60,
  fileSize:'30mb'
};
//缓存
config.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: '',
    db: 0,
  },
}

config.upLoadBaseDir = 'app/public/admin/upload'

module.exports = config;