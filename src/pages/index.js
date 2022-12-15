import React from "react";
import { useRouter } from "next/router";
import LoginCarousel from "src/client/components/login/carousel";
import LoginButton from "src/client/components/login/button";
import { PATH_NAMES } from "src/client/clientConfig/clientConstants";

const Index = (props) => {
  const router = useRouter();

  const navigateToPath = (path) => {
    router.push(path);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 order-2 order-md-1 d-flex flex-column justify-content-center">
          <LoginButton
            title={"Login"}
            isActive={true}
            callback={() => navigateToPath(PATH_NAMES.preAuthPath.login)}
          />
          <LoginButton
            title={"Register"}
            isActive={false}
            callback={() => navigateToPath(PATH_NAMES.preAuthPath.signup)}
          />
        </div>
        <div className="col-12 col-md-8 order-1 order-md-2">
          <LoginCarousel />
        </div>
      </div>
    </div>
  );
};

export default Index;
