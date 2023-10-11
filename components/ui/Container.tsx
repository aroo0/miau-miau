import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-[1360px] w-full ">{children}</div>;
};

export default Container;
