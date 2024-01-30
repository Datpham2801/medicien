import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import TitleCard from "../../../components/Cards/TitleCard";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    const previewURL = URL.createObjectURL(file);
    setProductImagePreview(previewURL);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    if (productImage) {
      formData.append("image", productImage);
    }

    try {
      const response = await fetch(
        "https://backendmedicien1.onrender.com/api/medicine/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Thêm thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.href = "http://localhost:3000/app/product";
        }, 1000);
      } else {
        toast.error("Không thể thêm sản phẩm", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Lỗi mạng hoặc lỗi không xác định", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <TitleCard title="Thêm thuốc" topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                Tên thuốc <span className="text-[#ff0000] text-[20px]">*</span>
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
                Giá thuốc <span className="text-[#ff0000] text-[20px]">*</span>
              </label>
              <input
                className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Giá thuốc"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {productImagePreview && (
              <img src={productImagePreview} alt="Preview" className="mt-2" />
            )}
          </div>
          <div className="mt-16">
            <button type="submit" className="btn btn-primary float-right">
              Thêm
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default AddProduct;
