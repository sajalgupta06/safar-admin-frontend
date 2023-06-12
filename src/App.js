import { createContext, useEffect, useReducer, useState } from "react";
import "./App.scss";
import reducer from "./utils/reducer/reducer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { theme } from "antd";
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
import SingleTrip from "./pages/Trip";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AddBookings from "./pages/Bookings/AddBookings";
import SingleTripBookings from "./pages/Bookings/SingleTripBookings";
import { verifyAccessToken } from "./action/req";
import Login from "./pages/Login/Login";
import { alerts } from "./utils/alert";
import Analytics from "./pages/Analytics/Analytics";
import Messages from "./pages/Messages/Messages";

const { defaultAlgorithm, darkAlgorithm } = theme;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: twentyFourHoursInMs,
    },
  },
});

export const MyContext = createContext();

let iState = {
  isAuthenticated: undefined,
  credits: "",
  companyLogo: "",
  companyName: "",
  darkMode: false,
  IsSideBarCollapsed: false,
  screenName: "",
  loading: true,
  noSpinLoading: false,
  createTripView: 1,
};

function App() {
  const [data, dispatch] = useReducer(reducer, iState);

  const renderAuthenticatedRoutes = () => {
    return (
      <BrowserRouter>
        <AppLayout>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                path={`/${declarations.routes.DASHBOARD}`}
                element={<Dashboard />}
              />
              <Route
                exact
                path={`/${declarations.routes.SINGLE_TRIP}`}
                element={<SingleTrip />}
              />
              <Route
                exact
                path={`/${declarations.routes.ACTIVE_TRIPS}`}
                element={<ActiveTrips />}
              />
              <Route
                exact
                path={`/${declarations.routes.ALL_TRIPS}`}
                element={<AllTrips />}
              />
              <Route
                exact
                path={`/${declarations.routes.ACTIVE_BOOKINGS}`}
                element={<ActiveBookings />}
              />
              <Route
                exact
                path={`/${declarations.routes.ALL_BOOKINGS}`}
                element={<AllBookings />}
              />
              <Route
                exact
                path={`/${declarations.routes.SINGLE_BOOKING}`}
                element={<SingleTripBookings />}
              />
              <Route
                exact
                path={`/${declarations.routes.ADD_BOOKINGS}`}
                element={<AddBookings />}
              />
              <Route
                exact
                path={`/${declarations.routes.CREATE_TRIPS}`}
                element={<CreateTrips />}
              />
              <Route
                exact
                path={`/${declarations.routes.MESSAGES}`}
                element={<Messages />}
              />
                <Route
                exact
                path={`/${declarations.routes.ANALYTICS}`}
                element={<Analytics />}
              />
              <Route
                exact
                path={`/${declarations.routes.SETTINGS}`}
                element={<Settings />}
              />

              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </QueryClientProvider>
        </AppLayout>
      </BrowserRouter>
    );
  };

  const renderUnauthenticatedRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  };

  const verifyAdminAccessToken = async () => {
    try {
      const result = await verifyAccessToken();

      if (result.statusCode === "10000") {
        dispatch({ type: "IS_AUTHENTICATED", payload: true });

        return;
      }

      dispatch({ type: "IS_AUTHENTICATED", payload: false });
    } catch (error) {
      alerts.error("Error occured");
      return;
    }
  };

  useEffect(() => {
    verifyAdminAccessToken();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: data.darkMode ? darkAlgorithm : defaultAlgorithm,
        
        token: {
          colorPrimary: "#2186f2",
        },
      }}
    >
      <MyContext.Provider
        value={{
          loading: data.loading,
          IsSideBarCollapsed: data.IsSideBarCollapsed,
          companyLogo: data.companyLogo,
          companyName: data.companyName,
          companyPlan: data.companyPlan,
          permissions: data.permissions,
          darkMode: data.darkMode,
          loading: data.loading,
          noSpinLoading: data.noSpinLoading,
          screenName: data.screenName,
          createTripView: data.createTripView,
          setIsAuthenticated: dispatch,
          setCreateTripView: dispatch,
          setLoading: dispatch,
          setScreenName: dispatch,
          toggleSideBarCollapse: dispatch,
          changeCompanyPlan: dispatch,
          setNoSpinLoading: dispatch,
        }}
      >
        <div className="App">
          {data.isAuthenticated === true
            ? renderAuthenticatedRoutes()
            : data.isAuthenticated === false
            ? renderUnauthenticatedRoutes()
            : ""}
        </div>
      </MyContext.Provider>
    </ConfigProvider>
  );
}

export default App;
