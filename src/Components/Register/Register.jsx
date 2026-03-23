import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.rePassword) {
      errors.rePassword = "Confirm password is required";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Passwords do not match";
    }
    return errors;
  };

  async function registerNewUser(obj) {
    try {
      setIsLoading(true);
      setApiError("");
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        obj
      );
      if (data.message === "success") {
        setApiSuccess("Registration successful 🎉");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Email already in use");
    } finally {
      setIsLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: user,
    validate,
    onSubmit: function (values) {
      setApiError("");
      setApiSuccess("");
      registerNewUser(values);
    },
  });

  useEffect(() => {
    if (apiError || apiSuccess) {
      const timer = setTimeout(() => {
        setApiError("");
        setApiSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiError, apiSuccess]);

  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm"
        style={{
          border: "1.5px solid #c7d2fe",
          boxShadow: "0 4px 16px rgba(67,56,202,0.12)",
        }}
      >
        <h2 className="text-lg font-medium text-gray-800 mb-5">Register</h2>

        {apiError && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-800">
            {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="mb-4 rounded-lg border border-green-300 bg-green-100 px-4 py-3 text-sm text-green-800">
            {apiSuccess}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {[
            { id: "name", label: "Name", type: "text", placeholder: "name", autoComplete: "off" },
            { id: "email", label: "Email", type: "email", placeholder: "email", autoComplete: "username" },
            { id: "phone", label: "Phone", type: "text", placeholder: "phone", autoComplete: "off" },
            { id: "password", label: "Password", type: "password", placeholder: "password", autoComplete: "new-password" },
            { id: "rePassword", label: "Confirm Password", type: "password", placeholder: "rePassword", autoComplete: "new-password" },
          ].map(({ id, label, type, placeholder, autoComplete }) => (
            <div key={id}>
              <label className="text-sm text-gray-500 block mb-1.5" htmlFor={id}>
                {label}
              </label>
              <input
                id={id}
                autoComplete={autoComplete}
                value={formik.values[id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                style={{ border: "1px solid #e0e7ff" }}
              />
              {formik.errors[id] && formik.touched[id] && (
                <p className="text-xs text-red-600 mt-1">{formik.errors[id]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-indigo-50 font-medium py-2.5 rounded-lg text-sm transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;