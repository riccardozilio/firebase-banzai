import React, { useState, useEffect } from "react";
import { BrowserRouter as Rowter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);
  return (
    <Rowter>
      <Routes>
        <Route path="/" element={<Home />} />
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
    </Rowter>
  );
}

export default App;
