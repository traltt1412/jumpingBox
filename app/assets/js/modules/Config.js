export default class Config {
	constructor(el) {
		this.canvas = el.querySelector('canvas')
		this.ctx = this.canvas.getContext("2d")
		this.map = {
			mapArray : [
				"####################",
				"#                  #",
				"#  ###             #",
				"#           #      #",
				"#       ##  #####  #",
				"#                  #",
				"#                  #",
				"#    ##            #",
				"#      ##          #",
				"#                  #",
				"#      #####       #",
				"#                  #",
				"#                  #",
				"#       #####      #",
				"#                  #",
				"#               ####",
				"#       #          #",
				"#      ###  #      #",
				"#     ##### ##     #",
				"####################",
			].map(row => row.split("").map(cell=>cell==="#" ? 1 : 0)),
			levelRows: 20,
			levelCols: 20,
			tileX: 32,
			tileY: 32
		}
		this.dummy = {
			width 	: 32,
			height 	: 32,
			x 		: 32,
			y 		: 32,
			speed 	: 3,
			speedX 	: 0,
			speedY 	: 0,
			jump	: 3,
			gravity : 0.3,
			color 	: 'green'
		}
	}
}