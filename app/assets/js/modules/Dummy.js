export default class Map {
	constructor(config) {
		this.config = config
		this.map = this.config.map
		this.width = this.config.dummy.width || 32
		this.height = this.config.dummy.height || 32
		this.x = this.config.dummy.x || 32
		this.y = this.config.dummy.y || 32
		this.speed = this.config.dummy.speed || 3
		this.speedX = this.config.dummy.speedX || 0
		this.speedY = this.config.dummy.speedY || 0
		this.jump = this.config.dummy.jump || 3
		this.gravity = this.config.dummy.gravity || 0.3
		this.color = this.config.dummy.color || 'green'
		this.canMove = { up: true, right: true, down: true, left: true }
		this.jumping = true
		this.keys = { "37": false, "38": false, "39": false, }

		this.init()
	}

	init() {
		this.render()
		this.setControls()
	}

	render() {
		this.config.ctx.fillStyle = this.color;
		this.config.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	setControls() {
		addEventListener('keyup', e => {
			this.keyEvents(e)

		})
		addEventListener('keydown', e => {
			this.keyEvents(e)
		})
		focus()
	}

	keyEvents(e) {
		if (this.keys["" + e.keyCode] !== undefined) {
			this.keys["" + e.keyCode] = e.type === "keydown"
			e.preventDefault()
		}
	}

	move() {
		this.clearCollision()
		this.checkCanMove()
		this.speedX = 0
		if (this.keys["38"] && this.canMove.up && !this.jumping) {
			this.speedY = -this.speed * this.jump
			this.jumping = true
		}
		if (this.keys["39"] && this.canMove.right) {
			this.speedX = this.speed
		}
		if (this.keys["37"] && this.canMove.left) {
			this.speedX = -this.speed
		}
		if (this.canMove.down) {
			this.speedY += this.gravity
		} else {
			this.jumping = false
		}

		this.checkCollision()
	}

	checkCanMove() {
		const mx = Math.floor(this.x / this.map.tileX)
		const my = Math.floor(this.y / this.map.tileY)
		if (this.y % this.map.tileY === 0) {
			if (this.getMap(mx, my + 1) || (this.x % this.map.tileX !== 0 && this.getMap(mx + 1, my + 1))) {
				this.canMove.down = false
			}
			if (this.getMap(mx, my - 1) || (this.x % this.map.tileX !== 0 && this.getMap(mx + 1, my - 1))) {
				this.canMove.up = false
			}
		}
		if (this.x % this.map.tileX === 0) {
			if (this.getMap(mx - 1, my) || (this.y % this.map.tileY !== 0 && this.getMap(mx - 1, my + 1))) {
				this.canMove.left = false
			}
			if (this.getMap(mx + 1, my) || (this.y % this.map.tileY !== 0 && this.getMap(mx + 1, my + 1))) {
				this.canMove.right = false
			}
		}
	}

	checkCollision() {
		let speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
		if (speed > 0){
			let speedX = this.speedX / speed
			let speedY = this.speedY / speed
			for(let i = 0; i < speed; i++) {
				const x = Math.floor(this.x + speedX * i)
				const y = Math.floor(this.y + speedY * i)
				let mx = Math.floor(x / this.map.tileX)
				let my = Math.floor(y / this.map.tileY)

				if(speedY < 0) {
					if(this.getMap(mx, my) || (x % this.map.tileX !== 0 && this.getMap(mx+1, my))) {
						my++
						this.y = my * this.map.tileY
						this.speedY = speedY = 0
					}
				} else if(speedY > 0) {
					if(this.getMap(mx, my+1) || (x % this.map.tileX !== 0 && this.getMap(mx+1, my+1))) {
						this.y = my * this.map.tileY
						this.speedY = speedY = 0
					}
				}
				if(speedX < 0) {
					if(this.getMap(mx, my) || (y % this.map.tileY !== 0 && this.getMap(mx, my+1))) {
						mx++
						this.x = mx * this.map.tileX
						this.speedX = speedX = 0
					}
				} else if(speedX > 0) {
					if(this.getMap(mx+1, my) || (y % this.map.tileY !== 0 && this.getMap(mx+1, my+1))) {
						this.x = mx * this.map.tileX
						this.speedX = speedX = 0
					}
				}
			}
			this.x += this.speedX
			this.y += this.speedY
		}
	}

	clearCollision() {
		this.canMove.up = true
		this.canMove.right = true
		this.canMove.down = true
		this.canMove.left = true
	}

	getMap(x, y) {
		if (y < 0 || y >= this.map.levelCols || x < 0 || x >= this.map.levelRows) {
			return 1;
		}
		return this.map.mapArray[y][x];
	}
}