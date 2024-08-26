import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface User {
  id: number;
}

const LoginPage = (props: User) => {
  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage !== null) {
      router.push("/");
    }
  }, [router]);

  const [userName, setUserName] = useState<string>();
  const [passWord, setPassWord] = useState<string>();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log("data", data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("token", json.token);
      router.push("/my-tables");
    }
  };
  return (
    <div className="page-container">
      <div className="login-page">
        <Navbar />
        <form className="login-window" onSubmit={onSubmit}>
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="text"
            required={true}
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
            className="input"
            name="email"
          />
          <label>Password</label>
          <input
            type="password"
            required={true}
            value={passWord}
            onChange={(event) => setPassWord(event.target.value)}
            className="input"
            name="password"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <a href="#" className="forgotpassword-link">
            Forgot password?
          </a>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default LoginPage;
