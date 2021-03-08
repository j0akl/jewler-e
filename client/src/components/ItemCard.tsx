import React from "react";
import { MyLinkBox } from "./MyLinkBox";
import {
  Flex,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  Image,
  Box,
  Badge,
} from "@chakra-ui/react";

interface ItemCardProps {}

export const ItemCard: React.FC<ItemCardProps> = ({}) => {
  return (
    <MyLinkBox href="/item">
      <Box boxShadow="2px 4px 6px grey" w="240px" h="240px" borderRadius="20px">
        <Image
          t="0"
          w="100%"
          fit="cover"
          h="60%"
          borderTopRadius="20px"
          src="https://static.highsnobiety.com/thumbor/6MThFpa556HeVUZDH0YgOif-KX4=/1600x1067/static.highsnobiety.com/wp-content/uploads/2019/04/10104728/rolex-daytona-ayrton-senna-01.jpg"
        />
        <Box m="13px">
          <Stat size="sm">
            <Flex>
              <StatLabel>Rolex Daytona</StatLabel>
              <Box ml="auto">
                <Badge variant="solid" colorScheme="green">
                  New
                </Badge>
              </Box>
            </Flex>
            <StatNumber>$10000</StatNumber>
            <StatHelpText>Sold By: Jake Lynn</StatHelpText>
          </Stat>
        </Box>
      </Box>
    </MyLinkBox>
  );
};
