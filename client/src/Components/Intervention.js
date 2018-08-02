import React, { Component } from 'react';
import {Formik} from 'formik';

import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

class Intervention extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      phoneNumber: '',
      insurancePolicyNumber: '',
    }
  }

  render() {
    return (
      <div className="container">
        <Typography> Informacije o korisniku </Typography>
        <Formik>
          initialValues={{
            name: '',
            surname: '',
            phoneNumber: '',
            insurancePolicyNumber: '',
          }},
          onSubmit={(
            values,
          ) => {

          );
        }}
        <FormGroup>
          <TextField
            id="name"
            label="Ime stranke"
            placeholder="Ime stranke"
            margin="normal"
          />
          <TextField
            id="surname"
            label="Prezime stranke"
            placeholder="Prezime stranke"
            margin="normal"
          />
          <TextField
            id="phoneNumber"
            label="Broj mobitela"
            placeholder="Broj mobitela"
            margin="normal"
          />
          <TextField
            id="insurancePolicyNumber"
            label="Broj police osiguranja"
            placeholder="Broj police osiguranja"
            margin="normal"
          />
        </FormGroup>
      </div>
    )
  }
}

export default Intervention;
