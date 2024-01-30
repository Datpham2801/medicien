import React, { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import SearchBar from "../../components/Input/SearchBar";
import { Button } from "@material-ui/core";

const Doctor = () => {
  const [user, setUser] = useState([]);
  const [userTotal, setUserTotal] = useState([]);
  const token = localStorage.getItem("token");
  const [textSearch, setTextSearch] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://backendmedicien1.onrender.com/api/medical/`
      );
      const data = await res.json();
      setUser(data);
      setUserTotal(data);
    };
    getData();
  }, []);

  const updateBooking = async (id) => {
    try {
      // Assuming you have a way to get the nurseId. Replace 'nurseId' with the correct value.

      const response = await fetch(
        `https://backendmedicien1.onrender.com/api/nurse/medical/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Include other necessary headers, such as authorization tokens if needed
          },
          body: JSON.stringify({
            idNurse: token, // Send the nurseId in the body, as expected by your backend
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      toast.success("Duyệt đơn thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const onSeatchText = (text) => {
    setTextSearch(text.toLowerCase());
  };

  const onSubmitSearchText = () => {
    let userNew = userTotal.filter((x) =>
      x.namePatient.toLowerCase().includes(textSearch)
    );
    setUser(userNew);
  };
  return (
    <>
      <ToastContainer />
      <TitleCard title="Danh sách đặt lịch" topMargin="mt-2">
        <div className="w-full flex items-center">
          <SearchBar
            placeholderText={"Nhập tên khách hàng"}
            styleClass={""}
            setSearchText={onSeatchText}
          />
          <button onClick={onSubmitSearchText} className="btn btn-primary ml-2">
            Tìm kiếm
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tên khách hàng</th>
                <th>Triệu chứng</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>

                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {user.map((l, k) => {
                if (l.idDoctor == token) {
                  return (
                    <tr key={k}>
                      <td>{l.namePatient}</td>
                      <td>{l.symptom}</td>
                      <td>{l.status ? "Đã duyệt" : "Đang chờ"}</td>
                      <td>{formatDate(l.createdAt)}</td>

                      <td>
                        <Link
                          to={`/app/prescribe/${l._id}`}
                          className="btn btn-primary"
                        >
                          Kê thuốc và chuẩn đoán
                        </Link>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Doctor;
