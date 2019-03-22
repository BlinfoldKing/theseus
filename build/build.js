var canvas = function (p) {
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.windowResized = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(100);
        p.circle(30, 30, 20);
    };
};
new p5(canvas);
//# sourceMappingURL=build.js.map