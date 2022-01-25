// import { useEffect } from "react";
import type { NextPage } from "next";
import { Routes } from "../constants/routes";
// import { useUser } from "@auth0/nextjs-auth0";
// import { useRouter } from "next/router";

const Home: NextPage = () => {
  // const router = useRouter();
  // const { user } = useUser();
  // useEffect(() => {
  //   if (user) {
  //     router.push(Routes.ViewRecipes);
  //   }
  // }, [user]);

  return (
    <div>
      <h1>Welcome</h1>
      <a href={Routes.LogIn}>Log In</a>
    </div>
  );
};

export default Home;
