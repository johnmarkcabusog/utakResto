import React from "react";
import "./style.css";
import UtakLogo from "../../assets/utak-logo.svg";
import MenuForm from "./components/MenuForm";
import { Formik } from "formik";
import { formInitialValues } from "./constants";
import validationSchema from "./validationSchema";
import MenuTable from "./components/MenuTable";
import { Button, Grid, Drawer } from "@mui/material";
import { Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openAddMenuDrawer } from "../../redux/actions/productActions";

const Home = () => {
  const openDrawer = useSelector((state) => state.appState.openAddMenuDrawer.open);
  const dispatch = useDispatch();
  console.log("opendat", openDrawer)
  const handleCloseDrawer= ()=>{
    dispatch(
      openAddMenuDrawer({ open: false, action: "add", id: 0 })
    );
  }
  return (
    <div className="parent-container">
      <div className="header-section">
        <img className="utak-logo" src={UtakLogo} alt="utak-logo" />
        <div className="company-name">UTAK RESTAURANT</div>
      </div>

      <div>
        <Container>
          <Button
            style={{
              marginBottom: 20,
              backgroundColor: "#62bbc2",
              fontWeight: "bold",
              float: "right",
            }}
            variant="contained"
            onClick={() => {
              dispatch(
                openAddMenuDrawer({ open: true, action: "add", id: 0 })
              );
            }}
          >
            Add Item &nbsp; <AddIcon />
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="menu-table">
                <MenuTable />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={handleCloseDrawer}
      >
        <div className="menuform-drawer">
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={formInitialValues}
            onSubmit={() => {
              //here
            }}
          >
            {(props) => <MenuForm {...props} handleCloseDrawer={handleCloseDrawer}/>}
          </Formik>
        </div>
      </Drawer>
    </div>
  );
};
export default Home;
