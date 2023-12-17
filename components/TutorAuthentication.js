
import { useEffect, useState } from "react"
import Router from "next/router";

export default function TutorAuthentication(props) {
    const[error, setError] = useState(false);
    const[authenticated, setAuthenticated] = useState(false); 

    useEffect(() => {
      async function getAuthentication() {
        const token = localStorage.getItem("token");

        await fetch('/checktutor', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then((res) => {
          if(res.status == 200)
            setAuthenticated(true); 
          else
            setError(true); 
        })
        .catch (function (error) {
          setError(true); 
        });


      }

      getAuthentication(); 
    }, []);
    
    useEffect(() => {
      if(error)
        Router.push("/tutors/login"); 
    }, [error]);

    
    if (!authenticated) 
      return (
        <h2>spinner here</h2>
      ); 

    return (
      <div>
        {props.children}
      </div>
    )
}
  