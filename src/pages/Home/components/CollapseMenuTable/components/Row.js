import React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getCategory } from "../../../utils";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { openAddMenuDrawer } from "../../../../../redux/actions/productActions";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&:hover":{
       cursor:"pointer",
       backgroundColor:"#e0dede"
    }
  }));

const Row = (props) => {
    const { row, categories } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    return (
      <React.Fragment>
        <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }} onClick={()=>{
            dispatch(
              openAddMenuDrawer({ open: true, action: "update", id: row.id, data:row})
            );
        }}>
          <TableCell>
            {row.has_variation && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.menu_name}
          </TableCell>
          <TableCell align="right">
            {getCategory(categories, row.menu_category)}
          </TableCell>
          <TableCell align="right">{row.has_variation ? '===':'---'}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.cost}</TableCell>
          <TableCell align="right">{row.stock}</TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {row.menu_name} Options
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price (Php)</TableCell>
                      <TableCell>Cost (Php) </TableCell>
                      <TableCell>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.variations.map((variation, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {variation.variation_name}
                        </TableCell>
                        <TableCell>{variation.variation_price}</TableCell>
                        <TableCell>
                          {variation.variation_cost}
                        </TableCell>
                        <TableCell>
                          {variation.variation_stock}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  export default Row;