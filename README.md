# Hypso Space Outreach



## Project Objectives

* Develop an interactive web page for the general public.
* Include features such as mission tracker, mission status, maps, and automatic posting.
* Prioritize operational cost-effectiveness and ease of maintenance in technology and framework choices. 

## General Information  

* Country: 🇳🇴 Norway  
* Customer: NTNU SmallSat Lab  
* Platform: Web  
* Framework: React  
* Period: Spring 2024  
* Status: In Progress  

## Project Structure

* `/docs/`: Contains technical documentation.
* `/backend/`: Backend code and local setup instructions.
* `/frontend/`: Frontend code and local setup instructions.
* `/.vscode/`: IDE settings (if applicable).
* `/.github/`: GitHub repository settings (e.g., issue templates, workflows).

## Getting Started

**Instructions:**

1. Clone this repository.
2. Navigate to the `backend/` directory and follow the instructions within.
3. Navigate to the `frontend/` directory and follow the instructions within

## Contributing

To ensure a consistent coding style, we have used Prettier to enforce code formatting.
Please install the Prettier extension for VSCode. Prettier can be configured to run on save, or it can be ran manually with the command

```
npx prettier --write
```

This will automatically format the code according to the rules set up for this project. The specific formatting rules have been defined here:

```
./frontend/prettierrc
```

Prettier has been integrated into the CI/CD pipeline to automatically check code formatting during pull requests.

## More Info

If looking for more information about the project please refer to the submitted report which Small Satellite Lab should have access to as well as the documentation in the `/docs/` folder.
