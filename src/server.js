const express = require('express')
const app = express()
const path = require('path')
const cookieParser= require("cookie-parser")
const PORT = process.env.PORT || 7000
const {read , write} = require("./libs/FS")
const auth = require('./middleWare/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname, + '/public'))


app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views/'))


const homeController = require('./controllers/homeController')
const adminController = require('./controllers/adminController')
const creatTeacher = require('./controllers/creatTeacherController')
const creatCourse = require('./controllers/creatCourseController')
const creatGroup = require('./controllers/creatGroupController')
const creatStudent = require('./controllers/creatStudentController')
const teacher = require('./controllers/teacherController')
const student = require('./controllers/studentController')

app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/', homeController.GET)
app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/admin',  adminController.GET)
app.post('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/', auth, homeController.LOGIN)

app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatTeacher', creatTeacher.GET)
app.post('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatTeacher', creatTeacher.POST)

app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatCourse', creatCourse.GET)
app.post('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatCourse', creatCourse.POST)

app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatGroup', creatGroup.GET)
app.post('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatGroup', creatGroup.POST)

app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatStudent', creatStudent.GET)
app.post('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/creatStudent', creatStudent.POST)

app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/teacher', teacher.GET)
app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/student', student.GET)


app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/api', (_, res) => {
    const allGroups = read("groups.json");
    res.send(allGroups);
});
  
app.get('https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/api/v2', (_, res) => {
   const allTeachers = read("users.json");
   res.send(allTeachers);
});


app.listen(PORT, console.log(PORT))