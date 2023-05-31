import React from "react";
import { Box,  useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";


import Header from "./Header";
import { useState, useEffect } from "react";

const Team = () => {
  let url = "https://moneymanager-t9dh.onrender.com/api/v1/all";

  let deleteUrl =
    "https://moneymanager-t9dh.onrender.com/api/v1/delete-expense/";

  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(0);
  const handleDelete = (id) => {
    deleteUrl = deleteUrl + id;
    console.log(deleteUrl);
    fetch(deleteUrl, {
      method: "DELETE",
    }).then(() => {
      console.log("deleted");
      setUpdate(update + 1);
    });
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((apiData) => {
        setData(apiData);
      });
  }, [update]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "Id" },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "date", headerName: "Date", width: 100 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: ({ row }) => {
        const rowDate = new Date(row.createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - rowDate.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        console.log(hoursDifference);
        if (hoursDifference <= 12) {
          return (
            <IconButton
              color="secondary"
              onClick={() => handleDelete(row._id)}
              size="small">
              <DeleteIcon />
            </IconButton>
          );
        } else {
          return <></>;
        }
      },
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="All Transactions" subtitle="Manage your Transactions" />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}>
        {data && (
          <DataGrid getRowId={(row) => row._id} rows={data} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Team;
