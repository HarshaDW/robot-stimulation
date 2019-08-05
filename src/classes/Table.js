export default class Table {
    constructor(width, height) {
        this.widthX = width;
        this.heightY = height;
        this.robot = null;
    }

    setRobot(robot) {
        this.robot = robot;
        this.robot.setTable(this);
    }

    // This function check the given position is not a falling destruction.
    isValidPosition(cordinateX, cordinateY) {
        if (
            cordinateX >= 0 &&
            cordinateX < this.widthX &&
            (cordinateY < this.heightY && cordinateY >= 0)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
