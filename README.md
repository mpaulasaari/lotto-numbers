# Lotto Numbers

This project was part of my university studies and a final project for the courses
`Big Data` and `Cloud Computing`. The idea and motivation behind it was to gather
real-life lottery results from the past 40+ years (*semi-big data*), store the data
in a [Firebase](https://firebase.google.com/) database (*thus utilizing a cloud
service*) and create a web application to display the data in a beautiful format.
The UI is created with [React](https://reactjs.org/) and utilizes heavily
[Recharts](http://recharts.org/en-US/) charting library.

## Live Demo

https://lotto-numbers-big-data.firebaseapp.com/

## Local setup

1. Clone the repo
2. Install [Node](https://nodejs.org/)
3. Install [Yarn](https://yarnpkg.com/en/docs/install)
4. Open terminal and go to the root folder
5. Install dependencies `yarn install`
6. Start the server `yarn start`
7. Open browser and go to `http://localhost:3000`

### Disclaimer

*The project is missing some essential parts, such as tests, since all that would've
taken extra effort without bringing any extra benefits for the purpose of the project.
For the same reason the Firebase database is open to reading for all, only writing
is protected.*
