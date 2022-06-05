// Node user input prompt, sigint:true for exit
const prompt = require("prompt-sync")({ sigint: true });

// Characters of the game
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldArr) {
    this.fieldArr = fieldArr;
    this.xLocation = 0;
    this.yLocation = 0;
  }

  print() {
    return this.fieldArr.map((row) => row.join("")).join("\n");
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
    if (this.isOutsideRange()) {
      console.log("Field finished..You dropped out and game over!");
      return false;
    } else if (this.fieldArr[this.yLocation][this.xLocation] === hat) {
      console.log("Congratulations..You find the hat!");
      return false;
    } else if (this.fieldArr[this.yLocation][this.xLocation] === hole) {
      console.log("Oh..no! You dropped into a hole");
      return false;
    } else {
      return true;
    }
  }

  isOutsideRange() {
    if (this.xLocation < 0 || this.yLocation < 0) {
      return true;
    } else if (this.xLocation > this.fieldArr[0].length - 1) {
      return true;
    } else if (this.yLocation > this.fieldArr.length - 1) {
      return true;
    } else {
      return false;
    }
  }

  static generateField(height, width, percentage) {
    const hatPosition = {
      y: Math.floor(Math.random() * height),
      x: Math.floor(Math.random() * width),
    };

    // Generate a dummy array correlating with height and width
    let generatedField = new Array(height);
    for (let i = 0; i < height; i++) {
      generatedField[i] = new Array(width);
    }

    // Helper function for generating holes due to percentage value
    const createHoles = (difficulty) => {
      const number = Math.floor(Math.random() * 100);
      const holeOrNot = number > difficulty ? fieldCharacter : hole;
      return holeOrNot;
    };

    // Fill all the field with field character or holes
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        generatedField[j][i] = createHoles(percentage);
      }
    }

    // Starting position
    generatedField[0][0] = pathCharacter;

    // Add +1 to make sure hat doesn't appear on starting position
    generatedField[hatPosition.y + 1][hatPosition.x + 1] = hat;
    //  console.log(generatedField);
    return generatedField;
  }
}

// const myField = new Field([
//   ["*", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
// ]);

let isGameRunning = true;

// while (isGameRunning) {
//   let res = myField.askUser();

//   // Validating if they entered a valid input
//   const re = /u|d|l|r|q/;
//   if (re.test(res)) {
//     let tryMoving = myField.moving(res);
//     if (!tryMoving || res === "q") {
//       isGameRunning = false;
//     }
//     myField.print();
//   } else {
//     console.log("not a valid enter!");
//   }
// }

const myBetterField = new Field(Field.generateField(10, 14, 35));
console.log(myBetterField.print());
