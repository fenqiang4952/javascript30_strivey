const canvas = document.querySelector('#draw')
const context = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let screenX = 0
let screenY = 0
let isDraw = false

let hue = 0
let font = 12
context.lineWidth = 90;
context.lineCap = 'round';
context.lineJoin = 'round';

function draw(e) {
    if (!isDraw) {
        return
    }

    context.fillStyle = `hsl(${ hue }, 90%, 50%)`;
    if (hue >= 360) hue = 0;
    hue++;

    context.beginPath();

    context.moveTo(screenX, screenY);

    // context.lineTo(e.offsetX, e.offsetY);
    if (font >= 80) font = 12;
    font++;
    context.font = `${font}px sans-serif`;
    context.fillText('hello world', e.offsetX, e.offsetY);
    // context.stroke();
    [screenX, screenY] = [e.offsetX, e.offsetY]
}

canvas.addEventListener('mousedown', (e) => {
    // console.log(e);
    isDraw = true;
    [screenX, screenY] = [e.offsetX, e.offsetY]
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDraw = false)