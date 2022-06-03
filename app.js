let exp = require('express')
let path = require('path')
let cors = require('cors')
let app = exp()
let wPort = 8090

let page = require('./script/page')
let digit = require('./script/digit')

// ==================================================================================================================

app.use(cors())

let forFree = {
    origin: '*',
    optionsSuccessStatus: 200
}

// ==================================================================================================================

app.set('views', path.join(__dirname, 'views'))
app.use(exp.static(__dirname + '/public'))
app.set('view engine', 'jade')

// ==================================================================================================================

app.get('/', page.homePage)

app.get('/docs', page.docs)
app.get('/docs/usage', page.usage)
app.get('/docs/contribution', page.contribution)
app.get('/docs/about', page.about)

app.get('/gallery', page.gallery)
app.get('/gallery/id', page.galleryID)

let list = require('./db/listing.json')
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

    let link = "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/animescene@main/"+digit.resPi(mal)+"/"+digit.resPi(path)+"/frame"+digit.resPi(pic)+".jpg"

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

        final = "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/animescene@main/"+digit.resPi(mal)+"/"+digit.resPi(path)+"/frame"+digit.resPi(pic)+".jpg"
    } else {
        final = "Not Found!"
    }

    res.json({
        "resp": final
    })
})

// ==================================================================================================================

app.listen(wPort, () => {
    console.log('Express starting @ http://localhost:' + wPort);
})