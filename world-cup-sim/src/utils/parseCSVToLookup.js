/**
 * Script to parse the CSV file and generate the lookup table
 * 
 * CSV Structure:
 * - Columns 2-13 (indices 1-12): Groups A-L showing which 8 groups' third-place teams advance
 * - Columns 14-21 (indices 13-20): Matchups showing which third-place teams play:
 *   "1A vs", "1B vs", "1D vs", "1E vs", "1G vs", "1I vs", "1K vs", "1L vs"
 * 
 * The CSV shows 8 matches where group winners play third-place teams.
 * The other 8 matches are fixed (runner-up vs runner-up or winner vs runner-up).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse CSV file and generate lookup table
 */
function parseCSVToLookupTable(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');
  
  // Skip header lines (lines 1-10 are headers)
  const dataLines = lines.slice(10).filter(line => {
    const trimmed = line.trim();
    return trimmed && !trimmed.startsWith('T') && trimmed.split(',').length > 13;
  });
  
  const lookupTable = {};
  
  // Mapping from CSV matchup columns to Round of 32 match indices
  // Based on official FIFA 2026 World Cup bracket flow:
  // CSV columns 14-21: 1A vs, 1B vs, 1D vs, 1E vs, 1G vs, 1I vs, 1K vs, 1L vs
  // 
  // Round of 32 array order (pairs feed into Round of 16):
  // Index 0-1: Match 73, 75 → Round of 16 Match 90
  // Index 2-3: Match 74, 77 → Round of 16 Match 89
  // Index 4-5: Match 76, 78 → Round of 16 Match 91
  // Index 6-7: Match 79, 80 → Round of 16 Match 92
  // Index 8-9: Match 83, 84 → Round of 16 Match 93
  // Index 10-11: Match 81, 82 → Round of 16 Match 94
  // Index 12-13: Match 86, 88 → Round of 16 Match 95
  // Index 14-15: Match 85, 87 → Round of 16 Match 96
  const csvMatchMapping = [
    { csvColIndex: 0, matchIndex: 6, winnerGroup: 'A' },   // 1A vs -> Index 6 (Match 79: Winner A vs 3rd)
    { csvColIndex: 1, matchIndex: 14, winnerGroup: 'B' },  // 1B vs -> Index 14 (Match 85: Winner B vs 3rd)
    { csvColIndex: 2, matchIndex: 10, winnerGroup: 'D' },  // 1D vs -> Index 10 (Match 81: Winner D vs 3rd)
    { csvColIndex: 3, matchIndex: 2, winnerGroup: 'E' },   // 1E vs -> Index 2 (Match 74: Winner E vs 3rd)
    { csvColIndex: 4, matchIndex: 11, winnerGroup: 'G' },  // 1G vs -> Index 11 (Match 82: Winner G vs 3rd)
    { csvColIndex: 5, matchIndex: 3, winnerGroup: 'I' },   // 1I vs -> Index 3 (Match 77: Winner I vs 3rd)
    { csvColIndex: 6, matchIndex: 15, winnerGroup: 'K' },  // 1K vs -> Index 15 (Match 87: Winner K vs 3rd)
    { csvColIndex: 7, matchIndex: 7, winnerGroup: 'L' },   // 1L vs -> Index 7 (Match 80: Winner L vs 3rd)
  ];
  
  // Fixed matches that don't depend on third-place teams
  const getFixedMatches = () => [
    { matchIndex: 0, team1: { type: 'runner', group: 'A' }, team2: { type: 'runner', group: 'B' } },  // Match 73
    { matchIndex: 1, team1: { type: 'winner', group: 'F' }, team2: { type: 'runner', group: 'C' } },  // Match 75
    { matchIndex: 4, team1: { type: 'winner', group: 'C' }, team2: { type: 'runner', group: 'F' } },  // Match 76
    { matchIndex: 5, team1: { type: 'runner', group: 'E' }, team2: { type: 'runner', group: 'I' } },  // Match 78
    { matchIndex: 8, team1: { type: 'runner', group: 'K' }, team2: { type: 'runner', group: 'L' } },  // Match 83
    { matchIndex: 9, team1: { type: 'winner', group: 'H' }, team2: { type: 'runner', group: 'J' } },  // Match 84
    { matchIndex: 12, team1: { type: 'winner', group: 'J' }, team2: { type: 'runner', group: 'H' } }, // Match 86
    { matchIndex: 13, team1: { type: 'runner', group: 'D' }, team2: { type: 'runner', group: 'G' } }, // Match 88
  ];
  
  dataLines.forEach((line, lineIndex) => {
    if (!line.trim()) return;
    
    // Parse CSV line (handling quoted fields)
    const columns = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        columns.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    columns.push(current.trim());
    
    // Extract advancing groups (columns 2-13, indices 1-12)
    const advancingGroups = [];
    const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    for (let i = 1; i <= 12; i++) {
      if (columns[i] && columns[i].trim() && columns[i].trim() !== '') {
        advancingGroups.push(groupLetters[i - 1]);
      }
    }
    
    if (advancingGroups.length !== 8) {
      console.warn(`Row ${lineIndex + 11}: Expected 8 advancing groups, found ${advancingGroups.length}: ${advancingGroups.join(',')}`);
      return;
    }
    
    // Create lookup key (sorted)
    const lookupKey = advancingGroups.sort().join('');
    
    // Extract matchup values (columns 14-21, indices 14-21 in 0-indexed array)
    const matchupValues = columns.slice(14, 22).map(v => v.trim());
    
    // Build the 16 matchups array
    const matchups = new Array(16);
    
    // Fill in fixed matches
    getFixedMatches().forEach(fixed => {
      matchups[fixed.matchIndex] = {
        team1: fixed.team1,
        team2: fixed.team2
      };
    });
    
    // Fill in matches from CSV
    csvMatchMapping.forEach(({ csvColIndex, matchIndex, winnerGroup }) => {
      const thirdPlaceValue = matchupValues[csvColIndex];
      if (thirdPlaceValue && thirdPlaceValue.startsWith('3')) {
        const thirdPlaceGroup = thirdPlaceValue.substring(1); // Extract group letter after "3"
        
        if (thirdPlaceGroup && /^[A-L]$/.test(thirdPlaceGroup)) {
          matchups[matchIndex] = {
            team1: { type: 'winner', group: winnerGroup },
            team2: { type: 'third', group: thirdPlaceGroup }
          };
        }
      }
    });
    
    // All matchups are now either fixed or from CSV
    // No additional priority-based matching needed
    // Verify we have all 16 matches
    const validMatchups = matchups.filter(m => m !== undefined);
    if (validMatchups.length === 16) {
      lookupTable[lookupKey] = matchups;
    } else {
      console.warn(`Row ${lineIndex + 11}: Only ${validMatchups.length}/16 matchups found for key ${lookupKey}`);
      // Still add it, but mark as incomplete
      lookupTable[lookupKey] = matchups;
    }
  });
  
  return lookupTable;
}

/**
 * Generate JavaScript code for the lookup table
 */
function generateLookupTableCode(lookupTable) {
  let code = '/**\n';
  code += ' * FIFA 2026 Round of 32 Matchup Lookup Table\n';
  code += ' * Generated from possibilities.csv\n';
  code += ' * Key: Sorted string of 8 advancing group letters (e.g., "ABCDEFGH")\n';
  code += ' * Value: Array of 16 matchups in Round of 32 order\n';
  code += ' */\n\n';
  code += 'const MATCHUP_LOOKUP_TABLE = {\n';
  
  const keys = Object.keys(lookupTable).sort();
  keys.forEach((key, index) => {
    code += `  "${key}": [\n`;
    const matchups = lookupTable[key];
    matchups.forEach((matchup, matchIndex) => {
      if (matchup) {
        code += `    { team1: { type: '${matchup.team1.type}', group: '${matchup.team1.group}' }, team2: { type: '${matchup.team2.type}', group: '${matchup.team2.group}' } }`;
      } else {
        code += `    null // Missing matchup ${matchIndex + 1}`;
      }
      if (matchIndex < matchups.length - 1) {
        code += ',';
      }
      code += '\n';
    });
    code += '  ]';
    if (index < keys.length - 1) {
      code += ',';
    }
    code += '\n';
  });
  
  code += '};\n\n';
  code += 'export default MATCHUP_LOOKUP_TABLE;\n';
  
  return code;
}

// Main execution (when run as script)
// Check if this file is being run directly (not imported)
// eslint-disable-next-line no-undef
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     // eslint-disable-next-line no-undef
                     (process.argv[1] && import.meta.url.endsWith(process.argv[1]));

// eslint-disable-next-line no-undef
if (isMainModule || (process.argv[1] && process.argv[1].includes('parseCSVToLookup'))) {
  // Determine project root: go up from this file's directory to find possibilities.csv
  // This file is at: world-cup-sim/src/utils/parseCSVToLookup.js
  // CSV is at: possibilities.csv (project root)
  // eslint-disable-next-line no-undef
  let projectRoot = process.cwd();
  
  // If running from world-cup-sim directory, go up one level
  if (projectRoot.endsWith('world-cup-sim')) {
    projectRoot = path.join(projectRoot, '..');
  }
  
  const csvPath = path.join(projectRoot, 'possibilities.csv');
  console.log('Parsing CSV file:', csvPath);
  
  // Check if CSV exists
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: CSV file not found at ${csvPath}`);
    console.error('Please run this script from the project root directory.');
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
  
  try {
    const lookupTable = parseCSVToLookupTable(csvPath);
    console.log(`Generated lookup table with ${Object.keys(lookupTable).length} entries`);
    
    const code = generateLookupTableCode(lookupTable);
    // Output path: world-cup-sim/src/utils/matchupLookupTable.js
    const outputPath = path.join(projectRoot, 'world-cup-sim', 'src', 'utils', 'matchupLookupTable.js');
    
    fs.writeFileSync(outputPath, code, 'utf-8');
    console.log('Lookup table written to:', outputPath);
    console.log('File size:', (code.length / 1024).toFixed(2), 'KB');
  } catch (error) {
    console.error('Error parsing CSV:', error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

export { parseCSVToLookupTable, generateLookupTableCode };
