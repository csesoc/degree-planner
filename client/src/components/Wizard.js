import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import DegreeSelector from './DegreeSelector';
import MajorMinorSelector from './MajorMinorSelector';
import DegreePlanner from './DegreePlanner';
import Error from './Error';
//import '../css/Wizard.css';

class Wizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: [],
        };
    }

    componentDidMount() {
    }

    getStepLabels = () => {
      return ["Select Degree", "Select Major(s) & Minor(s)", "Plannify your Degree"];
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DegreeSelector/>;
            case 1:
                return <MajorMinorSelector/>;
            case 2:
                return <DegreePlanner/>;
            default:
                return <Error/>;
        }
    }

    setActiveStep = (step) => {
      this.setState({activeStep: step});
    }

    setCompleted = (completedSteps) => {
      this.setState({completed: completedSteps});
    }

    isStepCompleted = (step) => {
      return this.state.completed.includes(step);
    }

    handleNext = () => {
      this.setActiveStep(this.state.activeStep + 1);
      this.setCompleted(this.state.completed.concat(this.state.activeStep));
    }

    handleBack = () => {
      this.setActiveStep(this.state.activeStep - 1);
    }

    render() {
        const steps = this.getStepLabels();
        return (
            <div>
              <Stepper activeStep={this.state.activeStep}>
                {steps.map((label,index) => {
                  const stepProps = {};
                  const buttonProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton onClick={this.handleNext} completed={this.isStepCompleted(index)} {...buttonProps}>
                        {label}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                <div>
                  {this.getStepContent(this.state.activeStep)}
                  <div>
                    <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} className="btn0">
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext} className="btn2">
                      {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Wizard;
