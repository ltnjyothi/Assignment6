const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS notes (
  note_ID INT NOT NULL AUTO_INCREMENT,
  uname VARCHAR(255) NOT NULL,
  note VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(note_ID)
); `
await con.query(sql);
}
createTable();

async function create(note) {

const sql = `INSERT INTO notes (uname, note)
  VALUES ("${note.uname}","${note.note}");
`

await con.query(sql);
return {success:"Note Added"};
}
async function getNote(note) {
  let sql;
  
    sql = `
      SELECT * FROM notes
       WHERE note_ID = ${note.note_ID}
    `
  
  return await con.query(sql);  
  }
async function getAllNotes() {
    const sql = "SELECT * FROM notes;";
    let notes = await con.query(sql);
    console.log(notes)
    return notes;
   }
async function editNote(note) {
  let sql = `UPDATE notes 
    SET note = "${note.note}"
    WHERE note_ID = ${note.note_ID}
  `;
  
  await con.query(sql);
  let updatedNote = await getNote(note);
  return updatedNote[0];
  }
async function deleteNote(note) {
  let sql = `DELETE FROM notes
    WHERE note_ID = ${note.note_ID}
  `
  await con.query(sql);
  }
 /* if(user&&notedata) getallnotes();

function getallnotes(){
    let textdata=document.getElementById('textnotes');
    fetchData("/notes/getnote",user,"POST")
    .then((data) => {
 console.log(data);
 for(let i=0;i<data.length;i++){
 textdata.value+=data[i].notecontent;
 }

    })
}
*/
module.exports = {getNote, getAllNotes, create, deleteNote, editNote};