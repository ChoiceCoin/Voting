if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}
let burger = document.getElementById("burger");

burger.addEventListener("click", () => {
  burger.classList.toggle("changed");
  document.querySelector(".menu").toggleAttribute("transform");
});
