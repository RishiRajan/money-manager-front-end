import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

import StatBox from "../../components/StatBox";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";


import { useState, useEffect } from "react";
import Transactions from "../../components/Transactions";

import PopUpButton from "../../components/PopUpButton";

const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const [updated, setUpdated] = useState(0);
  const [data, setData] = useState(null);
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  const [monthIncome, setMonthIncome] = useState(null);
  const [monthExpense, setMonthExpense] = useState(null);

  let url = "https://moneymanager-t9dh.onrender.com/api/v1/all";
  let incomeUrl = "https://moneymanager-t9dh.onrender.com/api/v1/get-income/";
  let expenseUrl = "https://moneymanager-t9dh.onrender.com/api/v1/get-expense/";
  let incomeByMonthUrl =
    "https://moneymanager-t9dh.onrender.com/api/v1/incomebymonth";
  let expenseByMonthUrl =
    "https://moneymanager-t9dh.onrender.com/api/v1/expensebymonth";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((apiData) => {
        setData(apiData);
      });
  }, [updated]);

  useEffect(() => {
    fetch(incomeUrl)
      .then((res) => res.json())
      .then((apiData) => {
        setIncome(apiData);
      });
  }, [updated]);

  useEffect(() => {
    fetch(expenseUrl)
      .then((res) => res.json())
      .then((apiData) => {
        setExpense(apiData);
      });
  }, [updated]);

  useEffect(() => {
    fetch(incomeByMonthUrl)
      .then((res) => res.json())
      .then((apiData) => {
        setMonthIncome(apiData);
      });
  }, [updated]);

  useEffect(() => {
    fetch(expenseByMonthUrl)
      .then((res) => res.json())
      .then((apiData) => {
        setMonthExpense(apiData);
      });
    
  }, [updated]);

  let totalIncome = null;

  income &&
    income.forEach((element) => {
      totalIncome += element.amount;
    });

  let totalExpense = null;

  expense &&
    expense.forEach((element) => {
      totalExpense += element.amount;
    });

  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0">
        <Header
          title="Money Manager"
          subtitle="Overview of Expenses and Incomes"
        />

        <PopUpButton
          isUpdated={() => {
            console.log("updated ran now");
            setUpdated(updated + 1);
            console.log(updated);
          }}></PopUpButton>
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          {totalIncome && (
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center">
              <StatBox
                title={totalIncome}
                subtitle="Income"
                icon={
                  <SavingsTwoToneIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          )}
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          {totalExpense && (
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center">
              <StatBox
                title={totalExpense}
                subtitle="Expenses"
                icon={
                  <CurrencyRupeeIcon
                    sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          )}
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}>
                    Incomes and Expenses
                  </Typography>
                </Box>
              </Box>
              <Box height={isNonMobile ? "550px" : "250px"} m="-20px 0 0 0">
                {monthIncome && monthExpense && (
                  <LineChart
                    isDashboard={true}
                    income={monthIncome}
                    expense={monthExpense}
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[400]}`}
              color={colors.grey[100]}
              p="15px">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}>
                Recent Transactions
              </Typography>
            </Box>
            {data && <Transactions data={data} />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
