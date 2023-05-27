
// const browserify_fs = require("broswerify-fs");
// const registerButton = document.getElementById("register");

// // add a click event listener to the button
// registerButton.addEventListener("click", function(event) {
//     // prevent the default form submission behavior
//     event.preventDefault();
// });

// // Get user data from the form
// const userName = document.getElementById('UserN').value;
// const userEmail = document.getElementById('UserE').value;
// const userPassword = document.getElementById('NPassword').value;


// // Create a new user object
// const newUser = {
//   name: userName,
//   email: userEmail,
//   password: userPassword
// };

// // Read the current user data from the logins.json file
// fs.readFile("./json/logins.json", 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     // Parse the JSON data
//     const users = JSON.parse(data);

//     // Add the new user to the array
//     users.push(newUser);

//     // Convert the updated user data back to JSON
//     const updatedData = JSON.stringify(users, null, 2);

//     // Write the updated data back to the logins.json file
//     fs.writeFile("./json/logins.json", updatedData, 'utf8', (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('User added to logins.json');
//       }
//     });

//       // redirect to the login page after the form data is saved
//       window.location.href = './login.html';
//   }
// });