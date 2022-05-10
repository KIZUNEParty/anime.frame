let exp = require('express')
let path = require('path')
let app = exp()
let wPort = 8090

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

function homePage(req, res) {
    res.render('index.jade')
}

app.get('/', homePage)

app.listen(wPort, () => {
    console.log('Express starting @ http://localhost:' + wPort);
})