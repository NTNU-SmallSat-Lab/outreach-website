# Hypso Space Outreach Website
The Hypso Space Outreach Website is an interactive web page developed for the general public. It includes features such as a mission tracker, mission status, maps, and an easy to use blog. 

![alt text](docs/images/routes/frontpage.png)

## General Information

* Country: 🇳🇴 Norway  
* Customer: NTNU SmallSat Lab  
* Platform: Web  
* Framework: React  
* Period: Spring 2024  
* Status: Done

## Project Structure

* [`/docs/`](/docs/): Contains technical documentation.
* [`/backend/`](/backend/): Backend code and local setup instructions.
* [`/frontend/`](/frontend/): Frontend code and local setup instructions.
* [`/.vscode/`](/.vscode/): IDE settings (if applicable).
* [`/.github/`](/.github/): GitHub repository settings (e.g., issue templates, workflows).

## Getting Started

Goto [`/docs/README.md`](/docs/README.md) to read more about the project.

1. Clone this repository.
2. Navigate to the `backend/` directory and follow the instructions [here](./backend/README.md).
3. Navigate to the `frontend/` directory and follow the instructions [here](./frontend/README.md).

## Contributing

To ensure a consistent coding style, we have used Prettier to enforce code formatting.
Please install the Prettier extension for VSCode. Prettier can be configured to run on save, or it can be ran manually with the command

```
npx prettier --write
```

This will automatically format the code according to the rules set up for this project. The specific formatting rules have been defined here:

```
./frontend/.prettierrc
```

Prettier has been integrated into the CI/CD pipeline to automatically check code formatting during pull requests.

We have also used ESLint to maintain code quality. It can be run manually with the command

```
npm run lint
```

ESLint has also been integratd into the CI/CD pipeline to automatically check code quality during pull requests. The specific linting rules have been defined here:

```
./frontend/.eslintrc.json
```

## More Info

If looking for more information about the project please refer to the submitted report which Small Satellite Lab should have access to as well as the documentation in the `/docs/` folder.
