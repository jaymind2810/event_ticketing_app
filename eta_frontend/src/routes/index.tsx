import React, { lazy } from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import Loader from "../components/Loader";
import HomePage from "../pages/Home";
import PageNotFound from "../components/ErrorBoundary/PageNotFound";
import OrganizerDashboard from "../pages/OrganizerWeb";
import EventDetails from "../components/EventDetailPage";
import MyBookings from "../pages/Home/MyBooking";
import OrganizerEventDetail from "../pages/OrganizerWeb/EventDetails";
// import { WebSocketProvider } from "../components/WebSocket";

// ============== For AdminPanel ==================
const SignIn = lazy(() => import("../pages/Auth/Login"));
const SignUp = lazy(() => import("../pages/Auth/Register"));
// const WebPageLayout = lazy(() => import("../pages/WebPanel/components/Layout/WebPage"));
// const PageNotFound = lazy(() => import("../components/ErrorBoundary/PageNotFound"));


// enum ErrorType {
//     CART = "CART",
//     CHECKOUT = "CHECKOUT",
//     PAYMENT = "PAYMENT",
//   }


// const ErrorBoundary = (source) => {
//     // Uncaught ReferenceError: path is not defined
//     switch (source.source) {
//     //   case ErrorType.CART:
//     //     return <div>Cart Page Issue..!</div>;
//     //   case ErrorType.CHECKOUT:
//     //     return <div>Checkout Page Issue..!!</div>;
//     //   case ErrorType.PAYMENT:
//     //     return <div>Payment Issue..!!.</div>;
//       default:
//         return <PageNotFound />;
//     }
//   };

export default function RouterList () {

    const token = localStorage.getItem("token");

    return (
        // <WebSocketProvider token={token}>
        <BrowserRouter>
                <Routes>
                    
                
                    <Route 
                        path="/login"
                        element={
                            <React.Suspense fallback={<></>}>
                                <SignIn />
                            </React.Suspense>
                        }
                        // errorElement={<ErrorBoundary/>}
                    />
                    <Route 
                        path="/register" 
                        element={
                            <React.Suspense fallback={<></>}>
                                <SignUp />
                            </React.Suspense>
                        }
                        // errorElement={<ErrorBoundary/>}
                    />

                    {/* ================= Web Panel ========================= */}

                    

                    
                    <Route
                        path="*"
                        element={<PageNotFound />}
                    />

                    <Route path="/" 
                        element={
                            <React.Suspense fallback={<><Loader/></>}>
                                <HomePage />
                            </React.Suspense>
                        }
                        // errorElement={<ErrorBoundary/>}
                    />
                    <Route path="/user/bookings" 
                        element={
                            <React.Suspense fallback={<><Loader/></>}>
                                <MyBookings />
                            </React.Suspense>
                        }
                        // errorElement={<ErrorBoundary/>}
                    />

                    <Route path="/organizer/dashboard" 
                        element={
                            <React.Suspense fallback={<><Loader/></>}>
                                <OrganizerDashboard />
                            </React.Suspense>
                        }
                        // errorElement={<ErrorBoundary/>}
                    />

                    <Route path="/organizer/events/:id" 
                        element={
                            <React.Suspense fallback={<><Loader/></>}>
                                <OrganizerEventDetail />
                            </React.Suspense>
                        } />

                    <Route path="/events/:id" 
                        element={
                            <React.Suspense fallback={<><Loader/></>}>
                                <EventDetails />
                            </React.Suspense>
                        } />

                   


                </Routes>
        </BrowserRouter>
        //  </WebSocketProvider>

    )
}
