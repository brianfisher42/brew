import type { Mood, Feeling, Temperature } from './types';

export const MOODS: Mood[] = [
  { name: 'Tired', description: 'Feeling drained and low on energy.', emoji: '😴' },
  { name: 'Stressed', description: 'Overwhelmed and in need of a break.', emoji: '😫' },
  { name: 'Cozy', description: 'Relaxed and comfortable, ready to unwind.', emoji: '😌' },
  { name: 'Adventurous', description: 'Looking for something new and exciting.', emoji: '🤠' },
];

export const FEELINGS: Feeling[] = [
  { name: 'Energized', description: 'A powerful boost to kickstart your day.', emoji: '⚡️' },
  { name: 'Focused', description: 'Clarity and concentration in a cup.', emoji: '🎯' },
  { name: 'Relaxed', description: 'A soothing sip to calm your senses.', emoji: '🧘' },
  { name: 'Inspired', description: 'Creative and ready to take on the world.', emoji: '💡' },
];

export const TEMPERATURES: Temperature[] = [
  { name: 'Hot', description: 'A warm and comforting embrace.', emoji: '🔥' },
  { name: 'Cold', description: 'A refreshing and crisp chill.', emoji: '🧊' },
];

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

// A list of words to prevent inappropriate content.
// This is used for client-side validation to provide immediate feedback.
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
 * Validates a string against a list of forbidden words. It performs a case-insensitive substring search
 * and checks a normalized version of the input to catch common character substitutions (e.g., "shyt", "@ss").
 * @param input The string to validate.
 * @returns `true` if the input is clean, `false` otherwise.
 */
export const validateInput = (input: string): boolean => {
  if (!input) return true;

  // Create a normalized version of the input to handle common character substitutions.
  const normalizedInput = input
    .replace(/@/g, 'a') // Handles '@ss'
    .replace(/y/g, 'i') // Handles 'shyt'
    .replace(/x/g, 'u'); // Handles 'fxck'

  // Create a single regex to check for any of the forbidden words as substrings, case-insensitively.
  const regex = new RegExp(`(${FORBIDDEN_WORDS.join('|')})`, 'i');

  // If the regex finds a match in either the original or the normalized string, validation fails.
  return !regex.test(input) && !regex.test(normalizedInput);
};