import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //   const submitForm = async (e) => {
  //     e.preventDefault();
  //     setErrorMessage("");

  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("name", registerObj.name);
  //     formData.append("username", registerObj.username);
  //     formData.append("password", registerObj.password);
  //     formData.append("email", registerObj.emailId);
  //     formData.append("phone", registerObj.phone);
  //     formData.append("avatar", registerObj.avatar);

  //     for (let [key, value] of formData.entries()) {
  //       console.log(key, value);
  //     }

  //     console.log(registerObj);

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8000/api/doctor/registerDoctor",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       setLoading(false);
  //       // Redirect or perform further actions
  //     } catch (error) {
  //       console.error(error);
  //       setErrorMessage("Error registering user");
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    setErrorMessage("");

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/doctor/registerDoctor",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Thành công");
        setLoading(false);
        setErrorMessage("Đăng ký bác sĩ thành công");
      } else {
        setLoading(false);
        setErrorMessage("Thông tin đã tồn tại hoặc không hợp lệ");
      }
    } catch (error) {
      setErrorMessage("Error registering user");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Đăng ký bác sĩ
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2">
                  Tên đăng nhập
                </label>
                <input
                  name="username"
                  placeholder="Tên đăng nhập"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="exampleInputEmail1">Họ và tên</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" name="name" placeholder="Họ và tên" type="text" />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="exampleInputEmail1">Email</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" name="email" placeholder="Email" type="text" />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="exampleInputEmail1">Số điên thoại</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" name="phone" placeholder="Số điện thoại" type="number" />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="exampleInputEmail1">Mật khẩu</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" name="password" placeholder="Mật khẩu" type="text" />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="exampleInputEmail1">Ảnh thuốc</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" name="avatar" placeholder="Nhập file" type="file" />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }>
                Đăng ký
              </button>
              <div className="text-center mt-4">
                Bạn đã có tài khoản?{" "}
                <Link to="/login">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Đăng nhập
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
