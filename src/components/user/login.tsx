import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";
import { UserLogin } from "../../service/user"; 

type Props = {};

const Login = (props: Props) => {
  const { setIsAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const user = await UserLogin({ email, password });
  
      console.log('user', user);
  
      if (!user || !user.info) {
        alert("Đăng nhập thất bại: Thông tin không hợp lệ");
        return;
      } else {
        const { role } = user.info;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("role", role); 
        setIsAuthenticated(true);
        
        alert("Đăng nhập thành công"); 
        
        navigate('/'); 
      }
  
    } catch (error) {
      alert("Đăng nhập thất bại");
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full sm:px-6 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 pb-[10px] flex">
                  Don't have an account?{" "}
                  <NavLink to={"/register"} className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                    Register here
                  </NavLink>
                </p>
                <NavLink
                  to={"/"}
                  className="text-blue-400 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Back to Home
                </NavLink>
              </div>
              <div>
                <label className="text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              {message && <div className="text-red-500 mt-4">{message}</div>}
              <div className="flex items-center justify-between gap-2 mt-5">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        localStorage.setItem("email", email);
                      } else {
                        localStorage.removeItem("email");
                      }
                    }}
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <button className="text-blue-600 font-semibold text-sm hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
