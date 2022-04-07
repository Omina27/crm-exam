const { read, write } = require('../libs/FS')

const GET = (_, res) => {

    const allStudents = read('users.json').filter(e => e.role == "student")
    const allCourses = read('courses.json')
    const allGroups = read('groups.json')
    
    res.render('creatStudent', {allStudents, allCourses, allGroups})
}

const POST = (req, res) => {
    const allStudents = read('users.json').filter(e => e.role == "student")

    const {name, surname, age, phoneNumber, courseName, groupName} = req.body

    allStudents.push({id: allStudents[allStudents.length - 1].id + 1, name, surname, age, phoneNumber, courseName, groupName, role: "student"})
    write('users.json', allStudents)

    res.redirect('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatStudent')
}

module.exports = {
    GET,
    POST
}