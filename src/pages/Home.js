import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import ModalAdd from "../components/ModalAdd";
import MangaCard from "../components/MangaCard";
import Button from "../components/Button";

import {
  Center,
  Text,
  Tag,
  Grid,
  background,
  Input,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import moment from "moment";

const Home = () => {
  const [mangasList, setMangasList] = useState([]);
  const [foodsList, setFoodsList] = useState([]);
  const [value, setValue] = React.useState("manga");
  const [valueFilter, setValueFilter] = useState(1);
  const [modal, setModal] = useState(false);
  const mangasCollectionRef = collection(db, "mangas");
  const foodsCollectionRef = collection(db, "food");

  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  // filter for the preset button

  const onClickFilter = (val) => {
    if (value === "manga") {
      if (val != 0) {
        setFilter(
          mangasList.filter(
            (manga) =>
              moment(manga.expire).diff(moment(), "days") < val &&
              moment(manga.expire).diff(moment(), "days") > -1
          )
        );
      } else {
        setFilter(
          mangasList.filter(
            (manga) => moment(manga.expire).diff(moment(), "days") < val
          )
        );
      }
    } else {
      if (val != 0) {
        setFilter(
          foodsList.filter(
            (food) =>
              moment(food.expire).diff(moment(), "days") < val &&
              moment(food.expire).diff(moment(), "days") > -1
          )
        );
      } else {
        setFilter(
          foodsList.filter(
            (food) => moment(food.expire).diff(moment(), "days") < val
          )
        );
      }
    }
    setValueFilter(val);
  };

  // function to download data
  useEffect(() => {
    const getMangas = async () => {
      const data = await getDocs(mangasCollectionRef);
      setMangasList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getFoods = async () => {
      const data = await getDocs(foodsCollectionRef);
      setFoodsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMangas();
    getFoods();
  }, []);

  // first call filter function
  useEffect(() => {
    onClickFilter(1);
  }, [mangasList, value]);

  // function for the search filter

  const searchFilter = (val) => {
    setFilter(mangasList.filter((manga) => manga.client == val));
  };
  return (
    <div
      style={{ minHeight: "100vh", padding: "1%", backgroundColor: "#3a3b3f" }}
    >
      {modal && (
        <ModalAdd
          close={(props) => {
            setModal(props);
          }}
        />
      )}
      <Center>
        <Input
          placeholder="cerca per utente o per titolo"
          size="md"
          w="20%"
          mr="10px"
          onChange={(event) => setSearch(event.target.value)}
        />
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          mr="10px"
          onClick={() => searchFilter(search)}
        />

        <Stack direction="row" spacing={4} align="center">
          <Button
            isActive={valueFilter == 1 ? true : false}
            onClick={() => onClickFilter(1)}
            text="oggi"
          ></Button>
          <Button
            isActive={valueFilter == 7 ? true : false}
            onClick={() => onClickFilter(7)}
            text="settimana"
          ></Button>
          <Button
            isActive={valueFilter == 30 ? true : false}
            onClick={() => onClickFilter(30)}
            text="mese"
          ></Button>
          <Button
            isActive={valueFilter == 0 ? true : false}
            onClick={() => onClickFilter(0)}
            text="scadute"
          ></Button>
        </Stack>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="manga">manga</Radio>
            <Radio value="food">food</Radio>
          </Stack>
        </RadioGroup>
        {/* <Text>{auth.currentUser.displayName}</Text> */}
      </Center>
      <Grid d="flex" flexWrap="wrap" p="6" gap={6}>
        {filter.map((e) => {
          return <MangaCard el={e} />;
        })}
      </Grid>

      <div bg="red.900" w="90%" d="flex"></div>
      <Center
        bg="tomato"
        h="50px"
        w="50px"
        color="white"
        pos="fixed"
        bottom="20px"
        right="20px"
        fontSize="2xl"
        borderRadius="50%"
        onClick={() => setModal(true)}
      >
        +
      </Center>
    </div>
  );
};
export default Home;
