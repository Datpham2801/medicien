import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@material-ui/core";

function DetailMedicalNurse() {
  let { id } = useParams();
  const [data, setData] = useState([]);

  const [idDoctor, setIdDoctor] = useState(null);
  const [idNurse, setIdNurse] = useState(null);

  const [nameDoctor, setNameDoctor] = useState(null);
  const [nameNurse, setNameNurse] = useState(null);
  const [medicines, setMedicines] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  function formatVND(value) {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  useEffect(() => {
    if (data.medicine) {
      const initialMedicines = {};
      data.medicine.forEach((med) => {
        initialMedicines[med._id] = { ...med, quantity: 1 }; // Giả sử mỗi loại thuốc ban đầu có số lượng là 1
      });
      setMedicines(initialMedicines);
      updateTotalCost(initialMedicines);
    }
  }, [data.medicine]);

  const handleQuantityChange = (id, quantity) => {
    const updatedMedicines = {
      ...medicines,
      [id]: { ...medicines[id], quantity: Number(quantity) },
    };
    setMedicines(updatedMedicines);
    updateTotalCost(updatedMedicines);
  };

  const updateTotalCost = (medicines) => {
    const total = Object.values(medicines).reduce((sum, med) => {
      return sum + med.price * med.quantity;
    }, 0);
    setTotalCost(total);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8000/api/medical/${id}`);
      const dataAPI = await res.json();

      setData(dataAPI);
      setIdDoctor(dataAPI.idDoctor);
      setIdNurse(dataAPI.idNurse);
      setIdUser(dataAPI.idPatient);
    };

    getData();
  }, []);

  useEffect(() => {
    const getDoctor = async () => {
      if (idDoctor && idUser) {
        const res = await fetch(`http://localhost:8000/api/user/${idDoctor}`);
        const res2 = await fetch(`http://localhost:8000/api/user/${idNurse}`);
        const res3 = await fetch(`http://localhost:8000/api/user/${idUser}`);
        const data = await res.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        setNameDoctor(data.name);
        setNameNurse(data2.name);
        setEmailUser(data3.email);
      }
    };
    getDoctor();
  }, [idDoctor, idUser]);
  console.log(emailUser);
  const updateMedication = async () => {
    const medicalId = id; // Giả sử 'id' là ID của bản ghi y tế được lấy từ `useParams()`
    const url = `http://localhost:8000/api/medical/updatequanity/${medicalId}`;

    const medicineUpdates = Object.values(medicines).map((med) => ({
      name: med.name,
      quantity: med.quantity,
    }));
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "PATCH", // hoặc 'PUT', tùy thuộc vào cách bạn xử lý nó trên server
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicineUpdates,
          email: emailUser,
          totalBill: totalCost,
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật số lượng thuốc.");
      }

      toast.success("Kê đơn thuốc thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // Xử lý thêm sau khi cập nhật thành công (ví dụ: hiển thị thông báo)
    } catch (error) {
      console.error("Lỗi:", error.message);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
    setIsLoading(false); // Kết thúc loading
  };
  useEffect(() => {
    if (data.medicine) {
      const initialMedicines = {};
      data.medicine.forEach((med) => {
        // Sử dụng số lượng từ API, nếu không có thì mặc định là 1
        initialMedicines[med._id] = { ...med, quantity: med.quantity || 1 };
      });
      setMedicines(initialMedicines);
      updateTotalCost(initialMedicines);
    }
  }, [data.medicine]);
  const convertDay = (inputStr) => {
    inputStr = inputStr.replace("Monday", "Thứ 2");
    inputStr = inputStr.replace("Tuesday", "Thứ 3");
    inputStr = inputStr.replace("Wednesday", "Thứ 4");
    inputStr = inputStr.replace("Thursday", "Thứ 5");
    inputStr = inputStr.replace("Friday", "Thứ 6");
    inputStr = inputStr.replace("Saturday", "Thứ 7");
    inputStr = inputStr.replace("Sunday", "Chủ nhật");
    return inputStr;
  };

  return (
    <>
      <ToastContainer />
      {idDoctor && (
        <TitleCard title="Kiểm tra đơn thuốc cho bệnh nhân" topMargin="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và tên bệnh nhân
              </label>
              <input
                id="name"
                name="name"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.namePatient}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Triệu chứng
              </label>
              <input
                id="username"
                name="username"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.symptom}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Thời gian đến khám
              </label>
              <input
                name="email"
                id="email"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={convertDay(data.timeBook)}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Chuẩn đoán của bác sĩ
              </label>
              <input
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.diagnostic}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Lời khuyên của bác sĩ
              </label>
              <input
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={data.advice}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Y tá đảm nhận
              </label>
              <input
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Bác sĩ đảm nhận
              </label>
              <input
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={nameDoctor}
                readOnly
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg pt-10 font-medium text-gray-700">
              Danh sách thuốc
            </h3>
            {data.medicine &&
              data.medicine.map((med) => (
                <div
                  key={med._id}
                  className="flex items-center justify-between mt-3"
                >
                  <span>
                    {med.name} - {formatVND(med.price)}/1
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={medicines[med._id]?.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(med._id, e.target.value)
                    }
                    className="w-20 rounded-lg border-2 border-gray-300 p-2"
                  />
                </div>
              ))}
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-bold">
              Tổng cộng: {formatVND(totalCost)}
            </h4>
          </div>
          {data.status ? (
            <>
              <button
                onClick={updateMedication}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-indigo-300 disabled:cursor-not-allowed"
                disabled={data.isExamination ? data.isExamination : isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="flex justify-center">
                      <CircularProgress size={24} />
                      <h2>Đang xử lý...</h2>
                    </div>
                  </>
                ) : (
                  "Thanh toán"
                )}
              </button>
            </>
          ) : (
            <h2>Chưa được duyệt</h2>
          )}
        </TitleCard>
      )}
    </>
  );
}

export default DetailMedicalNurse;
