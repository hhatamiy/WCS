/**
 * FIFA 2026 World Cup Knockout Stage Algorithm
 * 
 * This file contains the algorithm for generating Round of 32 matchups
 * based on which 8 groups' third-place teams advance.
 * 
 * There are 495 different possible combinations, and each combination
 * results in different matchups according to FIFA's official rules.
 * 
 * The lookup table is generated from possibilities.csv using parseCSVToLookup.js
 */

import MATCHUP_LOOKUP_TABLE_DATA from './matchupLookupTable.js';

/**
 * Lookup table mapping combinations of advancing third-place groups to Round of 32 matchups
 * 
 * Key format: Sorted string of 8 group letters (e.g., "ABCDEFGH")
 * Value: Array of 16 matchups for Round of 32
 * 
 * Generated from possibilities.csv - contains all 495 combinations
 */
const MATCHUP_LOOKUP_TABLE = MATCHUP_LOOKUP_TABLE_DATA;

/**
 * Generate all possible combinations of 8 groups from 12 groups
 * This is a helper function to generate keys for the lookup table
 */
function generateAllCombinations() {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const combinations = [];
  
  function combine(start, combo) {
    if (combo.length === 8) {
      combinations.push([...combo].sort().join(''));
      return;
    }
    for (let i = start; i < groups.length; i++) {
      combo.push(groups[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  }
  
  combine(0, []);
  return combinations;
}

/**
 * Get the lookup key from a set of advancing third-place groups
 */
function getLookupKey(advancingGroups) {
  return Array.from(advancingGroups).sort().join('');
}

/**
 * Fallback algorithm using the official FIFA 2026 bracket structure
 * This is used when a combination is not found in the lookup table
 * 
 * Array indices are ordered to match the bracket flow:
 * - Indices 0-1 feed into Round of 16 Match 90
 * - Indices 2-3 feed into Round of 16 Match 89
 * - Indices 4-5 feed into Round of 16 Match 91
 * - Indices 6-7 feed into Round of 16 Match 92
 * - Indices 8-9 feed into Round of 16 Match 93
 * - Indices 10-11 feed into Round of 16 Match 94
 * - Indices 12-13 feed into Round of 16 Match 95
 * - Indices 14-15 feed into Round of 16 Match 96
 */
function generateMatchupsFallback(advancingGroups, groupWinners, runnersUp, thirdPlaceMap) {
  const roundOf32 = [];
  
  const getThirdPlace = (possibleGroups) => {
    for (const group of possibleGroups) {
      if (advancingGroups.has(group) && thirdPlaceMap[group]) {
        return thirdPlaceMap[group];
      }
    }
    return null;
  };

  // Index 0: Match 73 - Runner-up A vs Runner-up B
  roundOf32.push({
    team1: runnersUp['A'] || 'TBD',
    team2: runnersUp['B'] || 'TBD',
    winner: null
  });

  // Index 1: Match 75 - Winner F vs Runner-up C
  roundOf32.push({
    team1: groupWinners['F'] || 'TBD',
    team2: runnersUp['C'] || 'TBD',
    winner: null
  });

  // Index 2: Match 74 - Winner E vs 3rd (A/B/C/D/F)
  roundOf32.push({
    team1: groupWinners['E'] || 'TBD',
    team2: getThirdPlace(['A', 'B', 'C', 'D', 'F']) || 'TBD',
    winner: null
  });

  // Index 3: Match 77 - Winner I vs 3rd (C/D/F/G/H)
  roundOf32.push({
    team1: groupWinners['I'] || 'TBD',
    team2: getThirdPlace(['C', 'D', 'F', 'G', 'H']) || 'TBD',
    winner: null
  });

  // Index 4: Match 76 - Winner C vs Runner-up F
  roundOf32.push({
    team1: groupWinners['C'] || 'TBD',
    team2: runnersUp['F'] || 'TBD',
    winner: null
  });

  // Index 5: Match 78 - Runner-up E vs Runner-up I
  roundOf32.push({
    team1: runnersUp['E'] || 'TBD',
    team2: runnersUp['I'] || 'TBD',
    winner: null
  });

  // Index 6: Match 79 - Winner A vs 3rd (C/E/F/H/I)
  roundOf32.push({
    team1: groupWinners['A'] || 'TBD',
    team2: getThirdPlace(['C', 'E', 'F', 'H', 'I']) || 'TBD',
    winner: null
  });

  // Index 7: Match 80 - Winner L vs 3rd (E/H/I/J/K)
  roundOf32.push({
    team1: groupWinners['L'] || 'TBD',
    team2: getThirdPlace(['E', 'H', 'I', 'J', 'K']) || 'TBD',
    winner: null
  });

  // Index 8: Match 83 - Runner-up K vs Runner-up L
  roundOf32.push({
    team1: runnersUp['K'] || 'TBD',
    team2: runnersUp['L'] || 'TBD',
    winner: null
  });

  // Index 9: Match 84 - Winner H vs Runner-up J
  roundOf32.push({
    team1: groupWinners['H'] || 'TBD',
    team2: runnersUp['J'] || 'TBD',
    winner: null
  });

  // Index 10: Match 81 - Winner D vs 3rd (B/E/F/I/J)
  roundOf32.push({
    team1: groupWinners['D'] || 'TBD',
    team2: getThirdPlace(['B', 'E', 'F', 'I', 'J']) || 'TBD',
    winner: null
  });

  // Index 11: Match 82 - Winner G vs 3rd (A/E/H/I/J)
  roundOf32.push({
    team1: groupWinners['G'] || 'TBD',
    team2: getThirdPlace(['A', 'E', 'H', 'I', 'J']) || 'TBD',
    winner: null
  });

  // Index 12: Match 86 - Winner J vs Runner-up H
  roundOf32.push({
    team1: groupWinners['J'] || 'TBD',
    team2: runnersUp['H'] || 'TBD',
    winner: null
  });

  // Index 13: Match 88 - Runner-up D vs Runner-up G
  roundOf32.push({
    team1: runnersUp['D'] || 'TBD',
    team2: runnersUp['G'] || 'TBD',
    winner: null
  });

  // Index 14: Match 85 - Winner B vs 3rd (E/F/G/I/J)
  roundOf32.push({
    team1: groupWinners['B'] || 'TBD',
    team2: getThirdPlace(['E', 'F', 'G', 'I', 'J']) || 'TBD',
    winner: null
  });

  // Index 15: Match 87 - Winner K vs 3rd (D/E/I/J/L)
  roundOf32.push({
    team1: groupWinners['K'] || 'TBD',
    team2: getThirdPlace(['D', 'E', 'I', 'J', 'L']) || 'TBD',
    winner: null
  });

  return roundOf32;
}

/**
 * Main function to generate Round of 32 matchups
 * 
 * @param {Set<string>} advancingGroups - Set of group letters whose third-place teams advanced
 * @param {Object} groupWinners - Map of group letter to winner team name
 * @param {Object} runnersUp - Map of group letter to runner-up team name
 * @param {Object} thirdPlaceMap - Map of group letter to third-place team name
 * @returns {Array} Array of 16 matchups for Round of 32
 */
export function generateRoundOf32Matchups(advancingGroups, groupWinners, runnersUp, thirdPlaceMap) {
  const lookupKey = getLookupKey(advancingGroups);
  
  // Check if we have a specific matchup table entry for this combination
  if (MATCHUP_LOOKUP_TABLE[lookupKey]) {
    const matchupSpecs = MATCHUP_LOOKUP_TABLE[lookupKey];
    
    return matchupSpecs.map(spec => {
      const getTeam = (teamSpec) => {
        if (teamSpec.type === 'winner') {
          return groupWinners[teamSpec.group] || 'TBD';
        } else if (teamSpec.type === 'runner') {
          return runnersUp[teamSpec.group] || 'TBD';
        } else if (teamSpec.type === 'third') {
          return thirdPlaceMap[teamSpec.group] || 'TBD';
        }
        return 'TBD';
      };
      
      return {
        team1: getTeam(spec.team1),
        team2: getTeam(spec.team2),
        winner: null
      };
    });
  }
  
  // Fallback to simplified algorithm if lookup table doesn't have this combination
  console.warn(`No lookup table entry for combination: ${lookupKey}. Using fallback algorithm.`);
  return generateMatchupsFallback(advancingGroups, groupWinners, runnersUp, thirdPlaceMap);
}

/**
 * Helper function to get all possible combination keys
 * Useful for generating the lookup table structure
 */
export function getAllCombinationKeys() {
  return generateAllCombinations();
}

/**
 * Get the total number of possible combinations
 */
export function getTotalCombinations() {
  // C(12,8) = 495 combinations
  return 495;
}

