
const homePage = document.getElementById('choice-div');
const proposalCreate = document.getElementById("proposal");
const footer = document.getElementById("footer");
const Footer = document.getElementById("ft");
const electionToggle = document.getElementById("election");
const proposals = document.getElementById("proposals");
const proposalDiv = document.getElementById("proposal-div");
const eachProposalVotePage = document.getElementById("each-proposal-vote"); //
const candidatesPage = document.getElementById("candidates");




// randomise image source function 
function imageSrcShuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//proposal image src
var arr = ["https://media-exp1.licdn.com/dms/image/C4D1BAQEzyBcrpBcX7A/company-background_10000/0/1519796682454?e=2159024400&v=beta&t=UxYGzfBsmy8BJzmkXbfN5saHKpdfsyjC3dxl1xSZX2c", 
           "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=815&q=80",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          ]

imageSrcShuffle(arr);

//map through randomize image array source
let img = ""
arr.forEach((item)=> {
  img = item
}
)
console.log(img)

//proposals page
const Proposals= () => {
  proposals.style.display = 'block'
  successfulVotePage.hidden = true;
  eachProposalVotePage.hidden= true;
  proposalCreate.hidden = true;
  homePage.hidden = true;
  footer.hidden = true;
  Footer.hidden = true;
  candidatesPage.style.display = 'none'
  proposalDiv.textContent = ''

  // fetch proposals from backend api
    fetch('https://choice-proposal-backend.herokuapp.com/data', {
      method: 'get',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Access-Control-Allow-Origin'
      }
    }).then(res => res.json())
  .then(response => {
    response.data?.map(res => {
      //creating each proposal div
      const eachProposalDiv = document.createElement('div');
      eachProposalDiv.classList.add("each-proposals", "mb-5", "border" ,"border-gray-700", "rounded", "pb-3" , "cursor-pointer", "hover:shadow-xl" ,"hover:p-5", "hover:mb-0")
      //creating proposal link
      const eachProposalAnchor = document.createElement('a');
      eachProposalAnchor.setAttribute("onclick", "eachProposalVote()");
      //creating each proposal sub div
      const eachSubProposalDiv = document.createElement('div');
      eachSubProposalDiv.classList.add("h-30", "w-full");
      // creating each proposal image
      const eachProposalImage= document.createElement('img');
      eachProposalImage.setAttribute("src", `${img}`);
      eachProposalImage.setAttribute("onclick", "eachProposalVote()");
      eachProposalImage.classList.add("p-8", "w-72");
      eachProposalImage.setAttribute("alt", 'proposal image');
      // creating each proposal title
      const eachProposalTitle = document.createElement('p');
      eachProposalTitle.classList.add("text-lg", "text-center","font-bold", "mb-2");
      eachProposalTitle.textContent = res.title
      // appending to parent div
      eachProposalDiv.appendChild(eachProposalImage);
      eachProposalAnchor.append(eachSubProposalDiv,eachProposalTitle)
      eachProposalDiv.appendChild(eachProposalAnchor);
      //append to original proposal div
      proposalDiv.appendChild(eachProposalDiv);
  
    })
  })
  .catch(err => console.log(err));
    
}


//proposal vote page;
const eachProposalVote = () => {
  successfulVotePage.hidden = true;
  proposalCreate.hidden = true;
  homePage.hidden = true;
  footer.hidden = true;
  Footer.hidden = true;
  proposals.style.display = 'none'
  eachProposalVotePage.hidden = false;
  candidatesPage.style.display = 'none';
}


// toggle hide page
const electionReset = () => {
    successfulVotePage.hidden = true;
    homePage.hidden = true;
    proposals.style.display = 'none'
    proposalCreate.hidden= false;
    eachProposalVotePage.hidden = true;
    footer.hidden = true;
    Footer.hidden = true;
    candidatesPage.style.display = 'none';
}

// vote page 
// const votePage = () => {
//     homePage.hidden= true;
//     footer.hidden = true;
//     Footer.hidden = true;
   
// }

var modal = document.getElementById('simpleModal');

var modalBtn = document.getElementById('modalBtn');

var closeBtn = document.getElementsByClassName('closeBtn')[0];


modalBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', outsideClick);


function openModal(){
  modal.style.display = 'block';
}

// Close modal
function closeModal(){
  modal.style.display = 'none';
}

// Click outside and close
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

//vote ongoing election
const candidateElection = () => {
  successfulVotePage.hidden = true;
  homePage.hidden = true;
  proposals.style.display = 'none'
  proposalCreate.hidden= true;
  eachProposalVotePage.hidden = true;
  footer.hidden = true;
  proposalVotePage.hidden=true;
  Footer.hidden = true;
  candidatesPage.style.display = 'block';

}




electionToggle.addEventListener("click", electionReset);
