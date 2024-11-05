# Killstreak Game - Flask Web App

A Flask-based web game where users can register, log in, play a game with interactive graphics, earn scores, and compete on a leaderboard. The game uses various sprites for visual elements like the player, enemies, coins, and the game environment, creating a rich, interactive experience.

## Features

- **User Authentication**: Secure registration and login with hashed passwords.
- **Game Scoring**: Players can shoot enemies, collect coins, and earn points. Scores are saved in a leaderboard, allowing users to compete.
- **Leaderboard**: Ranks players based on high scores.
- **Instructions**: A "How to Play" page explains controls and objectives.
- **Session Management**: Uses Flask-Session to handle user sessions and restrict access.

## Tech Stack

- **Backend**: Flask with Flask-Session for session handling.
- **Database**: SQLite to store user credentials and game scores.
- **Frontend**: HTML, CSS, and JavaScript for UI and gameplay logic.

## Project Structure

### Backend

- **app.py**: Defines routes for registration, login, game scoring, leaderboard, and instructional pages.
- **database.py**: Manages SQLite database connections.
- **forms.py**: Defines forms for user registration and login with validation.
- **schema.sql**: SQL schema for creating the `users` and `scores` tables.
- **.flaskenv**: Environment configuration for Flask.

### Frontend

- **Templates**:
  - **`base.html`**: Base layout for all pages, includes links to CSS and JavaScript files.
  - **`index.html`**: Home page with navigation to game, leaderboard, and instructions.
  - **`game.html`**: Main game view with a canvas for rendering gameplay and display of scoring rules.
  - **`howtoplay.html`**: Instructions page with details on game objectives, controls, and images showing movement and shooting actions.
  - **`leaderboard.html`**: Shows a table of top scores.
  - **`login.html`** and **`register.html`**: Pages for player login and registration.

- **Static Assets**:
  - **CSS (`game.css`)**: Styles for the game UI, buttons, and layout elements.
  - **JavaScript (`game.js`)**: Handles game logic, including movement, collisions, score calculation, and sprite rendering.
  - **Images**:
    - **Player sprite (`player.png`)**: Animated sprite for the player character, used in movement and interactions.
    - **Enemy sprite (`enemy.png`)**: Sprite for zombie enemies, including animations for movement and collision.
    - **Coin sprite (`coin.png`)**: Sprite for collectible items, granting bonus points to players.
    - **Tileset (`tiles.png`)**: Background tileset for rendering the game map.
    - **Controls images**: `arrowkeys.png` for movement controls and `leftclick.png` for shooting.

- **Font**:
  - **Pixeled (`Pixeled.ttf`)**: Retro pixel font for UI elements, enhancing the game's visual theme.

## Game Mechanics

The game is a simple shooting game where players can:
- **Move**: Use arrow keys to navigate the map.
- **Shoot**: Use the left mouse button to shoot bullets in the direction of the pointer.
- **Earn Points**: Kill zombies (100 points each) and collect coins (1000 points each).
- **Survive**: Avoid contact with zombies, or the game will end when health reaches zero.

### Sprites and Animations

The game uses sprites for various visual elements:
- **Player**: The `player.png` sprite sheet animates the player character based on movement direction.
- **Enemies**: The `enemy.png` sprite sheet shows animated zombie characters that move towards the player.
- **Coins**: `coin.png` represents collectible items, appearing periodically on the game map.
- **Environment**: `tiles.png` is a tileset for creating a dynamic, multi-layered background, providing visual depth to the game.

## Getting Started

### Prerequisites

- Python 3.x
- Flask and other dependencies (install via `pip install -r requirements.txt` if a `requirements.txt` file is provided)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/killstreak-game-app.git
cd killstreak-game-app
```

2. Initialize the database:
```bash
sqlite3 app.db < schema.sql
```

3. Run the application:
```bash
  flask run
```

This README file provides a comprehensive overview of the game, including details on the sprites and animations used, game mechanics, and setup instructions. Let me know if you'd like any further customization!
