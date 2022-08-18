import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { openInfoAlert } from "../../../redux/actions/productActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoAlert = ()=> {
  const dispatch = useDispatch();
  const openSnackbar = useSelector(
    (state) => state.appState.openInfoAlert.open
  );
  const message = useSelector((state) => state.appState.openInfoAlert.message);
  const handleClose = () => {
    dispatch(
      openInfoAlert({
        open: false,
        state: "success",
        message: "",
      })
    );
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default InfoAlert