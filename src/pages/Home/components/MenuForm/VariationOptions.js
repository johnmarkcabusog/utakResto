import React, { Fragment } from "react";
import { Grid, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { defaultVariation } from "../../constants";
import { FieldArray } from "formik";
import { get, cloneDeep } from "lodash";

const VariationOptions = ({ values, handleChange, handleBlur, errors, setFieldValue}) => {
  const { variations } = values;
  const errorsVariation = get(errors, "variations", []);

  const helpText = (index, field_name) => {
    if(errorsVariation.length > 0 ){ // form erros exist
      if(!errorsVariation[index]) return "";
      return errorsVariation[index][field_name]
    }
    return "";
  };

  const hasError = (index, field_name) => {
    if(errorsVariation.length > 0 ){ // form erros exist
      if(!errorsVariation[index]) return "";
      return Boolean(errors.variations[index][field_name]);
    }
    return false;
  };

  const handleAddVariation = () =>{
    const clonedVariations = cloneDeep(variations);
    clonedVariations.push(defaultVariation)
    setFieldValue("variations", clonedVariations, true)
  }

  const removeVariation = ()=>{
    const clonedVariations = cloneDeep(variations);
    clonedVariations.pop()
    setFieldValue("variations", clonedVariations, true)
  }

  return (
    <FieldArray name="variations">
      {() => {
        return variations.map((v, index) => (
          <Fragment key={index}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  required
                  name={`variations.${index}.variation_name`}
                  onChange={handleChange(`variations.${index}.variation_name`)}
                  value={v.variation_name}
                  label="Variation"
                  variant="standard"
                  fullWidth={true}
                  helperText={helpText(index, "variation_name")}
                  error={hasError(index, "variation_name")}
                  onBlur={handleBlur}
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  name={`variations.${index}.variation_price`}
                  value={v.variation_price}
                  onChange={handleChange(`variations.${index}.variation_price`)}
                  label="Price"
                  variant="standard"
                  fullWidth={true}
                  helperText={helpText(index, "variation_price")}
                  error={hasError(index, "variation_price")}
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  name={`variations.${index}.variation_cost`}
                  onChange={handleChange(`variations.${index}.variation_cost`)}
                  value={v.variation_cost}
                  label="Cost"
                  variant="standard"
                  fullWidth={true}
                  helperText={helpText(index, "variation_cost")}
                  error={hasError(index, "variation_cost")}
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  name={`variations.${index}.variation_stock`}
                  onChange={handleChange(`variations.${index}.variation_stock`)}
                  value={v.variation_stock}
                  label="Stock"
                  variant="standard"
                  fullWidth={true}
                  helperText={helpText(index, "variation_stock")}
                  error={hasError(index, "variation_stock")}
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={2} className="add-icons">
                {(!errorsVariation[index] && index === variations.length -1) && (
                  <>
                    <IconButton color="success" onClick={handleAddVariation}  component="span">
                      <AddIcon />
                    </IconButton>
                    {variations.length > 1 && (
                      <IconButton color="error" onClick={removeVariation} component="span">
                        <RemoveIcon />
                      </IconButton>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Fragment>
        ));
      }}
    </FieldArray>
  );
};
export default VariationOptions;
