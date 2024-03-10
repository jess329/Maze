const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse, Body, Events } = Matter;

const engine = Engine.create()
engine.world.gravity.y = 0
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
})
Render.run(render)
Runner.run(Runner.create(), engine)

const walls = [
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true })
]
World.add(world, walls)

// creating some randomized rectangle shapes
for(let i = 0; i <= 10; i++){
    const x_pos = Math.floor(Math.random() * 500) + 100
    const y_pos = Math.floor(Math.random() * 500) + 100
    const width = Math.floor(Math.random() * 60) + 20
    const height = Math.floor(Math.random() * 60) + 20
    const addedShape = Bodies.rectangle(x_pos, y_pos, width, height)
    // World.add(world, addedShape)
}

// calculating and creating the horizontal and vertical lines of the maze
horizontals.forEach((row, rowIndex) => {
    row.forEach((open, cellIndex) => {
        if (open) {
            return;
        } else {
            const wall_x = unitWidth * cellIndex + (unitWidth / 2)
            const wall_y = unitHeight * rowIndex + unitHeight
            const wall = Bodies.rectangle(wall_x, wall_y, unitWidth, 5, 
            { 
                isStatic: true,
                label: "wall", 
                render: {
                    fillStyle: "red"
                }
            })
            World.add(world, wall)
        }
    })
})
verticals.forEach((col, colIndex) => {
    col.forEach((open, cellIndex) => {
        if (open) {
            return;
        } else {
            const wall_x = unitWidth * colIndex + unitWidth 
            const wall_y = unitHeight * cellIndex + (unitHeight / 2)
            const wall = Bodies.rectangle(wall_x, wall_y, 5, unitHeight, 
                { 
                    isStatic: true,
                    label: "wall", 
                    render: {
                        fillStyle: "red"
                    }
                })
            World.add(world, wall)
        }
    })
})

const goal = Bodies.rectangle(
    width - (unitWidth / 2),
    height - (unitHeight / 2),
    unitWidth / 2,
    unitHeight / 2,
    { 
        isStatic: true, 
        label: "goal",
        render: {
            fillStyle: "#46c24e"
        } 
    }
)

const ballRadius = unitWidth < unitHeight ? unitWidth / 4 : unitHeight / 4
const ball = Bodies.circle(
    unitWidth / 2,
    unitHeight / 2,
    ballRadius,
    { 
        label: "ball",
        render: {
            fillStyle: "#2f69fa"
        } 
    }
)
World.add(world, [goal, ball])

document.addEventListener("keydown", (event) => {
    const {x, y} = ball.velocity
    switch (event.code) {
        case "KeyW": 
            console.log("w");
            Body.setVelocity(ball, {x, y: y - 2})
            break;
        case "KeyA":
            console.log("a");
            Body.setVelocity(ball, {x: x - 2, y})
            break;
        case "KeyS":
            console.log("s");
            Body.setVelocity(ball, {x, y: y + 2})
            break;
        case "KeyD":
            console.log("d");
            Body.setVelocity(ball, {x: x + 2, y})
            break;
        default: 
            break;
    }
})

const userWon = () => {
    world.gravity.y = 1
    world.bodies.forEach(body => {
        if (body.label === "wall" || body.label === "goal") {
            Body.setStatic(body, false)
        }
    })
}

Events.on(engine, "collisionStart", event => {
    event.pairs.forEach(collision => {
        const body1 = collision.bodyA
        const body2 = collision.bodyB
        if (body1.label === "goal") {
            console.log("goal reached");
            userWon()
        }
    })
}) 