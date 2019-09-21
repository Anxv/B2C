module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const articleCategorySchema = new Schema({
        acate_title: { type: String ,default:''}, //分类标题
        acate_subtitle: { type: String ,default:'' },/*分类子标题*/
        acate_icon: { type: String,  default:''}, // 分类图标
        acate_link:{ type: String ,default:''},     //分类链接
        acate_pid:{type:Schema.Types.Mixed},     //混合类型  
        acate_keys: { type: String ,default:'' }, //seo关键词
        acate_desc: { type: String ,default:''},    //seo描述  
        acate_status: { type: Number,default:1  },    //1 显示 
        data_sort: { type: Number,default:100 }, 
        data_status: { type: Number,default:1  },  
        create_time: { type:Number,default: Date.now()}
      });
    
    return mongoose.model('ArticleCategory',articleCategorySchema,'article_categorys');
 }