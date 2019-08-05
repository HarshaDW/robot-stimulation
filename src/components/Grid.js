import React, { Component } from 'react';
import robot from '../assets/robot.jpg';
import * as constants from '../constants';

export default class Grid extends Component {
    getClassName() {
        // Default direction is south

        if (this.props.robotPosition.direction) {
            if (
                this.props.robotPosition.direction.name ===
                constants.Direction.WEST.name
            ) {
                return 'rotate-west';
            } else if (
                this.props.robotPosition.direction.name ===
                constants.Direction.NORTH.name
            ) {
                return 'rotate-north';
            } else if (
                this.props.robotPosition.direction.name ===
                constants.Direction.EAST.name
            ) {
                return 'rotate-east';
            }
        }
    }

    render() {
        let arrayX = [];
        let arrayY = [];
        for (let x = 0; x < this.props.table.widthX; x++) {
            arrayX = [...arrayX, x];
        }

        for (let y = 0; y < this.props.table.heightY; y++) {
            arrayY = [...arrayY, y];
        }

        return (
            <div className="grid">
            {arrayY.map((y, indexY) => {
                    return (
                        <div key={indexY} className="row" id={indexY}>
                        {arrayX.map((x, indexX) => {
                                return (
                                    <div key={indexX + arrayY.length} className="column">
                                {indexX === this.props.robotPosition.x &&
                                indexY === this.props.robotPosition.y ? (
                                    <img
                                    src={robot}
                                alt="Logo"
                                className={this.getClassName()}
                                />
                            ) : (
                                    ''
                                )}
                            </div>
                            );
                            })}
                        </div>
                );
                })}
            </div>
    );
    }
}
