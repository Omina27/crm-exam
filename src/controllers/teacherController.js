const {read} = require('../libs/FS')
const { verify } = require("jsonwebtoken")

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
        const allGroups = read("groups.json")
    
        const allStudents =  allUsers.filter(e => e.role == "student")
  
        const foundGroup = allGroups.filter(e => e.teacher == teacherFilter);
        let teacherStudents = []
        for( i = 0; i < foundGroup.length; i++){
          for(a =0;j<allStudents.length; j++){
              if(foundGroup[i].groupName == allStudents[j].groupName){
                  teacherStudents.push(allStudents[j])
              }
          }
      }
    
         
        res.render('teacher.ejs', {
          teacherFilter,
          groups: foundGroup,  teacherStudents
        })
      } else if (role == "admin") {
        res.redirect("/admin");
      } else if (role == "student") {
        res.redirect("/student");
      }
    }
  };

// const GET = (req, res) => {

//     const { token } = req.cookies;

//     const userVerify = verify(token, "SECRET-KEY")
//     console.log(userVerify);

//     const groups = read('groups.json')
//     const users = read('users.json')

//     if (!userVerify) {
//         return res.sendStatus(401)
//     }
//     const role = userVerify.role
//     if (role == "teacher") {
//         res.render('teacher.ejs')
//     } else {
//         res.sendStatus(401)
//     }

//     res.render('teacher.ejs', {groups, users})
//     res.redirect('/teacher')
    
// }


module.exports = {
    GET
}