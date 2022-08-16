import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  openCategoryModal,
  openDeleteModal,
} from "../../../../../redux/actions/productActions";
import { CATEGORY_LIMIT } from "../../../constants";

const Filters = ({
  categories,
  menuItems,
  filterCategory,
  setFilterCategory,
}) => {
  const dispatch = useDispatch();
  const [buttonHovered, setButtonHoverd] = useState({
    hovered: false,
    category_value: "",
  });

  const handleMouseEnter = (c) => {
    setButtonHoverd({ hovered: true, category_value: c.value });
  };

  const handleMouseLeave = () => {
    setButtonHoverd({ hovered: false, category_value: "" });
  };
  
  return (
    <div className="filters">
      <Button
        style={{ marginTop: 15 }}
        variant={`${filterCategory === "All" ? "contained" : "outlined"}`}
        onClick={() => setFilterCategory("All")}
      >
        All
      </Button>
      {categories.map((c) => {
        // do not allow deletion when category is being used by a menu item
        const categoryIsBeingUsed = menuItems.find(
          (m) => m.menu_category === c.value
        );
        return (
          <Fragment key={c.label}>
            {c.value !== "" && (
              <div className="category-button">
                <Button
                  variant={`${
                    c.value === filterCategory ? "contained" : "outlined"
                  }`}
                  onClick={() => setFilterCategory(c.value)}
                  onMouseEnter={() => handleMouseEnter(c)}
                  onMouseLeave={handleMouseLeave}
                >
                  {c.label}
                </Button>
                {buttonHovered.hovered &&
                  buttonHovered.category_value === c.value &&
                  !categoryIsBeingUsed && (
                    <IconButton
                      color="error"
                      className="category-button-remove"
                      size="small"
                      onMouseEnter={() => handleMouseEnter(c)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => {
                        dispatch(
                          openDeleteModal({
                            open: true,
                            toDelete: "category",
                            id: c.value,
                            entity: c.label,
                          })
                        );
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  )}
              </div>
            )}
          </Fragment>
        );
      })}
      {categories.length <= CATEGORY_LIMIT && (
        <IconButton
          aria-label="expand row"
          size="small"
          style={{ marginTop: 15 }}
          onClick={() => {
            dispatch(openCategoryModal({ open: true }));
          }}
        >
          <AddCircleIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Filters;
