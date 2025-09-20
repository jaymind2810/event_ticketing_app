import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom"
import { loaderActionStart, loaderActionEnd } from '../../store/loader/actions-creations';
import { useDispatch } from 'react-redux';
import { successToast, errorToast } from '../../store/toast/actions-creation';
import { SignupFormValues } from '../../services/AuthType';
import { signupRequest } from '../../services/authRequests';



export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password2: '',
            is_organizer: false,
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .max(15, '** Must be 15 characters or less. **')
                .required('** Required **'),
            last_name: Yup.string()
                .max(20, '** Must be 20 characters or less. **'),
            email: Yup.string().email('Invalid email address').required('** Required **'),
            password: Yup.string()
                .max(40, '** Must be 40 characters or less. **')
                .required('** Required **'),
            password2: Yup.string()
                .max(40, '** Must be 40 characters or less. **')
                .required('** Required **')
                .oneOf([Yup.ref('password')], '** Passwords Must Match. **'),
            is_organizer: Yup.boolean(),
        }),
        onSubmit: (values: SignupFormValues) => {
            //   alert(JSON.stringify(values, null, 2));
            const { password2, ...rest } = values;
            dispatch(loaderActionStart())
            signupRequest(values)
                .then((res: any) => {
                    dispatch(loaderActionEnd())
                    if (res.data) {
                        dispatch(
                            successToast({
                                toast: true,
                                message: res.data.message,
                            })
                        );
                        navigate("/login");
                    }
                })
                .catch((error: any) => {
                    console.log(error)
                    dispatch(loaderActionEnd())
                    dispatch(
                        errorToast({
                            toast: true,
                            message: "Something went wrong",
                        })
                    );
                }).finally(() => {
                    dispatch(loaderActionEnd())
                });
        },
    });


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            {/* <form className="space-y-4 md:space-y-6" action="#"> */}
                            <form
                                onSubmit={formik.handleSubmit}
                                className="space-y-4 md:space-y-6"
                            >
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.first_name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="First Name"
                                        required />
                                    {formik.touched.first_name && formik.errors.first_name ? (
                                        <div className='text-red-500'>{formik.errors.first_name}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.last_name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Last Name"
                                        required />
                                    {formik.touched.last_name && formik.errors.last_name ? (
                                        <div className='text-red-500'>{formik.errors.last_name}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='text-red-500'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='text-red-500'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="password2"
                                        id="password2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password2}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                    {formik.touched.password2 && formik.errors.password2 ? (
                                        <div className='text-red-500'>{formik.errors.password2}</div>
                                    ) : null}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_organizer"
                                        name="is_organizer"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        checked={formik.values.is_organizer}
                                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_organizer" className="text-sm text-gray-700 dark:text-gray-300">
                                        I am an organizer
                                    </label>
                                </div>
                                <button type="submit" className="w-full bg-gray-800 text-white hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-semibold leading-6 text-gray-700 hover:text-indigo-700">
                                        {" "}<Link to={"/login"}>Sign in</Link></a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}



// const SignupForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string()
//         .max(15, 'Must be 15 characters or less')
//         .required('Required'),
//       lastName: Yup.string()
//         .max(20, 'Must be 20 characters or less')
//         .required('Required'),
//       email: Yup.string().email('Invalid email address').required('Required'),
//     }),
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="firstName">First Name</label>
//       <input
//         id="firstName"
//         name="firstName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.firstName}
//       />
//       {formik.touched.firstName && formik.errors.firstName ? (
//         <div>{formik.errors.firstName}</div>
//       ) : null}

//       <label htmlFor="lastName">Last Name</label>
//       <input
//         id="lastName"
//         name="lastName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.lastName}
//       />
//       {formik.touched.lastName && formik.errors.lastName ? (
//         <div>{formik.errors.lastName}</div>
//       ) : null}

//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email ? (
//         <div>{formik.errors.email}</div>
//       ) : null}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };