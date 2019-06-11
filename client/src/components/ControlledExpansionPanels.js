import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Child from './Child';
import EditFactoryModal from './EditFactoryModal';
import ChildModal from './ChildModal';
import {Button,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './Button.css';
import '../App.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(60),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(30),
    color: theme.palette.text.secondary,
    marginTop:'1.5rem'
  },
  body:{
    fontSize: theme.typography.pxToRem(30),
  }
}));

/**
 * Applying styles and change of panel.
 */
function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel'} onChange={handleChange('panel')}>
        <ExpansionPanelSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component={'span'} className={classes.heading}>{props.factory.name}</Typography>
          <Typography component={'span'} className={classes.secondaryHeading}>{props.factory.lower}:{props.factory.upper}</Typography>
          <Col><EditFactoryModal factory = {props.factory} editFactory = {props.editFactory}/></Col>
          <Col><ChildModal createChild = {props.createChild} facid = {props.factory.id}/></Col>
          <Col><Button  onClick = {props.removeFactory} id = {props.factory.id}>Delete</Button></Col>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className= {classes.body} component={'span'}>
          <Child children = {props.factory.Children} ref = {props.child} />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
  );
}

export default ControlledExpansionPanels;