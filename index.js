class Loop {
    // Constructor takes 2 functions:
    // update - to calculate new position of the rect
    // display - to draw it on canvas
    constructor(update, display) {
        this.update = update;
        this.display = display;

        // Difference between the last update and the current time.
        this.deltaTime = 0;
        this.lastUpdate = 0;

        // If we go to the other tab - stop animation after 40ms
        this.maxInterval = 40;

        this.animate = this.animate.bind(this);
        this.animate();
    }

    // currentTime - we get it from the requestAnimationFrame
    animate(currentTime = 0) {
        // Put the animate functiion in the infinite loop.
        // This function is called on each frame if we have enough
        // resources to process its callback.
        // Usually number of calls depecnds on a monitor refresh rate(often 60Hz).
        // So, when different monitors have different refresh rate or there
        // some heavy operations in the background then it can be calles less times.
        // It is puts "currentTime" parameter to the callback.
        // currentTime - number of time in ms passed since we load the page.
        requestAnimationFrame(this.animate);

        // Set delta
        this.deltaTime = currentTime - this.lastUpdate;

        // Prevent redrawing when tab is incative(if it is invisible longer than 40ms)
        if(this.deltaTime < this.maxInterval) {
            // Put time in seconds to the update function.
            this.update(this.deltaTime / 1000);

            this.display(1000 / this.deltaTime | 0)
        }

        this.lastUpdate = currentTime;
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
        this.layer = new Layer(container);

        this.rect = {
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            vx: 500,
            vy: 500,
            color: "orange"
        };

        new Loop(this.update.bind(this), this.display.bind(this));
    }

    update(correction) {
        // If hot the wall - change the direction
        if (this.rect.x <= 0 && this.rect.vx < 0 || this.rect.x + this.rect.w > this.layer.w && this.rect.vx > 0) {
            this.rect.vx = -this.rect.vx;
        }
        if (this.rect.y <= 0 && this.rect.vy < 0 || this.rect.y + this.rect.h > this.layer.h && this.rect.vy > 0) {
            this.rect.vy = -this.rect.vy;
        }

        // Update position of the rect.
        // Correction - to make animation more of less equal on the different refresh rates
        this.rect.x += this.rect.vx * correction;
        this.rect.y += this.rect.vy * correction;
    }

    display(dt) {
        this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h);
        this.layer.context.fillStyle = this.rect.color;
        this.layer.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h); 
    
        this.layer.context.font = `40px Arial black`;
        this.layer.context.fillText(dt, 30, 60);
    }
}

onload = () => {
    new App(document.querySelector("body"));
};