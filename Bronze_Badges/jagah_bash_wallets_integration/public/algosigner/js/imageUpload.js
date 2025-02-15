let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let upload1 = document.getElementById("upload1");
let upload2 = document.getElementById("upload2");

image1.addEventListener("change", (e) => {
  upload1.innerHTML = `<img src=${URL.createObjectURL(e.target.files[0])} />`;
  document.getElementById("imageName1").textContent = e.target.files[0].name;
});
image2.addEventListener("change", (e) => {
  upload2.innerHTML = `<img src=${URL.createObjectURL(e.target.files[0])} />`;
  document.getElementById("imageName2").textContent = e.target.files[0].name;
});
