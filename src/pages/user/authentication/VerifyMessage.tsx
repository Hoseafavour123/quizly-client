import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaBrain } from "react-icons/fa";

const VerifyEmailMessage: React.FC = () => {
  return (
    <div className="font-montserrat flex max-md:flex-col justify-center items-center min-h-screen">
      <div className="md:w-[30%]">
       <FaBrain className="text-9xl text-indigo-500" />
               <h1 className="bg-gradient-to-r from-indigo-500 via-pink-400 to-pink-500 text-transparent bg-clip-text text-6xl max-md:text-4xl font-semibold">
                 Quizly
               </h1>
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
            className="inline-block mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Open Gmail
          </a>
        </div>
      </div>
    </div>
  )
};

export default VerifyEmailMessage;