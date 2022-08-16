import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  openDeleteModal,
  openInfoAlert,
} from "../../../redux/actions/productActions";
import { deleteItem, deleteCategory } from "../utils";

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

const DeleteModal = ({ db }) => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.appState.openDeleteModal.open);
  const id = useSelector((state) => state.appState.openDeleteModal.id);
  const entity = useSelector((state) => state.appState.openDeleteModal.entity);

  const toDelete = useSelector(
    (state) => state.appState.openDeleteModal.toDelete
  );

  const handleSubmit = async () => {
    if (toDelete === "menu") {
      await deleteItem({ db, id });
    }
    if (toDelete === "category") {
      await deleteCategory({ db, id });
    }

    dispatch(
      openInfoAlert({
        open: true,
        state: "success",
        message: "Successfully Deleted",
      })
    );
    handleClose();
  };
  const handleClose = () => {
    dispatch(
      openDeleteModal({ open: false, id: 0, toDelete: "menu", entity: "" })
    );
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
          <Typography id="modal-modal-title">
            Are you sure you want to delete&nbsp;
            <span style={{fontWeight:"bold"}}>{toDelete === "menu" ? `${entity}` : `${entity}(${toDelete})`} ?</span>
          </Typography>
          <div className="button-modal">
            <Button
              color="warning"
              variant="outlined"
              style={{ marginTop: 10, float: "right" }}
              onClick={handleClose}
            >
              No{" "}
            </Button>
            <Button
              color="primary"
              variant="outlined"
              style={{ marginTop: 10, float: "right" }}
              onClick={handleSubmit}
            >
              Yes{" "}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteModal;
