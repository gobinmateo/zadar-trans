import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";

export default class LoginPage extends Component {
    render() {
        return (
            <div className="login-container justify-content-center">
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        )
    }
};

