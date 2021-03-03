import React from "react";
import { useRouter } from "next/router";
import { createUrqlClient } from "src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Text } from "@chakra-ui/react";
import { Layout } from "src/components/Layout";

interface CommunityHomeProps {}

export const CommunityHome: React.FC<CommunityHomeProps> = ({}) => {
  const router = useRouter();
  const { communityName } = router.query;

  return (
    <Layout variant="full">
      <Text>{communityName}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CommunityHome);
