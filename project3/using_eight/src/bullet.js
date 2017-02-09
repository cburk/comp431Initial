const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

const speed = 20

// default values
const bullet = function(p1, p2){
    return {
        mass : 3,
        //let deltaX = p2[0] - p1[0]
        //let deltaY = Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0])
        position : [p1[0], p1[1]],
        velocity : [(p2[0] - p1[0])/(Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0])), (p2[1] - p1[1])/(Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] -p1[0]))],
    }
}
    
const update = ({velocity, position, mass}, delta=1.0, canvas=null) => {
    position[0] = position[0] + (velocity[0] * delta)
    // TODO: Canvas checking, can delete bullets outside of bounds
    if(canvas != null){
        if(position[0] > canvas.width){
            position[0] = 0
        }
        if(position[0] < 0){
            position[0] = canvas.width
        }
    }
    position[1] = position[1] + (velocity[1] * delta)
    // TODO: Border checking
    if(canvas != null){
        if(position[1] > canvas.height){
            position[1] = 0
        }
        if(position[1] < 0){
            position[1] = canvas.height
        }
    }
    return { velocity, position }
}

export default bullet

export { update }
