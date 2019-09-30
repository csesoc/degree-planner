# PLANNIFY PROJECT REACT/JSX BEST PRACTICES + STYLE GUIDE

Here are some simple React/JSX style guidelines for the Plannify project, I
don't think we need to get too crazy :)
These are based upon the Airbnb ones if you want further reference:
https://github.com/airbnb/javascript/tree/master/react 

# Naming 

`Use PascalCase for React components and camelCase for their instances`

    import ReservationCard from './ReservationCard';
    const reservationItem = <ReservationCard />;

`Use camelCase for prop names`

    <Button
        onClick={this.handleClick}
        someOtherProperty={anything}
    />


# Tags

`Tags without children should be self-closed`

i.e.: 

    <Card onClick={this.expand}"> </Card>

should be:

    <Card onClick={this.expand} />      // Note the single space in the self-closing tag before the '/'

# Alignment

`If props fit on one line, we can keep it all in the same line`

    <Button color="primary" /> 

`Otherwise, give them their own lines  `

    <Button
        color="primary"
        onClick={this.handleClick}
        disabled                        // omit the value of the prop when it is explicitly `true`
    />                                  // this is essentially the same as disabled={true}

`If the component has children, indent them`

    <Container
        style={style}
    >
        <Button                         // This is the child
            color="primary"
        />
    </Container>

# Quotes

`Always use double quotes (") for JSX attributes, but single quotes (') for all other JS`

    <Button color="primary" />
    <Button style={{ width: '50px' }} />

# Parentheses

`Wrap JSX tags in parentheses when they span more than one line`

    render() {
        return (
            <MyComponent variant="long body" foo="bar">
                <MyChild />
            </MyComponent>
        );
    }

`Single lines don't need to be wrapped`

    render() {
        return <MyComponent variant="long body" />
    }

# Other

`Let's stick to a max of 120 characters per line :)`

i.e.: 

    <Button disabled={activeStep === steps.length - 1} variant="contained" color="primary" onClick={handleNext} className={classes.stepperButton}>
        Next
    </Button>

could be: 

    <Button
        disabled={activeStep === steps.length - 1}
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.stepperButton}
    >
        Next
    </Button>
