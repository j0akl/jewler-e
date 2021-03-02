import React from "react";
import { Box } from "@chakra-ui/react";

export type WrapperVariant = "full" | "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : 
                        "small" ? "400px":
                        "full" ? "100vw" : "0px"}
      w="100%"
      mt={8}
      marginX="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
