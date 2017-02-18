const box = document.getElementById("sheet");
const ctx = box.getContext("2d");

const COLORS = ['#FFD700', '#FF6347', '#008080'];
const SIZE = 80;
const CANVAS_SIZE = 650;
const ANIMATION_INTERVAL = 20;
const ANIMATION_MOVE_DISTANCE = 2;

const draw = (point, orientation, sides = [1, 2, 3]) => {
	orientation = orientation || [[1, 2, 3], []];
	let points = {1: [], 2: [], 3: []},
		c = 0, x, y;
	[x, y] = [point.x, point.y];
	for (let angle = 0; angle < 360; angle += 360 / 6) {
		const point = {
			x: getEndPoint.x(x, angle, SIZE),
			y: getEndPoint.y(y, angle, SIZE)
		};
		if ([0, 1, 2].includes(c)) points[1].push(point);
		if ([2, 3, 4].includes(c)) points[2].push(point);
		if ([4, 5, 6].includes(c)) points[3].push(point);
		c++;
	}
	points[3].push({
		x: x + SIZE,
		y: y
	});
	sides.filter(Number).forEach(side => {
		ctx.globalCompositeOperation = orientation[0].includes(side) ? 'destination-over' : orientation[1].includes(side) ? 'source-over' : 'source-over';
		ctx.fillStyle = COLORS[side - 1];
		ctx.beginPath();
		ctx.moveTo(x, y);
		points[side].forEach(point => ctx.lineTo(point.x, point.y));
		ctx.closePath();
		ctx.fill();
	});
};

window.onload = () => {
	box.width = box.height = CANVAS_SIZE;
	const half = CANVAS_SIZE / 2;
	let points = [], x, y;
	let DIST = 0;
	setInterval(() => {
		points = [];
		if ((DIST += ANIMATION_MOVE_DISTANCE) > SIZE * 1.5)
			DIST = ANIMATION_MOVE_DISTANCE;
		const path = [
			{
				cubes: [0],
				sides: [1, 2, (DIST <= 70 ? 3 : 0)]
			}, {
				cubes: [1, 2, 3, 4, 5, 6, 7],
			}, {
				cubes: [8],
				orientation: [
					[3, (DIST > 70 ? 2 : 0)],
					[1, (DIST <= 70 ? 2 : 0)]
				]
			}, {
				cubes: [0],
				sides: [(DIST >= 70 ? 3 : '')]
			}
		];
		ctx.clearRect(0, 0, box.width, box.height);
		let move = {x: 0, y: 0};
		x = half;
		y = SIZE;
		move = {
			x: getEndPoint.x(x, 300, DIST) - x,
			y: getEndPoint.y(y, 300, DIST) - y,
		};
		points.push({
			x: x + move.x,
			y: y + move.y
		});
		[[240, 3], [0, 3], [120, 2]].forEach(direction => {
			for (let i = 0; i < direction[1]; i++) {
				let id = points.length;
				x = getEndPoint.x(x, direction[0], SIZE + SIZE / 2);
				y = getEndPoint.y(y, direction[0], SIZE + SIZE / 2);
				if ([8, 7].includes(id))
					move = {
						x: getEndPoint.x(x, 300, DIST) - x,
						y: getEndPoint.y(y, 300, DIST) - y,
					};
				else if ([6, 5, 4].includes(id))
					move = {
						x: getEndPoint.x(x, 300, -DIST * 2) - x,
						y: 0
					};
				else if ([3, 2, 1].includes(id))
					move = {
						x: getEndPoint.x(x, 300, DIST) - x,
						y: getEndPoint.y(y, 300, -DIST) - y,
					};
				points.push({
					x: x + move.x,
					y: y + move.y
				});
			}
		});
		path.forEach(item => item.cubes.forEach(cube => draw(points[cube], item.orientation, item.sides)));
	}, ANIMATION_INTERVAL)
};

const getEndPoint = {
	x: (x, angle, size) => x + size * Math.cos(angle / 180 * Math.PI),
	y: (y, angle, size) => y - size * Math.sin(angle / 180 * Math.PI)
};

