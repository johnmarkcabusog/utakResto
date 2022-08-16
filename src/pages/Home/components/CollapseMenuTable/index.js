import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ref, onValue, off } from "firebase/database";
import { getVariations } from "../../utils";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Filters from "./components/Filters";
import Row from "./components/Row";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#62bbc2",
    padding: 15,
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CollapsibleTable = ({ db, categories }) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  
  useEffect(() => {
    const listener = async ()=>{
      if (db) {
        const menuCollectionRef = ref(db, "menu");
        onValue(menuCollectionRef,async(snapshot) => {
          const data = snapshot.val(); // this returns a document object
          if (data !== null) {
            const list = await Promise.all(Object.entries(data).map(async([key, values]) => {
              const variationList =  await getVariations(values, db);
              return { ...values, id:key, variations: variationList };
            }));
            setMenuItems(list);
          }
        });
      }
    }
    listener()
    return ()=>{ // we have to detach listener on unmount when not in use
      if(db){
        const menuCollectionRef = ref(db, "menu");
        off(menuCollectionRef,listener);
      }
    }
  }, [db]);

  const filteredItems = filterCategory === "All" ? menuItems : menuItems.filter((x) => x.menu_category === filterCategory);
  
  return (
    <>
      <Filters
        categories={categories}
        setFilterCategory={setFilterCategory}
        filterCategory={filterCategory}
        menuItems={menuItems}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Options</StyledTableCell>
              <StyledTableCell align="right">Price&nbsp;(Php)</StyledTableCell>
              <StyledTableCell align="right">Cost&nbsp;(Php)</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((row) => (
              <Row key={row.name} row={row} categories={categories} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CollapsibleTable;
