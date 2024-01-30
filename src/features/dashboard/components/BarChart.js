import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [userData, setUserData] = useState({
    doctors: Array(12).fill(0),
    users: Array(12).fill(0),
    nurses: Array(12).fill(0),
  });

  useEffect(() => {
    fetch("https://backendmedicien1.onrender.com/api/user/")
      .then((response) => response.json())
      .then((data) => {
        const roleCount = {
          doctors: Array(12).fill(0),
          users: Array(12).fill(0),
          nurses: Array(12).fill(0),
        };
        data.forEach((user) => {
          const month = new Date(user.createdAt).getMonth();
          if (user.role === "doctor") {
            roleCount.doctors[month]++;
          } else if (user.role === "user") {
            roleCount.users[month]++;
          } else if (user.role === "nurse") {
            roleCount.nurses[month]++;
          }
        });
        setUserData(roleCount);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Bác sĩ",
        data: userData.doctors,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Người dùng",
        data: userData.users,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
      {
        label: "Y tá",
        data: userData.nurses,
        backgroundColor: "rgba(3, 252, 44, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <TitleCard title={"Phân loại người dùng theo tháng"}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
