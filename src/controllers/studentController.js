const { verify } = require("jsonwebtoken");
// const { signUser } = require('../lib/Jwt')

const { read, write } = require("../libs/FS");

const GET = (req, res) => {
  const { token } = req.cookies;
  const teacher =  verify(token, 'SECRET-KEY')
  const teacherFilter = teacher.name

  if (!token) {
    return res.redirect("/");
  } else {
    const verifiedUser = verify(token, "SECRET-KEY");
    const role = verifiedUser.role;
    if (role == "teacher") {
      const allUsers = read("users.json")
      const allGroups = read("group.json")
      const allStudents =  allUsers.filter(e => e.role == "student")

      const foundGroup = allGroups.filter(e => e.name == teacherFilter);
      let teacherStudents = []
      for(i=0;i<foundGroup.length; i++){
        for(j=0;j<allStudents.length; j++){
            if(foundGroup[i].groupName == allStudents[j].groupName){
                teacherStudents.push(allStudents[j])
            }
        }
    }
    console.log( teacherStudents);
          
      res.render('student.ejs', {
        userFilter,
        groups: foundGroup, teacherStudents
      })
    } else if (role == "admin") {
      res.redirect("https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/admin");
    } else if (role == "student") {
      res.redirect("https://dashboard.heroku.com/apps/crm-exam-app/deploy/github/student");
    }
  }
};

module.exports = {
  GET,
};
