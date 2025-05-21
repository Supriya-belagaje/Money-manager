import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser, registerUser } from "@/service/auth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // or use any icon library you prefer


export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const registerSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      const { name, email, password } = values;
      const body = { name, email, password };
      const data = await registerUser(body);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      toast.success(data.message || "Registered successfully!");
      resetForm();
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const data = await loginUser(values);

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      toast.success(data.message || "Logged in successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-none">
        <CardContent className="p-8">
          <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-2">💰 Money Manager</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Track and control your spending smartly.</p>

          {isLogin ? (
            <>
              {/* Login Form */}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="focus:ring-indigo-400"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <div className="relative">
                        <Field
                          as={Input}
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="focus:ring-indigo-400 pr-10"
                        />
                        <div
                          className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>

              <p className="text-sm text-center mt-4 text-gray-600">
                Don't have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-indigo-600 font-medium hover:underline">
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Register Form */}
              <Formik
                innerRef={registerFormRef}
                initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                validationSchema={registerSchema}
                onSubmit={handleRegister}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        as={Input}
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="focus:ring-indigo-400"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="focus:ring-indigo-400"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <div className="relative">
                        <Field
                          as={Input}
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="focus:ring-indigo-400 pr-10"
                        />
                        <div
                          className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <Field
                        as={Input}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="focus:ring-indigo-400"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
                      Register
                    </Button>
                  </Form>
                )}
              </Formik>

              <p className="text-sm text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <button onClick={() => {
                  setIsLogin(true)
                  registerFormRef.current?.resetForm(); // Reset register form
                }} className="text-indigo-600 font-medium hover:underline">
                  Login
                </button>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
