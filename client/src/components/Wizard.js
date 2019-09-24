import React, { Component } from 'react';
import { Stepper, Step, StepButton, Button } from '@material-ui/core';
import DegreeSelector from './DegreeSelector';
import DegreePlanner from './DegreePlanner';
import MajorSelector from './MajorSelector';
import '../css/Wizard.css';

// TO-DO:
// I introduced some bugs with selectedDegree and selectedMajor not asyncing
// the correct object. Currently, I hardcoded it with long ass object names so
// I need to fix that soon
var data = [
        { degree: "Bachelor of Computer Science", code: 3778, uoc: 144,
        majorList: [
            { major: "COMPD1", name: "Database Systems", courses: [
                { course: "COMP3311", name: "Database Systems" },
            ]},
            { major: "COMPJ1", name: "Artificial Intelligence", courses: [
                { course: "COMP3411", name: "Artificial Intelligence" },
            ]},
            { major: "COMPY1", name: "Security Engineering", courses: [
                { course: "COMP6441", name: "Security Engineering and Cyber Security" }
            ]},
        ],
        compulsoryCourses: [
            { course: "COMP1511", name: "Programming Fundamentals" },
            { course: "COMP1521", name: "Computer Systems Fundamentals" },
            { course: "COMP1531", name: "Software Engineering Fundamentals" },
            { course: "MATH1081", name: "Discrete Mathematics" },
            { course: "MATH1131", name: "Mathematics 1A" },
            { course: "MATH1141", name: "Higher Mathematics 1A" },
            { course: "MATH1231", name: "Mathematics 1B" },
            { course: "MATH1241", name: "Higher Mathematics 1B" },
        ],
        courseElectives: [
            { course: "COMP3211", name: "Computer Architecture" },
            { course: "COMP3231", name: "Operating Systems" },
            { course: "COMP3331", name: "Computer Networks and Applications" },
            { course: "COMP3421", name: "Computer Graphics" },
        ]},

        { degree: "Bachelor of Commerce", code: 3502, uoc: 144,
        majorList: [
            { major: "ACCTA1", name: "Accounting", courses: [
                { course: "ACCT1511", name: "Accounting and Financial Management 1B" },
                { course: "ACCT2522", name: "Management Accounting 1" },
                { course: "ACCT2542", name: "Corporate Financial Reporting and Analysis" },
                { course: "ACCT3563", name: "Issues in Financial Reporting and Analysis" }
            ]},
            { major: "FINSA1", name: "Finance", courses: [
                { course: "FINS1612", name: "Capital Markets and Institutions" },
                { course: "FINS1613", name: "Business Finance" },
                { course: "FINS2624", name: "Portfolio Management" },
                { course: "FINS3616", name: "International Business Finance" }
            ]},
            { major: "MARKA1", name: "Marketing", courses: [
                { course: "MARK1012", name: "Marketing Fundamentals" },
                { course: "MARK2051", name: "Consumer Behaviour" },
                { course: "MARK2052", name: "Marketing Research" },
                { course: "MARK3054", name: "Marketing Analytics and Big Data" },
                { course: "MARK3082", name: "Strategic Marketing" }
            ]}
        ],
        compulsoryCourses: [
            { course: "ACCT1501", name: "Accounting and Financial Management 1A" },
            { course: "ECON1101", name: "Microeconomics 1" },
            { course: "MGMT1001", name: "Managing Organisations and People" }
        ],
        courseElectives: [
            { course: "ACCT2507", name: "Introduction to Accounting Research" },
            { course: "FINS3623", name: "Venture Capital" },
            { course: "FINS3631", name: "Risk and Insurance" },
            { course: "MARK2060", name: "Event Management and Marketing" },
            { course: "MARK3085", name: "Digital Marketing and Web Analytics" }
        ]},
    ]

class Wizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: [],
            degreeIndex: 0,
            majorIndex: 0,
            selectedDegree: {}, // TO-DO
            selectedMajor: {}, // TO-DO
            data: data,
        };
    }

    componentDidMount() {
    }

    getStepLabels = () => {
      return ["Select Degree", "Select Major", "Select Electives", "Plannify your Degree"];
    }

    getStepContent = (step) => {
        const { data, degreeIndex, majorIndex, selectedDegree, selectedMajor } = this.state;
        switch (step) {
            case 0:
                return <DegreeSelector data={data} chooseDegree={this.chooseDegree}/>;
            // TO-DO
            case 1:
                return <div><h1>{data[degreeIndex].degree}</h1><MajorSelector data={data[degreeIndex]} chooseMajor={this.chooseMajor}/></div>;
            // TO-DO
            case 2:
                return <h1>{data[degreeIndex].majorList[majorIndex].major}</h1>;
            // TO-DO
            case 3:
                return <DegreePlanner degree={data[degreeIndex]} data={data[degreeIndex].majorList[majorIndex]} />;
            default:
                throw new Error("Unknown Step");
        }
    }

    chooseDegree = (degree) => {
        const { data, degreeIndex } = this.state;
        this.setState({degreeIndex: degree, selectedDegree: data[degreeIndex] });
        // console.log(this.state.selectedDegree);
    }

    chooseMajor = (major) => {
        const { degreeIndex, majorIndex } = this.state;
        this.setState({majorIndex: major });
        this.setState({selectedMajor: data[degreeIndex].majorList[majorIndex]});
    }

    planDegree = () => {

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
