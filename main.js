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

    // Check before moving permanently
    let canMove = this.checkGame();
    if (canMove) {
      this.fieldArr[this.yLocation][this.xLocation] = pathCharacter;
      return true;
    } else {
      return false;
    }
  }
  checkGame() {
    if (this.fieldArr[this.yLocation][this.xLocation] === hat) {
      console.log("Congratulations..You find the hat!");
      return false;
    } else {
      return true;
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
    let tryMoving = myField.moving(res);
    if (!tryMoving || res === "q") {
      isGameRunning = false;
    }
    myField.print();
  }
}
