import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import { initUser } from "src/client/redux/authorization/thunk";
import LoginCarousel from "src/client/components/login/carousel";
import LoginButton from "src/client/components/login/button";
import FormInput from "src/client/components/login/formInput";

const Login = (props) => {
  const router = useRouter();
  const values = React.useRef({});
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (type, event) => {
    if (event && event == "submit") {
      loginHandler();
      return;
    }
    let currentValue = values.current;
    currentValue[type] = event.target.value;
    values.current = currentValue;
  };

  const loginHandler = async (e) => {
    e && e.preventDefault();
    if (isLoading) return;
    if (Object.keys(values.current).length != 2) return;
    if (values.current.email.length < 3) return;
    if (values.current.password.length < 3) return;
    setLoading(true);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values.current),
    });
    const result = await response.json();
    if (result.error) {
      toast.error(result.message.split("_").join(" "), {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }
    // on successful login, intialize redux with all required data from db
    toast.success("Logged In successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    
    dispatch(initUser(values.current.email));
  };

  const navigateToPath = (path) => {
    router.push(path);
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 col-md-4 d-flex flex-column justify-content-center">
          <div className="text-center py-2">
            <h5>Enter your login credentials</h5>
          </div>
          <FormInput
            type="email"
            label="Email address"
            value=""
            callback={(e) => onChangeHandler("email", e)}
          />
          <FormInput
            type="password"
            label="Password"
            value=""
            callback={(e) => onChangeHandler("password", e)}
          />
          <LoginButton
            title={"Login"}
            isActive={true}
            callback={loginHandler}
          />
        </div>
        <div className="col-12 col-md-8">
          <LoginCarousel />
        </div>
      </div>
    </div>
  );
};

export default Login;
