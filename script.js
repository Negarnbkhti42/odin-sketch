const colorPicker = document.getElementById("colorPicker");
const eraser = document.getElementById("action-erase");
const clear = document.getElementById("action-clear");
const resolution = document.getElementById("action-resolution");
const canvas = document.getElementById("canvas");

const actionList = {
    COLOR: "color",
    ERASE: "erase",
};

var color = "#000000";
var size = 16;
var pixels = [];
var action = null;
var mode = actionList.COLOR;


function changePixel(pixel) {
    switch (action) {
        case actionList.COLOR: {
            pixel.style.setProperty("background-color", color);
            return;
        }
        case actionList.ERASE: {
            pixel.style.setProperty("background-color", "#ffffff");
        }

        default: return;
    }
}

function setBoard() {
    document.documentElement.style.setProperty("--canvas-resolution", size);
    pixels = []

    for (let i = 0; i < size * size; i++) {
        let newPixel = document.createElement("div");
        newPixel.classList.add("canvas_pixel");
        newPixel.addEventListener("mouseenter", function (e) {
            changePixel(this);
        });

        newPixel.addEventListener("mousedown", function (e) {
            action = mode;
            changePixel(this);
        });
        newPixel.addEventListener("mouseup", function (e) {
            action = null;
        });

        pixels.push(newPixel);
    }
    canvas.replaceChildren(...pixels);
}

colorPicker.addEventListener("input", function (e) {
    color = e.target.value;
    mode = actionList.COLOR;
    eraser.checked = false;
});

eraser.addEventListener("change", function (e) {
    mode = this.checked ? actionList.ERASE : actionList.COLOR;
});

clear.addEventListener("click", function (e) {
    pixels.forEach(pixel => pixel.style.setProperty("background-color", "#ffffff"));
});

resolution.addEventListener("change", function (e) {
    size = e.target.value;
    document.documentElement.style.setProperty("--canvas-resolution", e.target.value);
    setBoard();
});

setBoard();