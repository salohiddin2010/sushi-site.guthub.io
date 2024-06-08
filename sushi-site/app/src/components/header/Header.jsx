import { Logout } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetContext } from "../../context/Context";
import s from "./Header.module.scss";

export const Header = () => {
  const location = useLocation();
  const { user, setUser } = GetContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      email: "",
    });

    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      <nav className={s.nav}>
        <Container fixed>
          <div className={s.navbar}>
            <div className={s.navbar_left}>
              <Link to="/" className={s.logo}>
                Home
              </Link>
            </div>

            <div className={s.navbar_right}>
              {user.email.length ? (
                <Button
                  color="inherit"
                  startIcon={<Logout />}
                  onClick ={handleLogout}
                >
                  Exit
                </Button>
              ) : null}

              {!user.email.length &&
                (location.pathname === "/" ||
                  location.pathname === "/login") && (
                  <Link to="/registr">Registarion</Link>
                )}

              {!user.email.length && location.pathname === "/registr" && (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};
