import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart() {
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));

  useEffect(() => {
    fetch('http://localhost:8000/api/medical')
      .then(response => response.json())
      .then(data => {
        const sortedData = Array(12).fill(0);
        data.forEach(record => {
          const month = new Date(record.createdAt).getMonth();
          sortedData[month] += record.totalBill;
        });
        setMonthlyData(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Tổng Hóa Đơn Theo Tháng",
        data: monthlyData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: 'Doanh thu theo tháng',
      },
    },
  };

  return (
    <TitleCard title={"Doanh thu theo tháng"}>
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default LineChart;
