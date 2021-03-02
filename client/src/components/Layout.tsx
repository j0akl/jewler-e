import React from "react";
import Wrapper, { WrapperVariant } from "./Wrapper";
import { NavBar } from "./NavBar";

interface LayoutProps {
  isLoginOrRegister?: boolean;
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  variant,
  isLoginOrRegister = false
}) => {
  return (
    <>
      <NavBar isLoginOrRegister={isLoginOrRegister}/>
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}
