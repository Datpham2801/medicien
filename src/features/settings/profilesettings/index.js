import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileSettings() {
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("token");
  const [timework, setTimework] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [info, setInfo] = useState();
  const [productImage, setProductImage] = useState("");
  const [avatar, setAvatarData] = useState();

  const [productImagePreview, setProductImagePreview] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    // Tạo và cập nhật URL xem trước
    const previewURL = URL.createObjectURL(file);
    setProductImagePreview(previewURL);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8000/api/user/${id}`);
      const data = await res.json();
      setInfo(data);
      setEmail(data.email);
      setPhone(data.phone);
      setUsername(data.username);
      setDes(data.des);
      setName(data.name);
      setTimework(mapTimeworkData(data.timework));
      setAvatarData(`http://localhost:8000/${data.avatar}`);
      setProductImagePreview(`http://localhost:8000/${data.avatar}`);
    };
    getData();
  }, [id]);
  const mapTimeworkData = (timeworkData) => {
    const mappedData = {};
    timeworkData.forEach((item) => {
      mappedData[item.day] = item.hours[0]; // Giả sử mỗi ngày chỉ có một khung giờ
    });
    return mappedData;
  };
  const timeSlots = ["Ca Sáng", "Ca Chiều", "Cả Ngày", "Nghỉ"];

  const handleTimeworkChange = (day, value) => {
    setTimework((prev) => ({
      ...prev,
      [day]: value,
    }));
  };
  const updateTimework = async (timeworkData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/${id}/timework`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timework: timeworkData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update timework");
      }

      // Xử lý khi cập nhật thành công
      const result = await response.json(); // hoặc response.text() tùy thuộc vào định dạng trả về
      console.log(result); // hoặc hiển thị thông báo cho người dùng
      toast.success("Cập nhật thời gian thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Đã có lỗi xảy ra khi cập nhật thời gian làm việc.");
    }
  };

  const handleSubmitTimework = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the timework data
    const timeworkData = Object.entries(timework).map(([day, hours]) => ({
      day,
      hours: hours.split("-"), // Assuming the format "HH:MM-HH:MM"
    }));

    // Call the updateTimework function
    await updateTimework(timeworkData);
  };

  const updateDay = (day) => {
    let dayVN = "";
    switch (day) {
      case "Monday":
        dayVN = "Thứ 2";
        break;
      case "Tuesday":
        dayVN = "Thứ 3";
        break;
      case "Wednesday":
        dayVN = "Thứ 4";
        break;
      case "Thursday":
        dayVN = "Thứ 5";
        break;

      case "Friday":
        dayVN = "Thứ 6";
        break;
      case "Saturday":
        dayVN = "Thứ 7";
        break;
      case "Sunday":
        dayVN = "Chủ nhật";
        break;
      default:
        break;
    }
    return dayVN;
  };
  const saveInfoNew = () => {
    console.log(avatar);
    if (username == "" || email == "" || name == "" || phone == "") {
      toast.error("Thông tin cập nhật không được bỏ trống", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("des", des);
      formData.append("name", name);

      // Check if an avatar file is selected
      if (avatar) {
        formData.append("avatar", avatar);
      }
      fetch(`http://localhost:8000/api/user/update/${id}`, {
        method: "PATCH",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .then((data) => {
          toast.success("Cập nhật thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      console.log(file);
      if (file) {
        setAvatarData(file);

        // Tạo và cập nhật URL xem trước
        const previewURL = URL.createObjectURL(file);
        setProductImagePreview(previewURL);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <TitleCard title="Cập nhật hồ sơ" topMargin="mt-2">
        {info && (
          <>
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
                accept="image/*"
                name="avatar"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleInputChange}
              />
              {productImagePreview && (
                <img
                  src={productImagePreview}
                  alt="Preview"
                  className="mt-2"
                  width={100}
                />
              )}
            </div>
            <div className="pb-[80px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center">
                    <p>Tên tài khoản</p>
                    <p className="text-[#ff0000] text-[20px]">*</p>
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Tên tài khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <p>Tên đầy đủ</p>
                    <p className="text-[#ff0000] text-[20px]">*</p>
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <p>Email</p>
                    <p className="text-[#ff0000] text-[20px]">*</p>
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <p>Số điện thoại</p>
                    <p className="text-[#ff0000] text-[20px]">*</p>
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {role == "doctor" && (
                  <input
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Chuyên môn"
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                  />
                )}
              </div>
              <div className="mt-16">
                <button
                  onClick={() => saveInfoNew()}
                  className="btn btn-primary float-right"
                >
                  Cập nhật thông tin tài khoản
                </button>
              </div>
            </div>
          </>
        )}
        {role == "doctor" && (
          <div>
            <TitleCard title="Cập nhật thời gian làm việc">
              <form onSubmit={handleSubmitTimework}>
                <div className="timework-selection bg-gray-500 p-4 rounded-lg shadow-md">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <div key={day} className="flex items-center mb-3">
                      <label className="font-semibold mr-2 flex-shrink-0 w-24">
                        {updateDay(day)}:
                      </label>
                      <select
                        className="flex-grow border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={timework[day] || ""}
                        onChange={(e) =>
                          handleTimeworkChange(day, e.target.value)
                        }
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="mt-16">
                  <button type="submit" className="btn btn-primary float-right">
                    Cập nhật thời gian làm việc
                  </button>
                </div>
              </form>
            </TitleCard>
          </div>
        )}
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
