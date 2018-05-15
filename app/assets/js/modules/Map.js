export default class Map {
	constructor(config) {
		this.config = config
		this.map = this.config.map
		

		this.init()
	}
	
	init() {
		this.render()
	}

	clear() {
		this.config.ctx.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height)
	}

	render() {
		for(let i = 0; i < this.map.levelRows; i++){
			for(let j = 0; j < this.map.levelCols; j++){
				if(this.map.mapArray[i][j] == 1){
					this.config.ctx.fillStyle = "gray";
					this.config.ctx.fillRect(j * this.map.tileX, i * this.map.tileY, this.map.tileX, this.map.tileY);
				}
			}
		}
	}
}