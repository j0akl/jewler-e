import React from "react";
import { MyLinkBox } from "./MyLinkBox";
import {
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  Image,
  Box,
} from "@chakra-ui/react";

interface ItemCardProps {}

export const ItemCard: React.FC<ItemCardProps> = ({}) => {
  return (
    <MyLinkBox href="/item">
      <Box boxShadow="2px 4px 6px grey" w="250px" h="250px" borderRadius="20px">
        <Image
          t="0"
          w="100%"
          fit="cover"
          h="60%"
          borderTopRadius="20px"
          src="https://static.highsnobiety.com/thumbor/6MThFpa556HeVUZDH0YgOif-KX4=/1600x1067/static.highsnobiety.com/wp-content/uploads/2019/04/10104728/rolex-daytona-ayrton-senna-01.jpg"
        />
        <Box m="10px">
          <Stat size="sm">
            <StatLabel>Rolex Daytona</StatLabel>
            <StatNumber>$10000</StatNumber>
            <StatHelpText>Sold By: Jake Lynn</StatHelpText>
          </Stat>
        </Box>
      </Box>
    </MyLinkBox>
  );
};
