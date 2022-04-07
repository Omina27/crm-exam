const { read } = require("../libs/FS")
const { sign } = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const { userName, password } = req.body

    const foundUser = read("users.json").find(e => e.name == userName && e.password == password)

    console.log(foundUser);
    
    if (!foundUser) {
        return res.status(401).send("You have no access token")
    }
    const { id, role } = foundUser

    res.cookie("token", sign({ id, role }, "SECRET-KEY"))

    req.body.role = foundUser.role

    next()
}