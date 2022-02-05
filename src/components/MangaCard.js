import React, { useState } from "react";
import Barcode from "react-barcode";
import { Center, Text, Tag, GridItem, Box, Button } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";

const MangaCard = (props) => {
  const el = props.el;
  const [option, setOption] = useState(false);
  return (
    <GridItem
      d="flex"
      flexDirection="column"
      justifyContent="space-around"
      p="2"
      bg="white"
      h="170px"
      w={["45%", "30%", "10%"]}
      //   border="1px"
      //   borderColor="gray.100"
      borderRadius="md"
      boxShadow="md"
    >
      <Box d="flex" justifyContent="space-between">
        <Tag mr="10px" colorScheme="red">
          {el.client ? el.client : moment(el.expire).format("DD-MM-yy")}
        </Tag>
        {option ? (
          <ChevronUpIcon onClick={() => setOption(false)} />
        ) : (
          <ChevronDownIcon
            onClick={() => {
              setOption(true);
              console.log(moment(el.expire).diff(moment(), "days"));
            }}
          />
        )}
      </Box>
      {option ? (
        <>
          <Text>
            aggiunto il: {""} {moment(el.createAt).format("DD-MM-yy")}
          </Text>
          <Text>
            scade il: {""} {moment(el.expire).format("DD-MM-yy")}
          </Text>
          <Box d="flex" justifyContent="space-around" alignItems="center">
            <Button colorScheme="blackAlpha" size="sm">
              Modifica
            </Button>
            <Button colorScheme="blackAlpha" size="sm">
              Ritirato
            </Button>
            <DeleteIcon w={6} h={6} color="gray.800" />
          </Box>
        </>
      ) : (
        <>
          <Center>
            <Text textAlign="center">{el.title || el.product}</Text>
          </Center>
          <Center>
            <Barcode
              textMargin="1"
              fontSize="10"
              background="none"
              flat="true"
              width="1"
              height="25"
              value={el.barCode}
              lineColor={el.barCode == "0" ? "white" : "black"}
            />
          </Center>
        </>
      )}
    </GridItem>
  );
};

export default MangaCard;
