const canvas = document.getElementById("fire");
const ctx = canvas.getContext("2d");

//setting canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//defining constants
const shape_array = ["square", "triangle", "circle"];
const color_array = ['red', 'white', 'magenta', 'blue', 'cyan', 'yellow'];
const particlesArray = [];
let r = 0, g = 0, b = 0;


ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//adding event listener to check if window was resized or not
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//getting mouse x and y co-ordinates
const mouse = {
    x: undefined,
    y: undefined
}




window.addEventListener('keypress', function(){
    console.log("big key pressing gamers");

    for(let a = 0; a < 100; a++){
        particlesArray.push(new Particle());

    }

    //u can comment out the rest of this function if u would like a bunch of particles moving around the screen randomly
    let rand_x = Math.random() * canvas.width;
    let rand_y = Math.random() * canvas.height;

    for (let b = 0; b < particlesArray.length; b++) {
        particlesArray[b].x = rand_x;
        particlesArray[b].y = rand_y;
    }
})




class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 4 - 1.5;
        this.speedY = Math.random() * 4 - 1.5;
        this.color = color_array[Math.floor(Math.random() * color_array.length)]
        this.shape = shape_array[Math.floor(Math.random() * shape_array.length)]
        this.size = Math.random() * 15 + 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.08;
    }

    draw(){
        if (this.shape == "square"){
            //setting colors and stroke
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, Math.floor(this.size), Math.floor(this.size));
            ctx.fill();
        } else if(this.shape == "circle") {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            let x = this.x;
            let y = this.y
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + Math.floor(this.size));
            ctx.lineTo(x + Math.floor(this.size), y + Math.floor(this.size));
            ctx.closePath();
            ctx.fill();
        }
    }
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for(let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}


//main function for looping through it again and again
function animate(){
    ctx.fillStyle = 'black';
    //ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    //for changing background
    // ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b +', 0.02)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
   /* r+=Math.random() * Math.random(1, 19);
    g+=Math.random() * Math.random(1, 5);
    b+=Math.random() * Math.random(1, 100);
    if(r >=255) {
        r = 0;
        g = 0;
        b = 0;
    }*/
    handleParticles();
    requestAnimationFrame(animate);
}
animate();