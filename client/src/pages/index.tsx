import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Image, Center, Flex, Text } from "@chakra-ui/react";
import { ItemCard } from "../components/ItemCard";

// home page
const Index = () => {
  return (
    <>
      <Layout>
        <Image
          h="500px"
          w="100%"
          fit="cover"
          src="https://static01.nyt.com/images/2020/03/09/multimedia/09sp-womencollectors-inyt1/merlin_169978632_ef7805fb-a44e-401b-95f6-131a2efdfa57-superJumbo.jpg?quality=90&auto=webp"
        />
        <Center mt="10">
          <Text fontSize="4xl">Welcome to JewlerE!</Text>
        </Center>
        <Text m="20px" fontSize="2xl">
          Trending Items
        </Text>
        <Flex mx="20px">
          <ItemCard />
        </Flex>
        <Flex>
          <Center w="50%" mt="20">
            <Text fontSize="2xl">Who are we?</Text>
          </Center>
          <Center ml="auto" w="50%" mt="20">
            <Text fontSize="2xl">What do we do?</Text>
          </Center>
        </Flex>
      </Layout>
    </>
  );
};

// at the bottom of every page:
// export default withUrqlClient(createUrqlClient)(Componentname)
// optional: for serverside rendering, add option {ssr: true}, defaults to false
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
