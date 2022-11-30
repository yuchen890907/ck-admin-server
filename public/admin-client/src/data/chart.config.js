const ChartConfig = {
  doughnutOptions: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "內用/外帶比例",
        font: {
          size: 20,
        },
      },
    },
  },
  earningLineOptions: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "營收狀況",
        font: {
          size: 20,
        },
      },
    },
  },
  customerCountLineOptions: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "來客數狀況",
        font: {
          size: 20,
        },
      },
    },
  },
  forHereLineOptions: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "內用/外帶狀況",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
      },
    },
  },
};
const a = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "內用/外帶狀況",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
    },
  },
};
export default ChartConfig;
