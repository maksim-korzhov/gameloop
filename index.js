class Loop {
    // Constructor takes 2 functions:
    // update - to calculate new position of the rect
    // display - to draw it on canvas
    constructor(update, display) {

    }
}

class Layer {
    constructor(container) {
        // Create new Canvas element
        this.canvas = document.createElement("canvas");

        // Get access to 2d drawing tool
        this.context = this.canvas.getContext("2d");

        // Put canvas to the container
        container.appendChild(this.canvas);

        this.fitToContainer = this.fitToContainer.bind(this);
        addEventListener("resize", this.fitToContainer);
        this.fitToContainer();
    }

    // Fit canvas to the container
    fitToContainer() {
        this.w = this.canvas.width = this.canvas.offsetWidth;
        this.h = this.canvas.height = this.canvas.offsetHeight;
    }
}

class App {
    constructor(container) {
        const layer = new Layer(container);

        this.rect = {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            vx: 500,
            vy: 500,
            color: "orange"
        };
    }
}

onload = () => {
    new App(document.querySelector("body"));
};