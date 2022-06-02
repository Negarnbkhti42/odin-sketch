const actionList = {
    COLOR: "color",
    ERASE: "erase",
    CLEAR: "clear"
};

var color = "#000000";
var size = 16;
var pixels = [];
var action = null;
var mode = actionList.COLOR;
const colorPicker = document.getElementById("colorPicker");
const canvas = document.getElementById("canvas");

function changePixel(pixel) {
    switch (action) {
        case actionList.COLOR: {
            pixel.style.setProperty("background-color", color);
            return;
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

colorPicker.addEventListener("change", function (e) {
    color = e.target.value;
});

setBoard();