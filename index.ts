#! /usr/bin/env node
import inquirer from "inquirer";

type Student = {
  name: string;
  id: string;
  grade: string;
};

let student_info: Student[] = [];
let condition = true;

while (condition) {
  let student_input = await inquirer.prompt([
    {
      message: "Enter Student's Name",
      type: "input",
      name: "name",
    },
    {
      message: "Enter Student ID",
      type: "input",
      name: "id",
    },
  ]);

  let grade_choice = await inquirer.prompt([
    {
      name: "grade",
      type: "input",
      message: "Enter Student's Grade",
    },
    {
      name: "confirm",
      type: "confirm",
      message: "Do you want to enter another student?",
      default: true,
    },
  ]);

  student_info.push({
    name: student_input.name,
    id: student_input.id,
    grade: grade_choice.grade,
  });

  console.log("Current list of students:", student_info);

  condition = grade_choice.confirm;

  if (!condition) {
    let edit_choice = await inquirer.prompt({
      name: "edit",
      type: "list",
      choices: ["Yes", "No"],
      message: "Do you want to make any changes?",
      default: "Yes",
    });

    if (edit_choice.edit === "Yes") {
      let select = await inquirer.prompt({
        name: "action",
        type: "list",
        choices: ["Remove Student", "View List of Students"],
        message: "Select Your Choice",
      });

      if (select.action === "View List of Students") {
        console.log("Current list of students:", student_info);
      } else if (select.action === "Remove Student") {
        let remove = await inquirer.prompt({
          name: "remove_id",
          type: "input",
          message: "Enter the ID of the student you want to remove",
        });

        student_info = student_info.filter(student => student.id !== remove.remove_id);
        console.log("Updated list of students:", student_info);
      }
    }
  }
}

console.log("Final list of students:", student_info);

