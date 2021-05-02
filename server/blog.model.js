const { Schema, model } = require("mongoose")

const blogSchema = Schema({
    content: {
        type:String,
    },
    authorId: {
        type: String
    }
}, { timestamps: true })


const Blog = model('Blog', blogSchema)

module.exports = Blog