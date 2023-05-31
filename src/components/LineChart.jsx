import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


const LineChart = (props) => {
  let isDashboard = props.isDashboard;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let income = props.income , expense =props.expense;

  let expenseData  ={} , incomeData = {};
  

  income.forEach(element => {
    let key = element._id.month;
    incomeData[key] = element.total
  });

  let incomeChartData  = [];

  for (let i=1 ;i<=12;i++){
    let tempObj ={
      x: i,
      y: incomeData[i] || 0
    }
    incomeChartData.push(tempObj);
  }



  
  expense.forEach(element => {
    
    let key = element._id.month;
    expenseData[key] = element.total
  });

  let expenseChartData  = [];

  for (let i=1 ;i<=12;i++){
    let tempObj ={
      x: i,
      y: expenseData[i] || 0
    }
    expenseChartData.push(tempObj);
  }

  const ChartFeedData = [
  {
    id: "Income",
    color: tokens("dark").greenAccent[500],
    data: incomeChartData
  },
  {
    id: "Expense",
    color: tokens("dark").redAccent[200],
    data: expenseChartData
  }
];




















  return (
    <ResponsiveLine
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      curve="catmullRom"
      data={ChartFeedData}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={!isDashboard}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
