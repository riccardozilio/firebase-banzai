import React, { useState, useEffect } from "react";
import { BrowserRouter as Rowter, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);
  return (
    <ChakraProvider>
      <Rowter>
        <Routes>
          <Route path="/home" element={<Home auth={auth} />} />

          <Route
            path="/"
            element={
              <Login
                setIsAuth={(props) => {
                  setAuth(props);
                }}
              />
            }
          />
        </Routes>
      </Rowter>
    </ChakraProvider>
  );
}

export default App;
