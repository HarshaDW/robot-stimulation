import Command from '../Command';
import Robot from '../Robot';
import Table from '../Table';
import * as constants from '../../constants';

it('should throw an error if the first command is not PLACE', () => {
    const command = new Command();
    command.parse('RIGHT');

    const table = new Table(5, 5);
    const robot = new Robot(table);

    expect(() => {
        robot.nextCommand(command);
    }).toThrowError(new Error(constants.ERR_INVALID_FIRST_COMMAND));
});

it('should follow commands correctly', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);

    const command = new Command();
    command.parse('PLACE 1,2,EAST');
    robot.nextCommand(command);

    const command1 = new Command();
    command1.parse('MOVE');
    robot.nextCommand(command1);

    const command2 = new Command();
    command2.parse('LEFT');
    robot.nextCommand(command2);

    const command3 = new Command();
    command3.parse('MOVE');
    robot.nextCommand(command3);

    const command4 = new Command();
    command4.parse('REPORT');
    robot.nextCommand(command4);

    expect(robot.cordinateX).toEqual(2);
    expect(robot.cordinateY).toEqual(3);
    expect(robot.direction.name).toEqual('NORTH');
});

it('should not allow robot to fall from the table', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);

    const command = new Command();
    command.parse('PLACE 0,0,WEST');
    robot.nextCommand(command);

    const command1 = new Command();
    command1.parse('MOVE');

    expect(() => {
        robot.nextCommand(command1);
    }).toThrowError(new Error(constants.WARNING_CANNOT_MOVE));
});

it('should throw an error when an invalid PLACE cordinates are found', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);

    const command = new Command();
    command.parse('PLACE 1,7,WEST');

    expect(() => {
        robot.nextCommand(command);
    }).toThrowError(new Error(constants.ERR_INVALID_ROBOT_POSITION));
});
