//
const colors = document.querySelector('.colors');

const inputSize = document.querySelector('.gradient-size');
const inputLine = document.querySelector('.gradient-line');
const inputGradientBlur = document.querySelector('.gradient-blur');
const inputFinalGradient = document.querySelector('.gradient-final');


const btnAdd = document.querySelector('.btn-add');
const btnSet = document.querySelector('.btn-set');
const btnRandom = document.querySelector('.btn-random');

let max = 4;

//
btnAdd.addEventListener('click', () => addColor());
btnSet.addEventListener('click', () => setColors());
btnRandom.addEventListener('click', () => randomGradient());

//
inputLine.addEventListener('input', (e) => document.documentElement.style.setProperty(`--gradient-line`, `${e.target.value}%`));
inputSize.addEventListener('input', (e) => document.documentElement.style.setProperty(`--gradient-size`, `${e.target.value}px`));
inputGradientBlur.addEventListener('input', (e) =>  document.documentElement.style.setProperty(`--blur`, `${e.target.value}px`));

//
const addColor = (isColor = false) => {
    let newColor = document.createElement('input');
    newColor.type = 'color';
    newColor.name = 'color';
    newColor.classList.add('color');

    if(isColor){
        newColor.value = randomColor();
    }

    colors.append(newColor);
}

const setColors = () => {
    const colors = Array.from(document.querySelectorAll('.color'));
    const colorString = colors.map(input => input.value).join(', ');
    document.documentElement.style.setProperty(`--gradient`, colorString);

    inputFinalGradient.value = `background: conic-gradient(from 0deg, transparent ${inputSize.value}%, ${colorString});`;
}

const randomGradient = () => {
    colors.innerHTML = ``;

    let size = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    for(let x=0; x<=size; x++){
        addColor(true);
    }

    setColors();
}

const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}


window.addEventListener('load', () => Promise.all([setColors()]));