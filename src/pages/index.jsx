import UserList from "../components/UserList";
import React, { useEffect, useState } from "react";
import { getContacts } from "../contacts";

export default function Index() {

  //useState é o estado da variável
  const [contatos, setContatos] = useState([]);

  const Contatos = async () => {
    const arr = await getContacts();
    setContatos(arr);
    //console.log(arr);
  }

  //Controla o estado da renderização dos elementos na tela (Efeito inicial da página)
  useEffect(() => {
    Contatos();
  }, []);

  console.log(contatos);

  return (
    <div id="zero-state">
      <h2>Clique no botão "Novo" para adicionar um contato</h2>
      Esta é uma aplicação de demonstração do React Router.
      <br />
      Confira a documentação em {" "}
      <a href="https://reactrouter.com/">
        reactrouter.com.
      </a>
      <UserList contacts={contatos} />
    </div>
  );
}