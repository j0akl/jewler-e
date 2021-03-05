import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  useDisclosure,
} from "@chakra-ui/react";

interface MyDrawerProps {
  buttonProps?: {};
  buttonText: string;
  title: string;
}

export const MyDrawer: React.FC<MyDrawerProps> = ({
  buttonText,
  buttonProps,
  children,
  title,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button {...(buttonProps ? buttonProps : null)} onClick={onOpen}>
        {buttonText}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{title}</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
