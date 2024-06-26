import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contex/user";

export function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const HandleSubmitLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const senha = event.target.senha.value;

    fetch("https://denguealerta202401-production.up.railway.app/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    })
      .then((response) => {
        // Logar a resposta completa para verificar o que está retornando
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        return response.text().then((text) => {
          if (response.status !== 200) {
            console.log("Response text (error):", text);
            throw new Error(text || "Login failed");
          }
          console.log("Response text (success):", text);
          return text;
        });
      })
      .then((data) => {
        login(data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Verifique usuário ou senha");
      });
  };

  return (
    <main className="TitleDengue">
      <h1 className="textmap ">
        Dengue <span className="map">Map</span>
      </h1>
      <form onSubmit={HandleSubmitLogin}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          name="email"
          className="input mb-5"
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          name="senha"
          className="input mb-5"
          required
        />
        <button type="submit" className="button-item shadow-1 cs">
          Login
        </button>
      </form>
      <Link to="/register" className="pt-1">
        <p className="register map">registre-se</p>
      </Link>
    </main>
  );
}
