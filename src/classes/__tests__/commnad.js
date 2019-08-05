import Command from '../Command';
import * as constants from '../../constants';

it('correctly parses valid commands', () => {
    const command1 = new Command();

    command1.parse('PLACE 1,1,EAST');
    expect(command1.instruction.name).toEqual('PLACE');
    expect(command1.cordinateX).toEqual(1);
    expect(command1.cordinateY).toEqual(1);
    expect(command1.direction.name).toEqual('EAST');

    const command2 = new Command();

    command2.parse('MOVE');
    expect(command2.instruction.name).toEqual('MOVE');
    expect(command2.cordinateX).toBeNull();
    expect(command2.cordinateY).toBeNull();
    expect(command2.direction).toBeNull();

    const command3 = new Command();
    command3.parse('LEFT');
    expect(command3.instruction.name).toEqual('LEFT');

    const command4 = new Command();
    command4.parse('RIGHT');
    expect(command4.instruction.name).toEqual('RIGHT');

    const command5 = new Command();
    command5.parse('RIGHT');
    expect(command5.instruction.name).toEqual('RIGHT');
});

it('should throw an error for an invalid command', () => {
    const command = new Command();

    expect(() => {
        command.parse('aa');
    }).toThrow();
});

it('should throw an error if the argument are invalid', () => {
    const command = new Command();
    expect(() => {
        command.parse('PLACE 1,0');
    }).toThrowError(new Error(constants.ERR_INVALID_PLACE_COMMAND));
});
