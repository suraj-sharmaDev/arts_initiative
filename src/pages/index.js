import React from "react";
import { useRouter } from "next/router";
import HomeBanner from "@/components/home/banner";
import HomePopular from "@/components/home/popular";

const Index = (props) => {
  const router = useRouter();

  const navigateToPath = (path) => {
    router.push(path);
  };

  return (
    <div className="container">
      <HomeBanner />
      <HomePopular />
    </div>
  );
};

export default Index;
