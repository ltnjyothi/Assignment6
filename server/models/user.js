const users = [
  {
      FName:"jyothi",
      LName:"paladi",
      Email_ID: "paladi@gmail.com",
       Password: "12345"
  },
  {
      user: "paladi",
       Password: "12345"
    
  },
];


const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  USER_ID INT NOT NULL AUTO_INCREMENT,
  FName VARCHAR(255) NOT NULL,
  LName VARCHAR(255) NOT NULL,
  Email_ID VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(USER_ID)
); `
await con.query(sql);
}
createTable();

async function enroll(user) {
let cUser = await getUserinfo(user.Email_ID);
console.log(user)
if(cUser.length > 0) throw error("This email is already in use");

const sql = `INSERT INTO users (FName,LName,Email_ID, Password)
  VALUES ("${user.FName}", "${user.LName}","${user.Email_ID}","${user.Password}");
`
await con.query(sql);
return await login(user);
}

async function userupdate(user) {
  let sql = `UPDATE users 
    SET Email_ID = "${user.Email_ID}"
    WHERE USER_ID = ${user.USER_ID}
  `;
  
  await con.query(sql);
  let updatedUser = await +(user);
  return updatedUser[0];
  }
async function getUserinfo(user) {
  let sql;
  
  if(user.USER_ID) {
    sql = `
      SELECT * FROM users
       WHERE USER_ID = ${user.USER_ID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE Email_ID = "${user.Email_ID}"
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
  console.log(user.Email_ID);
let cUser = await getUserinfo(user); 

if(!cUser[0]) throw Error(user.Email_ID+" email not found");
if(cUser[0].Password !== user.Password) throw Error("Password incorrect");
console.log(cUser[0]);

return cUser[0];
}





module.exports = {enroll, userupdate, removeUser, login  };