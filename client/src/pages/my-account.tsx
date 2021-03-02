import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Button, Flex } from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";


interface MyAccountProps {}

export const MyAccount: React.FC<MyAccountProps> = ({}) => {

  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const router = useRouter();

  let body = null;
  if (fetching) {
    // data is loading
  } else if (data?.me) {
    body = (
      <>
        {/* place profile pic here */}
        <Button
          ml="auto"
          isLoading={logoutFetching} 
          onClick={() => logout()}
        >
          Log Out
        </Button>
      </>
    )
  } else {
    router.push("/");
  }
  return (
    <Layout variant="small">
      <Flex w="100%">{body}</Flex>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(MyAccount);
