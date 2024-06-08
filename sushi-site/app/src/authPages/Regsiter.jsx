  import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Container, Typography } from "@mui/material";
import s from "./Authorization.module.scss";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { InputTextfield } from "../components/UI/InputTextfield";
import { toast } from "react-toastify";
import { GetContext } from "../context/Context";
import axios from "axios";
export const Regsiter = () => {
  const { user, setUser } = GetContext();

  const USERS_URL = "http://localhost:4080/users/register";

  const navigate = useNavigate();
  const registerSchema = object({
    name: string()
      .nonempty("Имя обязателен к заполнению")
      .min(2, "Имя должен состоять не менее 3 символов!")
      .max(32, "Имя должен состоять не больше 32 символов!"),
    email: string()
      .nonempty("Email обязателен к заполнению")
      .email("введите валидный email"),
    password: string()
      .nonempty("Пароль обязателен к заполнению")
      .min(2, "Пароль должен состоять не менее 3 символов!")
      .max(32, "Пароль должен состоять не больше 32 символов!"),
    passwordConfirm: string().nonempty("Поле обязателен к заполнению"),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Пароли не совпадают",
  });

  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, reset } = methods;

  const onRegisterSubmit = async (newUser) => {
    try {
      const { passwordConfirm, ...rest } = newUser;
      const { data } = await axios.post(USERS_URL, rest);

    

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.accessToken,
          ...data.user,
        })
      );

      toast.success("вы успешно зарегались!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
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
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={s.auth}>
      <Container fixed>
        <div className={s.auth_content}>
          <Typography variant="h5" gutterBottom className={s.auth_title}>
            Регистрация
          </Typography>

          <FormProvider {...methods}>
            <form
              className={s.auth_form}
              onSubmit={handleSubmit(onRegisterSubmit)}
            >
        

              <InputTextfield
                name="name"
                label="Имя"
                size="small"
                margin="dense"
              />
              <InputTextfield
                name="email"
                label="Email"
                size="small"
                margin="dense"
              />
              <InputTextfield
                name="password"
                label="Пароль"
                size="small"
                margin="dense"
                type="password"
              />
              <InputTextfield
                name="passwordConfirm"
                label="Пароль"
                size="small"
                margin="dense"
                type="password"
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ marginBottom: 1 }}
              >
                Зарегаться
              </Button>

              <Typography variant="caption" display="block" gutterBottom>
                Уже зарегестрированы?
                <Link to="/login" className={s.form_link}>
                  Войдите
                </Link>
              </Typography>
            </form>
          </FormProvider>
        </div>
      </Container>
    </div>
  );
};
