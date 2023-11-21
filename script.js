/** @format */

// DEFAULT GAME STATE
var gameState = {
	money: 0,
	autoHarvestActive: false,
	harvestPower: { manual: 1, auto: 0 },
};
//AUTO HARVESTER EVERY 5SEC
const interval = setInterval(function () {
	gameState.money += gameState.harvestPower.auto;
}, 5000);

// CREATE & POPULATE CANVAS
var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d'),
	container = document.body;
container.appendChild(canvas);
canvas.width = 600;
canvas.height = 300;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// PRINT CURRENT STATS
updateStatus = function () {
	canvas.width = 600;
	canvas.height = 300;
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	ctx.textBaseline = 'top';
	ctx.textAlign = 'left';
	ctx.font = '20px Arial';
	ctx.fillText(
		'Money: ' +
			gameState.money +
			', Click power: ' +
			gameState.harvestPower.manual +
			', auto power: ' +
			gameState.harvestPower.auto,
		10,
		10
	);
	// figure out a way not to repeate elements

	ctx.fillStyle = 'red';
	ctx.font = '15px Arial';
	var upgradeManual = ctx.fillRect(10, 60, 160, 40);
	ctx.fillStyle = 'white';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillText('Upgrade manual ' + 2 * gameState.harvestPower.manual, 90, 80);

	buttonUpgradeAuto = ctx.fillStyle = 'red';
	ctx.font = '15px Arial';
	var upgradeAuto = ctx.fillRect(10, 110, 160, 40);
	ctx.fillStyle = 'white';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillText('Upgrade auto ' + 25 * gameState.harvestPower.auto, 90, 130);

	ctx.fillStyle = 'red';
	ctx.font = '30px Arial';
	var buttonHarvest = ctx.fillRect(150, 200, 250, 80);
	ctx.fillStyle = 'white';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillText('Harvest', 280, 240);
};

// Function to check whether a pointer is inside rectangle
function clickHarvest(pos) {
	return pos.x > 150 && pos.x < 150 + 250 && pos.y < 200 + 80 && pos.y > 200;
}
function clickUpgradeAuto(pos) {
	return pos.x > 10 && pos.x < 10 + 160 && pos.y < 110 + 40 && pos.y > 110;
}
function clickUpgradeManual(pos) {
	return pos.x > 10 && pos.x < 10 + 160 && pos.y < 60 + 40 && pos.y > 60;
}

// CLICK LOCATION & HANDLING
function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
}
// on button click, do things
canvas.addEventListener('click', function (evt) {
	var mousePos = getMousePos(canvas, evt);
	if (clickHarvest(mousePos)) {
		gameState.money += gameState.harvestPower.manual;
	} else if (
		clickUpgradeAuto(mousePos) &&
		gameState.money > 25 * 1 * gameState.harvestPower.auto
	) {
		gameState.harvestPower.auto += 1;
		gameState.money -= 25 * gameState.harvestPower.auto;
	} else if (
		clickUpgradeManual(mousePos) &&
		gameState.money >= 2 * gameState.harvestPower.manual
	) {
		gameState.harvestPower.manual += 1;
		gameState.money -= 2 * gameState.harvestPower.manual;
	}
});

var loop = function () {
	requestAnimationFrame(loop);
	updateStatus();
};
loop();
