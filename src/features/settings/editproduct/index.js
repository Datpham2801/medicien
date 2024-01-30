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

function EditProduct() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    // Tạo và cập nhật URL xem trước
    const previewURL = URL.createObjectURL(file);
    setProductImagePreview(previewURL);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);

    // Kiểm tra xem có file ảnh mới được chọn không
    if (productImageFile) {
      formData.append("image", productImageFile);
    } else {
      // Nếu không có file ảnh mới, gửi ảnh hiện tại
      formData.append("image", productImage);
    }
    console.log(formData);
    console.log(productImage);
    try {
      const response = await fetch(
        `https://backendmedicien1.onrender.com/api/medicine/update/${id}`,
        {
          method: "PATCH",
          body: formData, // Sử dụng FormData
        }
      );

      if (response.ok) {
        // Xử lý thành công
        toast.success("Cập nhật thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.href = "http://localhost:3000/app/product";
        }, 1000);
      } else {
        // Xử lý lỗi từ phía server
        const errorData = await response.json();
        showNotification(
          errorData.message || "Không thể cập nhật thuốc",
          "error"
        );
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc lỗi không xác định
      showNotification("Lỗi mạng hoặc lỗi không xác định", "error");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://backendmedicien1.onrender.com/api/medicine/detail/${id}`
      );
      const dataAPI = await res.json();
      setData(dataAPI);
      setProductName(dataAPI.name);
      setProductPrice(dataAPI.price);
      setProductImage(dataAPI.image);
      setProductImagePreview(
        `https://backendmedicien1.onrender.com/${dataAPI.image}`
      ); // Cập nhật URL xem trước
    };
    getData();
  }, [id]);

  return (
    <>
      <ToastContainer />
      {data && (
        <TitleCard title="Sửa thuốc" topMargin="mt-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="">
                <label className="label">
                  Tên thuốc{" "}
                  <span className="text-[#ff0000] text-[20px]">*</span>
                </label>
                <input
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Tên thuốc"
                />
              </div>

              <div>
                <label className="label">
                  Giá thuốc{" "}
                  <span className="text-[#ff0000] text-[20px]">*</span>
                </label>
                <input
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Giá thuốc"
                  type="number"
                  min={0}
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full"
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
            <div className="mt-16">
              <button type="submit" className="btn btn-primary float-right">
                Cập nhật
              </button>
            </div>
          </form>
        </TitleCard>
      )}
    </>
  );
}

export default EditProduct;
