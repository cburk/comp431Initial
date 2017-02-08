// Nothing to change in this file
import particle, { update } from './particle'

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
            let y0 = Math.floor(Math.random() * 300)
            let y1 = Math.floor(Math.random() * 300)
            // TODO: real x range
            let xMax = 300
            c.beginPath()
            c.moveTo(0, y0)
            c.lineTo(300, y1)
            c.stroke()
            
            let slope = (y1 - y0) / xMax
            console.log("Y0 ", y0)
            console.log("Y1 ", y1)
            console.log("Slope ", slope)
            
            
            console.log(starter.loadedImgs[0])
            console.log(typeof(starter.loadedImgs))
            console.log("Wat?")
            // Spawn 2 people at random locations
            starter.loadedImgs.forEach(function(a){
                // TOOD: Pull out into object defn w/ just image passed
                let xCoord = Math.floor(Math.random() * xMax)
                let yCoord = y0 + (slope * xCoord)
                console.log("X: " + xCoord)
                console.log("Y: " + yCoord)
                c.drawImage(e.path[0], xCoord, yCoord, 50, 50)
            })
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
    
    /*
    let particles = Array(5).fill(true).map(() => particle())
    const log = getLogger(c, canvas.height)
    frameUpdate((dt) => {
        particles = particles.map((p) => update(p, dt, canvas))

        log()
        c.fillStyle = '#000'
        c.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach(({position, mass}) => {
            const [x, y] = position
            c.fillStyle = 'red'
            c.beginPath()
            c.arc(x, y, mass, 0, 2 * Math.PI)
            c.fill()
            log(`(${mass.toFixed(2)}) @ (${x.toFixed(6)}, ${y.toFixed(6)})`)
        })
    })
    */
}
