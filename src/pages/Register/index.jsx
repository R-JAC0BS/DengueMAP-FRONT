import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const handleSubmitRegister = (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const email = event.target.email.value;
    const endereco = event.target.endereco.value;
    const cpf = event.target.cpf.value;
    const senha = event.target.senha.value;

    fetch("https://denguealerta202401-production.up.railway.app/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        endereco,
        cpf,
        senha,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Cadastro efetuado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Não foi possivel fazer o registro, preencha todos so campos");
      });
  };

  return (
    <>
      <main className="TitleDengue">
        <h1 className="textmap map">REGISTRO</h1>
        <form onSubmit={handleSubmitRegister}>
          <input
            type="text"
            placeholder="Seu nome"
            name="nome"
            className="input mb-5"
            required
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            name="email"
            className="input mb-5 map"
            required
          />

          <input
            type="text"
            placeholder="Seu endereço"
            name="endereco"
            className="input mb-5"
            required
          />

          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            className="input mb-5"
            maxLength={11}
            minLength={11}
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            name="senha"
            className="input mb-5"
            required
          />

          <button type="submit" className="btn mb-5 shadow-1 cs button-item">
            Cadastrar
          </button>
        </form>

        <Link to="/" className="pt-1">
          <p className="register map cs">Voltar</p>
        </Link>
      </main>
    </>
  );
}
