// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

robot.moveMouse(10, 10);
const getColor = (str) => {
  const list = str.split("");
  const red = parseInt(`${list[0]}${list[1]}`, 16);
  const green = parseInt(`${list[2]}${list[3]}`, 16);
  const blue = parseInt(`${list[4]}${list[5]}`, 16);
  const isRed = red > green && red > blue;
  const isGreen = green > red && green > blue;
  return { isRed, isGreen, red, green, blue };
};

let isClicked = false;
setInterval(function () {
  // Get mouse position.
  var mouse = robot.getMousePos();

  // Get pixel color in hex format.
  var hex = robot.getPixelColor(mouse.x, mouse.y);
  const { isRed, isGreen, red, green, blue } = getColor(hex);
  if (isGreen && !isClicked) {
    isClicked = true;
    robot.mouseClick();
    setTimeout(() => {
      robot.mouseClick();
      isClicked = false;
    }, 5000);
  }
  console.log(`isClicked: ${isClicked}, isGreen: ${isGreen}`);
}, 200);
