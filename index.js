const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse, Body } = Matter;

const engine = Engine.create()
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
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
const cellLength = width / cols
horizontals.forEach((row, rowIndex) => {
    row.forEach((open, cellIndex) => {
        if (open) {
            return;
        } else {
            const wall_x = cellLength * cellIndex + (cellLength / 2)
            const wall_y = cellLength * (rowIndex + 1)
            const wall = Bodies.rectangle(wall_x, wall_y, cellLength, 5, { isStatic: true })
            World.add(world, wall)
        }
    })
})
verticals.forEach((col, colIndex) => {
    col.forEach((open, cellIndex) => {
        if (open) {
            return;
        } else {
            const wall_x = cellLength * (colIndex + 1)
            const wall_y = cellLength * cellIndex + (cellLength / 2)
            const wall = Bodies.rectangle(wall_x, wall_y, 5, cellLength, { isStatic: true })
            World.add(world, wall)
        }
    })
})

const goal = Bodies.rectangle(
    width - (cellLength / 2),
    height - (cellLength / 2),
    cellLength / 2,
    cellLength / 2,
    { isStatic: true }
)
const ball = Bodies.circle(
    cellLength / 2,
    cellLength / 2,
    cellLength / 4
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