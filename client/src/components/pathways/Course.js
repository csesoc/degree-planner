import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ArcherElement } from 'react-archer';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: "auto"
  },
  name: {
    marginBottom: '12px',
  },
});

/**
 * Course Component that renders course information as a Material UI Card
 */
export default function Course(props) {

    const classes = useStyles();

    const handleOnSelect = () => {
      props.onClick({"value": props.data});
    };

    if (props.relations !== undefined) {
      return(
        <Card className={classes.card}>
          <ArcherElement key={props.data.code} id={props.data.code} relations={props.relations}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {props.data.code}
              </Typography>
              <Typography className={classes.name} color="textSecondary">
                {props.data.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" size="small" href={props.data.outline} target="_blank">
                Course Outline
              </Button>
              <Button variant="contained" color="primary" size="small" className={classes.button} onClick={handleOnSelect}>
                Select
              </Button>
            </CardActions>
          </ArcherElement>
        </Card>
      );
    } else {
      return(
        <Card className={classes.card}>
          <ArcherElement key={props.data.code} id={props.data.code}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {props.data.code}
              </Typography>
              <Typography className={classes.name} color="textSecondary">
                {props.data.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" size="small" href={props.data.outline} target="_blank">
                Course Outline
              </Button>
              <Button variant="contained" color="primary" size="small" className={classes.button} onClick={handleOnSelect}>
                Select
              </Button>
            </CardActions>
          </ArcherElement>
        </Card>
      );

    }

}
