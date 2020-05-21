import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
    },
  },
}));


function MaterialUI() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button onClick= {alert("sfsa")} variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper >xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper >xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MaterialUI