import React from "react";
import MenuForm from "../MenuForm";
import { Formik } from "formik";
import { defaultVariation, formInitialValues } from "../../constants";
import validationSchema from "../../validationSchema";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openAddMenuDrawer } from "../../../../redux/actions/productActions";
import { addNewItem, updateItem } from "../../utils";

const DrawerForm = ({ db, categories }) => {
  const openDrawer = useSelector(
    (state) => state.appState.openAddMenuDrawer.open
  );
  const drawerAction = useSelector(
    (state) => state.appState.openAddMenuDrawer.action
  );
  const menuData = useSelector(
    (state) => state.appState.openAddMenuDrawer.data
  );

  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(openAddMenuDrawer({ open: false, action: "add", id: 0 }));
  };

  const handleSubmit = async (values) => {
    if (drawerAction === "add") {
      addNewItem({ values, db });
    } else {
      // update
      updateItem({ values, db });
    }
  };

  let initial = drawerAction === "add" ? formInitialValues : menuData;

  if (initial.variations.length === 0) {
    initial.variations = [defaultVariation];
  }

  return (
    <Drawer anchor={"right"} open={openDrawer} onClose={handleCloseDrawer}>
      <div className="menuform-drawer">
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={initial}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(props) => (
            <MenuForm
              {...props}
              handleCloseDrawer={handleCloseDrawer}
              drawerAction={drawerAction}
              categories={categories}
            />
          )}
        </Formik>
      </div>
    </Drawer>
  );
};
export default DrawerForm;
