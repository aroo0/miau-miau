"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: "border ",
        style: {
          boxShadow: "none",
          padding: '10px 30px'
        },
      
      }}
      position="bottom-center"

    />
  );
};

export default ToasterProvider;
