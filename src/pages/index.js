import React from "react";
import { useRouter } from "next/router";
import HomeBanner from "@/components/home/banner";

const Index = (props) => {
  const router = useRouter();

  const navigateToPath = (path) => {
    router.push(path);
  };

  return (
    <div className="container">
      <HomeBanner />
    </div>
  );
};

export default Index;
