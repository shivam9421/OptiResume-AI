import { Lock, Mail, User2Icon } from "lucide-react";
import React from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state"); // login | signup

  const [state, setState] = React.useState(
    urlState === "signup" ? "signup" : "login"
  );

  React.useEffect(() => {
    if (urlState === "signup" || urlState === "login") {
      setState(urlState);
    }
  }, [urlState]);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = state === "signup" ? "register" : "login";

      const { data } = await api.post(
        `/api/users/${endpoint}`,
        state === "signup"
          ? formData
          : {
              email: formData.email,
              password: formData.password,
            }
      );

      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );

      localStorage.setItem("token", data.token);
      toast.success(data.message || "Success");
      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAuth = () => {
    const next = state === "login" ? "signup" : "login";
    setState(next);
    navigate(`/login?state=${next}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border rounded-2xl px-8 py-8 shadow"
      >
        <h1 className="text-green-600 text-3xl font-semibold text-center">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2 text-center">
          Please {state === "login" ? "login" : "sign up"} to continue
        </p>

        {state === "signup" && (
          <div className="flex items-center mt-6 border h-12 rounded-full pl-5 gap-2">
            <User2Icon size={16} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        )}

        <div className="flex items-center mt-4 border h-12 rounded-full pl-5 gap-2">
          <Mail size={16} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center mt-4 border h-12 rounded-full pl-5 gap-2">
          <Lock size={16} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full bg-green-600 text-white"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p
          onClick={toggleAuth}
          className="text-gray-500 text-sm mt-5 text-center cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-green-600 ml-1 font-medium">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
