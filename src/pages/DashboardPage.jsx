import React, { useEffect } from "react";
import UrlForm from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const DashboardPage = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('http://localhost:3000/api/auth/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!res.ok) {
        navigate({ to: '/' });
      }
    };
  
    checkAuth();
  }, []);
  return (
    <div className="  flex py-10 flex-col items-center justify-center p-4">
      <div className="bg-[#091226] py-10 p-8 rounded-lg shadow-md w-[80vw]  ">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  );
};

export default DashboardPage;
