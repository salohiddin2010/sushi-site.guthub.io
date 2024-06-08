import { Container } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetContext } from "../../context/Context";

export const Home = () => {
  const { user } = GetContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Container fixed>
        <h1>Home</h1>
      </Container>
    </div>
  );
};
