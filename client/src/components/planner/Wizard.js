import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import DegreeSelector from './DegreeSelector';
import DegreePlanner from './DegreePlanner';
import NavBar from '../common/NavBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wizard: {
      margin: '5%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    stepper: {
        
    }

});

function getSteps()  {
  return ["Select Degree", "Plannify your Degree"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DegreeSelector/>;
    case 1:
      return <DegreePlanner/>;
    default:
      throw new Error("Unknown Step");
  }
}

export default function Wizard() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const steps = getSteps();

    function isStepCompleted(step) {
      return completed.has(step);
    }

    function handleNext() {
      let newCompleted = new Set(completed.values());
      newCompleted.delete(activeStep);
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setCompleted(newCompleted);
    }

    function handleBack() {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return (
        <div className={classes.wizard}>
          <NavBar />
          {getStepContent(activeStep)}
          <Stepper activeStep={activeStep}>
            {steps.map((label,index) => {
              const stepProps = {};
              const buttonProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepButton onClick={handleNext} completed={isStepCompleted(index)} {...buttonProps}>
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div>
            <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleBack} className="wizard_back_btn">
              Back
            </Button>
            <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" onClick={handleNext} className="wizard_next_btn">
              Next
            </Button>
          </div>
        </div>
    );
}
