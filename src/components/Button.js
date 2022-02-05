import React from "react";
import { Box } from "@chakra-ui/react";

const Button = (props) => {
  const isActive = props.isActive ? props.isActive : false;
  return (
    <>
      {isActive ? (
        <Box
          as="button"
          height="40px"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          bg="white"
          color="black"
          px="8px"
          borderRadius="10px"
          fontSize={props.fontSize ? props.fontSize : "14px"}
          fontWeight="semibold"
          onClick={props.onClick}
        >
          {props.text}
        </Box>
      ) : (
        <Box
          as="button"
          height="40px"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="8px"
          fontSize={props.fontSize ? props.fontSize : "14px"}
          fontWeight="semibold"
          color="gray.400"
          _hover={{ bg: "white", color: "black" }}
          onClick={props.onClick}
        >
          {props.text}
        </Box>
      )}
    </>
  );
};

export default Button;
