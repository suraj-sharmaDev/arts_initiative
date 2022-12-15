import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import LoginCarousel from "src/client/components/login/carousel";
import LoginButton from "src/client/components/login/button";
import FormInput from "src/client/components/login/formInput";
import { isValidUrl } from "src/client/helpers/commonFunctions";

const Signup = (props) => {
  const router = useRouter();
  const values = React.useRef({});
  const [isLoading, setLoading] = React.useState(false);

  const onChangeHandler = (type, event) => {
    if (event && event == "submit") {
      signupHandler();
      return;
    }
    let currentValue = values.current;
    currentValue[type] = event.target.value;
    values.current = currentValue;
  };

  const signupHandler = async (e) => {
    e && e.preventDefault();
    if (isLoading) return;
    if (Object.keys(values.current).length != 2) return;
    if (values.current.email.length < 3) return;
    if (values.current.password.length < 3) return;
    // domain will be passed to our central admin
    let data = { ...values.current };
    const domain = window.location.origin;
    if (process.env.NODE_ENV == "production" && isValidUrl(domain))
      data.domain = domain;
    setLoading(true);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
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
    toast.success(result.message.split("_").join(" "), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      router.push("/login");
    }, 400);
  };

  const navigateToPath = (path) => {
    router.push(path);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 col-md-4 d-flex flex-column justify-content-center">
          <div className="text-center py-2">
            <h5>Enter your credentials to register</h5>
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
            title={"Register"}
            isActive={true}
            callback={signupHandler}
          />
        </div>
        <div className="col-12 col-md-8">
          <LoginCarousel />
        </div>
      </div>
    </div>
  );
};

export default Signup;
