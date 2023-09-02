
//nav toggle

document.getElementById('nav-toggle').onclick = function(){
  document.getElementById("nav-content").classList.toggle("hidden");
}

//for each proposal vote page

var eachModal = document.getElementById('eachSimpleModal');

var eachModalBtn = document.getElementById('eachModalBtn');

var eachCloseBtn = document.getElementById('eachCloseBtn');


eachModalBtn.addEventListener('click', eachOpenModal);

eachCloseBtn.addEventListener('click', eachCloseModal);

window.addEventListener('click', eachOutsideClick);


function eachOpenModal(){
  eachModal.style.display = 'block';
}

// Close modal
function eachCloseModal(){
  eachModal.style.display = 'none';
}

// Click outside and close
function eachOutsideClick(e){
  if(e.target == eachModal){
    eachModal.style.display = 'none';
  }
}

// for candidate page

var candidateModal = document.getElementById('candidateSimpleModal');

var candidateModalBtn = document.getElementById('candidateModalBtn');

var candidateCloseBtn = document.getElementById('candidateCloseBtn');

candidateModalBtn.addEventListener('click', candidateOpenModal);

candidateCloseBtn.addEventListener('click', candidateCloseModal);

window.addEventListener('click', candidateOutsideClick);


function candidateOpenModal(){
  candidateModal.style.display = 'block';
}

// Close modal
function candidateCloseModal(){
  candidateModal.style.display = 'none';
}

// Click outside and close
function candidateOutsideClick(e){
  if(e.target == candidateModal){
    candidateModal.style.display = 'none';
  }
}