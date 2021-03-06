const fs = require('fs');
const path = require('path');
const express = require('express');
const app = new express();
const port = 3000;

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), "utf8");
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), "utf8");
const users = JSON.parse(userData);

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended=true}));

app.get('/', function(req, res,) {res.render('index', {title: 'Account Summary', accounts: accounts}); });

app.get('/savings', function(req, res,) {res.render('account', {account: accounts.savings}); });
app.get('/checking', function(req, res,) {res.render('account', {account: accounts.checking}); });
app.get('/credit', function(req, res,) {res.render('account', {account: accounts.credit}); });

app.get('/profile', function(req, res,) {res.render('profile', {user: users[0]}); });

app.get('/transfer', function(req, res,) {res.render('transfer'); });
app.post('/transfer', function(req, res,) {res.render('transfer', {user: users[0]}); });

app.listen(port, () => console.log(`PS Project Running on port ${port}`));

