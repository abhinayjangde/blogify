import mongoose, { model,Schema } from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImageURL:{
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps: true}); 

const Blog = model("blog", blogSchema)
export default Blog