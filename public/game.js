/** functions */

const radians = (deg) => deg * Math.PI / 180
const degrees = (rad) => rad * 180 / Math.PI

const parse_config = (default={}, config={}) => {
	let obj = {}
	for (const key in default) {
		obj[key] = config[key] || default[key]
	}
	return obj
}

/*
const parse_config = (default={}, config={}) => {
	let obj = {}
	Object.assign(obj, default)
	Object.assign(obj, config)
	return obj
}
*/



/** core */

class Vector {
	constructor(x=0, y=0) {
		this.x = x
		this.y = y
	}

	get() {
		return new Vector(this.x, this.y)
	}

	get angle() {
		return degrees(Math.atan2(this.y, this.x))
	}

	get magnitude() {
		return Math.hypot(this.x, this.y)
	}

	set angle(a) {
		let ang = radians(a)
		let mag = this.magnitude
		this.x = Math.cos(ang) * mag
		this.y = Math.sin(ang) * mag
	}

	set magnitude(m) {
		let scaleRatio = m / this.magnitude
		this.mul(scaleRatio)
	}

	normalize() {
		this.div(this.magnitude)
	}

	add(vector) {
		this.x += vector.x
		this.y += vector.y
	}

	sub(vector) {
		this.x -= vector.x
		this.y -= vector.y
	}

	mul(scalar) {
		this.x *= scalar
		this.y *= scalar
	}

	div(scalar) {
		this.x /= scalar
		this.y /= scalar
	}

	dot(vector) {
		return (this.x * vector.x) + (this.y * vector.y)
	}

	//vector from point1 to point2
	static from(p1, p2) {
		let x = p2.x - p1.x
		let y = p2.y - p1.y
		return new Vector(x, y)
	}
}


class Point {
	constructor(x=0, y=0) {
		this.x = x
		this.y = y
	}

	add(vector) {
		this.x += vector.x
		this.y += vector.y
	}
}

class Line {
	constructor(x1=0, y1=0, x2=0, y2=0) {
		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
	}

	static from(p1, p2) {
		
	}
}


//Axis aligned boundary box
class Rectangle {
	constructor(x=0, y=0, w=100, h=100) {
		this.x = data.x
		this.y = data.y
		this.x2 = data.x + data.w
		this.y2 = data.y + data.h
	}
}

class Collisions {
	lineline(l1, l2) {
		let a = l1.x1
		let b = l1.y1
		let c = l1.x2
		let d = l1.y2

		let p = l2.x1
		let q = l2.y1
		let r = l2.x2
		let s = l2.y2

    		let det = (c - a)*(s - q) - (r - p)*(d - b)

		if (det !== 0) {
    			let lambda = ((s - q)*(r - a) + (p - r)*(s - b)) / det
    			let gamma = ((b - d)*(r - a) + (c - a)*(s - b)) / det
    
    			if ((0 <= lambda && lambda <= 1) && (0 <= gamma && gamma <= 1)) {
        			return true
			}
		}
		return false
	}

	
}

	pointCircle(p, c) {
		
		
	}
}

class Entity {
	static DEFAULT = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		ax: 0,
		ay: 0,
		delta: true,
		shape: 
	}

	constructor(config={}) {
		let data = parse_config(Entity.DEFAULT, config)

		this.pos = new Vector(data.x, data.y)
		this.vel = new Vector(data.vx, data.vy)
		this.acc = new Vector(data.ax, data.ay)

		//collision shape used in engine
		this.shape
	}

	update(delta) {
		this.vel.add(this.acc)
		this.pos.add(this.vel)
	}
}


export default {Vector: Vector}