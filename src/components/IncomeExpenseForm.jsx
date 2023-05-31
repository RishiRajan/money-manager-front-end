import React from "react";

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "./Header";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const Form = ({ modalClose, updated }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const amountRegExp = /^^[1-9]\d*$/;

  const handleFormSubmit = (values) => {
    console.log(values.date);

    console.log("FormSubmit");
    var date = new Date(values.date);
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let newDate = [mnth, day, date.getFullYear()].join("-");
    values.date = newDate;

    values.amount = parseInt(values.amount);

    let url = "";
    values.type.toLowerCase() == "income"
      ? (url = "https://moneymanager-t9dh.onrender.com/api/v1/add-income")
      : (url = "https://moneymanager-t9dh.onrender.com/api/v1/add-expense");
    console.log(url);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch(url, requestOptions)
      .then((response) => {
        console.log(response.json());
        modalClose();
        updated();
      })
      .catch((error) => console.log(error));

    //       resetForm(initialValues);
  };

  const initialValues = {
    title: "",
    type: "",
    category: "",
    amount: "",
    description: "",
    // date: dayjs(Date.now()),
    date: "",
  };
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Required"),
    type: yup.string().required("Required"),
    category: yup.string().required("Required"),
    amount: yup
      .string()
      .matches(amountRegExp, "Amount is not Valid")
      .required("Required"),
    description: yup.string().required("Required"),
    date: yup.date().required("Date is required"),
  });

  return (
    <Box m="20px">
      <Header
        title="Add Transaction "
        subtitle="Add your Income / Expense here"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            // <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
                }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="select-Amount">Transaction Type</InputLabel>
                  <Select
                    labelId="select-Amount"
                    id="demo-simple-select"
                    value={values.type}
                    onBlur={handleBlur}
                    error={!!touched.type && !!errors.type}
                    helperText={touched.type && errors.type}
                    name="type"
                    type="text"
                    label="Type"
                    onChange={handleChange}>
                    <MenuItem value={"Income"}>Income</MenuItem>
                    <MenuItem value={"Expense"}>Expense</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  name="amount"
                  error={!!touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <DatePicker
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Date"
                  // onBlur={handleBlur}
                  onChange={(date) => {
                    console.log(date);
                    // // handleChange("date")(date);
                    // console.log(date);
                    var givenDate = new Date(date);
                    let mnth = ("0" + (givenDate.getMonth() + 1)).slice(-2);
                    let day = ("0" + givenDate.getDate()).slice(-2);
                    let newDate = [mnth, day, givenDate.getFullYear()].join(
                      "-"
                    );
                    values.date = newDate;
                    console.log(newDate);
                    console.log(values);

                    // let newDate = dayjs(new Date(date));
                    // console.log(newDate)

                    handleChange(newDate);
                    // console.log(date);
                  }}
                  value={values.date}
                  name="date"
                  inputFormat="MM/dd/yyyy"
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <Field name="date" component={DatePicker} label="Date" /> */}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Add Transaction
                </Button>
              </Box>
            </form>
            // </LocalizationProvider>
          )}
        </Formik>
      </LocalizationProvider>
    </Box>
  );
};

export default Form;
