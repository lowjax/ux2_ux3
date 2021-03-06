import React from "react"
import NavbarUser from "./NavbarUser"
import Climbing from "../images/climbing.svg"
import Skateboard from "../images/skateboard.svg"
import Surf from "../images/surf.svg"
import ContentListUser from "./ContentListUser"
import { Link } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useFormik } from "formik"

export default function SelectionUser(bodyPart) {
   const [openModal, setOpenModal] = React.useState(false)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [sportSelect, setSport] = useState("")
   const [injury, setInjury] = useState("")

   let formik = useFormik({
      initialValues: {
         injurySelect: "",
      },
      // validationSchema: validateFields,
      // onSubmit: (values) => {
      //   alert("form submitted");
      // },
   })

   function filterContent() {
      console.log(injury)

      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json", "Access-Control-Allow-Origin", "*")

      var requestOptions = {
         // method: 'GET',
         // headers: myHeaders,
         // body: urlencoded,
         // redirect: 'follow'
         credentials: "include",
      }

      fetch("https://soar-backend.herokuapp.com/api/injury" + sportSelect, requestOptions)
         .then((response) => {
            console.log(response)
            console.log(formik.values.injurySelect)
            
            
            if (response.status == 200) {
               console.log(response)

               alert("Success! have selected injury type.")
               setOpenModal(true)
               setInjury(response)
               console.log(setInjury)
               // setOpenModal(true)
               // window.location.href = "ContentListUser"
               return
            }
         })
         .then((data) => {
            // JSON.response
            console.log(data)
         })
         .catch((e) => {
            // console.log(bodyContent);
            console.log(e)
            alert("Sorry, something isn't right")
            //return;
         })
         .finally(() => {
            setLoading(true)
         })
   }
   //
   useEffect(() => {}, [])
   console.log(formik.values.injurySelect)

   return (
      <>
      {!openModal && (
      <div>
         <NavbarUser />
         {loading && <Spinner animation="border" />}
         {error && <div>{`There is a problem fetching the post data - ${error}`}</div>}
         <div id="carousellContainer">
            <div className="carousel slide" data-bs-ride="carousel" id="carousel-2">
               <div className="carousel-inner">
                  <div className="carousel-item active">
                     <img className="w-100 d-block" src={Climbing} height={40} alt="Slide Image 1" />
                  </div>
                  <div className="carousel-item">
                     <img className="w-100 d-block" src={Skateboard} height={40} alt="Slide Image 2" />
                  </div>
                  <div className="carousel-item">
                     <img className="w-100 d-block" src={Surf} height={40} alt="Slide Image 3" />
                  </div>
               </div>
               <div>
                  <a className="carousel-control-prev" href="#carousel-2" role="button" data-bs-slide="prev">
                     <span className="carousel-control-prev-icon" id="spanArrow"></span>
                     <span className="visually-hidden">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carousel-2" role="button" data-bs-slide="next">
                     <span className="carousel-control-next-icon" id="spanArrow"></span>
                     <span className="visually-hidden">Next</span>
                  </a>
               </div>
               <ol className="carousel-indicators">
                  <li data-bs-target="#carousel-2" data-bs-slide-to="0" className="active"></li>
                  <li data-bs-target="#carousel-2" data-bs-slide-to="1"></li>
                  <li data-bs-target="#carousel-2" data-bs-slide-to="2"></li>
               </ol>
            </div>
         </div>
        
         <div id="selectionContainer2">
            <form className="form-inline">
               <div className="form-group">
                  <label>SELECT INJURY TYPE</label>
                  <select
                     className="form-control"
                     name="injurySelect"
                     onChange={formik.handleChange}
                     value={formik.values.injurySelect}
                     onBlur={formik.handleBlur}>
                     <option>---</option>
                     <option value="Sprain">SPRAIN</option>
                     <option value="Break">BREAK</option>
                     <option value="Tear">TEAR</option>
                  </select>
               </div>
            </form>
         </div>
         <div id="selectionContainer">
         
            <button className="btn btn-primary" id="fixMeButton" type="button" onClick={filterContent}>
               FIX ME
            </button>
       
         </div>
      </div>
   )}
    {openModal && <ContentListUser bodyPart={formik.values.content} injuryType={formik.values.injurySelect}/>}

</>
   )
}