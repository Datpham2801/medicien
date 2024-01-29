/** Icons are imported separatly to reduce build time */
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Trang chủ",
    role: "admin",
  },
  {
    path: "/app/user", // url
    icon: <UsersIcon className={iconClasses} />, // icon component
    name: "Người dùng", // name that appear in Sidebar
    role: "admin",
  },

  {
    path: "/app/category", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Đơn đặt lịch", // name that appear in Sidebar
    role: "admin",
  },
  {
    path: "/app/product", // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: "Quản lý thuốc", // name that appear in Sidebar
    role: "admin",
  },
  {
    path: "/app/nurse/booking", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Danh sách đơn đặt lịch", // name that appear in Sidebar
    role: "nurse",
  },
  {
    path: "/app/doctor/booking", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Danh sách đơn đặt lịch", // name that appear in Sidebar
    role: "doctor",
  },
  {
    path: "/app/settings-profile", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Trang cá nhân", // name that appear in Sidebar
    role: "doctor",
  },
  {
    path: "/app/settings-profile", // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: "Trang cá nhân", // name that appear in Sidebar
    role: "nurse",
  },
];

export default routes;
