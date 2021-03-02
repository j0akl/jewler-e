import React from "react";
import { Flex, Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {
  isLoginOrRegister?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ isLoginOrRegister = false }) => {

  const [{ data, fetching }] = useMeQuery();

  const accountButtonStyle = {
    marginRight: "3em",
    fontSize: "18px",
    padding: "1px",
    paddingRight: "12px",
    paddingLeft: "12px",
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    borderRadius: "3px",
    alignItems: "center"
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
    fontSize: "30px",
    padding: "1px",
    paddingRight: "12px",
    paddingLeft: "12px",
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    borderRadius: "2em",
    alignItems: "center"
  }

  let body = null;

  if (!isLoginOrRegister) {
    if (fetching) {
      // loading
    } else if (data?.me) {
     body = (
        <NextLink href="/my-account">
            <Flex style={accountButtonStyle}>
              {data.me.username}
            </Flex>
        </NextLink>
      );
    } else {
      body = (
        <Flex>
            <NextLink href="/login">
              <Link mt="auto" mb="auto" mr={5}>Log In</Link>
            </NextLink>
            <NextLink href="/register">
              <Flex style={accountButtonStyle}>Register</Flex>
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
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  )
};
