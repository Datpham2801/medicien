import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EditProduct from "../../features/settings/editproduct";
function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Sửa thông tin sản phẩm" }));
  }, []);

  return <EditProduct />;
}

export default InternalPage;
