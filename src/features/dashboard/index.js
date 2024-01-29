import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useState, useEffect } from "react";

function Dashboard() {
  const dispatch = useDispatch();

  //   const updateDashboardPeriod = (newRange) => {
  //     // Dashboard range changed, write code to refresh your values
  //     dispatch(
  //       showNotification({
  //         message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
  //         status: 1,
  //       })
  //     );
  //   };

  const [user, setUser] = useState(0);
  const [doctor , setDoctor] = useState(0)
  const [nurse , setNurse] = useState(0)
  const [money, setMoney] = useState(0);
  useEffect(() => {
    const getData = async () => {
      let numberUser = 0
      let numberDoctor = 0
      let numberNurse = 0
      let moneyS = 0
      const res = await fetch(`http://localhost:8000/api/user/`);
      const res2 = await fetch(`http://localhost:8000/api/medical`);
      const data = await res.json();
      const data2 = await res2.json();
      data.map((value) => {
        if (!value.admin && value.role == "user") {
            numberUser++
        }
      });
      data.map((value) => {
        if (!value.admin && value.role == "doctor") {
            numberDoctor++
        }
      });
      data.map((value) => {
        if (!value.admin && value.role == "nurse") {
            numberNurse++
        }
      });
      data2.map((value) =>{
        moneyS += value.totalBill
      })
      setUser(numberUser)
      setDoctor(numberDoctor)
      setNurse(numberNurse)
      setMoney(moneyS)
    };
    getData();
  }, []);

  const statsData = [
    {
      title: "Người dùng",
      value: user,
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "Người dùng tham gia",
    },
    {
      title: "Bác sĩ",
      value: doctor,
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "Bác sĩ làm việc",
    },
    {
      title: "Y tá",
      value: nurse,
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "Y tá làm việc",
    },
    {
      title: "Doanh thu",
      value: formatAsVND(money),
      icon: <CircleStackIcon className="w-8 h-8" />,
      description: "Tổng doanh thu ",
    },
  ];
  function formatAsVND(number) {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
  return (
    <>
      {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}

      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div>
    </>
  );
}

export default Dashboard;
