const {read, write} = require('../libs/FS')

const GET = (_, res) => {

    const allCourses = read('courses.json')
    res.render('creatCourse', {allCourses})
}

const POST = (req, res) => {
    const allCourses = read('courses.json')
    const {courseName, desc} = req.body
   
    allCourses.push({id: allCourses[allCourses.length -1].id + 1, courseName, desc})

    write("courses.json", allCourses)
    
    res.redirect('/creatCourse')

}

module.exports = {
    GET,
    POST
}


