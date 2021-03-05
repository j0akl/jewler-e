import React from "react";
import { MyDrawer } from "./MyDrawer";
import {
  Avatar,
  ButtonGroup,
  Button,
  UnorderedList,
  ListItem,
  InputGroup,
  Flex,
  Text,
  Input,
  Spacer,
  InputLeftAddon,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import NextLink from "next/link";
import { useMeBuyerQuery } from "../generated/graphql";
import { MyLinkBox } from "./MyLinkBox";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeBuyerQuery();

  let loginOrUser = null;

  if (fetching) {
    // loading
  } else if (data?.meBuyer) {
    loginOrUser = (
      <>
        <Flex align="center" my="auto" mr={8}>
          <MyDrawer
            buttonText="My Account"
            title={
              "Hello, " + data.meBuyer.username /* TODO change to firstname */
            }
            buttonProps={{ colorScheme: "green", mr: 5 }}
          >
            <UnorderedList listStyleType="none">
              <MyLinkBox href="/my-account">
                <ListItem>My Account</ListItem>
              </MyLinkBox>
            </UnorderedList>
          </MyDrawer>
          <Avatar size="sm" />
        </Flex>
      </>
    );
  } else {
    loginOrUser = (
      <ButtonGroup my="auto" mr={8}>
        <NextLink href="/login">
          <Button variant="outline" colorScheme="green">
            Log In
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button colorScheme="green">Register</Button>
        </NextLink>
      </ButtonGroup>
    );
  }

  return (
    <Flex bg="white" top={0} position="sticky" h={16} w="100%">
      <Flex my="auto" align="center" ml={8}>
        <MyLinkBox href="/">
          <Text fontSize="2xl" fontWeight="semibold">
            JewlerE
          </Text>
        </MyLinkBox>
        <InputGroup ml={8}>
          <InputLeftAddon pointerEvents="none" children={<GoSearch />} />
          <Input w={400} />
        </InputGroup>
      </Flex>
      <Spacer />
      {loginOrUser}
    </Flex>
  );
};
