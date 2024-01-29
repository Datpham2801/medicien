import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";

import { showNotification } from "../common/headerSlice";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Input/SearchBar";

function Category() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const [userTotal, setUserTotal] = useState([]);

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);
  const convertDay = (inputStr) => {
    if (inputStr) {
      inputStr = inputStr.replace("Monday", "Thứ 2");
      inputStr = inputStr.replace("Tuesday", "Thứ 3");
      inputStr = inputStr.replace("Wednesday", "Thứ 4");
      inputStr = inputStr.replace("Thursday", "Thứ 5");
      inputStr = inputStr.replace("Friday", "Thứ 6");
      inputStr = inputStr.replace("Saturday", "Thứ 7");
      inputStr = inputStr.replace("Sunday", "Chủ nhật");
      return inputStr;
    }
    return "";
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8000/api/medical`);
      const data = await res.json();

      setUser(data);
      setUserTotal(data);
    };
    getData();
  }, []);

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
      <TitleCard title="Đơn đặt lịch" topMargin="mt-2">
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
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tên khách hàng</th>
                <th>Triệu chứng</th>
                <th>Trạng thái</th>
                <th>Ngày đặt khám</th>
              </tr>
            </thead>
            <tbody>
              {user.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.namePatient}</td>
                    <td>{l.symptom}</td>
                    <td>{l.status ? "Đã duyệt" : "Đang chờ"}</td>
                    <td>{convertDay(l.timeBook)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Category;
