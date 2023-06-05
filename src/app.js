// console.log("fjhds");

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// configure session middleware
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

const userCollection = require('./model/model');
require('./db');
const path = require('ejs');
app.use(express.static('../public'));

// const temppath = path.join(__dirname,'../views');

app.set('view engine', 'ejs');
app.set('views', '../views');

let port = 3000;

app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.render('index');
})

app.get('/merchandise', (req,res) => {
    res.render('merchandise');
})

app.get('/credit_card_form', (req,res) => {
    res.render('credit_card_form');
})

app.get('/Ticket_Confirmation', (req,res) => {
    res.render('Ticket_Confirmation');
})

app.get('/signup', (req,res) => {
    res.render('signup', { messages: req.flash('error') });
})

app.post('/signup', (req,res) => {
    res.render('signup');
})

app.post('/userdetails', async (req, res) => {
    const NPassword = req.body.NPassword;
    const CPassword = req.body.CPassword;
    const UserN = req.body.UserN;
    const UserE = req.body.UserE;
        // Password validation checks
    if (CPassword.length < 10) {
        req.flash('error', 'Password must be at least 10 characters long.');
        return res.redirect('/signup');
    } else if (!/[a-zA-Z]/.test(CPassword) || !/[0-9]/.test(CPassword) && !/[a-zA-Z]/.test(NPassword) || !/[0-9]/.test(NPassword)) {
        req.flash('error', 'Password must contain at least one letter and one number.');
        return res.redirect('/signup');
    }
    try {
        if (CPassword === NPassword) {
            const userData = new userCollection({
                UserN: req.body.UserN,
                UserE: req.body.UserE,
                NPassword: req.body.NPassword,
                CPassword: req.body.CPassword
            });
    
            const postData = await userData.save();
            req.flash('success', 'User created');
            res.redirect('/login');
        }
        else {
            req.flash('error', 'Passwords do not match');
            res.redirect('/signup');
        }
    } catch (error) {
        req.flash('error', 'Server error: ' + 'duplicate error');
        res.redirect('/signup');
    }
})

app.post('/loginPage', async (req, res) => {
    const CPassword = req.body.CPassword;
    const UserN = req.body.UserN;
    const getUserN = await userCollection.findOne({UserN: UserN});
    // console.log(getUserN.CPassword);
    // res.send(getUserN.CPassword);
    try {
        if(getUserN) {
            if(getUserN.CPassword === CPassword) {
                req.flash('user', 'Welcome ' + UserN);
                res.redirect('/ticketview');
            }
            else {
                req.flash('error', 'Wrong password! Please try again.');
                res.redirect('/login');
            }
        }
        else {
            req.flash('error', 'User not found. Please check your username and try again.');
            res.redirect('/login');
        }
    } catch (error) {
        req.flash('error', 'Server error: ' + 'error');
        res.redirect('/login');
    }
})

app.get('/login', (req,res) => {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');
    res.render('login', { successMessage, errorMessage });
})

app.post('/login', (req,res) => {
    res.render('login');
})

app.get('/ticketview', (req,res) => {
    const userMessage = req.flash('user');
    res.render('ticketview', { userMessage });
})

app.get('/ticketbooking', (req,res) => {
    res.render('ticketbooking');
})

app.listen(port, ()=>{
    console.log(`lisenting to the port ${port}`);
})