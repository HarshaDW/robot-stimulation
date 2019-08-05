import * as constants from '../constants';
export default class Command {
    constructor() {
        this.instruction = null; // PLACE/MOVE/LEFT/RIGHT/REPORT
        this.cordinateX = null;
        this.cordinateY = null;
        this.direction = null;
    }

    parse(commandInput) {
        let regExp = new RegExp(constants.REGEX_USER_INPUT, 'g');
        let match = regExp.exec(commandInput);
        if (match && match.length >= 1) {
            if (match[1] === constants.CommandInstruction.PLACE.name) {
                if (match[2] && match[3] && match[4]) {
                    this.instruction = constants.CommandInstruction.PLACE;
                    this.cordinateX = parseInt(match[2]);
                    this.cordinateY = parseInt(match[3]);
                    let facing = match[4];

                    if (facing === constants.Direction.NORTH.name) {
                        this.direction = constants.Direction.NORTH;
                    } else if (facing === constants.Direction.SOUTH.name) {
                        this.direction = constants.Direction.SOUTH;
                    } else if (facing === constants.Direction.EAST.name) {
                        this.direction = constants.Direction.EAST;
                    } else if (facing === constants.Direction.WEST.name) {
                        this.direction = constants.Direction.WEST;
                    } else {
                        throw new Error(constants.ERR_INVALID_ROBOT_DIRECTION);
                    }
                } else {
                    throw new Error(constants.ERR_INVALID_PLACE_COMMAND);
                }
            } else if (match[1] === constants.CommandInstruction.MOVE.name) {
                this.instruction = constants.CommandInstruction.MOVE;
            } else if (match[1] === constants.CommandInstruction.LEFT.name) {
                this.instruction = constants.CommandInstruction.LEFT;
            } else if (match[1] === constants.CommandInstruction.RIGHT.name) {
                this.instruction = constants.CommandInstruction.RIGHT;
            } else if (match[1] === constants.CommandInstruction.REPORT.name) {
                this.instruction = constants.CommandInstruction.REPORT;
            } else {
                throw new Error(constants.ERR_INVALID_COMMAND);
            }
        } else {
            throw new Error(constants.ERR_INVALID_COMMAND);
        }
    }
}
