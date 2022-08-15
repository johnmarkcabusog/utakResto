import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ref, onValue, } from "firebase/database";
import { getVariations, getCategory } from "../../utils";
import Filters from "./components/Filters";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#62bbc2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const MenuTable = ({ db, categories }) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (db) {
      const menuCollectionRef = ref(db, "menu");
      onValue(menuCollectionRef, (snapshot) => {
        const data = snapshot.val(); // this returns a document object
        if (data !== null) {
            const list = Object.values(data).map((menu) => {
             const variationList = getVariations(menu, db);
            return { ...menu, variations: variationList };
          });
          setMenuItems(list);
        }
      });
    }
    return () => {
     //clean up code to avoid memory leaks, unsubscribe from listeners
      // console.log("Unmount");
    };
  }, [db]); 

  return (
    <>
      <Filters categories={categories} setFilterCategory={setFilterCategory} filterCategory={filterCategory} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Options</StyledTableCell>
              <StyledTableCell align="right">Price&nbsp;(Php)</StyledTableCell>
              <StyledTableCell align="right">Cost&nbsp;(Php)</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <StyledTableRow key={item.menu_name}>
                <StyledTableCell component="th" scope="row">
                  {item.menu_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {getCategory(categories, item.menu_category)}
                </StyledTableCell>
                <StyledTableCell align="right">Options</StyledTableCell>
                <StyledTableCell align="right">
                  {item.has_variation ? "varies" : item.price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.has_variation ? "varies" : item.cost}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.has_variation ? "varies" : item.stock}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MenuTable;
