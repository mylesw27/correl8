// required packages
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
const methodOverride = require('method-override');
const { defaults } = require('pg')

router.use(methodOverride('_method'));

// GET /users/new -- show route for a form that creates a new user (sign up for the app)
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// POST /users -- CREATE a new user from the form @ GET /users/new
router.post('/', async (req, res) => {
    try {
        //do a find or create with the user's given email
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            }, defaults: {
                username: req.body.username,
                zipcode: req.body.zipcode
            }
        })
        if (!created) {
            // if the user's email returns as found -- don't let them sign up
            // instead, redirect them to the login page
            res.redirect('users/login?message=Please login to your account to continue')
        } else {
            // has the user's password before we add it to the db
            const hashedPassword = bcrypt.hashSync(req.body.password, 12)
            // save the user in the db
            newUser.password = hashedPassword
            await newUser.save()
            // encrypt the logged in user's id
            const encryptedPk =  cryptoJs.AES.encrypt(newUser.id.toString(), process.env.ENC_KEY)
            // set encrypted id as a cookie
            res.cookie('userId', encryptedPk.toString())
            // redirect user
            res.redirect('/habits')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// GET /users/login -- show route for a form that lets a user login
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
    })
})

// POST /users/login -- authenticate a user's credentials
router.post('/login', async (req, res) => {
    try {
        // search for the user's email in the db
        const foundUser = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const failedLoginMessage = 'Incorrect email or password'
        if (!foundUser) {
            // if the user's email is not found -- do not let them login
            res.redirect('/users/login?message=' + failedLoginMessage)
        } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            // if the user exists but they have the wrong password -- do not let them login
            res.redirect('/users/login?message=' + failedLoginMessage)
        } else {
            // if the user exists, they know the right password -- log them in
            const encryptedPk =  cryptoJs.AES.encrypt(foundUser.id.toString(), process.env.ENC_KEY)
            // set the encrypted PK as a cookie
            res.cookie('userId', encryptedPk.toString())
            // redirect them to their profile
            res.redirect('/habits')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// GET /users/logout -- log out the current user
router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

// GET /users/profile -- show authorized users their profile page
router.get('/settings', (req, res) => {
    // if the user come and is not logged in -- they lack authorization
    if(!res.locals.user){
        // redirect them to the login
        res.redirect('/users/login?message=You are not authorized to view that page. Please login to continue')
    } else {
        // if they are allowed to be here, show them their profile
        res.render('users/settings.ejs')
    }
})

router.put('/settings', async (req, res) => {
    try{
        const foundUser = await db.user.findOne({
            where: {
                id: res.locals.user.id
            }
        })
        await foundUser.set({
            username: req.body.username,
            zipcode: req.body.zipcode
        })
        await foundUser.save()
        res.redirect('/users/settings')  
    } catch(error) {
        console.log(error)
    }
})

// export the router instance
module.exports = router