import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Rowter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./index.css";

function App() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);
  return (
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home auth={auth} />} />

          <Route
            path="/login"
            element={
              <Login
                setIsAuth={(props) => {
                  setAuth(props);
                }}
              />
            }
          />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
