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

module.exports = {homePage, docs, usage, contribution, about}