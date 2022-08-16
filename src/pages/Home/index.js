import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import "./style.css";
import UtakLogo from "../../assets/utak-logo.svg";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import StartFirebase from "../../firebaseConfig";
import CollapsibleTable from "./components/CollapseMenuTable";
import DrawerForm from "./components/DrawerForm";
import CategoryModal from "./components/CategoryModal";
import DeleteModal from "./components/DeleteModal";
import InfoAlert from "./components/InfoAlert";
import AddItemButton from "./components/AddItemButton";
import { ref, onValue, off} from "firebase/database"

const Home = () => {
  const [db, setDb] = useState('');
  const [categories, setCategories] = useState([]);
  const openDrawer = useSelector((state) => state.appState.openAddMenuDrawer.open);
  const openModal = useSelector((state) => state.appState.openCategoryModal.open);
  const openDeleteModal = useSelector( (state) => state.appState.openDeleteModal.open);
  const openAlert = useSelector( (state) => state.appState.openInfoAlert.open);
  
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
        <Container maxWidth="xl">
          <AddItemButton/>
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
      {openDeleteModal && (<DeleteModal db={db} />)}
      {openAlert && (<InfoAlert/>)}

    </div>
  );
};
export default Home;
