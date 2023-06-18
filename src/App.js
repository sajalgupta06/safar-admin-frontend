import { createContext, useEffect, useReducer, useState } from "react";
import "./App.scss";
import reducer from "./utils/reducer/reducer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, notification } from "antd";
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
import NetWorkError from "./components/NetworkError";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  where,

} from "firebase/firestore";
import fire from "./utils/firebase";
import moment from "moment";
import { notificationAlertContent } from "./utils/functions";
import Pricing from "./pages/Pricing/Pricing";
import Register from "./pages/Register/Register";

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
  loading: false, 
  noSpinLoading: false,
  createTripView: 0,
  notifications:[],
  companyDetails:{
    name:'',
    logo:""
  },
 
};


const db = getFirestore(fire);



export const editNotification = (id)=>{

  try {
    const notificationRef = doc(collection(db, "admin", "61ee821984867f3572f9691d", "Notifications")
    ,id)
    updateDoc(notificationRef,{read:true})
  
  } catch (error) {
    console.log(error)
  }

}

function App() {
  const [data, dispatch] = useReducer(reducer, iState);
  const [hasError, setHasError] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const collectionRef =   collection(db, "admin", "61ee821984867f3572f9691d", "Notifications")





  const openNotification = (notification) => {
    api.info(notificationAlertContent(notification));
  };




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
                path={`/${declarations.routes.CREATE_TRIPS}`}
                element={<CreateTrips />}
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
                path={`/${declarations.routes.PRICING}`}
                element={<Pricing />}
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
          <Route path="/register" element={<Register />} />
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
        dispatch({ type: "SET_COMPANYDETAILS", payload: {name:result?.data?.companyRegistration?.legalCompanyName, logo:result?.data?.companyRegistration?.logo} });

        return;
      }

      dispatch({ type: "IS_AUTHENTICATED", payload: false });

    } catch (error) {
     

      setHasError(true);

      
      
    }


  };


  async function fireFunc() {
    try {
      

    } catch (e) {
      console.log(e);
    }
  }

  


  useEffect(() => {
    verifyAdminAccessToken();
    
  }, []);

  useEffect(() => {
   
    const q = query(
      collectionRef,
      where("read", "==", false),
      orderBy("createdAt", "desc") 
      
    );

  const unsub = onSnapshot(q, (querySnapshot) => {
      const items= []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      }); 
      dispatch({type:"SET_NOTIFICATIONS",payload:items})

      let limitTime = (moment() -  moment(items.at(0).createdAt) )/1000

      if( limitTime <=20)

      {
        openNotification( items.at(0))

      }

    });



return ()=>unsub();
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
          notifications:data.notifications,
          companyDetails:data.companyDetails,
          setIsAuthenticated: dispatch,
          setCreateTripView: dispatch,
          setLoading: dispatch,
          setScreenName: dispatch,
          toggleSideBarCollapse: dispatch,
          changeCompanyPlan: dispatch,
          setNoSpinLoading: dispatch,
          setNotifications:dispatch,
          setCompanyDetails:dispatch
        }}
      >
        <div className="App">
{contextHolder}
          {hasError===true?<NetWorkError/>:
          data.isAuthenticated === true
          ? renderAuthenticatedRoutes()
          : data.isAuthenticated === false
          ? renderUnauthenticatedRoutes()
          : ""
          }
          
        </div>
      </MyContext.Provider>
    </ConfigProvider>
  );
}

export default App;
