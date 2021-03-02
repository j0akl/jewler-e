import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {
  isLoginOrRegister?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ isLoginOrRegister = false }) => {

  const [{ data, fetching }] = useMeQuery();

  const accountButtonStyle = (marginRight: string) => {
    return {
      marginRight,
      fontSize: "24px",
      padding: "1px",
      paddingRight: "12px",
      paddingLeft: "12px",
      backgroundColor: "white",
      border: "1px solid rgba(0, 0, 0, 0.5)",
      boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
      borderRadius: "3px",
      alignItems: "center"
    }
  }
  const navBarStyle = {
    backgroundColor: "floralwhite",
    height: "85px",
    boxShadow: "0px 2px 10px",
    top: 0,
    alignItems: "center",
    zIndex: 1,
    p: 4
  }
  const logoBoxStyle = {
    marginLeft: "2em",
    fontSize: "36px",
    padding: "1px",
    paddingRight: "20px",
    paddingLeft: "20px",
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    borderRadius: "2em",
    alignItems: "center"
  }
  const sellBoxStyle = {
    fontWeight: 700, // same as typical bold font
    marginRight: "75px",
    marginLeft: "auto",
    fontSize: "30px",
    padding: "1px",
    paddingRight: "12px",
    color: "floralwhite",
    paddingLeft: "12px",
    backgroundColor: "crimson",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    borderRadius: "2em",
    alignItems: "center"
  }
  const linkStyle = (marginRight: string) => {
    return {
      marginTop: "auto",
      marginBottom: "auto",
      marginRight
    }
  }

  let body = null;

  if (!isLoginOrRegister) {
    if (fetching) {
      // loading
    } else if (data?.me) {
     body = (
        <NextLink href="/my-account">
            <Flex style={accountButtonStyle("40px")}>
              My Account
            </Flex>
        </NextLink>
      );
    } else {
      body = (
        <Flex>
            <NextLink href="/register">
              <Flex style={accountButtonStyle("20px")}>Register</Flex>
            </NextLink>
            <NextLink href="/login">
              <Link style={linkStyle("3em")}>Log In</Link>
            </NextLink>
        </Flex>
      )
    }
  }


  return (
    <Flex style={navBarStyle} position="sticky">
      <NextLink href="/">
        <Flex style={logoBoxStyle}>JewlerE</Flex>
      </NextLink>
      <Flex ml={"auto"}>
        <NextLink href="/about-jewlere">
          <Link style={linkStyle("50px")}>What is JewlerE?</Link>
        </NextLink>
        <NextLink href="/sell">
          <Flex style={sellBoxStyle}>Sell</Flex>
        </NextLink>
        {body}
      </Flex>
    </Flex>
  )
};
