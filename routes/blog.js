const express = require('express')
const Router = express.Router();
const path = require('path')
const multer = require('multer')
const Database = require('../models/blog')
const database = require('../models/comment')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })
Router.get('/add-new', (req, res) => {
    return res.render('blog', {
        user: req.user
    })
})
Router.get('/:id', async (req, res) => {
    const blog = await Database.findById(req.params.id).populate('createdBy')
    return res.render('addblog', {
        user: req.user,
        blog
    })
})
Router.post('/comment/:blogId', async (req, res) => {
    await database.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})
Router.post('/', upload.single('file'), async (req, res) => {
    const { title, body } = req.body
    const results = await Database.create({
        title,
        body,
        coverImg: req.file.filename,
        createdBy: req.user._id
    })

    return res.redirect(`/blog/${results._id}`)
})
module.exports = Router