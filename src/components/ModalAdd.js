import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
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
  };

  // function to post a new food
  const createFood = async () => {
    console.log(food);
    await addDoc(foodsCollectionRef, {
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
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="manga">manga</Radio>
                <Radio value="food">food</Radio>
              </Stack>
            </RadioGroup>
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
                defaultValue={2022}
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
              if (value === "manga") {
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
