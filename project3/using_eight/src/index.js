import bullet, { update } from './bullet'

const startRound = function(p1coords, p2coords, p1botRight, p2botRight){
    console.log("Starting round w/ coords: ", p1coords)
    
    const canvas = document.getElementById('app')
    const c = canvas.getContext("2d")
    // Reset state
    let round_state = gameStateFactory()
    console.log("Found state: ", round_state)
    
    // TODO: Create players w/ states
    
    // Make bullets fire when user clicks
    window.onclick = function(event){
        if(round_state.playerAmmo > 0){
            console.log("Firing! from: ", p1coords, " TO: ", [event.clientX, event.clientY])
            // TODO: No magic
            round_state.bulletsFired.push(bullet([p1coords[0] + 30, p1coords[1] - 30], [event.clientX, event.clientY], "You"))
            round_state.playerAmmo -= 1
            console.log(round_state.bulletsFired)
        }else{
            console.log("'Click'")
        }
    }
    
    // Tell the game what to do each round
    frameUpdate((dt) => {
        // Delete all old bullets
        round_state.bulletsFired.forEach(({position, mass}) => {
            const [x, y] = position
            c.fillStyle = 'white'
            c.beginPath()
            c.arc(x, y, mass + 2, 0, 2 * Math.PI)
            c.fill()
            //log(`(${mass.toFixed(2)}) @ (${x.toFixed(6)}, ${y.toFixed(6)})`)
        })
        
        // Move all fired bullets
        round_state.bulletsFired.map((b) => update(b, dt, canvas))

        // If any bullets hit, assign winner
        //round_state.bulletsFired.forEach(({position, shooter}) => {
        //    if(shooter == 'You'){
        //        console.log("Bullet shot by player")
        //    }
        //})
        
        // TODO Future: Move arm(s) towards mouse?
        
        //c.fillStyle = '#000'
        //c.fillRect(0, 0, canvas.width, canvas.height)
        // Draw bullets
        round_state.bulletsFired.forEach(({position, mass}) => {
            const [x, y] = position
            c.fillStyle = 'red'
            c.beginPath()
            c.arc(x, y, mass, 0, 2 * Math.PI)
            c.fill()
            //log(`(${mass.toFixed(2)}) @ (${x.toFixed(6)}, ${y.toFixed(6)})`)
        })
    })
}

const getLogger = (c, height) => {
    const log = (msg) => {
        if (!msg) { 
            log.x = 30
            log.y = height
        }
        const pt = 16
        c.font = `${pt}px Courier`
        c.fillStyle = "white"
        c.fillText(msg, log.x, log.y)
        log.y = log.y - (4 + pt)
    }
    return log
}

const frameUpdate = (cb) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        const diff = ~~(time - (rAF.lastTime || 0)) // ~~ is like floor
        cb(diff)
        rAF.lastTime = time
    }
    rAF() // go!
}

const gameStateFactory = function() {
    return {
        playerAmmo : 3,
        aiAmmo : 3,
        bulletsFired : []
    }
}

const starter = {
    loadedCount : 0,
    loadedImgs : [],
    checkStart : function(e){
        window.onclick = function(event){console.log("Clickekd on: ", [event.clientX, event.clientY])}
        starter.loadedCount = starter.loadedCount + 1
        starter.loadedImgs.push(this)
        
        if(starter.loadedCount == 2){
            // Reset count for next gaem
            starter.loadedCount = 0
            console.log("2 ready!")
            
            const canvas = document.getElementById('app')
            const c = canvas.getContext("2d")
            
            // Draw slope
            // TOOD: Use real y range
            let y0 = Math.floor(Math.random() * canvas.height)
            let y1 = Math.floor(Math.random() * canvas.height)
            // TODO: real x range
            let xMax = canvas.width
            c.beginPath()
            c.moveTo(0, y0)
            c.lineTo(xMax, y1)
            c.stroke()
            
            let slope = (y1 - y0) / xMax
            console.log("Y0 ", y0)
            console.log("Y1 ", y1)
            console.log("Slope ", slope)
            
            
            console.log(starter.loadedImgs[0])
            console.log(typeof(starter.loadedImgs))
            console.log("Wat?")
            
            //Draw people at the slope angle
            let angle_rads = Math.atan(slope)

            // Spawn 2 people at random locations on the slope
            let coords = []
            let i = 0
            let names = ["You", "Enemy"]
            starter.loadedImgs.forEach(function(a){                
                // TOOD: Pull out into object defn w/ just image passed
                let xCoord = Math.floor(Math.random() * xMax)
                let yCoord = y0 + (slope * xCoord)
                console.log("X: " + xCoord)
                console.log("Y: " + yCoord)
                
                c.save()
                c.translate(xCoord, yCoord)
                c.rotate(angle_rads)
                c.drawImage(a, 0, -50, 50, 50)
                // Describe if it's you or other guy
                c.fillText(names[i], 0, -60)
                c.restore()
                                
                coords.push([xCoord, yCoord])
                i += 1
            })
            
            //upper right of our player
            let ur1 = [(coords[0][0] + Math.sqrt(2500 / (1 + Math.pow(-slope, 2)))), coords[0][1] - 50]
            console.log("UR1", ur1)
            //Upper right of ai
            let ur2 = [(coords[1][0] + Math.sqrt(2500 / (1 + Math.pow(-slope, 2)))), coords[1][1] - 50]
            console.log("UR2", ur2)
            // Idea: If intersection between bullet's trajectory and this line, then kill
            
            // Now that all initialization is done, start round
            startRound(coords[0], coords[1], ur1, ur2)
        }
    }
}

window.onload = () => {    
    const canvas = document.getElementById('app')
    const c = canvas.getContext("2d")
    console.log("start up/window loaded")
    const gameStarter = starter
    
    let stick_img = new Image()
    stick_img.src = "stickFigure.png"
    stick_img.alt = "Error loading file"
    stick_img.onload = gameStarter.checkStart
    
    //console.log("Ayy: " + gameStarter.loadedCount)
    
    let stick_img2 = new Image()
    stick_img2.src = "stickFigure.png"
    stick_img2.alt = "Error loading file 2"
    stick_img2.onload = gameStarter.checkStart

}
