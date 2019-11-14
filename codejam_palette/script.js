/* eslint-disable prefer-destructuring */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */

const ColorMatrix = [
  ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
  ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
  ['FFEB3B', 'FFC107', 'FFC107', 'FFEB3B'],
  ['00BCD4', 'FFEB3B', 'FFEB3B', '00BCD4'],
];

const example = document.querySelector('.canvas_element');

const ctx = example.getContext('2d');
example.width = 512;
example.height = 512;
ctx.scale(128, 128);
for (let i = 0; i < 4; i += 1) {
  for (let j = 0; j < 4; j += 1) {
    ctx.fillStyle = `#${ColorMatrix[i][j]}`;
    ctx.fillRect(i, j, 1, 1);
  }
}
ctx.scale(1 / 128, 1 / 128);

const dataURL = localStorage.getItem('saved');
const img = new Image();
img.src = dataURL;
img.onload = function saver() {
  ctx.drawImage(img, 0, 0);
};

const ToolsArray = document.getElementsByClassName('tools--item');
let CurrentTool = ToolsArray[0];

for (let i = 0; i < 4; i++) {
  ToolsArray[i].addEventListener('click', (event) => {
    CurrentTool.classList.remove('tools--item-selected');
    CurrentTool = ToolsArray[i];
    event.target.classList.add('tools--item-selected');
  });
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyP') {
    CurrentTool.classList.remove('tools--item-selected');
    CurrentTool = ToolsArray[2];
    ToolsArray[2].classList.add('tools--item-selected');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyB') {
    CurrentTool.classList.remove('tools--item-selected');
    CurrentTool = ToolsArray[0];
    ToolsArray[0].classList.add('tools--item-selected');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyC') {
    CurrentTool.classList.remove('tools--item-selected');
    CurrentTool = ToolsArray[1];
    ToolsArray[1].classList.add('tools--item-selected');
  }
});

let pixel = ctx.getImageData(1, 1, 1, 1);

function pos(event) {
  pixel = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
}

example.addEventListener('mousemove', pos);

const CurrentColor = document.querySelector('.colors--item_1 > .color');
CurrentColor.style.background = '#FFC107';
const PreviousColor = document.querySelector('.colors--item_2 > .color');
PreviousColor.style.background = '#FFEB3B';
const RedColor = document.querySelector('.colors--item_3 > .color');
RedColor.style.background = '#F74141';
const BlueColor = document.querySelector('.colors--item_4 > .color');
BlueColor.style.background = '#00BCD4';

function ChooseColor() {
  if (CurrentTool === ToolsArray[1]) {
    const { data } = pixel;
    let rgba;
    if (data[3] / 255 !== 1) {
      rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    } else {
      rgba = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    }
    if (rgba !== CurrentColor.style.background) {
      PreviousColor.style.background = CurrentColor.style.background;
      CurrentColor.style.background = rgba;
    }
  }
}

function ChooseDefaultColors(event) {
  if (CurrentTool === ToolsArray[1]) {
    if (CurrentColor.style.background !== event.target.style.background) {
      PreviousColor.style.background = CurrentColor.style.background;
      CurrentColor.style.background = event.target.style.background;
    }
  }
}

RedColor.addEventListener('click', ChooseDefaultColors);
BlueColor.addEventListener('click', ChooseDefaultColors);

example.addEventListener('click', ChooseColor);

function Draw(event) {
  ctx.fillStyle = CurrentColor.style.background;
  ctx.fillRect(event.offsetX, event.offsetY, 25, 25);
}
function Pencil() {
  if (CurrentTool === ToolsArray[2]) {
    example.addEventListener('mousemove', Draw);
    document.addEventListener('mouseup', () => {
      example.removeEventListener('mousemove', Draw);
    });
  }
}

example.addEventListener('mousedown', Pencil);

function PixelIsSame(q, w) {
  for (let i = 0; i < 4; i++) {
    if (q[i] !== w[i]) {
      return false;
    }
  }
  return true;
}

function FillBucket1(x, y) {
  const startPixel = ctx.getImageData(x, y, 1, 1).data;

  if (x >= 0 && x <= 512 && y >= 0 && y <= 512) {
    const a = ctx.getImageData(x, y + 1, 1, 1).data;
    const b = ctx.getImageData(x + 1, y, 1, 1).data;
    // const c = ctx.getImageData(x - 1, y, 1, 1).data;
    // const d = ctx.getImageData(x, y - 1, 1, 1).data;

    if (PixelIsSame(a, startPixel)) FillBucket1(x, y + 1);
    if (PixelIsSame(b, startPixel)) FillBucket1(x + 1, y);
    // if (PixelIsSame(c, startPixel)) FillBucket(x - 1, y);
    // if (PixelIsSame(d, startPixel)) FillBucket(x, y - 1);
    ctx.fillRect(x, y, 1, 1);
  }
}

function FillBucket2(x, y) {
  const startPixel = ctx.getImageData(x, y, 1, 1).data;

  if (x >= 0 && x <= 512 && y >= 0 && y <= 512) {
    // const a = ctx.getImageData(x, y + 1, 1, 1).data;
    // const b = ctx.getImageData(x + 1, y, 1, 1).data;
    const c = ctx.getImageData(x - 1, y, 1, 1).data;
    const d = ctx.getImageData(x, y - 1, 1, 1).data;

    // if (PixelIsSame(a, startPixel)) FillBucket1(x, y + 1);
    // if (PixelIsSame(b, startPixel)) FillBucket1(x + 1, y);
    if (PixelIsSame(c, startPixel)) FillBucket2(x - 1, y);
    if (PixelIsSame(d, startPixel)) FillBucket2(x, y - 1);
    ctx.fillRect(x, y, 1, 1);
  }
}

function FillBucket3(x, y) {
  const startPixel = ctx.getImageData(x, y, 1, 1).data;

  if (x >= 0 && x <= 512 && y >= 0 && y <= 512) {
    // const a = ctx.getImageData(x, y + 1, 1, 1).data;
    const b = ctx.getImageData(x + 1, y, 1, 1).data;
    // const c = ctx.getImageData(x - 1, y, 1, 1).data;
    const d = ctx.getImageData(x, y - 1, 1, 1).data;

    // if (PixelIsSame(a, startPixel)) FillBucket1(x, y + 1);
    if (PixelIsSame(b, startPixel)) FillBucket1(x + 1, y);
    // if (PixelIsSame(c, startPixel)) FillBucket3(x - 1, y);
    if (PixelIsSame(d, startPixel)) FillBucket3(x, y - 1);
    ctx.fillRect(x, y, 1, 1);
  }
}

function FillBucket4(x, y) {
  const startPixel = ctx.getImageData(x, y, 1, 1).data;

  if (x >= 0 && x <= 512 && y >= 0 && y <= 512) {
    const a = ctx.getImageData(x, y + 1, 1, 1).data;
    // const b = ctx.getImageData(x + 1, y, 1, 1).data;
    const c = ctx.getImageData(x - 1, y, 1, 1).data;
    // const d = ctx.getImageData(x, y - 1, 1, 1).data;

    if (PixelIsSame(a, startPixel)) FillBucket4(x, y + 1);
    // if (PixelIsSame(b, startPixel)) FillBucket1(x + 1, y);
    if (PixelIsSame(c, startPixel)) FillBucket4(x - 1, y);
    // if (PixelIsSame(d, startPixel)) FillBucket3(x, y - 1);
    ctx.fillRect(x, y, 1, 1);
  }
}

example.addEventListener('click', (event) => {
  if (CurrentTool === ToolsArray[0]) {
    const checkPixel = ctx.getImageData(event.offsetX, event.offsetY, 1, 1);
    const data = checkPixel.data;
    let rgba;
    if (data[3] / 255 !== 1) {
      rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    } else {
      rgba = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    }
    if (rgba !== CurrentColor.style.background) {
      ctx.fillStyle = CurrentColor.style.background;
      FillBucket1(event.offsetX, event.offsetY);
      FillBucket2(event.offsetX - 1, event.offsetY - 1);
      FillBucket3(event.offsetX, event.offsetY - 1);
      FillBucket4(event.offsetX - 1, event.offsetY);
    }
  }
});

window.addEventListener('click', () => {
  localStorage.setItem('saved', example.toDataURL());
});
