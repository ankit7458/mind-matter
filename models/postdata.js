const mongoose = require('mongoose')
const { Schema } = mongoose;



const postContentSchema = new Schema({
    postContent : {
        type : String,
        required : true
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    like :{
        type : Number
    },
    dislike : {
        type : Number
    },
    comment : {
        type : String
    }
})



module.exports = mongoose.model('postContent',postContentSchema)