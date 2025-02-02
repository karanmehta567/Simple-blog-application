const express = require('express')
const Router = express.Router();
const Database = require('../models/user')
Router.get('/signin', (req, res) => {
    return res.render('signin')
})
Router.get('/signup', (req, res) => {
    return res.render('signup')
})
// user's signin using email and passwordie
Router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await Database.matchPasswordandToken(email, password)
        return res.cookie('token', token).redirect('/')
    } catch (error) {
        return res.render('signin', { error: 'Incorrect email or password' })
    }
})

Router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body
    await Database.create({ fullname, email, password })
    return res.render('signup')
})
Router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})
module.exports = Router