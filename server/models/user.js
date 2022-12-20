/*const users = [
  {
      fname:"jyothi",
      lname:"paladi",
      uname: "paladi@gmail.com",
       password: "12345"
  },
  {
      user: "paladi",
       password: "12345"
    
  },
];
*/

const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  USER_ID INT NOT NULL AUTO_INCREMENT,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  uname VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(USER_ID)
); `
await con.query(sql);
}
createTable();

async function enroll(user) {
let cUser = await getUser(user);
console.log(user)
if(cUser.length > 0) throw error("This email is already in use");

const sql = `INSERT INTO users (fname,lname,uname,password)
  VALUES ("${user.fname}", "${user.lname}","${user.uname}","${user.password}");
`
await con.query(sql);
return await login(user);
}

async function userupdate(user) {
  let sql = `UPDATE users 
    SET uname = "${user.uname}"
    WHERE USER_ID = ${user.USER_ID}
  `;
  
  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
  }
  async function getAllUsers() {
    const sql = "SELECT * FROM users;";
    let users = await con.query(sql);
    console.log(users)
    return users;
   }
async function getUser(user) {
  let sql;
  
  if(user.USER_ID) {
    sql = `
      SELECT * FROM users
       WHERE USER_ID = ${user.USER_ID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE uname = "${user.uname}"
  `;
  }
  return await con.query(sql);  
  }
async function removeUser(user) {
    let sql = `DELETE FROM users
      WHERE USER_ID = ${user.USER_ID}
    `
    await con.query(sql);
    }
async function login(user) { 
  console.log(user.uname);
let cUser = await getUser(user); 

if(!cUser[0]) throw Error(user.uname+" email not found");
if(cUser[0].password !== user.password) throw Error("Password incorrect");
console.log(cUser[0]);

return cUser[0];
}





module.exports = {enroll, userupdate, getAllUsers, removeUser, login  };