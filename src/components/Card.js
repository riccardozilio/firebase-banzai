import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import ModalAdd from "./ModalAdd";
import { deleteDoc, doc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import {
  Center,
  Text,
  Tag,
  GridItem,
  Box,
  Button,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";

const Card = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const el = props.el;
  const [dialog, setDialog] = useState(false);
  const [modal, setModal] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const now = moment().format();

  const archivedMangasCollectionRef = collection(db, "archivedMangas");
  const archivedFoodsCollectionRef = collection(db, "archivedFood");

  //function to archive manga
  const archivedManga = async () => {
    await addDoc(archivedMangasCollectionRef, {
      title: el.title,
      barCode: el.barCode,
      client: el.client,
      createAt: el.createAt,
      archived: now,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    deleteManga();
    toast({
      position: "top-right",
      title: "archiviazione riuscita.",
      description: "archiviazione manga avvenuta con successo",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  //function to archive food
  const archivedFood = async () => {
    await addDoc(archivedFoodsCollectionRef, {
      product: el.product,
      barCode: el.barCode,
      createAt: el.createAt,
      archived: now,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    deleteFood();
    toast({
      position: "top-right",
      title: "archiviazione riuscita.",
      description: "archiviazione food avvenuta con successo",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // function to delete manga

  const deleteManga = async () => {
    await deleteDoc(doc(db, "mangas", el.id));
    setDialog(false);

    props.close({ modal: false, manga: true, food: false });
  };

  // function to delete food

  const deleteFood = async () => {
    await deleteDoc(doc(db, "food", el.id));
    setDialog(false);

    props.close({ modal: false, manga: false, food: true });
  };

  return (
    <>
      {modal && (
        <ModalAdd
          el={el}
          value={el.title ? "manga" : "food"}
          close={(props) => {
            setModal(props);
          }}
        />
      )}
      <AlertDialog
        isOpen={dialog}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setDialog(false);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              elimina prodotto
            </AlertDialogHeader>

            <AlertDialogBody>
              sicuro di voler eliminare definitivamente questo prodotto?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDialog(false)}>
                anulla
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (el.title) {
                    deleteManga();
                    toast({
                      position: "top-right",
                      title: "eliminazione riuscita.",
                      description:
                        "eliminazione del manga avvenuta con successo",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  } else {
                    deleteFood();
                    toast({
                      position: "top-right",
                      title: "eliminazione riuscita.",
                      description: "eliminazione Food avvenuta con successo",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                }}
                ml={3}
              >
                elimina
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <GridItem
        p="2"
        bg="white"
        w={["90%", "40%", "22%"]}
        //   border="1px"
        //   borderColor="gray.100"
        borderRadius="md"
        borderWidth="1px"
        borderColor="#3a3b3f"
        boxShadow="lg"
        position="relative"
      >
        <Text w="70%" fontWeight="bold" color="black" fontSize="lg">
          {el.title || el.product}
        </Text>
        <Text w="70%" color="gray.500" fontSize="sm">
          {moment(el.expire).format("DD-MM-yy")}
        </Text>
        <SlideFade in={isOpen} position="absolute" bottom="10px">
          <Box>
            <Center>
              <Barcode
                textMargin="1"
                fontSize="10"
                background="none"
                flat="true"
                width="2"
                height="50"
                value={el.barCode}
                lineColor={el.barCode == "0" ? "white" : "black"}
              />
            </Center>
            <Box
              d="flex"
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="center"
              py="1"
            >
              <Box
                mt="2"
                rounded="md"
                px="5"
                py="1"
                bg="green.200"
                transition="all 0.4s cubic-bezier(.08,.52,.52,1)"
                _hover={{ bg: "green.300" }}
                onClick={() => {
                  if (el.title) {
                    archivedManga();
                  } else {
                    archivedFood();
                  }
                }}
              >
                Ritirato
              </Box>
              <Box
                mt="2"
                rounded="md"
                px="5"
                py="1"
                bg="orange.200"
                transition="all 0.4s cubic-bezier(.08,.52,.52,1)"
                _hover={{ bg: "orange.300" }}
                onClick={() => setModal(true)}
              >
                Modifica
              </Box>
              <Box
                mt="2"
                rounded="md"
                px="5"
                py="1"
                bg="red.200"
                transition="all 0.4s cubic-bezier(.08,.52,.52,1)"
                _hover={{ bg: "red.300" }}
                onClick={() => {
                  setDialog(true);
                }}
              >
                Elimina
              </Box>
            </Box>
          </Box>
        </SlideFade>

        <Box
          position="absolute"
          bottom="10px"
          w="95%"
          style={isOpen ? { display: "none" } : { display: "block" }}
        >
          <Text fontSize="xs" float="left">
            aggiunta il {moment(el.createAt).format("DD-MM-yy")}
          </Text>
          <Text float=" right" rounded="md" px="5" bg="gray.400" color="black">
            {el.client}
          </Text>
        </Box>

        <Text
          fontSize="3xl"
          position="absolute"
          top="-10px"
          right="20px"
          onClick={onToggle}
        >
          ...
        </Text>
      </GridItem>
    </>
  );
};

export default Card;
