import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import Logo from "./../../images/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loaderActionStart, loaderActionEnd } from "../../store/loader/actions-creations";
import { successToast, errorToast } from "../../store/toast/actions-creation";
import { loginSuccess, setCurrentUser } from "../../store/user/action-Creation";
import { signInRequest } from "../../services/authRequests";


export default function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup.string().required('** Required **'),
          password: Yup.string()
            .max(40, '** Must be 40 characters or more. **')
            .required('** Required **')
        }),
        onSubmit: (values) => {
          dispatch(loaderActionStart())
          signInRequest(values).then((res:any) => {
            console.log(res.data, "---------res.data---------")
            if (res.data) {
                localStorage.setItem("token", res.data.access)
                localStorage.setItem("userId", res.data.id)
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("role", res.data.role)
                // dispatch(loginSuccess(true))
                dispatch(setCurrentUser({
                    id: res.data.id,
                    email: res.data.email,
                    role: res.data.role,
                    isLoggedIn: true,
                }))

                dispatch(loaderActionEnd())
                dispatch(
                    successToast({
                        toast: true,
                        message: "Login Successfully !!",
                    })
                );

                console.log(res.data.role, "========role0000-")
                if (res.data.role?.trim().toUpperCase() === "ATTENDEE") {
                    navigate("/");
                } else if (res.data.role?.trim().toUpperCase() === "ORGANIZER") {
                    navigate("/organizer/dashboard");
                } else {
                    navigate("/403");
                }
            } else {
                dispatch(
                    errorToast({
                    toast: true,
                    message: res.data.message,
                    })
                );
            }
          }).catch((error:any) => {
            dispatch(errorToast({
                toast: true,
                message: "Something went wrong",
            }))
          }).finally(() => {
            dispatch(loaderActionEnd())
          })
        },
    });


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign In
                            </h1>
                    {/* <form className="space-y-6" action="#" method="POST"> */}
                    <form 
                        onSubmit={formik.handleSubmit}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input 
                                type="char" 
                                name="email" 
                                id="email" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@company.com" 
                                required/>
                            {formik.touched.email && formik.errors.email ? (
                                <div className='text-red-500'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-gray-700 hover:text-indigo-700">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required/>
                            {formik.touched.password && formik.errors.password ? (
                                <div className='text-red-500'>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-gray-700 hover:text-indigo-700">
                            <Link to={"/register"}>Sign up</Link>
                        </a>
                    </p>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}


