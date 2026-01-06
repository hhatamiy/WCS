// backend/utils/cacheManager.js
import OddsCache from '../models/OddsCache.js';

// Helper function to create a cache key from teams array
function getCacheKey(teams, isKnockout = false) {
  const sortedTeams = teams.slice().sort().join('|');
  return `${sortedTeams}_${isKnockout ? 'knockout' : 'group'}`;
}

// Helper function to add timeout to async operations
function withTimeout(promise, timeoutMs = 200) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Cache operation timeout')), timeoutMs)
    )
  ]);
}

/**
 * Retrieve cached odds from MongoDB
 * @param {string[]} teams - Array of team names
 * @param {string} type - 'group-winner' or 'match-odds'
 * @param {boolean} isKnockout - Whether this is a knockout match
 * @returns {Promise<Object|null>} - Cached data or null if not found/expired
 */
export async function getCachedOdds(teams, type, isKnockout = false) {
  const cacheStartTime = Date.now();
  try {
    const cacheKey = getCacheKey(teams, isKnockout);
    console.log(`[CACHE] Looking up ${type} in MongoDB (timeout: 200ms)...`);
    
    // Add timeout to prevent blocking if MongoDB is slow
    const cached = await withTimeout(
      OddsCache.findOne({
        cacheKey,
        type,
        expiresAt: { $gt: new Date() }, // Only get non-expired entries
      }),
      200 // 200ms timeout
    );

    const lookupTime = Date.now() - cacheStartTime;
    if (cached) {
      console.log(`[CACHE] HIT for ${type} in ${lookupTime}ms`);
      return cached.data;
    }

    console.log(`[CACHE] MISS for ${type} in ${lookupTime}ms`);
    return null;
  } catch (error) {
    const lookupTime = Date.now() - cacheStartTime;
    if (error.message === 'Cache operation timeout') {
      console.log(`[CACHE] TIMEOUT after ${lookupTime}ms for ${type} - skipping MongoDB cache`);
    } else {
      console.error(`[CACHE] ERROR after ${lookupTime}ms:`, error.message);
    }
    return null; // Return null on error to allow fallback to computation
  }
}

/**
 * Store computed odds in MongoDB cache
 * @param {string[]} teams - Array of team names
 * @param {string} type - 'group-winner' or 'match-odds'
 * @param {Object} data - The computed odds/probabilities to cache
 * @param {boolean} isKnockout - Whether this is a knockout match
 * @param {number} ttlDays - Time to live in days (default: 7)
 * @returns {Promise<Object>} - The saved cache entry
 */
export async function setCachedOdds(teams, type, data, isKnockout = false, ttlDays = 7) {
  try {
    const cacheKey = getCacheKey(teams, isKnockout);
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

    // Use upsert to update if exists, create if not
    // Add timeout to prevent blocking if MongoDB is slow
    const cached = await withTimeout(
      OddsCache.findOneAndUpdate(
        { cacheKey, type },
        {
          cacheKey,
          type,
          data,
          teams,
          isKnockout,
          expiresAt,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      ),
      500 // 500ms timeout for writes
    );

    console.log(`Cache STORED for ${type}: ${cacheKey} (expires: ${expiresAt.toISOString()})`);
    return cached;
  } catch (error) {
    if (error.message === 'Cache operation timeout') {
      console.log(`Cache store timeout for ${type} - skipping MongoDB cache`);
    } else {
      console.error('Error storing cache:', error.message);
    }
    // Don't throw - caching is optional, computation can still proceed
    return null;
  }
}

/**
 * Clear all cached odds (or specific type)
 * @param {string|null} type - 'group-winner', 'match-odds', or null for all
 * @returns {Promise<Object>} - Deletion result
 */
export async function clearCache(type = null) {
  try {
    const filter = type ? { type } : {};
    const result = await OddsCache.deleteMany(filter);
    
    console.log(`Cache CLEARED: ${result.deletedCount} entries deleted${type ? ` (type: ${type})` : ''}`);
    return {
      success: true,
      deletedCount: result.deletedCount,
      type: type || 'all',
    };
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw error;
  }
}

/**
 * Get cache statistics
 * @returns {Promise<Object>} - Cache statistics
 */
export async function getCacheStats() {
  try {
    const total = await OddsCache.countDocuments();
    const expired = await OddsCache.countDocuments({ expiresAt: { $lt: new Date() } });
    const active = total - expired;
    
    const byType = await OddsCache.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {
      total,
      active,
      expired,
      byType: byType.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
    };

    return stats;
  } catch (error) {
    console.error('Error getting cache stats:', error);
    throw error;
  }
}

/**
 * Clean up expired cache entries (can be called periodically)
 * @returns {Promise<Object>} - Cleanup result
 */
export async function cleanupExpiredCache() {
  try {
    // MongoDB TTL index should handle this automatically, but we can also do manual cleanup
    const result = await OddsCache.deleteMany({
      expiresAt: { $lt: new Date() },
    });

    console.log(`Expired cache cleaned: ${result.deletedCount} entries`);
    return {
      success: true,
      deletedCount: result.deletedCount,
    };
  } catch (error) {
    console.error('Error cleaning expired cache:', error);
    throw error;
  }
}

// Export the cache key function for use in other modules
export { getCacheKey };

