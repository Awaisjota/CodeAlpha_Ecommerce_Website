import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/userSlice";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(register(form));

    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Join us and start shopping today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded-lg mb-4">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
          />

          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <Input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <Input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />

          <Input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <Button
            type="submit"
            disabled={isLoading}
            text={
              isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader size="sm" />
                  Registering...
                </div>
              ) : (
                "Create Account"
              )
            }
            className="w-full py-3 rounded-lg font-semibold"
          />
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;