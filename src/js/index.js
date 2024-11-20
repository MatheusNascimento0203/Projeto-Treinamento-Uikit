const formSearch = document.querySelector(".form-search-content");
const formAddUser = document.querySelector(".form-add-user-content");
const users = [];
let id = 1;

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
});

// FUNÇÃO PARA ADICIONAR USUÁRIO
const addUser = () => {
  formAddUser.addEventListener("submit", (e) => {
    e.preventDefault();
    let nomeUser = document.getElementById("nome").value;
    let emailUser = document.getElementById("email").value;
    let selectGrupoPermissao = document.getElementById("grupo-permissao").value;

    const dataUser = {
      id: id,
      nome: nomeUser,
      email: emailUser,
      grupoPermissao: selectGrupoPermissao,
    };

    if (
      nomeUser.trim() === "" ||
      emailUser.trim() === "" ||
      selectGrupoPermissao.trim() === ""
    ) {
      alert("Preencha todos os campos, por gentileza.");
    } else {
      users.push(dataUser);
      id++;
      addUserLocalStorage(users);
      formAddUser.reset();
    }
  });
};

// FUNÇÃO PARA ADICIONAR USERS NO LOCAL STORAGE
const addUserLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

addUser();
