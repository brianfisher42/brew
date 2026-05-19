/**
 * constants.ts
 * 
 * Application-wide constants and configuration data for Brewtelligence.
 * Contains mood/feeling options, available ingredients, and content validation utilities.
 */

import type { Mood, Feeling, Temperature } from './types';

/**
 * Available mood options for the mood-based drink recommendation flow.
 * Each mood influences what type of coffee drink the AI will suggest.
 */
export const MOODS: Mood[] = [
  { name: 'Tired', description: 'Feeling drained and low on energy.', emoji: '😴' },
  { name: 'Stressed', description: 'Overwhelmed and in need of a break.', emoji: '😫' },
  { name: 'Cozy', description: 'Relaxed and comfortable, ready to unwind.', emoji: '😌' },
  { name: 'Adventurous', description: 'Looking for something new and exciting.', emoji: '🤠' },
];

/**
 * Desired feeling/outcome options that users can select.
 * This tells the AI what effect the user wants from their drink.
 */
export const FEELINGS: Feeling[] = [
  { name: 'Energized', description: 'A powerful boost to kickstart your day.', emoji: '⚡️' },
  { name: 'Focused', description: 'Clarity and concentration in a cup.', emoji: '🎯' },
  { name: 'Relaxed', description: 'A soothing sip to calm your senses.', emoji: '🧘' },
  { name: 'Inspired', description: 'Creative and ready to take on the world.', emoji: '💡' },
];

/**
 * Temperature preference options for beverages.
 * Users choose between hot and cold drinks.
 */
export const TEMPERATURES: Temperature[] = [
  { name: 'Hot', description: 'A warm and comforting embrace.', emoji: '🔥' },
  { name: 'Cold', description: 'A refreshing and crisp chill.', emoji: '🧊' },
];

/**
 * Comprehensive list of available coffee shop ingredients.
 * Used by the AI to create recipes and for inventory management.
 * Includes syrups, milks, powders, toppings, and base ingredients.
 */
export const INGREDIENTS: string[] = [
  'Brown Sugar',
  'Caramel Syrup',
  'Cardamom',
  'Chai Concentrate',
  'Chocolate Syrup',
  'Cinnamon Powder',
  'Cocoa Powder',
  'Cold Brew Concentrate',
  'Dark Chocolate Shavings',
  'Drip Coffee',
  'Espresso (single, double)',
  'Hazelnut Syrup',
  'Honey',
  'Ice',
  'Matcha Powder',
  'Milk Foam',
  'Mocha Syrup',
  'Nutmeg',
  'Orange Peel',
  'Peanut Butter',
  'Peppermint Syrup',
  'Pumpkin Spice Syrup',
  'Raspberry Syrup',
  'Sea Salt',
  'Steamed Milk (Whole, Skim, Oat, Almond)',
  'Toffee Nut Syrup',
  'Vanilla Syrup',
  'Water',
  'Whipped Cream',
  'White Chocolate Chips',
  'White Chocolate Syrup',
];

/**
 * List of forbidden words for content moderation.
 * Used for client-side validation to provide immediate feedback
 * and prevent inappropriate drink names or notes.
 * 
 * Note: Server-side AI also handles content moderation by
 * creatively reinterpreting inappropriate requests.
 */
export const FORBIDDEN_WORDS: string[] = [
  // Common Profanity
  'fuck', 'shit', 'bitch', 'cunt', 'asshole', 'ass', 'bastard', 'dick', 'pussy', 'cock', 'slut', 'whore', 'damn', 'hell', 'crap', 'piss', 'douche', 'fag', 'dyke', 'cocksucker', 'motherfucker', 'tits',
  // Sexual References
  'sex', 'sexy', 'nude', 'naked', 'porn', 'erotic', 'viagra', 'horny', 'orgasm', 'penis', 'vagina',
  // Hate & Cruelty
  'kill', 'murder', 'die', 'hate', 'stupid', 'idiot', 'ugly', 'fat', 'dumb', 'loser', 'racist', 'nazi',
  // More general offensive terms
  'retard', 'spaz',
];

/**
 * Validates user input against the forbidden words list.
 * 
 * Performs a case-insensitive substring search and checks a normalized
 * version of the input to catch common character substitutions used to
 * bypass filters (e.g., "shyt" for "shit", "@ss" for "ass").
 * 
 * @param input - The string to validate
 * @returns `true` if the input passes validation (is clean), `false` if it contains forbidden content
 * 
 * @example
 * validateInput('Hello world')  // returns true
 * validateInput('This is sh*t') // returns false (catches substitutions)
 */
export const validateInput = (input: string): boolean => {
  // Empty or undefined input is considered valid
  if (!input) return true;

  // Create a normalized version of the input to handle common character substitutions
  // This catches attempts to bypass the filter using special characters
  const normalizedInput = input
    .replace(/@/g, 'a') // Handles '@ss' -> 'ass'
    .replace(/y/g, 'i') // Handles 'shyt' -> 'shit'
    .replace(/x/g, 'u'); // Handles 'fxck' -> 'fuck'

  // Create a single regex pattern that matches any forbidden word as a substring
  // The 'i' flag makes the match case-insensitive
  const regex = new RegExp(`(${FORBIDDEN_WORDS.join('|')})`, 'i');

  // Validation passes only if neither the original nor normalized input contains forbidden words
  return !regex.test(input) && !regex.test(normalizedInput);
};
