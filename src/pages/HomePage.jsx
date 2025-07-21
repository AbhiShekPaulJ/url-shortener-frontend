import React from "react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen w-[100vw]  flex flex-col items-center justify-center  gap-20 p-4">
      <h1 className="text-6xl"><q>Turning Long Links into Short Stories</q></h1>
      <div className="bg-[#091226] text-white p-8 rounded-lg min-h-[60vh]  shadow-md w-[60vw] sm:w-full ">
        <h1 className="lg:text-5xl text-3xl font-bold text-center mb-6">URL Shortener</h1>
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
