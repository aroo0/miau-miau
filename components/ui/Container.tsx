import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className=" relative mx-auto max-w-[1280px] w-full">{children}</div>;
};

export default Container;
