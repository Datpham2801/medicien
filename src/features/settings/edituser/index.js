import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUser() {
  let { id } = useParams();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://backendmedicien1.onrender.com/api/user/${id}`
      );
      const dataAPI = await res.json();

      setData(dataAPI);
    };

    getData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({
      ...prevState, // Create a copy of the existing state
      [name]: value, // Update the specific property
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.name == "" ||
      data.email == "" ||
      data.phone == "" ||
      data.username == "" ||
      data.role == ""
    ) {
      toast.error("Thông tin không được để trống", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      try {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("name", data.name);
        const response = await fetch(
          `https://backendmedicien1.onrender.com/api/user/update/${id}`,
          {
            method: "PATCH",

            body: formData,
          }
        );

        if (response.status === 200) {
          toast.success("Cập nhật người dùng thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            window.location.href = "/app/user";
          }, 1000);
        } else {
          alert("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <TitleCard title="Cập nhật thông tin người dùng" topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và tên
                <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <input
                id="name"
                name="name"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên tài khoản
                <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <input
                id="username"
                name="username"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
                <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <input
                name="email"
                id="email"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
                <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Vai trò
                <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.role}
                onChange={handleInputChange}
              >
                <option value="">Chọn vai trò</option>
                <option value="doctor">Bác sĩ</option>
                <option value="nurse">Y tá</option>
                <option value="user">Bệnh nhân</option>
              </select>
            </div>
          </div>
          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Cập nhật
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default EditUser;
