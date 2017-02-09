import bullet, { update } from './bullet'

const startRound = function(){
    const canvas = document.getElementById('app')
    const c = canvas.getContext("2d")
    let round_state = gameStateFactory()
    console.log("Found state: ", round_state)
    
    frameUpdate((dt) => {
        // Move all fired bullets
        round_state.bulletsFired.map((b) => update(b, dt, canvas))

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
        playerAmmo : 1,
        aiAmmo : 1,
        bulletsFired : [bullet()]
    }
}

const starter = {
    loadedCount : 0,
    loadedImgs : [],
    checkStart : function(e){
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
                c.restore()
                
                bullet()
            })
            
            // Now that all initialization is done, start round
            startRound()
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
