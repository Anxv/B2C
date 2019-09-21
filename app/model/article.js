module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const articleSchema = new Schema({
        article_title: { type: String  }, //文章标题
        article_cateid:{type:Schema.Types.ObjectId }, //所属分类
        article_img: { type: String  },  // 文章标题图片
        article_link:{type: String },       //扩展跳转链接   
        article_content: { type: String  },    // seo描述 
        article_keys: { type: String  },  //seo关键词
        article_desc: { type: String },    //详情描述       
        data_sort: { type: Number,default:100 },   
        article_status: { type: Number,default:1  },
        create_time: {type:Number, default: Date.now()},
      });
    
    return mongoose.model('Article',articleSchema,'articles');
 }