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
  console.log(variant);
  return (
    <Box maxW={variant === "regular" ? "100vw" : "400px"} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
