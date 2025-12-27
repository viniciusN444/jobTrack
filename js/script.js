const btnFechar = document.querySelector("#btnFechar");
const btnAdd = document.querySelector("#btnAdd");
const btnApagar = document.querySelectorAll(".btnApagar");
const cardJob = document.querySelector(".cardJob");

btnFechar.addEventListener("click", () => {
  const containerAddJob = document.querySelector(".containerAddJobs");

  containerAddJob.style.display = "none";
});

btnAdd.addEventListener("click", () => {
  const containerAddJob = document.querySelector(".containerAddJobs");

  containerAddJob.style.display = "block";
});

btnApagar.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const cardJob = e.target.closest('.cardJob');
        cardJob.remove();
    });
});
