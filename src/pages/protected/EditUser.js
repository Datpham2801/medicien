import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EditUser from "../../features/settings/edituser";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Sửa thông tin người dùng" }));
  }, []);

  return <EditUser />;
}

export default InternalPage;
