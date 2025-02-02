const express = require('express');
const path = require('path')
const app = express();
const cookieParser = require('cookie-parser')
const PORT = 8000;
const { mongoose } = require('mongoose')
const useRoute = require('./routes/route');
const blogRoute = require('./routes/blog')
const { checkforCookie } = require('./middleware/user');
const Blogs = require('./models/blog')
mongoose.connect('mongodb://localhost:27017/bloify').then(() => console.log('connnected')).catch((err) => console.log(err))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
//middleware for cookie
app.use(cookieParser())
app.use(checkforCookie('token'))
app.use(express.static(path.resolve('./public/uploads')))
app.use(express.static(path.resolve('./public/images')))
app.get('/', async (req, res) => {
    const allBlogs = await Blogs.find({})
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    })
})
///database's middleware
app.use(express.urlencoded({ extended: false }))
app.use('/user', useRoute)
app.use('/blog', blogRoute)
app.listen(PORT, () => {
    console.log("Runs")
})