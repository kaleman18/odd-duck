const imagesContainer = document.getElementById('images');
let button = document.getElementById('button');
const firstImg = document.querySelector('#images1');
const secondImg = document.querySelector('#images2');
const thirdImg = document.querySelector('#images3');

let state = {
  numClicksSoFar: 0,
  numClicksAllowed: 25,
  allImg: [],
};

function Images(name,image,votes=0,views=0) {
  this.name = name;
  this.imageFile = image;
  this.votes = votes;
  this.views = views;
  state.allImg.push(this);
}



function handleClick(event){
  let imgName = event.target.alt;

  for(let i = 0; i < state.allImg.length; i++){
    if (imgName === state.allImg[i].name)
      state.allImg[i].votes++;
  }
  state.numClicksSoFar++;

  if(state.numClicksSoFar === state.numClicksAllowed){
    removeListener();
    // button.addEventListener('click',renderResults); this is also correct
    button.addEventListener('click',() =>renderResults());
    // button.addEventListener('click',renderResults()); THIS IS WRONG, CALLS THE FUNCTION RIGHT AWAY
  } else {
    renderImgs();
  }
  saveImgData();
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

function removeListener() {
  imagesContainer.removeEventListener('click',handleClick);
}

function renderResults(){
  // couldn't figure out why this would render each time i pressed the results button.
  // for (let i = 0; i < state.allImg.length; i++) {
  //   let finalVotes = state.allImg[i].votes;
  //   let finalViews = state.allImg[i].views;
  //   let name = state.allImg[i].name;
  //   let list = document.createElement('li');
  //   list.textContent = `${name} Total Votes: ${finalVotes} Total Views: ${finalViews}`;
  //   resultsContainer.append(list);
  // }

  let imgName = [];
  let imgVotes = [];
  let imgViews = [];

  for (let i = 0; i < state.allImg.length; i++) {
    imgName.push(state.allImg[i].name);
    imgVotes.push(state.allImg[i].votes);
    imgViews.push(state.allImg[i].views);
  }

  const data = {
    labels: imgName,
    datasets: [
      {
        label: 'Votes',
        data: imgVotes,
        borderWidth: 1,
        backgroundColor: ['red']
      },
      {
        label: 'Views',
        data: imgViews,
        borderWidth: 1,
        backgroundColor: ['blue']
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const myChart = new Chart('barchart',config);
}

function setupListener() {
  imagesContainer.addEventListener('click',handleClick);
}

function saveImgData() {
  let dataStorage = {
    allImg: state.allImg,
  };
  localStorage.setItem('imagesData', JSON.stringify(dataStorage));
}

function loadData() {
  let storedData = localStorage.getItem('imagesData');
  if(storedData){
    let parsedData = JSON.parse(storedData);

    for(let i = 0; i < parsedData.allImg.length; i++){
      let p = parsedData.allImg[i];
      new Images(p.name, p.imageFile, p.votes, p.views);
    }
  } else{
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
  }
}

function initializeApp (){
  loadData();
  setupListener();
  renderImgs();
}

initializeApp ();



