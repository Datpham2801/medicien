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

function AddUser() {
  let { id } = useParams();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    avatar: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      if (file) {
        setData((prevState) => ({ ...prevState, [name]: file }));
      }
    } else {
      setData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra các trường dữ liệu cần thiết trước khi gửi
    if (
      data.name === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.username === "" ||
      data.role === "" ||
      !(data.avatar instanceof File)
    ) {
      console.log(data);
      toast.error("Thông tin không được để trống", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return; // Ngừng xử lý nếu có trường nào bị trống
    }

    // Tạo FormData và thêm các trường dữ liệu
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Gửi yêu cầu đến server
    try {
      const response = await fetch(`http://localhost:8000/api/user/adduser`, {
        method: "POST",
        body: formData, // Gửi dữ liệu dưới dạng FormData
      });

      if (response.status === 200) {
        const responseData = await response.json();
        toast.success("Thêm người dùng thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Thực hiện hành động sau khi thêm thành công (ví dụ: chuyển hướng)
        setTimeout(() => {
          window.location.href = "/app/user";
        }, 1000);
      } else {
        // Xử lý nếu server trả về lỗi
        const errorData = await response.json();
        toast.error(`Có lỗi xảy ra: ${errorData.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      // Xử lý lỗi nếu không thể gửi yêu cầu đến server
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <TitleCard title="Thêm người dùng mới " topMargin="mt-2">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Hình đại diện
                <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
        <p className="italic">
          Khi thêm tài khoản mặc định mật khẩu sẽ là 123456
        </p>
      </TitleCard>
    </>
  );
}

export default AddUser;
