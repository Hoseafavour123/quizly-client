import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { appInfo } from "../../../constants/app.info";

const VerifyEmailMessage: React.FC = () => {
  return (
    <div className="font-montserrat flex max-md:flex-col justify-center items-center min-h-screen">
       <div className="flex flex-col items-center md:w-[30%]">
             <img src={appInfo.logo} className="w-60" alt="" />
             <em>Take a quiz and earn!</em>
           </div>
     
      <div className="md:w-[30%]">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm w-full">
          <div className="flex justify-center items-center mb-4 text-green-600">
            <AiOutlineMail className="text-4xl" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Verify Your Email
          </h1>
          <p className="text-gray-600 mt-2">
            A verification link has been sent to your email. Please check your
            inbox and verify your email address to continue.
          </p>
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-[#E706E5] text-white font-medium py-2 px-4 rounded hover:opacity-80 transition"
          >
            Open Gmail
          </a>
        </div>
      </div>
    </div>
  )
};

export default VerifyEmailMessage;