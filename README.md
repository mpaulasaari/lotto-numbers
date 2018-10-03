# Lotto Numbers

This project was part of my university studies and the final project for the courses
`Big Data` and `Cloud Computing`. The idea and motivation behind it was to gather
real-life lottery results from the past 40+ years (*big data*), store the data
in a [Firebase](https://firebase.google.com/) database (*thus utilizing a cloud
service*) and create a web application to display the data in a beautiful format.
The UI has been created with [React](https://reactjs.org/) using the excellent
[create-react-app](https://github.com/facebook/create-react-app) and utilizes heavily
[Recharts](http://recharts.org/en-US/) charting library.

## Getting started

Get you a copy of the project up and running on your local machine for
development and testing purposes or check out the
[live demo](https://lotto-numbers-big-data.firebaseapp.com/).

### Prerequisites

- Running the code depends on Node.js and Yarn. If you don't have them installed,
you can see how to install them here: [Node](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/en/docs/install).

### Installation

- Clone the code repository

```bash
$ git clone git@github.com:mpaulasaari/lotto-numbers.git
```
- Open terminal and navigate to the root of the project

- Install dependencies

```bash
$ yarn install
```

- Run the code and it will automatically open your browser at
`http://localhost:3000/`

```bash
$ yarn start
```

## Running the tests
The application uses [TestCafe](http://devexpress.github.io/testcafe/)
to run E2E tests in headless Chrome.

- Run the tests
```bash
$ yarn run test
```

## Authors

- **Mika Paulasaari** - [mpaulasaari](https://github.com/mpaulasaari/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md)
file for details

## Disclaimer

*The project is missing some essential parts, such as tests, since all that would've
taken extra effort without bringing any extra benefits for the purpose of the project.
For the same reason the Firebase database is open to reading for all, only writing
is protected.*
