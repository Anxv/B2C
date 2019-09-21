module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const accessSchema = new Schema({
        access_type:{type:String,required:true},
        access_module:{type:String,default:''},
        access_action:{type:String,default:''},
        access_url:{type:String,default:''},
        access_desc:{type:String,default:''},
        access_module_id:{type:mongoose.Mixed,required:true},
        data_sort:{type:Number,default:100},
        data_status:{type:Number,default:1},
        create_time:{type:Number,default:Date.now()},
    });
    return mongoose.model('Access',accessSchema,'accesses');
 }