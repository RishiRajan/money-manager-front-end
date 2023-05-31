import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import {
  // Box,
  Button,
  IconButton,
  // Typography,
  // useTheme,
  // useMediaQuery,
} from "@mui/material";

import { tokens } from "../theme";

function Transactions(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let Rawdata = props.data;

  let data = Rawdata.slice(0, 9);
  console.log(data);
  return (
    <>
      {data.map((transaction, i) => {
        return (
          <Box
            key={`${transaction}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="15px">
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={
                  // colors.greenAccent[500]
                  transaction.type.toLowerCase() == "expense"
                    ? tokens("dark").redAccent[500]
                    : colors.greenAccent[500]
                }>
                {transaction.title}
              </Typography>
              <Typography color={colors.grey[100]}>
                {/* {transaction.type} */}
                {transaction.date.substring(0, 10)}
              </Typography>
            </Box>
            {/* <Box color={colors.grey[100]}>
              {transaction.date.substring(0, 10)}
            </Box> */}
            <Box
              color={
                transaction.type.toLowerCase() == "expense"
                  ? tokens("dark").redAccent[500]
                  : colors.greenAccent[500]
              }
              p="5px 10px"
              borderRadius="4px">
              ₹{transaction.amount}
            </Box>
          </Box>
        );
      })}
      {data[8] && (
        <Box display="flex" justifyContent="center" alignItems="right" p="15px">
          <Link to="/team">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              View All
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
export default Transactions;
