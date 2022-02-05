import React, { useEffect, useState } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

import moment from "moment";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Input,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Radio,
  RadioGroup,
  Center,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
const ModalAdd = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const year = moment().get("year");
  const [value, setValue] = React.useState("manga");
  const [manga, setManga] = useState({
    title: "",
    barCode: "0",
    client: "",
    duration: 30,
  });
  const [food, setFood] = useState({
    product: "",
    barCode: "0",
    day: "",
    month: "",
    year: year,
  });
  const now = moment().format();
  const expire = moment(now).add(manga.duration, "days").format();

  useEffect(() => {
    onOpen();
    if (props.el) {
      if (props.el.title) {
        setManga({
          ...manga,
          title: props.el.title,
          client: props.el.client,
          barCode: props.el.barCode,
        });
      } else if (props.el.product) {
        setValue("food");
        const date = {
          day: moment(props.el.expire).get("date"),
          month: moment(props.el.expire).get("month"),
          year: moment(props.el.expire).get("year"),
        };
        setFood({
          ...food,
          product: props.el.product,
          barCode: props.el.barCode,
          day: date.day,
          month: date.month + 1,
          year: date.year,
        });
      }
    }
    setValue(props.value);
  }, []);
  const mangasCollectionRef = collection(db, "mangas");
  const foodsCollectionRef = collection(db, "food");

  //function to post a new manga
  const createManga = async () => {
    await addDoc(mangasCollectionRef, {
      title: manga.title,
      barCode: manga.barCode,
      client: manga.client,
      createAt: now,
      expire: expire,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });

    onClose();
    props.close({ modal: false, manga: true, food: false });
  };

  // function to post a new food
  const createFood = async () => {
    console.log(food);
    await addDoc(foodsCollectionRef, {
      product: food.product,
      barCode: food.barCode,
      createAt: now,
      expire: moment()
        .set({
          year: food.year,
          month: food.month - 1,
          date: food.day,
        })
        .format(),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    onClose();
    props.close({ modal: false, manga: false, food: true });
  };

  //function to update a manga
  const updateManga = async () => {
    const mangasCollectionDocRef = doc(db, "mangas", props.el.id);

    await updateDoc(mangasCollectionDocRef, {
      title: manga.title,
      barCode: manga.barCode,
      client: manga.client,
      createAt: props.el.createAt,
      expire: expire,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });

    onClose();
    props.close({ modal: false, manga: true, food: false });
  };

  //function to update a manga
  const updateFood = async () => {
    const foodCollectionDocRef = doc(db, "food", props.el.id);

    await updateDoc(foodCollectionDocRef, {
      product: food.product,
      barCode: food.barCode,
      expire: moment()
        .set({
          year: food.year,
          month: food.month - 1,
          date: food.day,
        })
        .format(),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });

    onClose();
    props.close({ modal: false, manga: false, food: true });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        props.close(false);
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

        {value === "manga" && (
          <ModalBody>
            <Text mb="4px" mt="16px">
              periodo:
            </Text>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={30}
              onChangeEnd={(val) => setManga({ ...manga, duration: val })}
              max="60"
            >
              <SliderMark value={15} mt="1" ml="-2.5" fontSize="sm">
                15
              </SliderMark>
              <SliderMark value={30} mt="1" ml="-2.5" fontSize="sm">
                30
              </SliderMark>
              <SliderMark value={45} mt="1" ml="-2.5" fontSize="sm">
                45
              </SliderMark>
              <SliderMark
                value={manga.duration}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {manga.duration}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mb="4px" mt="16px">
              Titolo:
            </Text>
            <Input
              value={manga.title}
              onChange={(event) => {
                setManga({ ...manga, title: event.target.value });
              }}
              placeholder="Aggiungi il titolo del manga"
              size="sm"
            />
            <Text mb="4px" mt="16px">
              Codice cliente:
            </Text>
            <Input
              value={manga.client}
              onChange={(event) => {
                setManga({ ...manga, client: event.target.value });
              }}
              placeholder="Aggiungi il numero tessera"
              size="sm"
            />

            <Text mb="4px" mt="16px">
              Codice a barre:
            </Text>
            <Input
              value={manga.barCode == 0 ? "" : manga.barcode}
              onChange={(event) => {
                setManga({ ...manga, barCode: event.target.value });
              }}
              placeholder="Inserisci codice a barre"
              size="sm"
            />
          </ModalBody>
        )}
        {value === "food" && (
          <ModalBody>
            <Text mb="4px" mt="16px">
              prodotto:
            </Text>
            <Input
              value={food.product}
              onChange={(event) => {
                setFood({ ...food, product: event.target.value });
              }}
              placeholder="Aggiungi il prodotto"
              size="sm"
            />
            <Text mb="4px" mt="16px">
              codice a barre:
            </Text>
            <Input
              value={food.barCode == 0 ? "" : food.barCode}
              onChange={(event) => {
                setFood({ ...food, barCode: event.target.value });
              }}
              placeholder="Inserisci  codice a barre"
              size="sm"
            />
            <Text mb="4px" mt="16px">
              scadenza:
            </Text>
            <Center>
              <NumberInput
                value={food.day}
                min={1}
                max={31}
                placeholder="Giorno"
                onChange={(valueString) =>
                  setFood({ ...food, day: valueString })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                value={food.month}
                min={1}
                max={12}
                placeholder="Mese"
                onChange={(valueString) =>
                  setFood({ ...food, month: valueString })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                value={food.year}
                min={2022}
                max={2030}
                placeholder="Anno"
                onChange={(valueString) =>
                  setFood({ ...food, year: valueString })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Center>
          </ModalBody>
        )}
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              if (props.el) {
                if (value === "manga") {
                  updateManga();
                  console.log("manga");
                } else {
                  updateFood();
                  console.log("Food");
                }
              } else if (value === "manga") {
                createManga();
                console.log("manga");
              } else {
                createFood();
                console.log("Food");
              }
            }}
          >
            Salva
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAdd;
