const btnFechar = document.querySelector("#btnFechar");
const btnAdd = document.querySelector("#btnAdd");
const btnSave = document.querySelector("#btnSave");
const btnCancel = document.querySelector("#btnCancel");

const containerAddJob = document.querySelector(".containerAddJobs");
const containerJobs = document.querySelector(".containerJobs");

const txtEmpresa = document.querySelector("#txtCompany");
const txtCargo = document.querySelector("#txtCargo");
const select = document.querySelector("#select");

// ===== LOCAL STORAGE =====
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// ===== FUNÇÕES =====
function salvarNoLocalStorage() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function criarCard(job, index) {
  const div = document.createElement("div");
  div.classList.add("cardJob");

  let corId = "";
  if (job.status === "Oferta") corId = "green";
  if (job.status === "Entrevista") corId = "yellow";
  if (job.status === "Rejeitada") corId = "red";
  if (job.status === "Aplicado") corId = "blue";

  div.innerHTML = `
    <div class="description">
      <h2>${job.empresa}</h2>
      <p>${job.cargo}</p>
    </div>
    <div class="situation">
      <p id="${corId}">${job.status}</p>
      <button class="btnApagar">Apagar</button>
    </div>
  `;

  // botão apagar
  div.querySelector(".btnApagar").addEventListener("click", () => {
    jobs.splice(index, 1);
    salvarNoLocalStorage();
    renderizarJobs();
  });

  return div;
}

function renderizarJobs() {
  // limpa só os cards (mantém as cores)
  document.querySelectorAll(".cardJob").forEach(card => card.remove());

  jobs.forEach((job, index) => {
    const card = criarCard(job, index);
    containerJobs.insertBefore(
      card,
      document.querySelector(".colors")
    );
  });
}

// ===== EVENTOS =====
btnAdd.addEventListener("click", () => {
  containerAddJob.style.display = "block";
});

btnFechar.addEventListener("click", () => {
  containerAddJob.style.display = "none";
});

btnCancel.addEventListener("click", () => {
  containerAddJob.style.display = "none";
});

btnSave.addEventListener("click", () => {
  if (
    txtEmpresa.value === "" ||
    txtCargo.value === "" ||
    select.value === "Selecione o Status"
  ) {
    alert("Preencha todos os campos");
    return;
  }

  const novoJob = {
    empresa: txtEmpresa.value,
    cargo: txtCargo.value,
    status: select.value
  };

  jobs.push(novoJob);
  salvarNoLocalStorage();
  renderizarJobs();

  // limpar formulário
  txtEmpresa.value = "";
  txtCargo.value = "";
  select.selectedIndex = 0;

  containerAddJob.style.display = "none";
});

// ===== CARREGAR AO ABRIR =====
renderizarJobs();
