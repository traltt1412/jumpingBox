import Config from "./Config"
import Map from "./Map"
import Dummy from "./Dummy"

export default class JumpingSquare {
	constructor(el) {
		this.config = new Config(el)
		this.map 	= new Map(this.config)
		this.dummy 	= new Dummy(this.config)

		this.init()
	}

	init() {
		this.map.init()
		this.dummy.init()
		this.updateBoard()
	}
	
	updateBoard() {
		this.clear()
		this.map.render()
		this.dummy.move()
		this.dummy.render()
		requestAnimationFrame(e => this.updateBoard())
	}
	
	clear() {
		this.config.ctx.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height)
	}
}