/**
 * FIFA World Cup 2026 Official Match Schedule
 * Data sourced from matchSchedule.csv
 * Contains venue, date, and kickoff time information for all matches (1-104)
 */

// Venue mapping - official stadium names and cities
const VENUES = {
  'Mexico City Stadium': { name: 'Estadio Azteca', city: 'Mexico City' },
  'Guadalajara Stadium': { name: 'Estadio Akron', city: 'Guadalajara' },
  'Monterrey Stadium': { name: 'Estadio BBVA', city: 'Monterrey' },
  'Toronto Stadium': { name: 'BMO Field', city: 'Toronto' },
  'BC Place Vancouver': { name: 'BC Place', city: 'Vancouver' },
  'New York/New Jersey Stadium': { name: 'MetLife Stadium', city: 'New York/New Jersey' },
  'New York New Jersey Stadium': { name: 'MetLife Stadium', city: 'New York/New Jersey' },
  'Los Angeles Stadium': { name: 'SoFi Stadium', city: 'Los Angeles' },
  'Boston Stadium': { name: 'Gillette Stadium', city: 'Boston' },
  'San Francisco Bay Area Stadium': { name: 'Levi\'s Stadium', city: 'San Francisco Bay Area' },
  'Philadelphia Stadium': { name: 'Lincoln Financial Field', city: 'Philadelphia' },
  'Houston Stadium': { name: 'NRG Stadium', city: 'Houston' },
  'Dallas Stadium': { name: 'AT&T Stadium', city: 'Dallas' },
  'Miami Stadium': { name: 'Hard Rock Stadium', city: 'Miami' },
  'Atlanta Stadium': { name: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  'Seattle Stadium': { name: 'Lumen Field', city: 'Seattle' },
  'Kansas City Stadium': { name: 'Arrowhead Stadium', city: 'Kansas City' }
};

/**
 * Complete Match Schedule (Matches 1-104)
 * Data from matchSchedule.csv (updated version)
 */
const ALL_MATCHES = {
  // Group Stage (Matches 1-72)
  1: { matchId: 1, date: '2026-06-11', kickoffTime: '14:00', venue: VENUES['Mexico City Stadium'], stage: 'Group A', teamA: 'Mexico', teamB: 'South Africa', timezone: 'CT' },
  2: { matchId: 2, date: '2026-06-11', kickoffTime: '20:00', venue: VENUES['Guadalajara Stadium'], stage: 'Group A', teamA: 'South Korea', teamB: 'UEFA Path D winner', timezone: 'CT' },
  3: { matchId: 3, date: '2026-06-12', kickoffTime: '15:00', venue: VENUES['Toronto Stadium'], stage: 'Group B', teamA: 'Canada', teamB: 'UEFA Path A winner', timezone: 'ET' },
  4: { matchId: 4, date: '2026-06-12', kickoffTime: '18:00', venue: VENUES['Los Angeles Stadium'], stage: 'Group D', teamA: 'USA', teamB: 'Paraguay', timezone: 'PT' },
  5: { matchId: 5, date: '2026-06-13', kickoffTime: '21:00', venue: VENUES['Boston Stadium'], stage: 'Group C', teamA: 'Haiti', teamB: 'Scotland', timezone: 'ET' },
  6: { matchId: 6, date: '2026-06-13', kickoffTime: '21:00', venue: VENUES['BC Place Vancouver'], stage: 'Group D', teamA: 'Australia', teamB: 'UEFA Path C winner', timezone: 'PT' },
  7: { matchId: 7, date: '2026-06-13', kickoffTime: '18:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Group C', teamA: 'Brazil', teamB: 'Morocco', timezone: 'ET' },
  8: { matchId: 8, date: '2026-06-13', kickoffTime: '12:00', venue: VENUES['San Francisco Bay Area Stadium'], stage: 'Group B', teamA: 'Qatar', teamB: 'Switzerland', timezone: 'PT' },
  9: { matchId: 9, date: '2026-06-14', kickoffTime: '19:00', venue: VENUES['Philadelphia Stadium'], stage: 'Group E', teamA: 'Côte d\'Ivoire', teamB: 'Ecuador', timezone: 'ET' },
  10: { matchId: 10, date: '2026-06-14', kickoffTime: '12:00', venue: VENUES['Houston Stadium'], stage: 'Group E', teamA: 'Germany', teamB: 'Curaçao', timezone: 'CT' },
  11: { matchId: 11, date: '2026-06-14', kickoffTime: '15:00', venue: VENUES['Dallas Stadium'], stage: 'Group F', teamA: 'Netherlands', teamB: 'Japan', timezone: 'CT' },
  12: { matchId: 12, date: '2026-06-14', kickoffTime: '21:00', venue: VENUES['Monterrey Stadium'], stage: 'Group F', teamA: 'UEFA Path B winner', teamB: 'Tunisia', timezone: 'CT' },
  13: { matchId: 13, date: '2026-06-15', kickoffTime: '18:00', venue: VENUES['Miami Stadium'], stage: 'Group H', teamA: 'Saudi Arabia', teamB: 'Uruguay', timezone: 'ET' },
  14: { matchId: 14, date: '2026-06-15', kickoffTime: '12:00', venue: VENUES['Atlanta Stadium'], stage: 'Group H', teamA: 'Spain', teamB: 'Cape Verde', timezone: 'ET' },
  15: { matchId: 15, date: '2026-06-15', kickoffTime: '18:00', venue: VENUES['Los Angeles Stadium'], stage: 'Group G', teamA: 'Iran', teamB: 'New Zealand', timezone: 'PT' },
  16: { matchId: 16, date: '2026-06-15', kickoffTime: '12:00', venue: VENUES['Seattle Stadium'], stage: 'Group G', teamA: 'Belgium', teamB: 'Egypt', timezone: 'PT' },
  17: { matchId: 17, date: '2026-06-16', kickoffTime: '15:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Group I', teamA: 'France', teamB: 'Senegal', timezone: 'ET' },
  18: { matchId: 18, date: '2026-06-16', kickoffTime: '18:00', venue: VENUES['Boston Stadium'], stage: 'Group I', teamA: 'IC Path 2 winner', teamB: 'Norway', timezone: 'ET' },
  19: { matchId: 19, date: '2026-06-16', kickoffTime: '20:00', venue: VENUES['Kansas City Stadium'], stage: 'Group J', teamA: 'Argentina', teamB: 'Algeria', timezone: 'CT' },
  20: { matchId: 20, date: '2026-06-16', kickoffTime: '21:00', venue: VENUES['San Francisco Bay Area Stadium'], stage: 'Group J', teamA: 'Austria', teamB: 'Jordan', timezone: 'PT' },
  21: { matchId: 21, date: '2026-06-17', kickoffTime: '19:00', venue: VENUES['Toronto Stadium'], stage: 'Group L', teamA: 'Ghana', teamB: 'Panama', timezone: 'ET' },
  22: { matchId: 22, date: '2026-06-17', kickoffTime: '15:00', venue: VENUES['Dallas Stadium'], stage: 'Group L', teamA: 'England', teamB: 'Croatia', timezone: 'CT' },
  23: { matchId: 23, date: '2026-06-17', kickoffTime: '12:00', venue: VENUES['Houston Stadium'], stage: 'Group K', teamA: 'Portugal', teamB: 'IC Path 1 winner', timezone: 'CT' },
  24: { matchId: 24, date: '2026-06-17', kickoffTime: '21:00', venue: VENUES['Mexico City Stadium'], stage: 'Group K', teamA: 'Uzbekistan', teamB: 'Colombia', timezone: 'CT' },
  25: { matchId: 25, date: '2026-06-18', kickoffTime: '12:00', venue: VENUES['Atlanta Stadium'], stage: 'Group A', teamA: 'UEFA Path D winner', teamB: 'South Africa', timezone: 'ET' },
  26: { matchId: 26, date: '2026-06-18', kickoffTime: '12:00', venue: VENUES['Los Angeles Stadium'], stage: 'Group B', teamA: 'Switzerland', teamB: 'UEFA Path A winner', timezone: 'PT' },
  27: { matchId: 27, date: '2026-06-18', kickoffTime: '15:00', venue: VENUES['BC Place Vancouver'], stage: 'Group B', teamA: 'Canada', teamB: 'Qatar', timezone: 'PT' },
  28: { matchId: 28, date: '2026-06-18', kickoffTime: '20:00', venue: VENUES['Guadalajara Stadium'], stage: 'Group A', teamA: 'Mexico', teamB: 'South Korea', timezone: 'CT' },
  29: { matchId: 29, date: '2026-06-19', kickoffTime: '21:00', venue: VENUES['Philadelphia Stadium'], stage: 'Group C', teamA: 'Brazil', teamB: 'Haiti', timezone: 'ET' },
  30: { matchId: 30, date: '2026-06-19', kickoffTime: '18:00', venue: VENUES['Boston Stadium'], stage: 'Group C', teamA: 'Scotland', teamB: 'Morocco', timezone: 'ET' },
  31: { matchId: 31, date: '2026-06-19', kickoffTime: '21:00', venue: VENUES['San Francisco Bay Area Stadium'], stage: 'Group D', teamA: 'UEFA Path C winner', teamB: 'Paraguay', timezone: 'PT' },
  32: { matchId: 32, date: '2026-06-19', kickoffTime: '12:00', venue: VENUES['Seattle Stadium'], stage: 'Group D', teamA: 'USA', teamB: 'Australia', timezone: 'PT' },
  33: { matchId: 33, date: '2026-06-20', kickoffTime: '16:00', venue: VENUES['Toronto Stadium'], stage: 'Group E', teamA: 'Germany', teamB: 'Côte d\'Ivoire', timezone: 'ET' },
  34: { matchId: 34, date: '2026-06-20', kickoffTime: '19:00', venue: VENUES['Kansas City Stadium'], stage: 'Group E', teamA: 'Ecuador', teamB: 'Curaçao', timezone: 'CT' },
  35: { matchId: 35, date: '2026-06-20', kickoffTime: '12:00', venue: VENUES['Houston Stadium'], stage: 'Group F', teamA: 'Netherlands', teamB: 'UEFA Path B winner', timezone: 'CT' },
  36: { matchId: 36, date: '2026-06-20', kickoffTime: '23:00', venue: VENUES['Monterrey Stadium'], stage: 'Group F', teamA: 'Tunisia', teamB: 'Japan', timezone: 'CT' },
  37: { matchId: 37, date: '2026-06-21', kickoffTime: '18:00', venue: VENUES['Miami Stadium'], stage: 'Group H', teamA: 'Uruguay', teamB: 'Cape Verde', timezone: 'ET' },
  38: { matchId: 38, date: '2026-06-21', kickoffTime: '12:00', venue: VENUES['Atlanta Stadium'], stage: 'Group H', teamA: 'Spain', teamB: 'Saudi Arabia', timezone: 'ET' },
  39: { matchId: 39, date: '2026-06-21', kickoffTime: '12:00', venue: VENUES['Los Angeles Stadium'], stage: 'Group G', teamA: 'Belgium', teamB: 'Iran', timezone: 'PT' },
  40: { matchId: 40, date: '2026-06-21', kickoffTime: '18:00', venue: VENUES['BC Place Vancouver'], stage: 'Group G', teamA: 'New Zealand', teamB: 'Egypt', timezone: 'PT' },
  41: { matchId: 41, date: '2026-06-22', kickoffTime: '20:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Group I', teamA: 'Norway', teamB: 'Senegal', timezone: 'ET' },
  42: { matchId: 42, date: '2026-06-22', kickoffTime: '17:00', venue: VENUES['Philadelphia Stadium'], stage: 'Group I', teamA: 'France', teamB: 'IC Path 2 winner', timezone: 'ET' },
  43: { matchId: 43, date: '2026-06-22', kickoffTime: '12:00', venue: VENUES['Dallas Stadium'], stage: 'Group J', teamA: 'Argentina', teamB: 'Austria', timezone: 'CT' },
  44: { matchId: 44, date: '2026-06-22', kickoffTime: '20:00', venue: VENUES['San Francisco Bay Area Stadium'], stage: 'Group J', teamA: 'Jordan', teamB: 'Algeria', timezone: 'PT' },
  45: { matchId: 45, date: '2026-06-23', kickoffTime: '16:00', venue: VENUES['Boston Stadium'], stage: 'Group L', teamA: 'England', teamB: 'Ghana', timezone: 'ET' },
  46: { matchId: 46, date: '2026-06-23', kickoffTime: '19:00', venue: VENUES['Toronto Stadium'], stage: 'Group L', teamA: 'Panama', teamB: 'Croatia', timezone: 'ET' },
  47: { matchId: 47, date: '2026-06-23', kickoffTime: '12:00', venue: VENUES['Houston Stadium'], stage: 'Group K', teamA: 'Portugal', teamB: 'Uzbekistan', timezone: 'CT' },
  48: { matchId: 48, date: '2026-06-23', kickoffTime: '21:00', venue: VENUES['Guadalajara Stadium'], stage: 'Group K', teamA: 'Colombia', teamB: 'IC Path 1 winner', timezone: 'CT' },
  49: { matchId: 49, date: '2026-06-24', kickoffTime: '18:00', venue: VENUES['Miami Stadium'], stage: 'Group C', teamA: 'Scotland', teamB: 'Brazil', timezone: 'ET' },
  50: { matchId: 50, date: '2026-06-24', kickoffTime: '18:00', venue: VENUES['Atlanta Stadium'], stage: 'Group C', teamA: 'Morocco', teamB: 'Haiti', timezone: 'ET' },
  51: { matchId: 51, date: '2026-06-24', kickoffTime: '12:00', venue: VENUES['BC Place Vancouver'], stage: 'Group B', teamA: 'Switzerland', teamB: 'Canada', timezone: 'PT' },
  52: { matchId: 52, date: '2026-06-24', kickoffTime: '12:00', venue: VENUES['Seattle Stadium'], stage: 'Group B', teamA: 'UEFA Path A winner', teamB: 'Qatar', timezone: 'PT' },
  53: { matchId: 53, date: '2026-06-24', kickoffTime: '20:00', venue: VENUES['Mexico City Stadium'], stage: 'Group A', teamA: 'UEFA Path D winner', teamB: 'Mexico', timezone: 'CT' },
  54: { matchId: 54, date: '2026-06-24', kickoffTime: '20:00', venue: VENUES['Monterrey Stadium'], stage: 'Group A', teamA: 'South Africa', teamB: 'South Korea', timezone: 'CT' },
  55: { matchId: 55, date: '2026-06-25', kickoffTime: '16:00', venue: VENUES['Philadelphia Stadium'], stage: 'Group E', teamA: 'Curaçao', teamB: 'Côte d\'Ivoire', timezone: 'ET' },
  56: { matchId: 56, date: '2026-06-25', kickoffTime: '16:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Group E', teamA: 'Ecuador', teamB: 'Germany', timezone: 'ET' },
  57: { matchId: 57, date: '2026-06-25', kickoffTime: '18:00', venue: VENUES['Dallas Stadium'], stage: 'Group F', teamA: 'Japan', teamB: 'UEFA Path B winner', timezone: 'CT' },
  58: { matchId: 58, date: '2026-06-25', kickoffTime: '18:00', venue: VENUES['Kansas City Stadium'], stage: 'Group F', teamA: 'Tunisia', teamB: 'Netherlands', timezone: 'CT' },
  59: { matchId: 59, date: '2026-06-25', kickoffTime: '19:00', venue: VENUES['Los Angeles Stadium'], stage: 'Group D', teamA: 'UEFA Path C winner', teamB: 'USA', timezone: 'PT' },
  60: { matchId: 60, date: '2026-06-25', kickoffTime: '19:00', venue: VENUES['San Francisco Bay Area Stadium'], stage: 'Group D', teamA: 'Paraguay', teamB: 'Australia', timezone: 'PT' },
  61: { matchId: 61, date: '2026-06-26', kickoffTime: '15:00', venue: VENUES['Boston Stadium'], stage: 'Group I', teamA: 'Norway', teamB: 'France', timezone: 'ET' },
  62: { matchId: 62, date: '2026-06-26', kickoffTime: '15:00', venue: VENUES['Toronto Stadium'], stage: 'Group I', teamA: 'Senegal', teamB: 'IC Path 2 winner', timezone: 'ET' },
  63: { matchId: 63, date: '2026-06-26', kickoffTime: '20:00', venue: VENUES['Seattle Stadium'], stage: 'Group G', teamA: 'Egypt', teamB: 'Iran', timezone: 'PT' },
  64: { matchId: 64, date: '2026-06-26', kickoffTime: '20:00', venue: VENUES['BC Place Vancouver'], stage: 'Group G', teamA: 'New Zealand', teamB: 'Belgium', timezone: 'PT' },
  65: { matchId: 65, date: '2026-06-26', kickoffTime: '19:00', venue: VENUES['Houston Stadium'], stage: 'Group H', teamA: 'Cape Verde', teamB: 'Saudi Arabia', timezone: 'CT' },
  66: { matchId: 66, date: '2026-06-26', kickoffTime: '19:00', venue: VENUES['Guadalajara Stadium'], stage: 'Group H', teamA: 'Uruguay', teamB: 'Spain', timezone: 'CT' },
  67: { matchId: 67, date: '2026-06-27', kickoffTime: '17:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Group L', teamA: 'Panama', teamB: 'England', timezone: 'ET' },
  68: { matchId: 68, date: '2026-06-27', kickoffTime: '17:00', venue: VENUES['Philadelphia Stadium'], stage: 'Group L', teamA: 'Croatia', teamB: 'Ghana', timezone: 'ET' },
  69: { matchId: 69, date: '2026-06-27', kickoffTime: '21:00', venue: VENUES['Kansas City Stadium'], stage: 'Group J', teamA: 'Algeria', teamB: 'Austria', timezone: 'CT' },
  70: { matchId: 70, date: '2026-06-27', kickoffTime: '21:00', venue: VENUES['Dallas Stadium'], stage: 'Group J', teamA: 'Jordan', teamB: 'Argentina', timezone: 'CT' },
  71: { matchId: 71, date: '2026-06-27', kickoffTime: '19:30', venue: VENUES['Miami Stadium'], stage: 'Group K', teamA: 'Colombia', teamB: 'Portugal', timezone: 'ET' },
  72: { matchId: 72, date: '2026-06-27', kickoffTime: '19:30', venue: VENUES['Atlanta Stadium'], stage: 'Group K', teamA: 'IC Path 1 winner', teamB: 'Uzbekistan', timezone: 'ET' },
  
  // Round of 32 (Matches 73-88)
  73: { matchId: 73, date: '2026-06-28', kickoffTime: '12:00', venue: VENUES['Los Angeles Stadium'], stage: 'Round of 32', teamA: '2A', teamB: '2B', timezone: 'PT' },
  74: { matchId: 74, date: '2026-06-29', kickoffTime: '12:00', venue: VENUES['Houston Stadium'], stage: 'Round of 32', teamA: '1C', teamB: '2F', timezone: 'CT' },
  75: { matchId: 75, date: '2026-06-29', kickoffTime: '16:30', venue: VENUES['Boston Stadium'], stage: 'Round of 32', teamA: '1E', teamB: '3ABCDF', timezone: 'ET' },
  76: { matchId: 76, date: '2026-06-29', kickoffTime: '18:00', venue: VENUES['Monterrey Stadium'], stage: 'Round of 32', teamA: '1F', teamB: '2C', timezone: 'CT' },
  77: { matchId: 77, date: '2026-06-30', kickoffTime: '12:00', venue: VENUES['Dallas Stadium'], stage: 'Round of 32', teamA: '2E', teamB: '2I', timezone: 'CT' },
  78: { matchId: 78, date: '2026-06-30', kickoffTime: '17:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Round of 32', teamA: '1I', teamB: '3CDFGH', timezone: 'ET' },
  79: { matchId: 79, date: '2026-06-30', kickoffTime: '20:00', venue: VENUES['Mexico City Stadium'], stage: 'Round of 32', teamA: '1A', teamB: '3CEFHI', timezone: 'CT' },
  80: { matchId: 80, date: '2026-07-01', kickoffTime: '12:00', venue: VENUES['Atlanta Stadium'], stage: 'Round of 32', teamA: '1L', teamB: '3EHIJK', timezone: 'ET' },
  81: { matchId: 81, date: '2026-07-01', kickoffTime: '13:00', venue: VENUES['Seattle Stadium'], stage: 'Round of 32', teamA: '1G', teamB: '3AEHIJ', timezone: 'PT' },
  82: { matchId: 82, date: '2026-07-01', kickoffTime: '17:00', venue: VENUES['San Francisco Bay Area Stadium'], stage: 'Round of 32', teamA: '1D', teamB: '3BEFIJ', timezone: 'PT' },
  83: { matchId: 83, date: '2026-07-02', kickoffTime: '12:00', venue: VENUES['Los Angeles Stadium'], stage: 'Round of 32', teamA: '1H', teamB: '2J', timezone: 'PT' },
  84: { matchId: 84, date: '2026-07-02', kickoffTime: '19:00', venue: VENUES['Toronto Stadium'], stage: 'Round of 32', teamA: '2K', teamB: '2L', timezone: 'ET' },
  85: { matchId: 85, date: '2026-07-02', kickoffTime: '20:00', venue: VENUES['BC Place Vancouver'], stage: 'Round of 32', teamA: '1B', teamB: '3EFGIJ', timezone: 'PT' },
  86: { matchId: 86, date: '2026-07-03', kickoffTime: '13:00', venue: VENUES['Dallas Stadium'], stage: 'Round of 32', teamA: '2D', teamB: '2G', timezone: 'CT' },
  87: { matchId: 87, date: '2026-07-03', kickoffTime: '18:00', venue: VENUES['Miami Stadium'], stage: 'Round of 32', teamA: '1J', teamB: '2H', timezone: 'ET' },
  88: { matchId: 88, date: '2026-07-03', kickoffTime: '20:30', venue: VENUES['Kansas City Stadium'], stage: 'Round of 32', teamA: '1K', teamB: '3DEIJL', timezone: 'CT' },
  
  // Round of 16 (Matches 89-96)
  89: { matchId: 89, date: '2026-07-04', kickoffTime: '12:00', venue: VENUES['Houston Stadium'], stage: 'Round of 16', teamA: 'W73', teamB: 'W75', timezone: 'CT' },
  90: { matchId: 90, date: '2026-07-04', kickoffTime: '17:00', venue: VENUES['Philadelphia Stadium'], stage: 'Round of 16', teamA: 'W74', teamB: 'W77', timezone: 'ET' },
  91: { matchId: 91, date: '2026-07-05', kickoffTime: '16:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Round of 16', teamA: 'W76', teamB: 'W78', timezone: 'ET' },
  92: { matchId: 92, date: '2026-07-05', kickoffTime: '19:00', venue: VENUES['Mexico City Stadium'], stage: 'Round of 16', teamA: 'W79', teamB: 'W80', timezone: 'CT' },
  93: { matchId: 93, date: '2026-07-06', kickoffTime: '14:00', venue: VENUES['Dallas Stadium'], stage: 'Round of 16', teamA: 'W83', teamB: 'W84', timezone: 'CT' },
  94: { matchId: 94, date: '2026-07-06', kickoffTime: '17:00', venue: VENUES['Seattle Stadium'], stage: 'Round of 16', teamA: 'W81', teamB: 'W82', timezone: 'PT' },
  95: { matchId: 95, date: '2026-07-07', kickoffTime: '12:00', venue: VENUES['Atlanta Stadium'], stage: 'Round of 16', teamA: 'W86', teamB: 'W88', timezone: 'ET' },
  96: { matchId: 96, date: '2026-07-07', kickoffTime: '13:00', venue: VENUES['BC Place Vancouver'], stage: 'Round of 16', teamA: 'W85', teamB: 'W87', timezone: 'PT' },
  
  // Quarter-finals (Matches 97-100)
  97: { matchId: 97, date: '2026-07-09', kickoffTime: '16:00', venue: VENUES['Boston Stadium'], stage: 'Quarter-final', teamA: 'W89', teamB: 'W90', timezone: 'ET' },
  98: { matchId: 98, date: '2026-07-10', kickoffTime: '12:00', venue: VENUES['Los Angeles Stadium'], stage: 'Quarter-final', teamA: 'W93', teamB: 'W94', timezone: 'PT' },
  99: { matchId: 99, date: '2026-07-11', kickoffTime: '17:00', venue: VENUES['Miami Stadium'], stage: 'Quarter-final', teamA: 'W91', teamB: 'W92', timezone: 'ET' },
  100: { matchId: 100, date: '2026-07-11', kickoffTime: '20:00', venue: VENUES['Kansas City Stadium'], stage: 'Quarter-final', teamA: 'W95', teamB: 'W96', timezone: 'CT' },
  
  // Semi-finals (Matches 101-102)
  101: { matchId: 101, date: '2026-07-14', kickoffTime: '14:00', venue: VENUES['Dallas Stadium'], stage: 'Semi-final', teamA: 'W97', teamB: 'W98', timezone: 'CT' },
  102: { matchId: 102, date: '2026-07-15', kickoffTime: '12:00', venue: VENUES['Atlanta Stadium'], stage: 'Semi-final', teamA: 'W99', teamB: 'W100', timezone: 'ET' },
  
  // Third Place Playoff (Match 103)
  103: { matchId: 103, date: '2026-07-18', kickoffTime: '17:00', venue: VENUES['Miami Stadium'], stage: 'Third Place Playoff', teamA: 'RU101', teamB: 'RU102', timezone: 'ET' },
  
  // Final (Match 104)
  104: { matchId: 104, date: '2026-07-19', kickoffTime: '15:00', venue: VENUES['New York/New Jersey Stadium'], stage: 'Final', teamA: 'W101', teamB: 'W102', timezone: 'ET' }
};

/**
 * Group to Match Number Mapping
 * Maps group letter and match position (1-6) to actual match number from CSV
 * Based on team positions and official FIFA schedule
 */
const GROUP_MATCH_MAPPING = {
  'A': [1, 2, 25, 28, 53, 54],
  'B': [3, 8, 26, 27, 51, 52],
  'C': [5, 7, 29, 30, 49, 50],
  'D': [4, 6, 31, 32, 59, 60],
  'E': [9, 10, 33, 34, 55, 56],
  'F': [11, 12, 35, 36, 57, 58],
  'G': [15, 16, 39, 40, 63, 64],
  'H': [13, 14, 37, 38, 65, 66],
  'I': [17, 18, 41, 42, 61, 62],
  'J': [19, 20, 43, 44, 69, 70],
  'K': [23, 24, 47, 48, 71, 72],
  'L': [21, 22, 45, 46, 67, 68]
};

/**
 * Get match info by match ID (1-104)
 * @param {number} matchId - Match ID (1-104)
 * @returns {Object} Match info with date, kickoffTime, venue, stage, etc.
 */
export function getMatchInfoById(matchId) {
  const match = ALL_MATCHES[matchId];
  
  if (!match) {
    return {
      matchId: matchId,
      date: '2026-06-11',
      kickoffTime: '20:00',
      venue: VENUES['Mexico City Stadium'],
      stage: 'Unknown',
      teamA: 'TBD',
      teamB: 'TBD'
    };
  }
  
  return match;
}

/**
 * Get match info for a group stage match
 * @param {string} groupName - Group letter (A-L)
 * @param {number} matchNumber - Match number within group (1-6)
 * @returns {Object} Match info with date, kickoffTime, and venue
 */
export function getGroupMatchInfo(groupName, matchNumber) {
  const group = groupName.replace('Group ', '').trim();
  
  if (!GROUP_MATCH_MAPPING[group] || matchNumber < 1 || matchNumber > 6) {
    return {
      date: '2026-06-11',
      kickoffTime: '20:00',
      venue: VENUES['Mexico City Stadium']
    };
  }
  
  // Get actual match number from mapping
  const actualMatchNumber = GROUP_MATCH_MAPPING[group][matchNumber - 1];
  const match = ALL_MATCHES[actualMatchNumber];
  
  if (!match) {
    return {
      date: '2026-06-11',
      kickoffTime: '20:00',
      venue: VENUES['Mexico City Stadium']
    };
  }
  
  return {
    date: match.date,
    kickoffTime: match.kickoffTime,
    venue: match.venue,
    matchId: match.matchId,
    timezone: match.timezone
  };
}

/**
 * Get match info for a knockout stage match by match ID
 * @param {number} matchId - Match ID (73-104)
 * @returns {Object} Match info with matchId, date, kickoffTime, venue, stage, and description
 */
export function getKnockoutMatchInfoById(matchId) {
  const match = ALL_MATCHES[matchId];
  
  if (!match) {
    return {
      matchId: matchId,
      date: '2026-07-01',
      kickoffTime: '20:00',
      venue: VENUES['New York/New Jersey Stadium'],
      stage: 'Unknown',
      description: 'Match not found'
    };
  }
  
  return {
    matchId: match.matchId,
    date: match.date,
    kickoffTime: match.kickoffTime,
    venue: match.venue,
    stage: match.stage,
    description: `${match.teamA} v ${match.teamB}`,
    timezone: match.timezone
  };
}

/**
 * Get match info for a knockout stage match by stage name
 * @param {string} stage - Stage name (e.g., "Round of 32", "Final")
 * @param {number} matchIndex - Optional: index of match within the stage (0-based)
 * @returns {Object} Match info with date, kickoffTime, and venue
 */
export function getKnockoutMatchInfo(stage, matchIndex = 0) {
  // Try to find a match in the specified stage
  const matchesInStage = Object.values(ALL_MATCHES).filter(m => m.stage === stage);
  
  if (matchesInStage.length > 0 && matchIndex < matchesInStage.length) {
    const match = matchesInStage[matchIndex];
    return {
      date: match.date,
      kickoffTime: match.kickoffTime,
      venue: match.venue,
      matchId: match.matchId,
      description: `${match.teamA} v ${match.teamB}`,
      timezone: match.timezone
    };
  }
  
  // Fallback
  return {
    date: '2026-07-01',
    kickoffTime: '20:00',
    venue: VENUES['New York/New Jersey Stadium']
  };
}

/**
 * Get all matches for a specific knockout stage
 * @param {string} stage - Stage name (e.g., "Round of 32", "Round of 16")
 * @returns {Array} Array of match objects
 */
export function getKnockoutMatchesByStage(stage) {
  return Object.values(ALL_MATCHES).filter(m => m.stage === stage);
}

// Legacy exports for backward compatibility
const GROUP_STAGE_SCHEDULE = {};
const KNOCKOUT_MATCHES = {};
const KNOCKOUT_SCHEDULE = {};

export { VENUES, GROUP_STAGE_SCHEDULE, KNOCKOUT_SCHEDULE, KNOCKOUT_MATCHES, ALL_MATCHES, GROUP_MATCH_MAPPING };
