import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import AddProduct from "../../features/settings/addproduct";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Thêm sản phẩm" }));
  }, []);

  return <AddProduct />;
}

export default InternalPage;
