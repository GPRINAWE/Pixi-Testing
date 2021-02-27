const Application = PIXI.Application;
const Loader = PIXI.Loader.shared;
const Resources = Loader.resources;
const Sprite = PIXI.Sprite;
const AnimatedSprite = PIXI.AnimatedSprite;
const Rectangle = PIXI.Rectangle;



let app = new Application({
	width: window.innerWidth,
	height: window.innerHeight
});

window.onresize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
};

document.body.appendChild(app.view);



Loader
.add([
	'public/assets/Mr_Derp.png',
	'public/assets/Mr_Derp.json'
])
.load(() => {
	console.log(Resources['public/assets/Mr_Derp.json']);
	console.log(Resources['public/assets/Mr_Derp.json'].spritesheet);

	let sheet = Resources['public/assets/Mr_Derp.json'].spritesheet;
	let mr_derp = new AnimatedSprite(sheet.animations['walk']);
	mr_derp['x'] = 100;
	mr_derp.y = 100;
	mr_derp.w = 160;
	mr_derp.h = 160;
	mr_derp.loop = true;
	mr_derp.animationSpeed = 4/60;
	mr_derp.play();

	app.stage.addChild(mr_derp);
	app.ticker.add((delta) => {
		mr_derp.y += delta/2
	})
});


