// Errors
export const ERR_INVALID_COMMAND = 'Invalid command';
export const ERR_INVALID_PLACE_COMMAND =
    'Error: Invalid command. syntax PLACE, X,Y,F ';
export const ERR_INVALID_FIRST_COMMAND = 'Error: first command should be PLACE';
export const ERR_INVALID_ROBOT_POSITION =
    'Error: invalid robot position. should be within [5,5] cordinates';
export const ERR_INVALID_ROBOT_DIRECTION = 'Error: invalid robot direction.';

// Warnings
export const WARNING_CANNOT_MOVE =
    'Warning: ignoring command, cannot move robot';

export const CMD_TYPE_COMMAND = 0;
export const CMD_TYPE_ERROR = 1;
export const CMD_TYPE_TEXT = 2;

// regular expression to match each user inputs
export const REGEX_USER_INPUT =
    '\\.*([A-Z]+)\\s*([0-9]*),*([0-9]*),*([A-Z]+)*\\.*';

export const Direction = Object.freeze({
    NORTH: { name: 'NORTH' },
    SOUTH: { name: 'SOUTH' },
    EAST: { name: 'EAST' },
    WEST: { name: 'WEST' },
});

export const CommandInstruction = Object.freeze({
    PLACE: { name: 'PLACE' },
    MOVE: { name: 'MOVE' },
    LEFT: { name: 'LEFT' },
    RIGHT: { name: 'RIGHT' },
    REPORT: { name: 'REPORT' },
});
