import React, {useEffect, useState} from "react";
import "./style.css";
import UtakLogo from "../../assets/utak-logo.svg";
import MenuForm from "./components/MenuForm";
import { Formik } from "formik";
import { formInitialValues } from "./constants";
import validationSchema from "./validationSchema";
import MenuTable from "./components/MenuTable";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Drawer } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openAddMenuDrawer } from "../../redux/actions/productActions";
import StartFirebase from "../../firebaseConfig";
import { ref, set, push, onValue} from "firebase/database"

const Home = () => {
  const [db, setDb] = useState('');
  const [categories, setCategories] = useState([]);

  const openDrawer = useSelector((state) => state.appState.openAddMenuDrawer.open);
  const dispatch = useDispatch();
  
  useEffect(()=>{ // no dependency to run only once
    const db = StartFirebase()
    setDb(db);
  },[])


  useEffect(() => {
    if(db){
      const categoriesCollectionRef = ref(db, "categories")
      onValue(categoriesCollectionRef, (snapshot)=>{
        const data = snapshot.val(); // this returns a document object 
        if(data !== null){
          const list = Object.values(data).map((category)=>{
            return category;
          })
          setCategories(list);
        }
      })
    }

    //clean up code to avoid memory leaks, unsubscribe from listeners
    return ()=>{
      // console.log("Unmount")
    }

  }, [db]); // remove this dependency


  const handleCloseDrawer= ()=>{
    dispatch(
      openAddMenuDrawer({ open: false, action: "add", id: 0 })
    );
  }

  const handleSubmit = async (values)=>{
    const { has_variation, variations } = values;
    const menuCollectionRef = ref(db,"menu");
    if(!has_variation){
      const newMenuItem = push(menuCollectionRef);
      const menuItemRef = ref(db, "menu/" + newMenuItem.key);
      set(menuItemRef, { ...values, variations:[]}).then(()=>alert("YES")).catch(err=>alert("NO"))

    }else{
      const variationCollectionRef = ref(db,"variations");
      const variationIds = [];
      variations.forEach(variation=>{
        const newVariation = push(variationCollectionRef);
        const variationItemRef = ref(db, "variations/"+ newVariation.key);
        variationIds.push(newVariation.key)
         set(variationItemRef, variation);
      })
      const newMenuItem = push(menuCollectionRef);
      const menuItemRef = ref(db, "menu/" + newMenuItem.key);
      set(menuItemRef, { ...values, variations:variationIds}).then(()=>alert("YES")).catch(err=>alert("NO"))
    }
    // const menuCollectionRef = ref(db,"menu");
    // const newMenuItem = push(menuCollectionRef);
    // const menuItemRef = ref(db, "menu/"+newMenuItem.key);
    // set(menuItemRef,values).then(()=>alert("YES")).catch(err=>alert("NO"))
  
    // const variationCollectionRef = ref(db,"variations");


    // individual information
    // const dbRef = ref(db);
    // get(child(dbRef, "menu/-N9U9qykI9LmBJFRpLc6")).then((snapshot)=>{
    //   if(snapshot.exists()){
    //     console.log("snapp", snapshot.val)
    //   }
    // })
    //     const menuCollectionRef = ref(db, 'menu');
    // console.log("menu ", menuCollectionRef)
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
                <MenuTable db={db}  categories={categories}/>
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
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {(props) => <MenuForm {...props} handleCloseDrawer={handleCloseDrawer} categories={categories}/>}
          </Formik>
        </div>
      </Drawer>
    </div>
  );
};
export default Home;
