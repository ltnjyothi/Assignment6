const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS notes (
  note_ID INT NOT NULL AUTO_INCREMENT,
  emailid VARCHAR(255) NOT NULL,
  notes VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(note_ID)
); `
await con.query(sql);
}
createTable();

async function create(note) {

const sql = `INSERT INTO notes (emailid, notes)
  VALUES ("${note.emailid}","${note.notes}");
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
    SET notes = "${note.notes}"
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

module.exports = {getNote, getAllNotes, create, deleteNote, editNote};