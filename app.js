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

function homePage(req, res) {
    res.render('index.jade')
}

function docs(req, res) {
    res.render('docs/index.jade')
}

function usage(req, res) {
    res.render('docs/usage.jade')
}

function contribution(req, res) {
    res.render('docs/contribution.jade')
}

function about(req, res) {
    res.render('docs/about.jade')
}

app.get('/', homePage)
app.get('/docs', docs)
app.get('/docs/usage', usage)
app.get('/docs/contribution', contribution)
app.get('/docs/about', about)

app.get('/listing', (req, res) => {
    res.json(list)
})

app.get('/rdm', cors(forFree), (req, res) => {
    let call = list
    let callMAL = Math.floor(Math.random() * call.link)

    let mal = call.list[callMAL].mal
    
    let ep = call.list[callMAL].ep

    let pat = Math.floor(Math.random() * ep)
    let path = pat - 1 + 2

    let frame = call.frame[callMAL].ep[pat].frame

    let pi = Math.floor(Math.random() * frame)
    let pic = pi - 1 + 2

    let link = "https://ani.kitzu.me/"+resPi(mal)+"/"+resPi(path)+"/frame"+resPi(pic)+".jpg"

    res.json({
        url: link
    })
    
})

app.get('/rdm/:mal', cors(forFree), (req,res) => {
    let search = req.params.mal
    let call = list
    let mal

    for(i=0; i<call.link; i++){
        if (search == call.list[i].mal) {
            console.log("Found!");
            mal = call.list[i].mal
            break;
        }
    }

    let final;

    if (i < call.link) {
        let path = Math.floor(Math.random() * call.list[i].ep)

        let pic = Math.floor(Math.random() * call.frame[i].ep[path].frame)

        final = "https://ani.kitzu.me/"+resPi(mal)+"/"+resPi(path)+"/frame"+resPi(pic)+".jpg"
    } else {
        final = "Not Found!"
    }

    res.json({
        "resp": final
    })
})

app.listen(wPort, () => {
    console.log('Express starting @ http://localhost:' + wPort);
})