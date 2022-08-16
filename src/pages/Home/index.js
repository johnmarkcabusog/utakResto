import React, {useEffect, useState} from "react";
import "./style.css";
import UtakLogo from "../../assets/utak-logo.svg";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { openAddMenuDrawer } from "../../redux/actions/productActions";
import StartFirebase from "../../firebaseConfig";
import { ref, onValue, off} from "firebase/database"
import CollapsibleTable from "./components/CollapseMenuTable";
import DrawerForm from "./components/DrawerForm";
import CategoryModal from "./components/CategoryModal";

const Home = () => {
  const [db, setDb] = useState('');
  const [categories, setCategories] = useState([]);
  const openDrawer = useSelector((state) => state.appState.openAddMenuDrawer.open);
  const openModal = useSelector((state) => state.appState.openCategoryModal.open);

  const dispatch = useDispatch();
  
  useEffect(()=>{ // no dependency to run only once
    const db = StartFirebase()
    setDb(db);
    
  },[])
  

  useEffect(() => {
    const listener = () => {
      if(db){
      const categoriesCollectionRef = ref(db, "categories")
      return onValue(categoriesCollectionRef, (snapshot)=>{
        const data = snapshot.val(); // this returns a document object 
        if(data !== null){
          const list = Object.values(data).map((category)=>{
            return category;
          })
          setCategories(list);
        }
      })
      }
    }
    listener()
    return ()=>{ // we have to detach listener on unmount when not in use
      if(db){
        const categoriesCollectionRef = ref(db, "categories")
        off(categoriesCollectionRef,listener);
      }
    }
  }, [db]); 

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
                <CollapsibleTable  db={db}  categories={categories}/>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      {openDrawer && (<DrawerForm db={db} categories={categories}/>)}
      {openModal && (<CategoryModal db={db} categories={categories}/>)}
    </div>
  );
};
export default Home;
