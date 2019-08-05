import * as constants from '../constants';

export default class Robot {
    constructor(table) {
        this.commandList = [];
        this.command = null;
        this.cordinateX = null;
        this.cordinateY = null;
        this.direction = constants.Direction.SOUTH; // Default direction
        this.table = table;
    }

    nextCommand(command) {
        if (this.commandList.length >= 1) {
            this.commandList = [...this.commandList, command];
        } else {
            if (command.instruction === constants.CommandInstruction.PLACE) {
                this.commandList = [...this.commandList, command];
            } else {
                throw new Error(constants.ERR_INVALID_FIRST_COMMAND);
            }
        }

        this.command = command;

        switch (this.command.instruction.name) {
            case constants.CommandInstruction.PLACE.name: {
                this.place();
                break;
            }
            case constants.CommandInstruction.MOVE.name: {
                this.move();
                break;
            }
            case constants.CommandInstruction.LEFT.name: {
                this.left();
                break;
            }
            case constants.CommandInstruction.RIGHT.name: {
                this.right();
                break;
            }
            case constants.CommandInstruction.REPORT.name: {
                return `X: ${this.cordinateX}, Y: ${this.cordinateY}, Direction: ${
                    this.direction.name
                    }`;
            }
            default: {
                break;
            }
        }
    }

    place() {
        // the given position is a valid one then update the robot properties
        if (
            this.table.isValidPosition(
                this.command.cordinateX,
                this.command.cordinateY
            )
        ) {
            this.cordinateX = this.command.cordinateX;
            this.cordinateY = this.command.cordinateY;
            this.direction = this.command.direction;
        } else {
            throw new Error(constants.ERR_INVALID_ROBOT_POSITION);
        }
    }

    // This function move robot to one unit by checking its facing
    move() {
        let x = this.cordinateX;
        let y = this.cordinateY;

        switch (this.direction.name) {
            case constants.Direction.NORTH.name: {
                y++;
                break;
            }
            case constants.Direction.SOUTH.name: {
                y--;
                break;
            }
            case constants.Direction.EAST.name: {
                x++;
                break;
            }
            case constants.Direction.WEST.name: {
                x--;
                break;
            }
            default: {
                break;
            }
        }

        if (this.table.isValidPosition(x, y)) {
            this.cordinateX = x;
            this.cordinateY = y;
        } else {
            throw new Error(constants.WARNING_CANNOT_MOVE);
        }
    }

    // This will change the robot direction/facing to left
    left() {
        switch (this.direction.name) {
            case constants.Direction.NORTH.name: {
                this.direction = constants.Direction.WEST;
                break;
            }
            case constants.Direction.SOUTH.name: {
                this.direction = constants.Direction.EAST;
                break;
            }
            case constants.Direction.EAST.name: {
                this.direction = constants.Direction.NORTH;
                break;
            }
            case constants.Direction.WEST.name: {
                this.direction = constants.Direction.SOUTH;
                break;
            }
            default: {
                break;
            }
        }
    }

    // This will change the robot direction/facing to right
    right() {
        switch (this.direction.name) {
            case constants.Direction.NORTH.name: {
                this.direction = constants.Direction.EAST;
                break;
            }
            case constants.Direction.SOUTH.name: {
                this.direction = constants.Direction.WEST;
                break;
            }
            case constants.Direction.EAST.name: {
                this.direction = constants.Direction.SOUTH;
                break;
            }
            case constants.Direction.WEST.name: {
                this.direction = constants.Direction.NORTH;
                break;
            }
            default: {
                break;
            }
        }
    }

    // return cordinate X,cordinate Y and direction of the robot
    getPosition() {
        return {
            x: this.cordinateX,
            y: this.cordinateY,
            direction: this.direction,
        };
    }
}
