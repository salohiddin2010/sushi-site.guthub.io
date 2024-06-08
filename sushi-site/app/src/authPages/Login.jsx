import { Avatar, Button, Typography } from "@mui/material";
import signUpImg from "../assets/password.png";
import { InputTextfield } from "../components/UI/InputTextfield";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import s from "./Authorization.module.scss";
import axios from "axios";
import { GetContext } from "../context/Context";
export const Login = () => {
  const LOGIN_URL = "http://localhost:4080/login";
  const navigate = useNavigate();
  const { user, setUser } = GetContext();

  const registrSchema = object({
    email: string()
      .nonempty("Поле обязательно к заполнения")
      .email("Электронная почта недействительна"),
    password: string()
      .nonempty("Поле обязательно к заполнения")
      .min(4, "Пароль должен содержать не более 4 символов")
      .max(32, "Пароль должен содержать не менее 32 символов"),
  });

  const methods = useForm({
    resolver: zodResolver(registrSchema),
  });

  const { handleSubmit, reset } = methods;

  const onRegisterSubmit = async (loginUser) => {
    try {
      const { data } = await axios.post(LOGIN_URL, loginUser);
      setUser({
        token: data.accessToken,
        ...data.user,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ token: data.accessToken, ...data.user })
      );
      toast.success("Вы вошли в свой аккаунт!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className={s.auth}>
      <div className="container">
        <div className={s.auth_content}>
          <Typography variant="h5" className={s.auth_title}>
            Войти
          </Typography>
          <FormProvider {...methods}>
            <form
              className={s.auth_form}
              onSubmit={handleSubmit(onRegisterSubmit)}
            >
              <div className={s.form_img}>
                <Avatar
                  sx={{ width: 70, height: 70 }}
                  alt="Remy Sharp"
                  src={signUpImg}
                ></Avatar>
              </div>

              <InputTextfield
                name="email"
                label="Email"
                size="small"
                margin="dense"
                variant="outlined"
              />

              <InputTextfield
                name="password"
                label="Пароль"
                size="small"
                margin="dense"
                variant="outlined"
                type="password"
                sx={{ marginBottom: 2 }}
              />

              <Button
                variant="contained"
                type="submit"
                sx={{ marginBottom: 1 }}
              >
                Войти
              </Button>
              <Typography variant="caption" display="block">
                Еще нет аккаунта?
                <Link to="/registr" className={s.form_link}>
                  Зарегестрируйтесь
                </Link>
              </Typography>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
};
