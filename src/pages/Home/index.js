import React from "react";
import "./style.css";
import UtakLogo from "../../assets/utak-logo.svg";
import MenuForm from "./components/MenuForm";
import { Formik } from "formik";
import { formInitialValues } from "./constants";
import validationSchema from "./validationSchema";

const Home = () => {

  return (
    <div className="parent-container">
      <div className="header-section">
        <img className="utak-logo" src={UtakLogo} alt="utak-logo" />
        <div className="company-name">UTAK RESTAURANT</div>
      </div>
      <div>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={formInitialValues}
          onSubmit={()=>{
            console.log("submitted")
          }}
        >{(props)=>(
          <MenuForm {...props} />)}
        </Formik>
      </div>
    </div>
  );
};
export default Home;
