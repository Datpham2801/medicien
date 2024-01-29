// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Categorys = lazy(() => import('../pages/protected/Category'))
const Product = lazy(() => import('../pages/protected/Product'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))

const AddProduct = lazy(() => import('../pages/protected/AddProduct'))
const AddUser = lazy(() => import('../pages/protected/AddUser'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const EditUser = lazy(() => import('../pages/protected/EditUser'))
const EditProduct = lazy(() => import('../pages/protected/EditProduct'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const Nurse = lazy(() => import('../pages/protected/Nurse'))
const Doctor = lazy(() => import('../pages/protected/Doctor'))

const DetailMedical = lazy(() => import('../pages/protected/DetailMedical'))
const DetailMedicalNurse = lazy(() => import('../pages/protected/DetailMedicalNurse'))
const Prescribe = lazy(() => import('../pages/protected/Prescribe'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/nurse/booking', // the url
    component: Nurse, // view rendered
  },
  {
    path: '/doctor/booking', // the url
    component: Doctor, // view rendered
  },
  {
    path: '/user',
    component: Leads,
  },
  {
    path: '/category',
    component: Categorys,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/edit-user/:id',
    component:EditUser,
  },
  {
    path: '/edit-product/:id',
    component:EditProduct,
  },
  {
    path: '/detailmedicine/:id',
    component:DetailMedical,
  },
  {
    path: '/detailmedicinenurse/:id',
    component:DetailMedicalNurse,
  },
  {
    path: '/prescribe/:id',
    component:Prescribe,
  },
  {
    path: '/addproduct',
    component: AddProduct,
  },
  {
    path: '/adduser',
    component: AddUser,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },

  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
