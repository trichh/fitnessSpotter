# Fitness Spotter
Fitness Spotter is a web application aimed towards helping personal trainers manage their clients and increase clientele. Personal trainers can create an account and then add clients. They can assign clients their own personal workout plans, meal plans, give their clients assessments, and also graphs client progression.

# Installation
**To download this project follow the steps below:**

Change directories to the location you want the project to be installed at.
```
$ cd Desktop
```
Once you changed directories, clone the repository by pasting the following command in terminal.
```
$ git@github.com:trichh/fitnessSpotter.git
```
Now that you have the project installed, install the dependencies. Paste the following commands in terminal.
```
$ cd fitnessSpotter
$ npm install
```
Globally install bower
```
$ npm install bower -g
```
Lastly install the libraries by pasting the following command in terminal.
```
$ bower install
```

# Starting Server
**You need to have mongod and mongo running before you start the server**

Open another tab in terminal and paste the following command.
```
$ mongod
```
Open a third tab in terminal and paste the following command.
```
$ mongo
```
Now that you have mongod and mongo running, start the server by pasting the following command.
```
$ gulp
```

# Deployments
Fitness Spotter Alpha Version:

[https://fitness-spotter-alpha.herokuapp.com/](https://fitness-spotter-alpha.herokuapp.com/)

Fitness Spotter Beta Version:

[https://fitness-spotter-beta.herokuapp.com/](https://fitness-spotter-beta.herokuapp.com/)

Fitness Spotter Final Version:

[https://fitness-spotter.herokuapp.com/](https://fitness-spotter.herokuapp.com/)
