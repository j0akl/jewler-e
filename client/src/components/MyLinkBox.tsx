import React from "react";
import NextLink from "next/link";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";

interface MyListBoxProps {
  href: string;
  children: any;
}

export const MyLinkBox: React.FC<MyListBoxProps> = ({ href, children }) => {
  return (
    <LinkBox>
      <NextLink href={href} passHref>
        <LinkOverlay>{children}</LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};
