import React, { Component } from 'react';
import Grid from '../components/Grid';
import Console from '../components/Console';
import Command from '../classes/Command';
import Robot from '../classes/Robot';
import Table from '../classes/Table';

export class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            robotPosition: {},
        };

        this.table = new Table(5, 5);
        this.robot = new Robot(this.table);
    }

    onHandleCommand = e => {
        try {
            const command = new Command();
            command.parse(e);

            const output = this.robot.nextCommand(command);

            this.setState({
                robotPosition: this.robot.getPosition(),
            });

            if (output) {
                return { success: true, message: output };
            } else {
                return { success: true };
            }
        } catch (e) {
            return { success: false, message: e.message };
        }
    };

    render() {
        return (
            <div className="main-container">
            <div className="instruction-container">
            Start executing commands on the console. First command must be a PLACE
        X,Y,F command
        <div>Example: PLACE 2,3,NORTH | MOVE | LEFT | RIGHT | REPORT </div>
        </div>
        <div className="game-container">
            <Grid robotPosition={this.state.robotPosition} table={this.table} />
        <Console onCommand={this.onHandleCommand} />
        </div>
        </div>
    );
    }
}
