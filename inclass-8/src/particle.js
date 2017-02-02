const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta=1.0, canvas=null) => {
    position[0] = position[0] + (velocity[0] * delta)
    if(canvas != null){
        if(position[0] > canvas.width){
            position[0] = 0
        }
        if(position[0] < 0){
            position[0] = canvas.width
        }
    }
    position[1] = position[1] + (velocity[1] * delta)
    if(canvas != null){
        if(position[1] > canvas.height){
            position[1] = 0
        }
        if(position[1] < 0){
            position[1] = canvas.height
        }
    }
    velocity[0] = velocity[0] + (acceleration[0] * delta)
    velocity[1] = velocity[1] + (acceleration[1] * delta)
    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
