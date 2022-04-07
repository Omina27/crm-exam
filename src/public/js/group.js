
//=====================modalka=============================
const modal = document.getElementById("modal");
const btn = document.getElementById("addBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





const courseSelectGr = document.querySelector('#courseNameSelectGroup');
const teacherSelectGr = document.querySelector('#courseNameSelectTeacher');

courseSelectGr.addEventListener("change", (e) => {
  let value = e.target.value;
  fetch("/api/v2")
    .then((res) => res.json())
    .then((data) => {
      allTeachers(data);
      console.log(data);

      function allTeachers(teachers) {
        teacherSelectGr.innerHTML = "";
        const foundTeacher = teachers.filter((e) => e.courseName == value);
        console.log(foundTeacher);
        if (foundTeacher) {
          foundTeacher.map((teacher) => {
            const { name } = teacher;
            let option = document.createElement("option");

            option.value = name;
            option.innerHTML = name;
            return teacherSelectGr.appendChild(option);
          });
        }
      }
    });
});


