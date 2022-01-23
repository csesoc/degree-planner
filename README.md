# 2022 Update 

This project has been archived in favour of [Notangles](https://github.com/csesoc/notangles) and [Circles](https://github.com/csesoc/circles)

# CSESoc Projects - Degree Planner (Plannify & Pathways)

## Table of contents
* [Introduction](#introduction)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
* [Deployment](#deployment)
    * [Running the Web App locally](#run-web-app)
    * [Running the client locally](#run-client)
    * [Running the server locally](#run-server)
    * [Configuring Postgres](#configure-postgres)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## Introduction

CSESoc Projects' Degree Planner (Plannify & Pathways)

This project contains a Web Application that allows UNSW students to plan, optimise and prepare their degree progression. Plannify allows students to
organise when they complete courses that are requirements for their degree, while Pathways allows students to visually determine the prerequisites and postrequisites
of a specified course via a generated flow chart.

## Getting Started

### Prerequisites

The project has been verified to work on the following dependencies

* npm v5.8.0
* yarn v1.17.3

This project is designed to be run on a UNIX based machine (Mac or Linux).

## Deployment

### Running the Web App locally

The below will clone the repo, install the dependencies and run both the front end and back end concurrently.
```
git clone https://github.com/csesoc/degree-planner.git
cd degree-planner
yarn install
yarn start
```

You can then visit ```http://localhost:3000/``` for the front end and ```http://localhost:3001/``` for the back end

### Running the client locally

```
git clone https://github.com/csesoc/degree-planner.git
cd degree-planner/client
yarn install
yarn start
```

You can then visit ```http://localhost:3000/``` for the front end

### Running the server locally

```
git clone https://github.com/csesoc/degree-planner.git
cd degree-planner/server
yarn install
yarn start
```

You can then visit ```http://localhost:3001/``` for the back end

### Configuring Postgres

* Request the `.env` file from the current CSESoc Projects Team Lead or CSESoc Projects Director(s)
* Place the `.env` file at ```~/degree-planner/server/.env```

## Contributing

Please contact the CSESoc Projects Portfolio Director(s) to find out how to contribute to the project.

## Authors

* **Jonathan Charles** - *Team Lead* - [jcharles8246](https://github.com/jcharles8246)
* **Kevin Zhang** - *Backend Developer* - [ChaoQlate](https://github.com/ChaoQlate)
* **Jacq** - *Frontend Developer* - [jacq-jacq](https://github.com/jacq-jacq)
* **Lilian Wang** - *Frontend Developer* - [xLilianW](https://github.com/xLilianW)
* **Melanie So** - *Fullstack Developer* - [melanieso](https://github.com/melanieso)
* **Jeremy Lim** - *Fullstack Developer* - [HitoKage13](https://github.com/HitoKage13)
* **Clarence Feng** - *Backend Developer* - [c-sfeng](https://github.com/c-sfeng)
* **Bofei Wang** - *Frontend Developer* - [bofeiw](https://github.com/bofeiw)
* **Ash Abay** - *Backend Developer* - [AshAbay](https://github.com/AshAbay)

## Acknowledgements

The following frameworks, libraries and softwares were and are crucial in making the degree planner
* [React](https://reactjs.org/)
* [create-react-app](https://facebook.github.io/create-react-app/)
* [Express.js](https://expressjs.com)
* [Node.js](https://nodejs.org/en/)

Thanks to the following projects for providing inspiration and assistance in creation of this project.

* [Bojangles](http://tdransfield.net/utilities/bojangles)
* [Crossangles](https://my.campusbiblestudy.org)
* [Pathways](https://github.com/csesoc/pathways)
* [UPlanner](https://uplanner.bopa.ng)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

