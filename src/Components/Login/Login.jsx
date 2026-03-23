import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({getUserData}) => {
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // User Object
  let user = {
    email: "",
    password: "",
  };

  // validation
  const validate = (values) => {
    let errors = {};

    // Email
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Password
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  async function loginUser(obj) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        obj,
      );
      if (data.message === "success") {
        // console.log(data.token);
        
        localStorage.setItem("tok",data.token)
        getUserData();
        setApiError("");
        setApiSuccess("Login successful 🎉");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      // console.log(error.response.data.errors.msg);
      setApiSuccess("");
      setApiError(error.response?.data?.message || "Something went wrong");
    }
  }

  // Submit User Formik
  let formik = useFormik({
    initialValues: user,
    validate,
    onSubmit: function (values) {
      setApiError("");
      setApiSuccess("");
      loginUser(values);
    },
  });

  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => {
        setApiError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [apiError]);

  return (
    <>
      <div className="py-5">
        <h2 className="pb-4 font-bold text-2xl">Login</h2>

        {apiError && (
          <div
            className="mb-4 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-800
    transition-all duration-300 ease-in-out"
          >
            {apiError}
          </div>
        )}

        {apiSuccess && (
          <div
            className="mb-4 rounded-lg border border-green-300 bg-green-100 px-4 py-3 text-green-800
        transition-all duration-300 ease-in-out"
          >
            {apiSuccess}
          </div>
        )}

        {/*---------- Form -----------*/}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="username"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            placeholder="email"
            className="w-full p-2 outline-none outline-gray-200 focus:outline-blue-300 rounded my-3"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-800">
              <span>{formik.errors.email}</span>
            </div>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="password"
            className="w-full p-2 outline-none outline-gray-200 focus:outline-blue-300 rounded my-3"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-800">
              <span>{formik.errors.password}</span>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="my-3 border-2 border-blue-300 px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
