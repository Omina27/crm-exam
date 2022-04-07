const {read, write} = require('../libs/FS')

const GET = (req, res) => {
    const allcourse = read("courses.json")
    
    const teacher = read('users.json').filter(e=> e.role=="teacher")
    console.log(teacher); 
    res.render('creatTeacher.ejs',{teacher , allcourse})
}

const POST = (req, res) => {
    const {name,surname, password, phoneNumber, courseName} = req.body
    const teacher = read('users.json')

    const allTeachers = teacher

   
    allTeachers.push({id: allTeachers[allTeachers.length -1].id + 1, name, surname, password, role: "teacher", phoneNumber, courseName})

    write("users.json", allTeachers)
    
    res.redirect('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatTeacher')

}

module.exports = {
    GET,
    POST
}