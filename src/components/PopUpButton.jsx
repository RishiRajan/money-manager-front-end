
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useProSidebar } from "react-pro-sidebar";

import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../theme";



import * as React from 'react';


import Modal from '@mui/material/Modal';
import Form from "./IncomeExpenseForm"







function PopUpButton({ isUpdated }) {
   const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    if(!collapsed){collapseSidebar()}
  };
  const handleClose = () => setOpen(false);

   const { collapseSidebar, collapsed } = useProSidebar();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={handleOpen}>
        <AddIcon sx={{ mr: "10px" }} />
        Add Income / Expense
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isNonMobile ? "80%" : "80%",
            height: isNonMobile ? "80%" : "90%",
            backgroundColor: colors.primary[500],
            boxShadow: 24,
            borderRadius: "30px",
            p: 4,
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}>
          <Form
            modalClose={() => {
              setOpen(false);
              // isUpdated();
            }}
            updated ={isUpdated}
            ></Form>
        </Box>
      </Modal>
    </>
  );
}
export default PopUpButton