const canvas = (p: p5) => {
    p.preload = function() {
        
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.windowResized = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = function() {
        p.background(100);
        p.circle(30, 30, 20);
    }
}

new p5(canvas);
