import React from "react"
import NavbarUser from "./NavbarUser"
import SoarLogo from "../images/SoarLogo.svg"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function CreateAccountUser() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   // Change values based on event, the event being the form input
   const onChangeEmail = (e) => {
      const email = e.target.value
      setEmail(email)
   }
   const onChangePassword = (e) => {
      const password = e.target.value
      setPassword(password)
   }

   // const createUser = (event) => {

   //   event.preventDefault()
   //   var myHeaders = new Headers();
   //   myHeaders.append("Content-Type", "application/json");

   //   let please = JSON.stringify({
   //     email: email,
   //     password: password
   // })
   // let urlencoded = please

   function createUser(event) {
      event.preventDefault()
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      var requestOptions = {
         method: "POST",
         headers: myHeaders,
         body: JSON.stringify({ email: email, password: password }),
         // redirect: 'follow'
         credentials: "include",
      }

      fetch("/api/users/create", requestOptions)
         .then((response) => {
            if (response.status == 200) {
               console.log(response)
               alert("Success! You have now created an account.")
               // setCookie('email', email, { path: '/' });
               // setCookie('password', password, { path: '/' });
               window.location.href = "Login"
               return
            }
            //IF invalid password, do something to tell user
            // else {
            //   alert("Invalid password, try again.");
            // }
            // window.location.href= "IndexUser";
         })
         .catch((e) => {
            // console.log(bodyContent)
            console.log(e)
            alert("Sorry, something isn't right")
            return
         })
   }

   return (
      <div>
         <div className="row register-form">
            <div className="col-md-8 offset-md-2">
               <form
                  className="custom-form"
                  //  onSubmit={createUser}
               >
                  <img src={SoarLogo} height={40} />
                  <h1>Create Account</h1>
                  <div className="row form-group">
                     <div className="col-sm-4 label-column">
                        <label className="col-form-label" for="name-input-field">
                           First Name
                        </label>
                     </div>
                     <div className="col-sm-6 input-column">
                        <input
                           className="form-control"
                           type="text"
                           for="name-input-field"
                          pattern="[A-Za-z0-9\-_\.\@]{4,20}" 
                          title="two or more characters"
                          required                           // value= {text}
                        />
                     </div>
                     <div className="col">
                        <div className="row form-group" id="LastNameRow">
                           <div className="col-sm-4 label-column">
                              <label className="col-form-label" for="name-input-field">
                                 Last Name
                              </label>
                           </div>
                           <div className="col-sm-6 input-column">
                              <input
                                 className="form-control"
                                 type="text"
                                 for="name-input-field"
                                pattern="[A-Za-z0-9\-_\.\@]{4,20}" 
                                title="two or more characters"
                                required
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row form-group">
                     <div className="col-sm-4 label-column">
                        <label className="col-form-label" for="email-input-field">
                           Email{" "}
                        </label>
                     </div>
                     <div className="col-sm-6 input-column">
                        <input
                           className="form-control"
                           type="email"
                           name="email"
                           placeholder="Email"
                           pattern="[A-Za-z0-9\-_\.\@]{4,20}" title="Four or more characters"
                           required="[A-Za-z0-9\-_\.\@]{4,20}"
                           value={email}
                           onChange={onChangeEmail}
                        />
                     </div>
                  </div>
                  <div className="row form-group"></div>
                  <div className="row form-group">
                     <div className="col-sm-4 label-column">
                        <label className="col-form-label" for="pawssword-input-field">
                           Password{" "}
                        </label>
                     </div>
                     <div className="col-sm-6 input-column">
                        <input
                           className="form-control"
                           type="password"
                           name="password"
                           pattern="[A-Za-z0-9\-_\.\@]{4,20}" title="Four or more characters"
                           // required="[A-Za-z0-9\-_\.\@]{4,20}"
                           required
                           placeholder="Password"
                           value={password}
                           onChange={onChangePassword}
                        />
                     </div>
                  </div>
                  {/* <div className="row form-group">
              <div className="col-sm-4 label-column">
                <label
                  className="col-form-label"
                  for="repeat-pawssword-input-field"
                >
                  Repeat Password{" "}
                </label>
              </div>
              <div className="col-sm-6 input-column">
                <input className="form-control" type="password" />
              </div>
            </div> */}
                  <div className="form-check">
                     <input className="form-check-input" type="checkbox" id="formCheck-1" />
                     <label className="form-check-label" for="formCheck-1">
                        I've read and accept the terms and conditions
                     </label>
                  </div>
                  <button
                     className="btn btn-light submit-button"
                     type="button"
                     id="submitFormButton"
                     data-bs-target="../access/login.html"
                     onClick={createUser}>
                     Create Account
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}
