const { mongoose, Schema } = require('mongoose')

const Schema2 = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const model = new mongoose.model('blog', Schema2)

module.exports = model