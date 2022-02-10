export default class Ball {
    //! Creating a div element from within JS:
    //? We use the document object available in JavaScript:
    ball = document.createElement('div')
    body = document.body

    bodyWidth
    bodyHeight
    ballHeight
    ballWidth
    x
    y
    color
    size
    stepSpeed
    id = null
    GR = true
    GD = true
    movementArrayHistory = []

    constructor(x = 0, y = 0, color = 'white', size = 100, stepSpeed = 1) {
        this.x = x
        this.y = y
        this.color = color
        this.size = size + "px"
        this.stepSpeed = stepSpeed
        this.body.appendChild(this.ball)
        this.ball.classList.add('ball')

        this.ball.style.width = this.size
        this.ball.style.height = this.size

        this.bodyWidth = this.body.clientWidth
        this.bodyHeight = this.body.clientHeight

        this.ballHeight = this.ball.clientHeight
        this.ballWidth = this.ball.clientWidth

        // this.ball.addEventListener('mouseover', () => {
        //     this.ball.classList.add("hover")
        //     clearInterval(this.id)
        // })

        // this.ball.addEventListener('mouseout', () => {
        //     this.ball.classList.remove("hover")
        //     clearInterval(this.id)
        //     this.id = this.moveTheBall()
        // })


        this.body.addEventListener('keypress', (e) => {

            if (e.key == 'd') {
                this.moveRight()
            }
            if (e.key == 'a') {
                this.moveLeft()
            }
            if (e.key == 'w') {
                this.moveUp()
            }
            if (e.key == 's') {
                this.moveDown()
            }
            if (e.key == 'h') {
                this.replayHistory()
            }
        })

        this.body.style.overflow = 'hidden'
        this.ball.style.backgroundColor = this.color

        // this.id = this.moveTheBall()
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async replayHistory() {

        if (this.movementArrayHistory.length === 0) {
            alert('No History yet to play.')
            return
        }

        this.x = 0
        this.y = 0

        console.log(this.movementArrayHistory)
        this.movementArrayHistory.reverse()
        for (const movement of this.movementArrayHistory) {
            console.log('movement.x :', movement.x);
            console.log('movement.y :', movement.y);
            await this.sleep(0.3)
            this.ball.style.left = movement.x + "px";
            this.ball.style.top = movement.y + 'px';
        }

        this.x = this.ball.offsetLeft
        this.y = this.ball.offsetTop
    }

    checkBallLocation() {
        const location = { minX: 0, maxX: 0, minY: 0, maxY: 0 }


        this.bodyWidth = this.body.clientWidth
        this.bodyHeight = this.body.clientHeight

        location.maxX = this.x + +this.size.replace('px', '') < this.bodyWidth
        location.minX = this.x > 0
        location.maxY = this.y + +this.size.replace('px', '') < this.bodyHeight
        location.minY = this.y > 0

        this.movementArrayHistory.push({ x: this.x, y: this.y })

        return location
    }

    moveRight() {
        let { maxX } = this.checkBallLocation()
        if (maxX) {
            this.x += 50;
            this.ball.style.left = this.x + 'px'
            console.log("Ball is moving right")
        }
    }

    moveLeft(movementArrayHistory = null) {
        let { minX } = this.checkBallLocation()

        if (minX) {
            this.x -= 50;
            this.ball.style.left = this.x + 'px'
            console.log("Ball is moving left")
        }
    }

    moveUp() {
        let { minY } = this.checkBallLocation()

        if (minY) {

            this.y -= 50;
            this.ball.style.top = this.y + 'px'
            console.log("Ball is moving up")
        }
    }

    moveDown() {
        let { maxY } = this.checkBallLocation()

        if (maxY) {

            this.y += 50;
            this.ball.style.top = this.y + 'px'
            console.log("Ball is moving down")
        }
    }




    moveTheBall() {
        if (this.id) {
            clearInterval(this.id)
        }
        return setInterval(() => {

            this.bodyWidth = this.body.clientWidth
            this.bodyHeight = this.body.clientHeight

            this.ball.style.left = this.x + 'px'
            this.ball.style.top = this.y + 'px'


            if (this.GR) {
                this.x = this.x + this.stepSpeed;
            } else {
                this.x = this.x - this.stepSpeed;
            }

            if (this.x + this.ballWidth >= this.bodyWidth && this.GR) {
                this.GR = false
            }

            if (this.x <= 0 && !this.GR) {
                this.GR = true
            }

            if (this.GD) {
                this.y = this.y + this.stepSpeed;
            } else {
                this.y = this.y - this.stepSpeed;
            }

            if (this.y + this.ballHeight >= this.bodyHeight && this.GD) {
                this.GD = false
            }

            if (this.y <= 0 && !this.GD) {
                this.GD = true
            }

        }, 1)
    }
}



const myBalls = []

function generateRandomNumber(maxLimit) {
    return Math.floor(Math.random() * maxLimit)
}

function generateRandomSpeedUpTo(maxLimit) {
    return Math.floor(Math.random() * maxLimit) + 1
}

function randomRGB() {
    let r = generateRandomNumber(256) + 70
    let g = generateRandomNumber(256) + 70
    let b = generateRandomNumber(256) + 70

    return `rgb(${r},${g},${b})`
}


// for (let i = 0; i < 10; i++) {
//     myBalls.push(
//         new Ball(
//             i * generateRandomNumber(200),
//             i * generateRandomNumber(200),
//             randomRGB(),
//             generateRandomNumber(100),
//             generateRandomSpeedUpTo(3)
//         )
//     )
// }

// const ball1 = new Ball(500, 500, "red", 10, 20)
// const ball2 = new Ball(100, 600, "yellow", 10, 20)
// const ball3 = new Ball(50, 900, "purple", 10, 20)
// const ball4 = new Ball(580, 500, "lightgreen", 10, 20)
// const ball5 = new Ball(180, 500, "hotpink", 10, 20)


// let userInput = prompt("Please, Max, type something: ")
// if (userInput) {
//     alert(userInput)
// }


// Falsy values:
//! undefined , null , NaN , 0 , "" (empty string)
function getUserInput(username = "User") {
    let userInput = prompt(`Please, ${username}, type something: `)
    if (userInput) {
        return userInput
    } else {
        return null
    }
}

//* Program Start:
// let username = getUserInput("Max")

// while (!username) {
//     username = getUserInput("Max")
// }

// const h1 = document.createElement('h1')
// const body = document.body

// h1.innerHTML = username

// body.appendChild(h1)


//! Create a function that will accept 4 parameters, (Tagname, Text, ClassName, BackgroundColor)
//! Then this function will return the new create HTML element that will make use of the passed values.
