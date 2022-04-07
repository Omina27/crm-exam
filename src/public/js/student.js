
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





const courseSelectGr = document.querySelector('#courseNameSelectStudent');
const groupNameSelectStudent = document.querySelector('#groupNameSelectStudent');

courseSelectGr.addEventListener("change", (e) => {
  let value = e.target.value;
  fetch("/api/v2")
    .then((res) => res.json())
    .then((data) => {
      allGroups(data);
      console.log(data);

      function allGroups(groups) {
        groupNameSelectStudent.innerHTML = "";
        console.log(groupNameSelectStudent);
        const foundGroup = groups.filter((e) => e.courseName == value);
      
        if (foundGroup) {
          foundGroup.map((gr) => {
            const { groupName } = gr;
            console.log(groupName);
            let option = document.createElement("option");

            option.value = groupName;
            option.innerHTML = groupName;
            return groupNameSelectStudent.appendChild(option);
          });
        }
      }
    });
});


