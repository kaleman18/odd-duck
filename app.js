const imagesContainer = document.getElementById('images');
const resultsContainer = document.getElementById('results');
let button = document.getElementById('button');
const firstImg = document.querySelector('#images1');
const secondImg = document.querySelector('#images2');
const thirdImg = document.querySelector('#images3');


let state = {
  numClicksSoFar: 0,
  numClicksAllowed: 25,
  allImg: [],
};

function Images(name,image) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  state.allImg.push(this);
}

new Images('bag','img/bag.jpg');
new Images('banana','img/banana.jpg');
new Images('bathroom','img/bathroom.jpg');
new Images('boots','img/boots.jpg');
new Images('breakfast','img/breakfast.jpg');
new Images('bubblegum','img/bubblegum.jpg');
new Images('chair','img/chair.jpg');
new Images('cthulhu','img/cthulhu.jpg');
new Images('dog-duck','img/dog-duck.jpg');
new Images('dragon','img/dragon.jpg');
new Images('pen','img/pet-sweep.jpg');
new Images('pet-sweep','img/pet-sweep.jpg');
new Images('scissors','img/scissors.jpg');
new Images('shark','img/shark.jpg');
new Images('sweep','img/sweep.png');
new Images('tauntaun','img/tauntaun.jpg');
new Images('unicorn','img/unicorn.jpg');
new Images('water-can','img/water-can.jpg');
new Images('wine-glass','img/wine-glass.jpg');


function handleClick(event){
  let imgName = event.target.alt;

  for(let i = 0; i < state.allImg.length; i++){
    if (imgName === state.allImg[i].name)
      state.allImg[i].votes++;
  }
  state.numClicksSoFar++;

  if(state.numClicksSoFar === state.numClicksAllowed){
    removeListener();
    renderResultsButton();
    button.addEventListener('click',renderResults());
  } else {
    renderImgs();
  }
}

function renderImgs() {

  function pickRandomImg() {
    return Math.floor(Math.random() * state.allImg.length);
  }

  let img1 = pickRandomImg();
  let img2 = pickRandomImg();
  let img3 = pickRandomImg();

  while(img1 === img2 || img1 === img3 || img2 === img3) {
    img2 = pickRandomImg();
    img3 = pickRandomImg();
  }

  console.log(state.allImg[img1]);

  firstImg.src = state.allImg[img1].imageFile;
  firstImg.alt = state.allImg[img1].name;
  state.allImg[img1].views++;

  secondImg.src = state.allImg[img2].imageFile;
  secondImg.alt = state.allImg[img2].name;
  state.allImg[img2].views++;

  thirdImg.src = state.allImg[img3].imageFile;
  thirdImg.alt = state.allImg[img3].name;
  state.allImg[img3].views++;

}

// function removeButton() {
//   button.style.visibility = 'hidden';
// }

function renderResultsButton(){
  button.style.display = 'block';

}

function removeListener() {
  imagesContainer.removeEventListener('click',handleClick);
}

function renderResults(){
  for (let i = 0; i < state.allImg.length; i++) {
    let finalVotes = state.allImg[i].votes;
    let finalViews = state.allImg[i].views;
    console.log(finalViews);
    console.log(finalVotes);
    let list = document.createElement('li');
    list.textContent = `Total Votes: ${finalVotes} Total Views: ${finalViews}`;
    resultsContainer.append(list);
  }
}

function setupListener() {
  imagesContainer.addEventListener('click',handleClick);

}

// function buttonListener() {

// }



setupListener();
renderImgs();
// removeButton();


