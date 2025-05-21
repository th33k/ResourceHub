import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
   <div>
     <div>Register</div>
     <form action="">
         <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
         </div>
         <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
         </div>
         <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
         </div>
         <button type="submit">Register</button>
         <Link to="/login"><button>Back</button></Link>
     </form>
   </div>
  )
}

export default Register