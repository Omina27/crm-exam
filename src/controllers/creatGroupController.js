const {read, write} = require('../libs/FS')

const GET = (_, res) => {

    const allGroups = read('groups.json')
    const allTeachers = read('users.json').filter(e => e.role == "teacher")

    const allCourses = read('courses.json')

    res.render('creatGroup', {allGroups, allCourses, allTeachers})
   
}

const POST = (req, res) => {
    const group = read('groups.json')
    const {groupName, courseName, teacher} = req.body



    group.push({id: group[group.length -1].id + 1, groupName, courseName, teacher})

    write("groups.json", group)
    
    res.redirect('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatGroup')

}

module.exports = {
    GET,
    POST
}