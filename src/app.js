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
    res.render('signup');
})

app.post('/signup', (req,res) => {
    res.render('signup');
})

app.post('/userdetails', async (req, res) => {
    const NPassword = req.body.NPassword;
    const CPassword = req.body.CPassword;
    const UserN = req.body.UserN;
    const UserE = req.body.UserE;
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
        req.flash('error', 'Server error: ' + error.message);
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
        if(getUserN.CPassword === CPassword) {
            res.redirect('/ticketview');
        }
        else {
            res.redirect('./login');
        }
    } catch (error) {
        res.redirect('/login');
    }
})

app.get('/login', (req,res) => {
    res.render('login');
})

app.post('/login', (req,res) => {
    res.render('login');
})

app.get('/ticketview', (req,res) => {
    res.render('ticketview');
})

app.get('/ticketbooking', (req,res) => {
    res.render('ticketbooking');
})

app.listen(port, ()=>{
    console.log(`lisenting to the port ${port}`);
})