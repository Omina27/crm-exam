const { verify } = require("jsonwebtoken")
const {read} = require('../libs/FS')

const GET = (req, res) => {
    
    const allStudents = read('users.json').filter(e => e.role == "student")
    res.render('admin.ejs', {allStudents})


    const { token } = req.cookies;

    const userVerify = verify(token, "SECRET-KEY")

    if (!userVerify) {
        return res.redirect("/")
    }
    const role = userVerify.role
    if (role == "admin") {

        res.render("admin.ejs")
    } else {
        res.sendStatus(401)
    }

    
}

module.exports = {
    GET
}