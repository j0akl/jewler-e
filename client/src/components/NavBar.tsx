import React from "react";
import { Flex, Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {

  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
    // loading
  } else if (data?.me) {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        {/* TODO: insert account dropdown here */}
      </Flex>
    );
  } else {
    body = (
      <Box>
        <NextLink href="/register">
          <Link mr={2}>Register / Login</Link>
        </NextLink>
      </Box>
    )
  }

  const navBarStyle = {
    backgroundColor: "cornsilk",
    borderBottom: "1px solid black",
    boxShadow: "0px 2px",
    top: 0,
    zIndex: 1,
    p: 4
  }

  return (
    <Flex style={navBarStyle} position="sticky">
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  )
};
