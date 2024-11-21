import { createBr, createP } from "./createElements.js";
import { refleshUsers } from "./refleshUsers.js";

// PEGANDO OS DADOS DO LOCAL STORAGE
let users = JSON.parse(localStorage.getItem("user")) || [];
const formSearch = document.querySelector(".form-search-content");
const formAddUser = document.querySelector(".form-add-user-content");
const buttonAddUser = document.getElementById("button-add-user");
let editUserId = null;

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
});

//LIMPANDO FORMULARIO
buttonAddUser.addEventListener("click", (e) => {
  e.preventDefault();
  formAddUser.reset();
  editUserId = null;
});

formAddUser.addEventListener("submit", (e) => {
  e.preventDefault();
  upsertUser();
});

// FUNÇÃO PARA ADICIONAR USUÁRIO
const upsertUser = () => {
  let nomeUser = document.getElementById("nome").value;
  let emailUser = document.getElementById("email").value;
  let selectGrupoPermissao = document.getElementById("grupo-permissao").value;
  const checkboxStatus = document.getElementById("check-block");
  const statusUser = checkboxStatus.checked ? "Bloqueado" : "Ativo";

  // VALIDANDO INPUTS
  if (
    nomeUser.trim() === "" ||
    emailUser.trim() === "" ||
    selectGrupoPermissao.trim() === ""
  ) {
    return alert("Preencha todos os campos, por gentileza.");
  }

  if (editUserId === null) {
    //CRIANDO OBJETO PARA ADICIONAR NO LOCAL STORAGE
    const newUser = {
      id: Date.now(),
      nome: nomeUser,
      email: emailUser,
      grupoPermissao: selectGrupoPermissao,
      status: statusUser,
    };

    users.push(newUser);
    formAddUser.reset();
    alert("Usuário adicionado com sucesso!");
  } else {
    // EDITANDO USUÁRIO
    users = users.map((user) =>
      user.id === editUserId
        ? {
            ...user,
            nome: nomeUser,
            email: emailUser,
            grupoPermissao: selectGrupoPermissao,
            status: statusUser,
          }
        : user
    );
    alert("Usuário editado com sucesso!");
    editUserId = null; // RESETANDO O ID DO USUÁRIO
  }

  //ATUALIZANDO O LOCAL STORAGE
  addUserLocalStorage(users);

  //RESETANDO O FORMULARIO
  formAddUser.reset();
  refleshUsers();

  //FECHANDO MODAL APÓS O SUBMIT
  UIkit.modal(document.querySelector("#add-user-modal")).hide();
};

// FUNÇÃO PARA ADICIONAR USERS NO LOCAL STORAGE
const addUserLocalStorage = (newUsers) => {
  localStorage.setItem("user", JSON.stringify(newUsers));
};

// DELETAR USUÁRIO
const deleteUser = (id, nome) => {
  const modalBody = document.getElementById("text-modal-delete");
  const br = createBr();
  const p = createP(
    "pText-modal-delete",
    `Você irá excluir permanentemente o usuário: ${br}
     ${nome} ${br}
     \nDeseja continuar?`
  );
  modalBody.appendChild(p);
  UIkit.modal(document.querySelector("#modal-sections")).show();

  // users = users.filter((user) => {
  //   return user.id !== id;
  // });
  // localStorage.setItem("user", JSON.stringify(users));
  // refleshUsers();
};

const editUser = (id) => {
  const userToEdit = users.find((user) => user.id === id);

  if (!userToEdit) {
    alert("Usuário não encontrado!");
    return;
  }

  document.getElementById("nome").value = userToEdit.nome;
  document.getElementById("email").value = userToEdit.email;
  document.getElementById("grupo-permissao").value = userToEdit.grupoPermissao;
  document.getElementById("check-block").checked =
    userToEdit.status === "Bloqueado";

  // Define o ID do usuário em edição
  editUserId = id;
};

const searchUser = () => {
  const buttonSearch = document.getElementById("button-search");

  buttonSearch.addEventListener("click", (e) => {
    e.preventDefault();
    let nomeUser = document.getElementById("nome-search").value;
    let emailUser = document.getElementById("email-search").value;
    let selectGrupoPermissao = document.getElementById(
      "grupo-permissao-search"
    ).value;
    let statusUser = document.getElementById("status-usuario-search").value;

    let resultUsers = users.filter((user) => {
      return (
        user.nome.toLowerCase().includes(nomeUser.toLowerCase()) &&
        user.email.toLowerCase().includes(emailUser.toLowerCase()) &&
        user.grupoPermissao
          .toLowerCase()
          .includes(selectGrupoPermissao.toLowerCase()) &&
        user.status.toLowerCase().includes(statusUser.toLowerCase())
      );
    });
    refleshUsers(resultUsers);
  });
};

searchUser();
refleshUsers();

export { deleteUser, editUser };
