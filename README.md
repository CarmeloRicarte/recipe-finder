# Recipe Finder

## Prerequisites

- Bun (v1.0.0 or higher): Runtime and package manager
- Spoonacular API Key: Obten una clave gratuita en https://spoonacular.com/food-api

## Environment Setup

1. Create a .env file in the project root
2. Add your API Key:
   VITE_SPOONACULAR_API_KEY=your_key_here

## What is this application for?

This application allows you to search for recipes by entering ingredients or keywords. You can view a list of recipes with basic details (name, short description and image), click on a recipe to see detailed information (ingredients, instructions and preparation time), and save your favorite recipes in a local list for easy access.

## How to Set Up and Run the Application

1. Clone the repository
2. Install dependencies: `bun install`
3. Start development server: `bun run dev`

## Tools and Libraries Used

- Vite (v6.2.0): Build tool
- Spoonacular API: Provides recipe and ingredient data
- React (v19.0.0): Frontend framework
- @shadcn/ui: Component library
- TailwindCSS (v4.1.3): Styling
- Vitest (v3.1.1): Testing framework
- Biome (v1.9.4): Code formatting and linting
- Testing Library: Testing utilities

## Assumptions and Design Decisions

- Using Vite for fast development experience
- Spoonacular API as the main source of recipe data
- Clean architecture for clear separation of concerns between business logic, specific features and UI components
- TailwindCSS for utility-first styling
- @shadcn/ui for reusable components
- Vitest for its performance and modern features
- Biome for code quality and formatting
- Testing Library for DOM testing utilities

## Project Structure

- src/
  - core/: Core application logic and utilities
  - recipe/: Recipe-related features
    - application/: Application layer
    - domain/: Domain models
    - infrastructure/: External integrations
    - ui/: UI components
  - assets/: Static assets

## Testing

Run tests: `bun run test`
Run tests with UI: `bun run test:ui`
Generate coverage report: `bun run coverage`