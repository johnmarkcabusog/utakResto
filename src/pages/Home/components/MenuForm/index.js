import React, { Fragment } from "react";
import { Grid, Paper, Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VariationOptions from "./VariationOptions";
import { categories } from "../../constants";
import { isEmpty  } from "lodash";

const MenuForm = (props) => {
  const { values, errors, handleChange, touched, handleBlur, setFieldValue, dirty} = props;
  
  const helpText = (field_name) => {
    return touched[field_name] ? errors[field_name] : "";
  };
  const hasError = (field_name) => {
    return touched[field_name] && Boolean(errors[field_name]);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={1}>
            <h4 className="form-header">ADD MENU ITEM</h4>
            <div className="form-body">
              {" "}
              <TextField
                id="category"
                name="menu_category"
                value={values.menu_category}
                label="Menu Category"
                size="small"
                variant="standard"
                onChange={handleChange("menu_category")}
                helperText={helpText("menu_category")}
                error={hasError("menu_category")}
                onBlur={handleBlur}
                fullWidth={true}
                select
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
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
                size="small"
              />
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={values.has_variation} />}
                  label="Add variation"
                  name="has_variation"
                  onChange={handleChange("has_variation")}
                  size="small"
                />
              </FormGroup>
              {values.has_variation ? (
                <VariationOptions
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
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
                    size="small"
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
                    size="small"
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
                    size="small"
                  />
                </>
              )}
              <Divider />
              <div className="submit-section">
                {" "}
                <Button size="small" variant="outlined" disabled={!dirty}>Reset</Button>{" "}
                <Button size="small" variant="contained" disabled={!isEmpty(errors)}>Submit</Button>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          1111
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MenuForm;
