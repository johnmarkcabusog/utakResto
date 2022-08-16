import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { openCategoryModal } from "../../../redux/actions/productActions";
import { addCategory } from "../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CategoryModal = ({ db, categories }) => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const openModal = useSelector( (state) => state.appState.openCategoryModal.open);
  const isValid = category.trim() !== "";
  const handleClose = ()=>{
    dispatch(openCategoryModal({open:false}))
  }

  const handleSubmit = async () => {
    await addCategory(db,category);
    alert("Category Added");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <TextField
            id="new_category"
            name="new_category"
            label="Menu Category"
            variant="standard"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth={true}
          />
          <Button
            color="primary"
            style={{ marginTop: 10, float: "right" }}
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default CategoryModal;
