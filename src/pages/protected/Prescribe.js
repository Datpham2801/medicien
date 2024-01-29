import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@material-ui/core";

function Prescribe() {
  let { id } = useParams();
  const [data, setData] = useState([]);

  const [idDoctor, setIdDoctor] = useState(null);
  const [idNurse, setIdNurse] = useState(null);

  const [nameDoctor, setNameDoctor] = useState(null);
  const [nameNurse, setNameNurse] = useState(null);
  const [medicines, setMedicines] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedMedicinesList, setSelectedMedicinesList] = useState([]);

  const [diagnostic, setDiagnostic] = useState("");
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    if (data.diagnostic) setDiagnostic(data.diagnostic);
    if (data.advice) setAdvice(data.advice);
  }, [data]);

  function formatVND(value) {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  useEffect(() => {
    const getMedicine = async () => {
      const res = await fetch(`http://localhost:8000/api/medicine`);
      const data = await res.json();
      setMedicines(data.map((med) => ({ name: med.name, price: med.price })));
    };
    getMedicine();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:8000/api/medical/${id}`);
      const dataAPI = await res.json();
      setData(dataAPI);
      setIdDoctor(dataAPI.idDoctor);
      setIdNurse(dataAPI.idNurse);
    };

    getData();
  }, []);

  useEffect(() => {
    const getDoctor = async () => {
      if (idDoctor && idNurse) {
        const res = await fetch(`http://localhost:8000/api/user/${idDoctor}`);
        const res2 = await fetch(`http://localhost:8000/api/user/${idNurse}`);
        const data = await res.json();
        const data2 = await res2.json();
        setNameDoctor(data.name);
        setNameNurse(data2.name);
      }
    };
    getDoctor();
  }, [idDoctor, idNurse]);

  const handleSelectChange = (e) => {
    const selectedMed = medicines.find((med) => med.name === e.target.value);
    if (selectedMed) {
      setSelectedMedicine(selectedMed);
    }
  };

  // Handler for adding medicine
  const handleAddMedicine = () => {
    if (selectedMedicine) {
      const newMedicine = {
        name: selectedMedicine.name,
        quantity: 1,
        price: selectedMedicine.price,
      };
      setSelectedMedicinesList([...selectedMedicinesList, newMedicine]);
      setSelectedMedicine("");
    } else {
      toast.error("Vui lòng chọn một loại thuốc");
    }
  };

  const updateMedicalRecord = async (diagnostic, advice, medicines) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/medical/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diagnostic: diagnostic,
            advice: advice,
            medicine: medicines,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Cập nhật bản ghi y tế thành công");
      } else {
        toast.error("Lỗi cập nhật bản ghi y tế");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật");
    }
  };
  const handleSubmit = async () => {
    if (!diagnostic || !advice || selectedMedicinesList.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    await updateMedicalRecord(diagnostic, advice, selectedMedicinesList);
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      {idDoctor != null && idNurse != null ? (
        <TitleCard
          title="Chuẩn đoán - Lời khuyên và Kê thuốc cho bệnh nhân"
          topMargin="mt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                value={nameNurse}
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
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Chuẩn đoán
              </label>
              <input
                id="diagnostic"
                name="diagnostic"
                value={diagnostic}
                onChange={(e) => setDiagnostic(e.target.value)}
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Lời khuyên
              </label>
              <input
                id="advice"
                name="advice"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg pt-10 font-medium text-gray-700">
              Danh sách thuốc
            </h3>
            <select
              id="role"
              name="role"
              onChange={handleSelectChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value=""> Chọn loại thuốc </option>
              {medicines &&
                medicines.map((medicine, key) => (
                  <option key={medicine._id} value={medicine.name}>
                    {medicine.name}
                  </option>
                ))}
            </select>
            <button
              onClick={handleAddMedicine}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg"
            >
              Thêm thuốc
            </button>
          </div>
          <div>
            {selectedMedicinesList.length > 0 && (
              <ul>
                {selectedMedicinesList.map((medicine, index) => (
                  <li className="py-4" key={index}>
                    Tên: {medicine.name}, Giá: {formatVND(medicine.price)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-indigo-300 disabled:cursor-not-allowed"
              disabled={data.isExamination ? data.isExamination : isLoading}
            >
              {isLoading ? (
                <>
                  <div className="flex justify-center">
                    <CircularProgress size={24} /> <h2> Đang xử lý... </h2>
                  </div>
                </>
              ) : (
                "Kê đơn"
              )}
            </button>
          </div>
        </TitleCard>
      ) : (
        <>
          <h2>Đơn đặt lịch chưa được y tá duyệt</h2>
        </>
      )}
    </>
  );
}

export default Prescribe;
