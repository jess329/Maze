const { Engine, World, Runner, Render, Bodies, MouseConstraint, Mouse } = Matter;

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

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}))

const walls = [
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true })
]
World.add(world, walls)

// creating some randomized rectangle shapes
for(let i = 0; i <= 10; i++){
    const x_pos = Math.floor(Math.random() * 500) + 100
    const y_pos = Math.floor(Math.random() * 500) + 100
    const width = Math.floor(Math.random() * 60) + 20
    const height = Math.floor(Math.random() * 60) + 20
    const addedShape = Bodies.rectangle(x_pos, y_pos, width, height)
    World.add(world, addedShape)
}

// calculating and creating the horizontal and vertical lines of the maze
horizontals.forEach((row, rowIndex) => {
    row.forEach((open, cellIndex) => {
        if (open) {
            return;
        } else {
            const wallLength = width / cols
            const wall_x = wallLength * cellIndex + (wallLength / 2)
            const wall_y = (height / rows) * (rowIndex + 1)
            const wall = Bodies.rectangle(wall_x, wall_y, wallLength, 2, { isStatic: true })
            World.add(world, wall)
        }
    })
})
verticals.forEach((col, colIndex) => {
    col.forEach((open, cellIndex) => {
        if (open) {
            return;
        } else {
            const wallLength = height / cols
            const wall_x = (height / rows) * (colIndex + 1)
            const wall_y = wallLength * cellIndex + (wallLength / 2)
            const wall = Bodies.rectangle(wall_x, wall_y, 2, wallLength, { isStatic: true })
            World.add(world, wall)
        }
    })
})