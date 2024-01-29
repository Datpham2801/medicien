import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddUser from "../../features/settings/adduser";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Thêm người dùng" }));
  }, []);

  return <AddUser />;
}

export default InternalPage;
