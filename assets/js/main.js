
//This is code Writed by Nawaf, and you're not allowed to copy it :)
// Text Rotation Function
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

// Initialization of Text Rotation
window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    //new theme
    document.getElementById('toggleTheme').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
});

    // Style Injection for Text Rotation
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);

    // Call to resize and draw canvas
    resizeCanvas();
    draw();
};

// Canvas Resizing and Digital Rain
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var chinese = "01".split("");
var font_size = 10;
var drops = [];
var columns;

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    columns = c.width / font_size;
    drops = [];
    for (var x = 0; x < columns; x++) drops[x] = 1;
}

// Digital Rain Drawing Function
function draw() {
    ctx.fillStyle = "rgba(33, 37, 41, .2)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.font = font_size + "px arial";
    for (var i = 0; i < drops.length; i++) {
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

// Adjust canvas size when window is resized
window.onresize = function() {
    resizeCanvas();
    // Optionally, clear the canvas and reset the drops when resizing
    // This avoids visual glitches during resizing
    draw(); 
};

// Start the animation loop
setInterval(draw, 33);
