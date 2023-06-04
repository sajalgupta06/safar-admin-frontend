import { createContext, useReducer } from "react";
import "./App.scss";
import reducer from "./utils/reducer/reducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { theme } from 'antd';
import AppLayout from "./utils/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ActiveTrips from "./pages/Trips/ActiveTrips";
import ActiveBookings from "./pages/Bookings/ActiveBookings";
import AllBookings from "./pages/Bookings/AllBookings";
import AllTrips from "./pages/Trips/AllTrips/AllTrips";
import { declarations } from "./config";
import CreateTrips from "./pages/Trips/CreateTrips";
import Settings from "./pages/Settings";

const { defaultAlgorithm, darkAlgorithm } = theme;

export const MyContext = createContext();

let iState = {
  credits: "",
  companyLogo: "",
  companyName: "",
  darkMode:false,
  IsSideBarCollapsed:false,
  screenName:"",
  loading:false,
  createTripView:0,
};

function App() {
  const [data, dispatch] = useReducer(reducer, iState);

  return (


    <ConfigProvider
    theme={{
      algorithm: data.darkMode ? darkAlgorithm : defaultAlgorithm,
      token: {
        colorPrimary: "#2186f2",
      }, 
    }
    }>
    <MyContext.Provider
      value={{
        loading: data.loading,
        IsSideBarCollapsed:data.IsSideBarCollapsed,
        companyLogo: data.companyLogo,
        companyName: data.companyName,
        companyPlan: data.companyPlan,
        permissions: data.permissions,
        darkMode: data.darkMode,
        loading:data.loading,
        screenName:data.screenName,
        createTripView: data.createTripView,
        setCreateTripView :dispatch,
        setLoading:dispatch,
        setScreenName:dispatch,
        toggleSideBarCollapse:dispatch,
        changeCompanyPlan: dispatch,
      }}
    >
      <div className="App">
        <BrowserRouter>

      <AppLayout>
      <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route exact path= {`/${declarations.routes.ACTIVE_TRIPS}`} element={<ActiveTrips/>} />
      <Route exact path={`/${declarations.routes.ALL_TRIPS}`}  element={<AllTrips/>} />
      <Route exact path={`/${declarations.routes.ACTIVE_BOOKINGS}`}  element={<ActiveBookings/>} />
      <Route exact path={`/${declarations.routes.ALL_BOOKINGS}`}  element={<AllBookings/>} />
      <Route exact path={`/${declarations.routes.CREATE_TRIPS}`}  element={<CreateTrips/>} />
      <Route exact path={`/${declarations.routes.CREATE_TRIPS}`}  element={<CreateTrips/>} />
      <Route exact path={`/${declarations.routes.SETTINGS}`}  element={<Settings/>} />

      <Route path="*" element={<NotFound/>}></Route>

        </Routes>
        </AppLayout>
        </BrowserRouter>
      </div>
    </MyContext.Provider>
    </ConfigProvider>
  );
}

export default App;
