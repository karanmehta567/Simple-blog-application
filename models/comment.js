const { mongoose, Schema } = require('mongoose')

const comment = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blog'
    }
}, { timestamps: true })

const commentModel = new mongoose.model('comment', comment)

module.exports = {
    commentModel
}