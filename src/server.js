const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const https = require('https');
const invite = require('./invite');
const path = require('path');
const app = express();

dotenv.config();

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { inviteLink:invite.getLink(), githubLink: process.env.GITHUB_LINK });
});

console.log(invite.getLink());
app.listen(PORT);