//{ fetchData, getCurrentUser, setCurrentUser } from './main.js'
//document.getElementById("btn-users").addEventListener('click', getUsers);
async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data) 
    });
    if(response.ok) {
      return await response.json(); 
    } else {
      throw await response.json();
    }
  } 
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click',removeCurrentUser)

 function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  
 function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  

 function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href = "login.html";
  }
function getUsers() {
  fetch("http://localhost:3000/users/")
  .then((res)=> res.json())
  .then((data) => console.log(data))
  .catch((err)=> console.log(err))
}
class NoteM
{
    constructor(FN,LN,UN,pwd,notet)
    {
    this.fname=FN;
    this.lname=LN;
    this.uname=UN;
    this.password=pwd;
    this.note=notet;
    }
    getfname(){
        return this.fname;
    }
    getlname(){
        return this.lname;
    }
    getuname(){
        return this.uname;
    }
    getpassword()
    {
        return this.password;
    }
    getnotet()
    {
      return this.note;
    }
    setfname(FN){
        this.fname=FN;
    }
    setlname(LN){
        this.lname=LN;
    }      
    setuname(UN){
        this.uname=UN;
    }
    setpassword(pwd)
    {
        this.password=pwd;
    }
    setnotet(noter)
    {
      this.note=noter;
    }
}



let register1=document.getElementById("formreg");
if(register1) register1.addEventListener('submit',breg)

function registeration(r){
   let FirstName= document.getElementById("fname").value;
   let LastName=document.getElementById("lname").value;
   let UserName=document.getElementById("uname").value;
   let password2=document.getElementById("password").value;
   
   let regi= new NoteM(FirstName,LastName,UserName,password2);
   /*regi.setfname(`${FirstName}`);
   regi.setlname(`${LastName}`);
   regi.setuname(`${UserName}`);
   regi.setpassword(`${password2}`);*/
   fetchData("/users/register",regi,"POST").then((data) => {
    setCurrentUser(data);
  })
  .catch((err) =>{
    let p = document.querySelector('error');
    p.innerHTML = err.message;
  });
   
   console.log(regi.getfname());
   console.log(regi.getlname());
   console.log(regi.uname());
   console.log(regi.getpassword());
}

let loginform= document.getElementById("login");
if(loginform) loginform.addEventListener('submit',loginuser)

function loginuser(e){
let nuser=document.getElementById("uname").value;
let password10=document.getElementById("password").value;

let login1=new NoteM(nuser,password10);
/*login1.setuname(`${nuser}`);
login1.setpassword(`${password10}`);*/
fetchData("/users/login",login1,"POST").then((data) => {
  setCurrentUser(data);
})
.catch((err) =>{
  let p = document.querySelector('error');
  p.innerHTML = err.message;
});
console.log(login1.getuname());
console.log(login1.getpassword());
}

let noteform= document.getElementById("notemaking");
if(noteform) noteform.addEventListener('submit',noten)

function noten(b){
   let note_text= document.getElementById("note").value;
   if(note_text==""){
    return;
   }
   let usr1= getCurrentUser();
   fetchData("/notes/create",{"uname":user.uname,"note":note_text},"POST").then((data) => {
    window.location.href = "note.html";
  })
  .catch((err)=> {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}
let notes = document.querySelector('notes');
if(notes&&getCurrentUser()) {
  let usr1= getCurrentUser();
  notes.innerHTML = `
    <ul>
  `
  fetch("http://localhost:3000/notes/")
  .then((res)=> res.json())
  .then((data) => {
    for (const note in data) {
      console.log(data[note]+" "+usr1.uname);
      if (data[note].uname==usr1.uname) {
        notes.innerHTML = notes.innerHTML+`
          <li>${data[note].note}</li>
        `
      }
    }
  })
  .catch((err)=> {
    let p = document.querySelector('notes');
    p.innerHTML = err.message;
  })
  notes.innerHTML = notes.innerHTML+`
    </ul>
  `
} else {
  if(notes) window.location.href = "login.html";
}