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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../../components/Input/SearchBar";

function Product() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const [userTotal, setUserTotal] = useState([]);

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://backendmedicien1.onrender.com/api/medicine`
      );
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
      x.name.toLowerCase().includes(textSearch)
    );
    setUser(userNew);
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://backendmedicien1.onrender.com/api/medicine/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle successful deletion here
        // For example, you could remove the user from the state to update the UI
        setUser(user.filter((u) => u._id !== id));
        toast.success("Xoá thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        // Handle error response here
      }
    } catch (error) {
      // Handle network errors here
      showNotification("Network error", "error");
    }
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <>
      <ToastContainer />
      <div className="inline-block float-right">
        <Link
          to="/app/addproduct"
          className="btn px-6 btn-sm normal-case btn-primary"
        >
          Thêm thuốc
        </Link>
      </div>

      <TitleCard title="Thuốc" topMargin="mt-2">
        <div className="w-full flex items-center">
          <SearchBar
            placeholderText={"Nhập tên thuốc"}
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
                <th>Tên thuốc</th>
                <th>Giá thuốc</th>
                <th>Ảnh thuốc</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {user.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.name}</td>
                    <td>{l.price}</td>
                    <td>
                      <img
                        src={`https://backendmedicien1.onrender.com/${l.image}`}
                        width="150px"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleDeleteUser(l._id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                      <Link
                        to={`/app/edit-product/${l._id}`}
                        className="btn btn-square btn-ghost"
                      >
                        <PencilSquareIcon className="w-5" />
                      </Link>
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
}

export default Product;
