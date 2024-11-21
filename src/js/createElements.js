function createTr() {
  const tr = document.createElement("tr");
  return tr;
}

function createTd(value) {
  const td = document.createElement("td");
  td.innerText = value;
  return td;
}

function createButton(nameClasse, textButton) {
  const button = document.createElement("button");
  button.classList.add(nameClasse);
  button.innerHTML = textButton;
  return button;
}

function createP(nameClass, text) {
  const p = document.createElement("p");
  p.classList.add(nameClass);
  p.innerHTML = text;
  return p;
}

function createBr() {
  return "<br>";
}

export { createTr, createTd, createButton, createP, createBr };
