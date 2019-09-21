module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const userRankSchema = new Schema({
        rank_icon:{type:String,default:''},
        rank_name:{type:String,required:true},
        start_score:{type:Number,required:true,default:0},
        end_score:{type:Number,required:true,default:0},
        discount:{type:Number,required:true,default:0},
        data_sort:{type:Number,default:0},
        data_status:{type:Number,default:1},
        create_time:{type:Number,default:Date.now()}
    });
    return mongoose.model('Userrank',userRankSchema,'userranks');
}