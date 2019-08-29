import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import DegreeSelector from './DegreeSelector';
import DegreePlanner from './DegreePlanner';
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
      return ["Select Degree", "Plannify your Degree"];
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DegreeSelector/>;
            case 1:
                return <DegreePlanner/>;
            default:
                throw new Error("Unknown Step");
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
                    <Button disabled={this.state.activeStep === 0} variant="contained" color="primary" onClick={this.handleBack} className="wizard_back_btn">
                      Back
                    </Button>
                    <Button disabled={this.state.activeStep === steps.length - 1} variant="contained" color="primary" onClick={this.handleNext} className="wizard_next_btn">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Wizard;
