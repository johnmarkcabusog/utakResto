import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VariationOptions from "./VariationOptions";
import { isEmpty  } from "lodash";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import { openCategoryModal } from "../../../../redux/actions/productActions";

const MenuForm = (props) => {
  const { values, errors, handleChange, touched, handleBlur, handleReset, setFieldValue, dirty, handleCloseDrawer, handleSubmit, categories, drawerAction} = props;
  const dispatch = useDispatch();
  const helpText = (field_name) => {
    return touched[field_name] ? errors[field_name] : "";
  };
  const hasError = (field_name) => {
    return touched[field_name] && Boolean(errors[field_name]);
  };

  if(isEmpty(values)){
    return null;
  }
  return (
    <Fragment>
            <div className="form-header">
            <IconButton style={{color: "white", float:"left"}}size="small" onClick={handleCloseDrawer} component="span">
              <ArrowBackIcon />
            </IconButton>
            {drawerAction === 'add' ? 'ADD':"SAVE"} MENU ITEM
            </div>
            
            <div className="form-body">
              {" "}
              <TextField
                id="category"
                name="menu_category"
                value={values.menu_category}
                label="Menu Category"
                variant="standard"
                onChange={handleChange("menu_category")}
                helperText={helpText("menu_category")}
                error={hasError("menu_category")}
                onBlur={handleBlur}
                fullWidth={true}
                select
              >
                <MenuItem key={`add-category`} style={{color:"green"}} onClick={()=>dispatch(openCategoryModal({ open: true }))}>
                  Add New Category...
                </MenuItem>
                {categories.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="menu-name"
                name="menu_name"
                value={values.menu_name}
                onChange={handleChange("menu_name")}
                onBlur={handleBlur}
                label="Name"
                variant="standard"
                helperText={helpText("menu_name")}
                error={hasError("menu_name")}
                fullWidth={true}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={values.has_variation} />}
                  label="Add variation"
                  name="has_variation"
                  onChange={handleChange("has_variation")}
                />
              </FormGroup>
              {(values.has_variation) ? (
                <VariationOptions
                  variations={values.variations}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  errors={errors}
                />
              ) : (
                <>
                  <TextField
                    required
                    name="price"
                    value={values.price}
                    onChange={handleChange("price")}
                    label="Price "
                    helperText={helpText("price")}
                    error={hasError("price")}
                    onBlur={handleBlur}
                    variant="standard"
                    fullWidth={true}
                    type="number"
                  />
                  <TextField
                    required
                    name="cost"
                    value={values.cost}
                    onChange={handleChange("cost")}
                    label="Cost"
                    helperText={helpText("cost")}
                    error={hasError("cost")}
                    onBlur={handleBlur}
                    fullWidth={true}
                    type="number"
                    variant="standard"
                  />
                  <TextField
                    required
                    name="stock"
                    value={values.stock}
                    onChange={handleChange("stock")}
                    label="Amount in Stock"
                    helperText={helpText("stock")}
                    error={hasError("stock")}
                    onBlur={handleBlur}
                    fullWidth={true}
                    type="number"
                    variant="standard"
                  />
                </>
              )}
       

              <div className="submit-section">
                <Button variant="outlined" disabled={!dirty} onClick={handleReset}>Reset</Button>{" "}
                <Button variant="contained" disabled={!dirty || !isEmpty(errors)} onClick={handleSubmit}>{drawerAction==="add"? 'Submit':'Update'}</Button>
              </div>
            </div>
    </Fragment>
  );
};

export default MenuForm;
