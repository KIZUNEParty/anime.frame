let exp = require('express')
let path = require('path')
let cors = require('cors')
let app = exp()
let wPort = 8090

app.set('views', path.join(__dirname, 'views'))
app.use(exp.static(__dirname + '/public'))
app.set('view engine', 'jade')

app.use(cors())

let forFree = {
    origin: '*',
    optionsSuccessStatus: 200
}

function homePage(req, res) {
    res.render('index.jade')
}

function docs(req, res) {
    res.render('docs.jade')
}

app.get('/', homePage)
app.get('/docs', docs)

app.listen(wPort, () => {
    console.log('Express starting @ http://localhost:' + wPort);
})