import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    username: "",
    password: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.username.trim() === "")
      return setErrorMessage("Tên tài khoản là trường bắt buộc");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Mật khẩu là bắt buộc");

    setLoading(true);

    try {
      const response = await fetch(
        "https://backendmedicien1.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginObj.username, // Đảm bảo tên trường này phù hợp với API
            password: loginObj.password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        if (data.admin) {
          localStorage.setItem("token", data._id); // Lưu _id như là
          localStorage.setItem("role", "admin");
          window.location.href = "/app/dashboard";
        } else if (data.role == "doctor") {
          localStorage.setItem("token", data._id); // Lưu _id như là token
          localStorage.setItem("role", data.role);
          window.location.href = "/app/doctor/booking";
        } else if (data.role == "nurse") {
          localStorage.setItem("token", data._id); // Lưu _id như là token
          localStorage.setItem("role", data.role);
          window.location.href = "/app/nurse/booking";
        } else {
          setErrorMessage("Bạn không có quyền truy cập.");
        }
      } else {
        setErrorMessage(
          data.message || "Tài khoản hoặc mật khẩu không chính xác"
        );
      }
    } catch (error) {
      setErrorMessage("Lỗi mạng hoặc lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Đăng nhập
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="username"
                  defaultValue={loginObj.username}
                  updateType="username"
                  containerStyle="mt-4"
                  labelTitle="Tên tài khoản"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Mật khẩu"
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
