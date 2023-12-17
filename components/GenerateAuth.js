export default async function generateAuth(username, password) {
    let tok = undefined; 

    await fetch('/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
      })
      .then((res) => res.json())
      .then((res) => {
          tok = res.token; 
      }); 

      if(tok == undefined)
        return false;
        
      localStorage.setItem("token", tok); 
      return true; 

      
}