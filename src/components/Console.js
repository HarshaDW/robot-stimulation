import React, { Component } from 'react';
import * as constants from '../constants';

export default class Console extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commands: [],
        };
    }

    componentDidMount() {
        this.input.focus();
    }

    handleKeyUpCommand = e => {
        if (e.keyCode === 13) {
            e.preventDefault();

            const command = {
                text: e.target.value,
                type: constants.CMD_TYPE_COMMAND,
            };
            const result = this.props.onCommand(e.target.value);
            if (!result.success) {
                this.setState({
                    commands: [
                        ...this.state.commands,
                        command,
                        {
                            text: result.message,
                            type: constants.CMD_TYPE_ERROR,
                        },
                    ],
                });
            } else {
                if (result.message) {
                    this.setState({
                        commands: [
                            ...this.state.commands,
                            command,
                            {
                                text: result.message,
                                type: constants.CMD_TYPE_TEXT,
                            },
                        ],
                    });
                } else {
                    this.setState({
                        commands: [...this.state.commands, command],
                    });
                }
            }

            e.target.value = '';
        }
    };

    render() {
        return (
            <div className="console">
            <div className="output">
            {this.state.commands.map((cmd, index) => (
                    <div
                key={index}
                className={
                    cmd.type === constants.CMD_TYPE_ERROR ? 'cmd-error' : ''
                }
                >
                &gt; {cmd.text}
                </div>
    ))}
    </div>
        <div className="user-input">
            <div>&gt;&nbsp;</div>
        <input
        onKeyUp={this.handleKeyUpCommand}
        ref={input => (this.input = input)}
        />
        </div>
        </div>
    );
    }
}
