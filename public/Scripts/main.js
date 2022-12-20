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