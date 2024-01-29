import React, { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import SearchBar from "../../components/Input/SearchBar";

const Nurse = () => {
  const [user, setUser] = useState([]);
  const [userTotal, setUserTotal] = useState([]);
  const token = localStorage.getItem("token");
  const [textSearch, setTextSearch] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8000/api/medical/`);
      const data = await res.json();
      setUser(data);
      setUserTotal(data);
    };
    getData();
  }, []);

  const updateBooking = async (id) => {
    try {
     

      const response = await fetch(
        `http://localhost:8000/api/nurse/medical/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            idNurse: token, 
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
      <TitleCard title="Danh sách đặt lịch" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tên khách hàng</th>
                <th>Triệu chứng</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>

                <th>Duyệt</th>
              </tr>
            </thead>
            <tbody>
              {user.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.namePatient}</td>
                    <td>{l.symptom}</td>
                    <td>
                      {" "}
                      <h2
                        className={`${
                          l.status ? "bg-[#28a745]" : "bg-[#dc3545]"
                        } p-2 text-center text-white rounded-xl`}
                      >
                        {" "}
                        {l.status ? "Đã duyệt" : "Đang chờ"}
                      </h2>
                    </td>
                    <td>{formatDate(l.createdAt)}</td>

                    <td>
                      {l.status ? (
                        <Link
                          to={`/app/detailmedicine/${l._id}`}
                          className="btn btn-primary"
                        >
                          Xem chi tiết
                        </Link>
                      ) : (
                        <Link
                          to={`/app/detailmedicinenurse/${l._id}`}
                          className="btn btn-primary"
                        >
                          Xem chi tiết
                        </Link>
                      )}

                      <button
                        disabled={l.status}
                        onClick={() => updateBooking(l._id)}
                        className="btn btn-primary mx-2"
                      >
                        Duyệt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Nurse;
