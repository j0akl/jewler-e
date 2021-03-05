import React from "react";
import { MyDrawer } from "./MyDrawer";
import {
  LinkBox,
  LinkOverlay,
  Avatar,
  ButtonGroup,
  Button,
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
            text="Communities"
            buttonProps={{ colorScheme: "green", mr: 5 }}
          >
            <Text>test</Text>
          </MyDrawer>
          <LinkBox>
            <NextLink href="/my-account" passHref>
              <LinkOverlay>
                <Avatar size="sm" />
              </LinkOverlay>
            </NextLink>
          </LinkBox>
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
    <Flex top={0} position="sticky" h={16} w="100%">
      <Flex my="auto" align="center" ml={8}>
        <LinkBox>
          <NextLink href="/" passHref>
            <LinkOverlay>
              <Text fontSize="2xl" fontWeight="semibold">
                JewlerE
              </Text>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
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
