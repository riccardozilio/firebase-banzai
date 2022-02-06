import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  Center,
  Input,
  InputRightElement,
  InputGroup,
  Text,
  IconButton,
  Avatar,
  Box,
} from "@chakra-ui/react";

const Login = (props) => {
  let navigate = useNavigate();
  const [user, setUser] = useState({ mail: "", password: "" });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const logInUser = () => {
    signInWithEmailAndPassword(auth, user.mail, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate(`/home`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Center h="100vh">
      <Center
        d="flex"
        flexDirection="column"
        shadow="2xl"
        borderWidth="1px"
        borderColor="gray.400"
        p="10"
        rounded="md"
      >
        <img
          src="https://www.banzai-dojo.it/sites/default/files/logoHome.png"
          style={{
            width: "150px",
          }}
        />
        <Box>
          <Text fontSize="xs" color="gray.400">
            username
          </Text>
          <Input
            w="250px"
            onChange={(event) => {
              setUser({ ...user, mail: event.target.value });
            }}
          />
        </Box>
        <Box mt="5">
          <Text fontSize="xs" color="gray.400">
            password
          </Text>
          <Input
            type="password"
            w="250px"
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
        </Box>
        <Box
          mt="5"
          py="2"
          rounded="md"
          w="250px"
          bg="gray.400"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          _hover={{ bg: "gray.500" }}
          onClick={() => {
            console.log("user", user);
            logInUser();
          }}
        >
          <Center fontSize="xs" color="white">
            Login
          </Center>
        </Box>
      </Center>
    </Center>
  );
};

export default Login;
