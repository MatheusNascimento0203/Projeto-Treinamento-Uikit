import { createButton, createTd, createTr } from "./createElements.js";
import { deleteUser, editUser } from "./index.js";
const tbodyUserContent = document.querySelector(".tbody-content");
const table = document.getElementById("table-container");

const refleshUsers = (users = null) => {
  // Limpa o conteúdo atual da tabela
  tbodyUserContent.innerHTML = "";

  const usersShow = users || JSON.parse(localStorage.getItem("user") || "[]");

  usersShow.forEach((user) => {
    handleTable(user);
  });
};

const handleTable = (dataUser) => {
  const tr = createTr();
  const nomeTd = createTd(dataUser.nome);
  const emailTd = createTd(dataUser.email);
  const status = createTd(dataUser.status);
  const tipoUsuario = createTd(dataUser.grupoPermissao);
  const tdEditar = createTd("");
  const tdExcluir = createTd("");
  const botaoEditar = createButton("button-editar", "Editar");
  const botaoExcluir = createButton("button-excluir", "Excluir");
  botaoExcluir.setAttribute("data-id", dataUser.id);
  botaoEditar.setAttribute("data-id", dataUser.id);
  botaoEditar.setAttribute("uk-toggle", "target: #add-user-modal");

  // PEGANDO O CLICK DO BOTÃO EXCLUIR
  botaoExcluir.addEventListener("click", () => {
    deleteUser(dataUser.id);
  });

  // PEGANDO O CLICK DO BOTÃO EDITAR
  botaoEditar.addEventListener("click", () => {
    editUser(dataUser.id);
  });

  tdEditar.appendChild(botaoEditar);
  tdExcluir.appendChild(botaoExcluir);
  tr.append(nomeTd, emailTd, status, tipoUsuario, tdEditar, tdExcluir);
  tbodyUserContent.append(tr);
};

export { refleshUsers };
