import { refleshUsers } from "./refleshUsers.js";

const formSearch = document.querySelector(".form-search-content");
const formAddUser = document.querySelector(".form-add-user-content");
let isEditing = false;

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
});

// FUNÇÃO PARA ADICIONAR USUÁRIO
const upsertUser = () => {
  formAddUser.addEventListener("submit", (e) => {
    e.preventDefault();
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

    if (!isEditing) {
      const dataUser = {
        id: id,
        nome: nomeUser,
        email: emailUser,
        grupoPermissao: selectGrupoPermissao,
        status: statusUser,
      };

      // ADICIONANDO USUÁRIO AO LOCAL STORAGE
      id++;
      addUserLocalStorage([dataUser]);
      alert("Usuário adicionado com sucesso!");
    } else {
      // Modo de edição
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
      editUserId = null; // Reseta o estado para modo de adição
    }

    formAddUser.reset();
    refleshUsers();
  });
};

// FUNÇÃO PARA ADICIONAR USERS NO LOCAL STORAGE
const addUserLocalStorage = (newUsers) => {
  const existingUsers = JSON.parse(localStorage.getItem("user")) || [];
  const updatedUsers = [...existingUsers, ...newUsers];
  localStorage.setItem("user", JSON.stringify(updatedUsers));
};

// DELETAR USUÁRIO
const deleteUser = (id) => {
  let users = JSON.parse(localStorage.getItem("user")) || [];

  users = users.filter((user) => {
    return user.id !== id;
  });

  localStorage.setItem("user", JSON.stringify(users));

  refleshUsers();
};

const editUser = (id) => {
  if (!userToEdit) {
    alert("Usuário não encontrado!");
    return;
  }

  document.getElementById("nome").value = userToEdit.nome;
  document.getElementById("email").value = userToEdit.email;
  document.getElementById("grupo-permissao").value = userToEdit.grupoPermissao;
  document.getElementById("check-block").checked =
    userToEdit.status === "Bloqueado";

  // Adiciona um evento temporário ao formulário para salvar as edições
  const saveEditHandler = (e) => {
    e.preventDefault();

    // Atualiza os dados do usuário com os novos valores do formulário
    userToEdit.nome = document.getElementById("nome").value;
    userToEdit.email = document.getElementById("email").value;
    userToEdit.grupoPermissao =
      document.getElementById("grupo-permissao").value;
    userToEdit.status = document.getElementById("check-block").checked
      ? "Bloqueado"
      : "Ativo";

    // Valida os campos
    if (
      userToEdit.nome.trim() === "" ||
      userToEdit.email.trim() === "" ||
      userToEdit.grupoPermissao.trim() === ""
    ) {
      alert("Preencha todos os campos, por gentileza.");
      return;
    }

    // Salva as alterações no localStorage
    const updatedUsers = users.map((user) =>
      user.id === id ? userToEdit : user
    );

    localStorage.setItem("user", JSON.stringify(updatedUsers));

    // Atualiza a lista de usuários na interface
    refleshUsers();

    // Remove o evento para evitar múltiplas edições
    formAddUser.removeEventListener("submit", saveEditHandler);
  };

  formAddUser.addEventListener("submit", saveEditHandler);
};

upsertUser();
refleshUsers();

export { deleteUser, editUser };
