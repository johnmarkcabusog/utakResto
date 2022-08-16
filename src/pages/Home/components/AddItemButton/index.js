import React from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Button  from "@mui/material/Button";
import { openAddMenuDrawer } from "../../../../redux/actions/productActions";

const AddItemButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      style={{
        marginBottom: 20,
        backgroundColor: "#62bbc2",
        fontWeight: "bold",
        float: "right",
      }}
      variant="contained"
      onClick={() => {
        dispatch(openAddMenuDrawer({ open: true, action: "add", id: 0 }));
      }}
    >
      Add Item &nbsp; <AddIcon />
    </Button>
  );
};

export default AddItemButton