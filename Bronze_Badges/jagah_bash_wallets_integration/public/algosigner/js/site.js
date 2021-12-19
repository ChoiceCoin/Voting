document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});

var closeButtonElements = document.getElementsByClassName('delete');

for (var i = 0; i < closeButtonElements.length; i++) {
  closeButtonElements[i].addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.add('is-hidden');
  });
}


function renderLoadingSelect(elem) {
  elem.disabled = true;
  elem.length = 0;

  let option = document.createElement('option');
  option.text = "Loading...";
  option.value = "-1";
  elem.appendChild(option);
}

function appendSelectOption(elem, text, value) {
  let option = document.createElement('option');
  option.text = text;
  option.value = value;
  elem.appendChild(option);
  elem.disabled = false;
}

function renderAssetSelect(elem, data) {
  if(data !== undefined) {
    elem.length = 0;

    if(data.length > 0) {
    // append assets
    for (var i = data.length - 1; i >= 0; i--) {
        appendSelectOption(elem,
                            data[i]['asset']['params']['name'],
                            data[i]['asset']['index']);
      }
    } else {
      appendSelectOption(elem,
                            "No assets found.",
                            -1);
    }
  }
}

function renderAccountSelect(elem, data) {
  elem.length = 0;

  if(data.length > 0) {
    // append accounts
    for (var i = data.length - 1; i >= 0; i--) {
      appendSelectOption(elem,
                          data[i].address,
                          data[i].address);
    }
  } else {
    appendSelectOption(elem,
                          "No accounts found.",
                          -1);
  }
}

function showProcessingModal(message) {
  document.getElementById('processingModal').classList.add("is-active");
  document.body.style.overflow = "hidden";
  //document.body.style.position = "fixed";
}

function hideProcessingModal() {
  document.getElementById('processingModal').classList.remove("is-active");
  document.body.style.overflow = "auto";
  //document.body.style.position = "";
}

function updateMicroAlgoConverter(microAlgoValue) {
  document.getElementById('microToAlgo').innerHTML = `${microAlgosToAlgos(microAlgoValue)} Algos`;
}

function microAlgosToAlgos(numMicroAlgos) {
  return (numMicroAlgos / 1000000).toFixed(6);
}

function handleClientError(e) {
  console.error(e);
  document.getElementById('errorMessage').innerHTML = e;
  document.getElementById('successDialog').classList.add("is-hidden");
  document.getElementById('errorDialog').classList.remove("is-hidden");
}