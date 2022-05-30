const prompt = require("prompt-sync")({ sigint: true });
// const name = prompt('What is your name?');
// console.log(`Hey there ${name}`);

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldArr) {
    this.fieldArr = fieldArr;
    this.xLocation = 0;
    this.yLocation = 0;
    //  this.currLocation = this.fieldArr[this.yLocation][this.xLocation];
  }
  print() {
    this.fieldArr.map((arr) => {
      console.log(arr.join(""));
    });
  }
  askUser() {
    // Asking user which direction they want to go
    const move = prompt("Which direction: ");
    return move;
  }
  moving(move) {
    console.log(`Moving to ${move} direction!`);
    switch (move) {
      case "r":
        this.xLocation += 1;
        break;
      case "d":
        this.yLocation += 1;
        break;
      case "l":
        this.xLocation -= 1;
        break;
      case "u":
        this.yLocation -= 1;
        break;
      default:
        console.log("not a valid enter!");
        break;
    }
    this.fieldArr[this.yLocation][this.xLocation] = pathCharacter;
    myField.print();
  }
  checkGame() {
    if ((this.fieldArr[this.yLocation][this.xLocation] = hat)) {
      console.log("Congratulations..You find the hat!");
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.print();

let isGameRunning = true;

while (isGameRunning) {
  let res = myField.askUser();

  // Validating if they entered a valid input
  const re = /u|d|l|r|q/;
  if (re.test(res)) {
    myField.moving(res);
    res === "q" ? (isGameRunning = false) : console.log("game continuous!");
  }
}
