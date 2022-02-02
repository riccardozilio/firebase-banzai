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
          bg="#ff6347"
          color="white"
          px="8px"
          borderRadius="10px"
          fontSize="14px"
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
          border="1px"
          px="8px"
          borderRadius="10px"
          fontSize="14px"
          fontWeight="semibold"
          borderColor="#ff6347"
          color="#ff6347"
          _hover={{ bg: "#ff6347", color: "white" }}
          onClick={props.onClick}
        >
          {props.text}
        </Box>
      )}
    </>
  );
};

export default Button;
