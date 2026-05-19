/**
 * types.ts
 * 
 * Type definitions for the Brewtelligence coffee recommendation app.
 * These interfaces define the shape of data used throughout the application.
 */

/**
 * Represents a generated coffee drink recipe from the AI.
 * This is the response structure returned by the Gemini API.
 */
export interface CoffeeDrink {
  /** A creative and appealing name for the coffee drink */
  recipeName: string;
  /** A short, enticing description explaining the drink's flavor profile and vibe */
  description: string;
  /** A fun summary of the drink's taste (e.g., 'Sweet & Creamy', 'Bold & Nutty') */
  flavorProfile: string;
  /** List of all ingredients with their quantities */
  ingredients: string[];
  /** Step-by-step preparation instructions */
  instructions: string[];
}

/**
 * Represents a user's current mood state.
 * Used in the mood-based drink recommendation flow.
 */
export interface Mood {
  /** Display name of the mood (e.g., 'Tired', 'Stressed') */
  name: string;
  /** Detailed description of what this mood feels like */
  description: string;
  /** Emoji icon representing the mood visually */
  emoji: string;
}

/**
 * Represents the desired feeling/outcome after drinking.
 * Users select how they want to feel after their coffee.
 */
export interface Feeling {
  /** Display name of the feeling (e.g., 'Energized', 'Focused') */
  name: string;
  /** Description of what this feeling provides */
  description: string;
  /** Emoji icon representing the feeling visually */
  emoji: string;
}

/**
 * Represents the temperature preference for the drink.
 * Either hot or cold beverage options.
 */
export interface Temperature {
  /** Display name of the temperature option */
  name: string;
  /** Description of the temperature experience */
  description: string;
  /** Emoji icon (fire for hot, ice for cold) */
  emoji: string;
}
