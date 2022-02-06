import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import ModalAdd from "../components/ModalAdd";
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";

import {
  Center,
  Grid,
  Input,
  Text,
  IconButton,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import moment from "moment";

const Home = () => {
  let navigate = useNavigate();

  const [mangasList, setMangasList] = useState([]);
  const [foodsList, setFoodsList] = useState([]);
  const [value, setValue] = useState("manga");
  const [valueFilter, setValueFilter] = useState(1);
  const [modal, setModal] = useState(false);
  const mangasCollectionRef = collection(db, "mangas");
  const foodsCollectionRef = collection(db, "food");

  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!auth.currentUser) {
      navigate(`/`);
    }
  }, []);

  // filter for the preset button

  const onClickFilter = (val) => {
    if (value === "manga") {
      if (val > 0) {
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
  const getMangas = async () => {
    const data = await getDocs(mangasCollectionRef);
    setMangasList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getFoods = async () => {
    const data = await getDocs(foodsCollectionRef);
    setFoodsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getMangas();
    getFoods();
  }, []);

  // first call filter function
  useEffect(() => {
    onClickFilter(1);
  }, [mangasList, foodsList, value]);

  // function for the search filter

  const searchFilter = (val) => {
    setFilter(mangasList.filter((manga) => manga.client == val));
  };
  return (
    <div
      style={{
        cursor: "default",
        minHeight: "100vh",
        padding: "1%",
        overflowX: "hidden",
        // backgroundColor: "#3a3b3f",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {modal && (
        <ModalAdd
          value={value}
          close={(props) => {
            setModal(props.modal);
            if (props.manga) {
              getMangas();
            } else if (props.food) {
              getFoods();
            }
          }}
        />
      )}
      {/* <img
        src="https://www.banzai-dojo.it/sites/default/files/logoHome.png"
        style={{
          width: "150px",
          position: "absolute",
          bottom: "10px",
          left: "10px",
        }}
      /> */}
      <Box d="flex" w="100%" justifyContent="space-between">
        <Center>
          <Button
            isActive={value == "manga" ? true : false}
            fontSize="20"
            text="Mangas"
            onClick={() => setValue("manga")}
          >
            Mangas
          </Button>
          <Button
            isActive={value == "food" ? true : false}
            fontSize="20"
            text="Foods"
            onClick={() => setValue("food")}
          ></Button>
          <Button fontSize="20" text="Notes"></Button>
        </Center>
        {auth.currentUser && (
          <Center>
            <Text mr="5">{auth.currentUser.displayName}</Text>
            <Link to="/profile">
              <Avatar
                name={auth.currentUser.displayName}
                src={auth.currentUser.photoURL}
              />
            </Link>
          </Center>
        )}
      </Box>
      <Box
        d="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        mt="40px"
        px="6%"
      >
        <Box
          bg="gray.400"
          h="30px"
          px="6"
          float="left"
          color="white"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          fontSize="sm"
          rounded="xl"
          cursor="pointer"
          _hover={{ bg: "gray.500" }}
          onClick={() => setModal(true)}
        >
          aggiungi prodotto
        </Box>
        <Center float="right">
          <Input
            placeholder="cerca per utente o codice a barre"
            size="md"
            w="300px"
            mr="10px"
            onChange={(event) => setSearch(event.target.value)}
          />
          <IconButton
            aria-label="Search database"
            mr="10px"
            icon={<SearchIcon />}
            onClick={() => searchFilter(search)}
          />
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
        </Center>
      </Box>
      <Grid
        d="flex"
        w="100%"
        justifyContent="center"
        flexWrap="wrap"
        p="6"
        gap={6}
      >
        {filter.map((e) => {
          return (
            <Card
              el={e}
              close={(props) => {
                if (props.manga) {
                  getMangas();
                } else if (props.food) {
                  getFoods();
                }
              }}
            />
          );
        })}
      </Grid>
    </div>
  );
};
export default Home;
