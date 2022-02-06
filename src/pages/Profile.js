import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signOut } from "firebase/auth";
import Button from "../components/Button";
import { updateProfile } from "firebase/auth";
import { EditIcon } from "@chakra-ui/icons";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const Profile = () => {
  let navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editing, setEditing] = useState(false);
  const cover = [
    "https://images.everyeye.it/img-notizie/naruto-rapper-americano-dedica-canzone-sasuke-uchiha-v3-442203.jpg",
    "https://qph.fs.quoracdn.net/main-qimg-097c5fe70510dea4d9bffd3530585a2c",
    " https://i.pinimg.com/originals/a4/e4/2c/a4e42cdc6acb97b175a3b64ddb4c4cda.jpg",
    "https://www.animeclick.it/immagini/personaggio/Yuki_Soma/gallery_original/Yuki_Soma-5d853db44862d.jpg",
    "https://s4.anilist.co/file/anilistcdn/character/large/b374-8BT4gMd8xyl5.png",
    "https://64.media.tumblr.com/941538c230449a37ed161a1ddda7adb4/1d562eec20ebbeca-08/s400x600/fb16e5359d8c8a2ab849eebcebafbfd31d015d69.png",
    "https://cdn.bhdw.net/im/toilet-bound-hanako-kun-hanako-kun-sfondo-71687_w635.jpg",
    "https://staticg.sportskeeda.com/editor/2021/12/b5306-16406537216511-1920.jpg",
    "https://i.pinimg.com/originals/ef/79/03/ef7903793820a6fe417b66f0b21de100.jpg",
  ];
  const [info, setInfo] = useState({
    name: auth.currentUser ? auth.currentUser.displayName : "",
    img: auth.currentUser ? auth.currentUser.photoURL : "",
  });
  const updateProfileInfo = () => {
    updateProfile(auth.currentUser, {
      displayName: info.name,
      photoURL: info.img,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  const user = auth;
  console.log("user", user);
  return (
    <Center h="100vh">
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <img
                src="https://www.banzai-dojo.it/sites/default/files/logoHome.png"
                style={{
                  width: "150px",
                }}
              />
            </Center>
          </ModalHeader>

          <ModalBody d="flex" justifyContent="space-around" flexWrap="wrap">
            {cover.map((e) => {
              return (
                <Avatar
                  onClick={() => {
                    setInfo({ ...info, img: e });
                    onClose();
                  }}
                  m="2"
                  size="xl"
                  src={e}
                />
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
      {user.currentUser.email && (
        <Box
          d="flex"
          flexDirection="column"
          alignItems="start"
          shadow="2xl"
          borderWidth="1px"
          borderColor="gray.400"
          p="20"
          rounded="md"
          position="relative"
        >
          {editing ? (
            <>
              <Center w="100%" mb="15">
                <Avatar
                  onClick={() => onOpen()}
                  borderWidth="2px"
                  borderColor="lightcyan"
                  size="xl"
                  name={
                    auth.currentUser.displayName
                      ? auth.currentUser.displayName
                      : "vuoto"
                  }
                  src={info.img ? info.img : ""}
                />
              </Center>
              <Box d="flex" alignItems="center">
                <Text fontSize="xs" color="gray.400" mr="5">
                  username
                </Text>{" "}
                <Input
                  onChange={(event) => {
                    setInfo({ ...info, name: event.target.value });
                  }}
                  w="250px"
                  value={info.name}
                ></Input>
              </Box>
              <Center position="absolute" bottom="10px" left="0px" w="100%">
                <Box
                  bg="gray.400"
                  h="30px"
                  px="6"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  color="white"
                  fontSize="sm"
                  rounded="xl"
                  cursor="pointer"
                  _hover={{ bg: "gray.500" }}
                  onClick={() => {
                    updateProfileInfo();
                    setEditing(false);
                  }}
                >
                  salva
                </Box>
              </Center>
            </>
          ) : (
            <>
              <Center w="100%" mb="10">
                <Avatar
                  size="xl"
                  name={info.name ? info.name : ""}
                  src={info.img ? info.img : ""}
                />
              </Center>
              <Center w="250px">
                <Text fontSize="20" fontWeight="bold">
                  {info.name ? info.name : ""}
                </Text>
              </Center>
              <Center position="absolute" bottom="10px" left="0px" w="100%">
                <Box
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        navigate(`/`);
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                  color="gray.400"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  cursor="pointer"
                  _hover={{ color: "gray.700" }}
                >
                  Logout
                </Box>
              </Center>
              <EditIcon
                onClick={() => setEditing(true)}
                position="absolute"
                top="15px"
                right="15px"
              >
                {" "}
              </EditIcon>
            </>
          )}
        </Box>
      )}
    </Center>
  );
};

export default Profile;
