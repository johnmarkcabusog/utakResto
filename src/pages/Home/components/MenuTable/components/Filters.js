import React, { Fragment } from "react";
import Button from "@mui/material/Button";

const Filters = ({ categories, filterCategory, setFilterCategory }) => {
  return (
    <div className="filters">
      <Button
        variant={`${filterCategory === "All" ? "contained" : "outlined"}`}
        onClick={() => setFilterCategory("All")}
      >
        All
      </Button>
      {categories.map((c) => (
        <Fragment key={c.id}>
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
    </div>
  );
};

export default Filters;
