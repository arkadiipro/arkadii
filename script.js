let best = document.getElementById("best")
let data = null;
let savedData = null;
window.onload = function () {
    savedData = localStorage.getItem("scoresT");
    if(savedData){
        data = Number(savedData)
        best.innerText = data;
    } else {
        data = 0
        localStorage.setItem("scoresT", data);
    }
}

let platform = null;
let FPS = 30;
let timer = 0;
let sec = document.getElementById("sec");
let ball1 = null;
let ball2 = null;
let ball3 = null;
let ball4 = null;
let ball5 = null;
let balls = null;
let attempts = 0;
let attempt = document.getElementById("attempts")
let gameLevel;
let isGameStart = false;
//знаходимо елемент canvas по айді
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
function getBall () {
    let ball = document.querySelector('input[name = "ball" ]:checked')
    if (ball.value === "1") {
        ball1 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        balls = 1
    } else if (ball.value === "2") {
        ball1 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball2 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        balls = 2
    } else if (ball.value === "3") {
        ball1 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball2 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball3 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        balls = 3
    } else if (ball.value === "4") {
        ball1 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball2 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball3 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball4 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        balls = 4
    } else {
        ball1 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball2 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball3 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball4 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        ball5 = new Ball(Math.random() * canvas.width ,Math.random() * canvas.height / 2 )
        balls = 5
    }
    platform = new Platform()
    
}
function getLevel () {
    let level = document.querySelector('input[name = "level" ]:checked');
    if (level) {
        if(level.value === '130') {
            gameLevel = 9;
        } else if (level.value === '100'){
            gameLevel = 7;
        } else if (level.value === '70') {
            gameLevel = 5;
        } else {
            gameLevel = 7
        }
    }
}
//знаходимо кнопки
let gameLoop;   
let start = document.getElementById("start")
let makeX = document.getElementById("makeX")
let makeY = document.getElementById("makeY")
//додаемо обробник кнопок управление
start.addEventListener("click", proverka )
makeX.addEventListener("click", makeXF  )
makeY.addEventListener("click", makeYF )
//функції яки використовувуються вверху
function makeXF () {
    if (isGameStart) {
        return;
    }
    let X = prompt("Укажіть розмір полотна в px(px указивать не треба,укажіть просто число.)")
    if ((isFinite(X) && X !== "" && X !== null)) {
        canvas.width = X
    } else {
        alert("Чет не так указано , если хочеш попробуй еще раз")
    }
    
} 
function makeYF () {
    if (isGameStart) {
        return;
    }
    
    let Y = prompt("Укажіть розмір полотна в px(px указивать не треба,укажіть просто число).")
    if (isFinite(Y) && Y !== "" && Y !== null) {
        canvas.height = Y
    } else {
        alert("Чет не так указано , если хочеш попробуй еще раз")
    }
} 

function proverka () {
    if (isGameStart) {
        stopGame ()
        start.innerText = "Почати гру"
    } else {
        getBall ()
        getLevel ()
        startGame ()
        start.innerText = "Завершити гру"
    }
}


function startGame() {
    
    attempts += 1;
    attempt.innerText = "Attempts: " + attempts;
    if (balls === 1) {
        ball1.XSpeed = getRN(gameLevel)
        ball1.YSpeed = getRN(gameLevel)
    } else if (balls === 2) {
        ball1.XSpeed = getRN(gameLevel)
        ball1.YSpeed = getRN(gameLevel)
        ball2.XSpeed = getRN(gameLevel)
        ball2.YSpeed = getRN(gameLevel)
    } else if (balls === 3) {
        ball1.XSpeed = getRN(gameLevel)
        ball1.YSpeed = getRN(gameLevel)
        ball2.XSpeed = getRN(gameLevel)
        ball2.YSpeed = getRN(gameLevel)
        ball3.XSpeed = getRN(gameLevel)
        ball3.YSpeed = getRN(gameLevel)
    } else if (balls === 4) {
        ball1.XSpeed = getRN(gameLevel)
        ball1.YSpeed = getRN(gameLevel)
        ball2.XSpeed = getRN(gameLevel)
        ball2.YSpeed = getRN(gameLevel)
        ball3.XSpeed = getRN(gameLevel)
        ball3.YSpeed = getRN(gameLevel)
        ball4.XSpeed = getRN(gameLevel)
        ball4.YSpeed = getRN(gameLevel)
    } else {
        ball1.XSpeed = getRN(gameLevel)
        ball1.YSpeed = getRN(gameLevel)
        ball2.XSpeed = getRN(gameLevel)
        ball2.YSpeed = getRN(gameLevel)
        ball3.XSpeed = getRN(gameLevel)
        ball3.YSpeed = getRN(gameLevel)
        ball4.XSpeed = getRN(gameLevel)
        ball4.YSpeed = getRN(gameLevel)
        ball5.XSpeed = getRN(gameLevel)
        ball5.YSpeed = getRN(gameLevel)
    }
    isGameStart = true
     if (gameLoop) return;
     if (balls === 1) {
        gameLoop = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height )
    ctx.fillStyle = "red"
    platform.DrawAndCheckCollision()
    ball1.drawAndMove()
    ball1.checkCollision()
    ctx.strokeRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "red"
    ctx.fillRect(0, canvas.height - 2, canvas.width, 2)
    timer += 1 / FPS;
    sec.innerText = timer.toFixed(2);
    if (timer > data) {
    savedData = data
    localStorage.setItem("scoresT", data);
    data = timer.toFixed(2)
    best.innerText = data;
    };

    }, FPS);
     } else if (balls === 2) {
        gameLoop = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height )
    ctx.fillStyle = "red"
    platform.DrawAndCheckCollision()
    ball1.drawAndMove()
    ball2.drawAndMove()
    ball1.checkCollision()
    ball2.checkCollision()
    ctx.strokeRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "red"
    ctx.fillRect(0, canvas.height - 2, canvas.width, 2)
    timer += 1 / FPS;
    sec.innerText = timer.toFixed(2);
    if (timer > data) {
    savedData = data
    localStorage.setItem("scoresT", data);
    data = timer.toFixed(2)
    best.innerText = data;
    };
    }, FPS);
    } else if (balls === 3) {
        gameLoop = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height )
    ctx.fillStyle = "red"
    platform.DrawAndCheckCollision()
    ball1.drawAndMove()
    ball2.drawAndMove()
    ball3.drawAndMove()
    ball1.checkCollision()
    ball2.checkCollision()
    ball3.checkCollision()
    ctx.strokeRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "red"
    ctx.fillRect(0, canvas.height - 2, canvas.width, 2)
    timer += 1 / FPS;
    sec.innerText = timer.toFixed(2);
    if (timer > data) {
    savedData = data
    localStorage.setItem("scoresT", data);
    data = timer.toFixed(2)
    best.innerText = data;
    
    };
    }, FPS);  
    } else if (balls === 4) {
        gameLoop = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height )
    ctx.fillStyle = "red"
    platform.DrawAndCheckCollision()
    ball1.drawAndMove()
    ball2.drawAndMove()
    ball3.drawAndMove()
    ball4.drawAndMove()
    ball1.checkCollision()
    ball2.checkCollision()
    ball3.checkCollision()
    ball4.checkCollision()
    ctx.strokeRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "red"
    ctx.fillRect(0, canvas.height - 2, canvas.width, 2)
    timer += 1 / FPS;
    sec.innerText = timer.toFixed(2);
    if (timer > data) {
    savedData = data
    localStorage.setItem("scoresT", data);
    data = timer.toFixed(2)
    best.innerText = data;
    };
    }, FPS);
    } else {
        gameLoop = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height )
        ctx.fillStyle = "red"
        platform.DrawAndCheckCollision()
        ball1.drawAndMove()
        ball2.drawAndMove()
        ball3.drawAndMove()
        ball4.drawAndMove()
        ball5.drawAndMove()
        ball1.checkCollision()
        ball2.checkCollision()
        ball3.checkCollision()
        ball4.checkCollision()
        ball5.checkCollision()
        ctx.strokeRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "red"
        ctx.fillRect(0, canvas.height - 2, canvas.width, 2)
        timer += 1 / FPS;
    sec.innerText = timer.toFixed(2);
    if (timer > data) {
    savedData = data
    localStorage.setItem("scoresT", data);
    data = timer.toFixed(2)
    best.innerText = data;
    };
        }, FPS);
    }
}

    function stopGame() {

        timer = 0
        sec.innerText = timer;
        platform = null;
        ball1 = null;
        ball2 = null;
        ball3 = null;
        ball4 = null;
        ball5 = null;
        isGameStart = false
        clearInterval(gameLoop);
        gameLoop = null; // Позначаємо, що гра зупинена      
        ctx.clearRect(0,0,canvas.width,canvas.height)
        
    }
//функція рандомного числа від -5 до 5 
//якщо число 0 то воно переобирае його
function getRN (value) {

   let RN = Math.floor(Math.random() * value - value /2 - 1 )
   while (RN === 0) {
    RN = Math.floor(Math.random() * value - value /2 - 1 ); 
    }
    return RN
}

//додаемо обробник клавіатури і виділяемо всю сторінку
let key = document;
let isPressKey =  {
    ArrowLeft: false,
    ArrowRight: false

}

let otstup = 10
let Platform = function () {
   this.x = canvas.width / 2
   this.y = canvas.height - 10
   this.width = 50
   this.height = 4 
   this.torch = canvas.height - otstup          
}
Platform.prototype.DrawAndCheckCollision = function () {
    if (isPressKey.ArrowLeft) this.x -= 10
    if (isPressKey.ArrowRight) this.x += 10
    ctx.fillRect(this.x - this.width / 2 , this.y - this.height / 2,this.width,this.height)
    if (this.x - this.width / 2 < 0) this.x = this.width / 2;
    if (this.x + this.width / 2 > canvas.width) this.x = canvas.width - this.width / 2;
} 

//створюемо конструктор об'єкта
//і задаемо йому рандомну швидкість(і напрямок)
let Ball = function (x,y) {
    this.x = x 
    this.y = y
    this.XSpeed = null;
    this.YSpeed = null;
};
//створюемо прототип до конструктора який рухае і малюе об'єкт
Ball.prototype.drawAndMove = function () {
  this.x += this.XSpeed
  this.y += this.YSpeed
  ctx.beginPath()
  ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
  ctx.fill() 
}

//перевіряемо чи він коснувся стіни якщо касаеться відбиваемо
Ball.prototype.checkCollision = function () {
    // Відскок від лівої або правої стіни
    if (this.x < 5 || this.x > canvas.width - 5) {
        this.XSpeed = -this.XSpeed;
    }

    // Відскок від стелі
    if (this.y < 5) {
        this.YSpeed = -this.YSpeed;
    }


    // відбиваемо від платформи
    let ballBottom = this.y + 5; // нижня точка кульки
    let platformTop = platform.y - platform.height / 2;
    let platformLeft = platform.x - platform.width / 2;
    let platformRight = platform.x + platform.width / 2;

    if (ballBottom >= platformTop && 
        this.y < platform.y && // кулька вище середини платформи
        this.x > platformLeft && 
        this.x < platformRight && 
        this.YSpeed > 0) { // кулька летить вниз
        
        this.YSpeed = -this.YSpeed;
        this.y = platformTop - 5; // виштовхуемо кульку вгору, щоб не застрягла
    }

    // Відскок від підлоги 
    if (this.y > canvas.height - 5) {
        this.y = canvas.height - 6
        
        stopGame() //зупиняемо гру
        alert(" GG bro")
        start.innerText = "Почати гру"
    }
}

//обробник клавіатури
key.addEventListener("keydown", function (event) {
    if (event.key in isPressKey) {
        isPressKey[event.key] = true
    }
})
key.addEventListener("keyup", function (event) {
    if (event.key in isPressKey) {
        isPressKey[event.key] = false
    }
})
//створюемо 5 шарів

ctx.lineWidth = 2