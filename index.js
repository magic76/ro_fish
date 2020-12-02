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
let lockX;
let lockY;

const mouseClickAndBack = () => {
  const mouse = robot.getMousePos();
  robot.moveMouse(lockX, lockY);
  robot.mouseClick();
  robot.mouseClick();
  robot.moveMouse(mouse.x, mouse.y);
  robot.mouseClick();
};

console.log(
  "process will start after 5 second, please move mouse to non-green area."
);
const initColor = setInterval(() => {
  const mouse = robot.getMousePos();
  var hex = robot.getPixelColor(mouse.x, mouse.y);
  const { isRed, isGreen, red, green, blue } = getColor(hex);
  console.log(`isGreen: ${isGreen}`);
}, 100);

setTimeout(() => {
  clearInterval(initColor);
  setInterval(function () {
    // Get mouse position.
    var mouse = !lockX && !lockY && robot.getMousePos();

    // Get pixel color in hex format.
    var hex = robot.getPixelColor(lockX || mouse.x, lockY || mouse.y);
    const { isRed, isGreen, red, green, blue } = getColor(hex);
    if (isGreen && !isClicked) {
      if (!lockX || !lockY) {
        lockX = mouse.x;
        lockY = mouse.y;
        console.log({ lockX, lockY });
      }

      isClicked = true;
      mouseClickAndBack();
      setTimeout(() => {
        mouseClickAndBack();
        isClicked = false;
      }, 5000);
    }
    console.log(`isClicked: ${isClicked}, isGreen: ${isGreen}`);
  }, 200);
}, 5000);
