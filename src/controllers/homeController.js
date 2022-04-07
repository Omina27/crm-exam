const LOGIN = (req, res) => {
    const { role } = req.body

    role == "admin" ? res.redirect("https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/admin") :
        role == "teacher" ? res.redirect("https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/teacher") :
            role == "student" ? res.redirect("https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/student") :
                
                null
}

const GET = (_, res) => {
    res.render('home')
}

module.exports = { 
    GET,
    LOGIN
}