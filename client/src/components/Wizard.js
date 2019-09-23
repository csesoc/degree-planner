import React, { Component } from 'react';
import { Stepper, Step, StepButton, Button } from '@material-ui/core';
import DegreeSelector from './DegreeSelector';
import DegreePlanner from './DegreePlanner';
import MajorSelector from './MajorSelector';
import '../css/Wizard.css';

class Wizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: [],
            selectedDegree: "",
            selectedMajor: ""
        };
    }

    componentDidMount() {
    }

    getStepLabels = () => {
      return ["Select Degree", "Select Major", "Select Electives", "Plannify your Degree"];
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DegreeSelector chooseDegree={this.chooseDegree}/>;
            case 1:
                return <div><h1>{this.state.selectedDegree}</h1><MajorSelector chooseMajor={this.chooseMajor}/></div>;
            case 2:
                return <h1>{this.state.selectedMajor}</h1>;
            case 3:
                return <DegreePlanner/>;
            default:
                throw new Error("Unknown Step");
        }
    }

    chooseDegree = (degree) => {
        this.setState({selectedDegree: degree});
    }

    chooseMajor = (major) => {
        this.setState({selectedMajor: major});
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
      if (this.state.activeStep > 0) {
          console.log(this.state.selectedDegree);
      }
      if (this.state.completed.includes(this.state.activeStep) === false) {
        this.setCompleted(this.state.completed.concat(this.state.activeStep));
      }
      console.log(this.state.completed);
    }

    handleBack = () => {
      this.setActiveStep(this.state.activeStep - 1);
      this.setCompleted(this.state.completed.filter(step => step < this.state.activeStep - 1));
    }

    render() {
        const steps = this.getStepLabels();
        return (
            <div>
                <div className="container">
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
                </div>
              <div>
                <div>
                  <div>
                    <Button disabled={this.state.activeStep === 0} variant="contained" color="primary" onClick={this.handleBack} className="wizard_back_btn">
                      Back
                    </Button>
                    <Button disabled={this.state.activeStep === steps.length - 1} variant="contained" color="primary" onClick={this.handleNext} className="wizard_next_btn">
                      Next
                    </Button>
                  </div>
                  <div style={{padding: '5px'}}>
                    {this.getStepContent(this.state.activeStep)}
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Wizard;
