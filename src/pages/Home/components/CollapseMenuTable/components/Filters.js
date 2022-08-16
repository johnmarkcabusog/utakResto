import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { openCategoryModal } from "../../../../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
const Filters = ({ db, categories, filterCategory, setFilterCategory }) => {
  const dispatch = useDispatch();

  return (
    <div className="filters">
      <Button
        variant={`${filterCategory === "All" ? "contained" : "outlined"}`}
        onClick={() => setFilterCategory("All")}
      >
        All
      </Button>
      {categories.map((c) => (
        <Fragment key={c.label}>
          {c.value !== "" && (
            <Button
              variant={`${
                c.value === filterCategory ? "contained" : "outlined"
              }`}
              onClick={() => setFilterCategory(c.value)}
            >
              {c.label}
            </Button>
          )}
        </Fragment>
      ))}
         <IconButton aria-label="expand row" size="small" onClick={()=>{dispatch(openCategoryModal({open:true}))}}>
         <AddCircleIcon />
         {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
       </IconButton>
    </div>
  );
};

export default Filters;
