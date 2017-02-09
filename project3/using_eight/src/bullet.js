const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

const speed = 20

// default values
const bullet = function(p1, p2, who_shot){
    return {
        shooter : who_shot,
        mass : 3,
        //let deltaX = p2[0] - p1[0]
        //let deltaY = Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0])
        position : [p1[0], p1[1]],
        // Math, just makes the speeds total to 1 for consistency between bullets
        velocity : [(p2[0] - p1[0])/(Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] - p1[0])), (p2[1] - p1[1])/(Math.abs(p2[1] - p1[1]) + Math.abs(p2[0] -p1[0]))],
    }
}
    
const update = ({shooter, velocity, position, mass}, delta=1.0, canvas=null) => {
    console.log("Updating?")
    position[0] = position[0] + (velocity[0] * delta)
    // TODO: Canvas checking, can delete bullets outside of bounds
    
    position[1] = position[1] + (velocity[1] * delta)

    return { velocity, position }
}

export default bullet

export { update }
