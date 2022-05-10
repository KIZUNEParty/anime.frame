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

let list = require('./db/listing.json')

function homePage(req, res) {
    res.render('index.jade')
}

function docs(req, res) {
    res.render('docs.jade')
}

app.get('/', homePage)
app.get('/docs', docs)

app.get('/listing', (req, res) => {
    res.json(list)
})

app.get('/rdm', cors(forFree), (req, res) => {
    let ep = list.link
    let pat = Math.floor(Math.random() * ep)
    let path = pat - 1 + 2
    // let path = 100

    let frame = list.pic[pat].img
    let pi = Math.floor(Math.random() * frame)
    let pic = pi - 1 + 2

    function resPi(m) {
        let rePi

        if(m < 10) {
            rePi = '00000' + m
        } else if (m < 100) {
            rePi = '0000' + m
        } else if (m < 1000) {
            rePi = '000' + m
        } else if (m < 10000) {
            rePi = '00' + m
        } else if (m < 100000) {
            rePi = '0' + m
        } else if (99999 < m) {
            rePi = m
        }

        return rePi
    }

    let link = "https://ani.kitzu.me/"+resPi(path)+"/frame"+resPi(pic)+".jpg"

    res.json({
        url: link
    })
    
})

app.listen(wPort, () => {
    console.log('Express starting @ http://localhost:' + wPort);
})