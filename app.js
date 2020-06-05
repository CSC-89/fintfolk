var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var jquery = require('jquery')
var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

//FTP Client - SERVER

'use strict';

const ftp = require('basic-ftp');
const fs = require('fs');

class FTPClient {
    constructor(host = 'localhost', port = 21, username = 'anonymous', password = 'guest', secure = false) {
        this.client = new ftp.Client();
        this.settings = {
            host: host,
            port: port,
            user: username,
            password: password,
            secure: secure
        };
    }

    upload(sourcePath, remotePath, permissions) {
        let self = this;
        (async () => {
            try {
                let access = await self.client.access(self.settings);
                let upload = await self.client.upload(fs.createReadStream(sourcePath), remotePath);
                let permissions = await self.changePermissions(permissions.toString(), remotePath);
            } catch(err) {
                console.log(err);
            }
            self.client.close();
        })();
    }

    close() {
        this.client.close();
    }

    changePermissions(perms, filepath) {
        let cmd = 'SITE CHMOD ' + perms + ' ' + filepath;
        return this.client.send(cmd, false);
    }
}

module.exports = FTPClient;

//

//EMAIL
const nodemailer = require('nodemailer')
let transport = nodemailer.createTransport({
    service: '#',
    port: 587, //To be changed!
    auth: {
       user: '#',
       pass: '#'
    }
})

// MailTrap
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "5c867fdfbc3a0f",
//       pass: "15cd1d739af134"
//     }
//   });

//ROUTES
app.get('/', (req, res) => {
	res.render("message_nor")
})

app.get('/eng', (req, res) => {
	res.render("message_eng")
})

app.get('/contact', (req, res) => {
	res.render("contact")
})

app.get('/redirect', (req, res) => {
	res.render("redirect")
})

app.post("/contact", (req, res) => {

	let mailInfo = {
        name: req.body.name,
        orgName: req.body.orgName,
        email: req.body.email,
        telNum: req.body.telNum,
        subject: req.body.subject,
        message: req.body.message
    }

    let message = {
        from: `"${mailInfo.email}"`, // Sender address
        to: 'gudmund@fintfolk.no',         // List of recipients
        subject: `New Query - ${mailInfo.orgName}`, // Subject line
        html: `
        <br> 
        <h3>Subject: ${mailInfo.subject}</h3> 
        <h4>Navn: ${mailInfo.name} <br> Company: ${mailInfo.orgName} <br> Tel. Number: ${mailInfo.telNum}</h4> 
        <hr> 
        <p><br> ${mailInfo.message}</p>
        `}
    
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    })

	res.redirect("/redirect")
})


//SERVER START

app.listen(3000, () => {
	console.log("Server Up")
})