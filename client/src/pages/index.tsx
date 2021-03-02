import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

// home page
const Index = () => {
  return (
    <>
      <Layout variant="regular">
        <Box> change</Box>
      </Layout>
    </>
  )
};

// at the bottom of every page:
// export default withUrqlClient(createUrqlClient)(Componentname)
// optional: for serverside rendering, add option {ssr: true}, defaults to false
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
