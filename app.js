var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var jquery = require('jquery')
var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


//ROUTES
app.get('/', (req, res) => {
	res.render("home_nor")
})

app.get('/eng', (req, res) => {
	res.render("home_eng")
})


//SERVER START

app.listen(3000, () => {
	console.log("Server Up")
})