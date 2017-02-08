import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        expect(p.mass).to.be.a('Number')
        expect(p.acceleration).to.be.a('Array')
        expect(p.velocity).to.be.a('Array')
        expect(p.position).to.be.a('Array')
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        console.log("fail test")
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5], acceleration: [.5, -.5] })
        const { velocity } = update(p)
        expect(velocity).to.eql([1.0, -1.0])
    })

    it('particles should wrap around the world', () => {
        const canvas = {width: 2, height: 2}
        let p = particle({ position: [10, 1], velocity: [2.5, -2.5]})        
        let { position } = update(p, 1.0, canvas)
        expect(position[0]).to.equal(0)

        p = particle({ position: [-3, 1], velocity: [2.5, -2.5]})
        let result = update(p, 1.0, canvas)
        expect(result.position[0]).to.equal(canvas.width)

        p = particle({ position: [1, 10], velocity: [2.5, -2.5]})
        result = update(p, 1.0, canvas)
        expect(result.position[1]).to.equal(0)
        
        p = particle({ position: [1, -3], velocity: [2.5, -2.5]})
        result = update(p, 1.0, canvas)
        expect(result.position[1]).to.equal(canvas.height)

    })

})
