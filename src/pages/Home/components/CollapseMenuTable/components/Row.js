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
import TableCell from "@mui/material/TableCell";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { getCategory } from "../../../utils";
import { styled } from "@mui/material/styles";
import {
  openAddMenuDrawer,
  openDeleteModal,
} from "../../../../../redux/actions/productActions";
import { get } from "lodash";
import Link from "@mui/material/Link";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#e0dede",
  },
}));

const total = (variations, fieldToSum) => {
  const all = variations.map((x) => {
    const val = get(x, fieldToSum, 0);
    return val;
  });

  return all.length > 0 ? all.reduce((total, num) => total + num) : 0;
};

const Row = (props) => {
  const { row, categories } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const VariationList = () => {
    const names = row.variations.map((x) => x.variation_name);
    return (
      <Link
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {names.join(", ")}
      </Link>
    );
  };
  return (
    <React.Fragment>
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => {
          dispatch(
            openAddMenuDrawer({
              open: true,
              action: "update",
              id: row.id,
              data: row,
            })
          );
        }}
      >
        <TableCell>
          {row.has_variation && (
            <IconButton
              aria-label="expand row"
              size="small"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.menu_name}
        </TableCell>
        <TableCell align="right">{getCategory(categories, row.menu_category)}</TableCell>
        <TableCell align="right">{row.has_variation ? <VariationList /> : "---"}</TableCell>
        <TableCell align="right">{row.has_variation ? `${total(row.variations, "variation_price")} (Total)` : row.price}</TableCell>
        <TableCell align="right">{row.has_variation ? `${total(row.variations, "variation_cost")} (Total)`: row.cost}</TableCell>
        <TableCell align="right">{row.has_variation ? `${total(row.variations, "variation_stock")} (Total)`: row.stock}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                openDeleteModal({
                  open: true,
                  toDelete: "menu",
                  id: row.id,
                  entity: row.menu_name,
                })
              );
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </TableCell>
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
                      <TableCell>{variation.variation_cost}</TableCell>
                      <TableCell>{variation.variation_stock}</TableCell>
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
};

export default Row;
