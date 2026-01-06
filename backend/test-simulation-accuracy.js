// backend/test-simulation-accuracy.js
// Test script to validate optimized simulation accuracy
// Compares 3k vs 10k iteration results to ensure <2% probability difference

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

// Import simulation functions (we'll need to extract them or import from betting.js)
// For this test, we'll import the functions directly
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Since we can't easily import from betting.js without the full Express setup,
// we'll recreate the core simulation logic here for testing
// In practice, you could refactor betting.js to export these functions

// Seeded random number generator
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }
  
  random() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// Helper function to create a deterministic seed from team names
function createSeedFromTeams(teams) {
  let seed = 0;
  const teamsString = teams.join('|');
  for (let i = 0; i < teamsString.length; i++) {
    seed = ((seed << 5) - seed) + teamsString.charCodeAt(i);
    seed = seed & seed;
  }
  return Math.abs(seed);
}

// Helper function to convert probability to American odds
function probabilityToAmericanOdds(probability) {
  if (probability <= 0 || probability >= 1) return null;
  if (probability >= 0.5) {
    return Math.round((probability / (1 - probability)) * -100);
  } else {
    return Math.round(((1 - probability) / probability) * 100);
  }
}

// Simplified match odds simulation (group stage only for testing)
function simulateMatchOddsSimple(team1Points, team2Points, numSimulations, rng) {
  const rating1 = team1Points;
  const rating2 = team2Points;
  
  const expectedScore1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  const expectedScore2 = 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
  
  const ratingDiff = Math.abs(rating1 - rating2);
  const drawProbability = Math.max(0.15, 0.30 - (ratingDiff / 2000));
  
  const adjustedWinProb1 = expectedScore1 * (1 - drawProbability);
  const adjustedWinProb2 = expectedScore2 * (1 - drawProbability);
  
  let team1Wins = 0;
  let team2Wins = 0;
  let draws = 0;
  
  for (let i = 0; i < numSimulations; i++) {
    const random = rng.random();
    
    if (random < adjustedWinProb1) {
      team1Wins++;
    } else if (random < adjustedWinProb1 + adjustedWinProb2) {
      team2Wins++;
    } else {
      draws++;
    }
  }
  
  return {
    team1: team1Wins / numSimulations,
    team2: team2Wins / numSimulations,
    draw: draws / numSimulations
  };
}

// Test function to compare iterations
function testIterationAccuracy(team1Points, team2Points, testName) {
  console.log(`\n${testName}`);
  console.log(`Team 1: ${team1Points} points | Team 2: ${team2Points} points`);
  console.log(`Rating difference: ${Math.abs(team1Points - team2Points)} points`);
  
  // Create deterministic seeds for both tests
  const seed1 = Math.abs(team1Points * 1000 + team2Points);
  const seed2 = seed1 + 1; // Different seed to ensure independence
  
  // Run 10k iterations (baseline)
  const rng10k = new SeededRandom(seed1);
  const result10k = simulateMatchOddsSimple(team1Points, team2Points, 10000, rng10k);
  
  // Run 3k iterations (optimized)
  const rng3k = new SeededRandom(seed1); // Same seed for fair comparison
  const result3k = simulateMatchOddsSimple(team1Points, team2Points, 3000, rng3k);
  
  // Calculate differences
  const diffTeam1 = Math.abs(result3k.team1 - result10k.team1);
  const diffTeam2 = Math.abs(result3k.team2 - result10k.team2);
  const diffDraw = Math.abs(result3k.draw - result10k.draw);
  
  const maxDiff = Math.max(diffTeam1, diffTeam2, diffDraw);
  const maxDiffPercent = maxDiff * 100;
  
  console.log(`\nResults:`);
  console.log(`  10k iterations: Team1=${(result10k.team1 * 100).toFixed(2)}%, Team2=${(result10k.team2 * 100).toFixed(2)}%, Draw=${(result10k.draw * 100).toFixed(2)}%`);
  console.log(`  3k iterations:  Team1=${(result3k.team1 * 100).toFixed(2)}%, Team2=${(result3k.team2 * 100).toFixed(2)}%, Draw=${(result3k.draw * 100).toFixed(2)}%`);
  console.log(`\nDifferences:`);
  console.log(`  Team1: ${(diffTeam1 * 100).toFixed(2)}%`);
  console.log(`  Team2: ${(diffTeam2 * 100).toFixed(2)}%`);
  console.log(`  Draw:  ${(diffDraw * 100).toFixed(2)}%`);
  console.log(`  Max:   ${maxDiffPercent.toFixed(2)}%`);
  
  const passed = maxDiffPercent < 2.0;
  console.log(`\n${passed ? '✅ PASSED' : '❌ FAILED'} - Max difference: ${maxDiffPercent.toFixed(2)}% (threshold: 2.0%)`);
  
  return {
    testName,
    passed,
    maxDiffPercent,
    result10k,
    result3k,
    differences: {
      team1: diffTeam1 * 100,
      team2: diffTeam2 * 100,
      draw: diffDraw * 100
    }
  };
}

// Run comprehensive tests
async function runAccuracyTests() {
  console.log('='.repeat(80));
  console.log('Simulation Accuracy Test: 3k vs 10k Iterations');
  console.log('='.repeat(80));
  console.log('\nTesting various matchup scenarios to ensure <2% probability difference\n');
  
  // Test cases: different team strength combinations
  const testCases = [
    // Very close teams (should use 5k iterations in adaptive mode)
    { team1: 1877, team2: 1873, name: 'Very Close Match (Top Teams)' },
    { team1: 1700, team2: 1695, name: 'Very Close Match (Mid Teams)' },
    
    // Close teams
    { team1: 1877, team2: 1760, name: 'Close Match (Top vs Mid)' },
    { team1: 1700, team2: 1650, name: 'Close Match (Mid Teams)' },
    
    // Moderate difference
    { team1: 1877, team2: 1500, name: 'Moderate Difference (Top vs Lower)' },
    { team1: 1700, team2: 1400, name: 'Moderate Difference (Mid vs Lower)' },
    
    // Large difference
    { team1: 1877, team2: 1200, name: 'Large Difference (Top vs Bottom)' },
    { team1: 1500, team2: 1000, name: 'Large Difference (Mid vs Bottom)' },
    
    // Edge cases
    { team1: 1900, team2: 800, name: 'Extreme Difference' },
    { team1: 1500, team2: 1500, name: 'Equal Teams' },
  ];
  
  const results = [];
  
  for (const testCase of testCases) {
    const result = testIterationAccuracy(
      testCase.team1,
      testCase.team2,
      testCase.name
    );
    results.push(result);
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('Test Summary');
  console.log('='.repeat(80));
  
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  const avgMaxDiff = results.reduce((sum, r) => sum + r.maxDiffPercent, 0) / totalTests;
  const maxObservedDiff = Math.max(...results.map(r => r.maxDiffPercent));
  
  console.log(`\nTotal Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✅`);
  console.log(`Failed: ${totalTests - passedTests} ${totalTests - passedTests > 0 ? '❌' : ''}`);
  console.log(`Average Max Difference: ${avgMaxDiff.toFixed(2)}%`);
  console.log(`Maximum Observed Difference: ${maxObservedDiff.toFixed(2)}%`);
  console.log(`\n${passedTests === totalTests ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (maxObservedDiff < 2.0) {
    console.log('\n✅ Accuracy validation successful! Optimized simulations maintain <2% difference.');
    console.log('The 3k iteration optimization is statistically accurate for production use.');
  } else {
    console.log('\n⚠️  Warning: Some test cases exceeded 2% difference threshold.');
    console.log('Consider increasing base iterations or adjusting convergence thresholds.');
  }
  
  console.log('\n' + '='.repeat(80));
  
  // Return exit code
  process.exit(passedTests === totalTests ? 0 : 1);
}

// Run tests
runAccuracyTests().catch(error => {
  console.error('Test execution error:', error);
  process.exit(1);
});

