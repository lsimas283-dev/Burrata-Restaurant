const DEFAULT_WINDOW_MS = 60 * 1000;
const DEFAULT_LIMIT = 10;

export async function checkRateLimit(db, key, limit = DEFAULT_LIMIT, windowMs = DEFAULT_WINDOW_MS) {
  const now = Date.now();
  const windowStart = now - (now % windowMs);
  const collection = db.collection('rate_limits');

  await collection.updateOne(
    { key, windowStart },
    { $inc: { count: 1 }, $setOnInsert: { key, windowStart } },
    { upsert: true }
  );

  const record = await collection.findOne({ key, windowStart }, { projection: { count: 1 } });
  const count = record?.count || 0;
  const allowed = count <= limit;
  const retryAfter = Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000));

  if (Math.random() < 0.01) {
    await collection.deleteMany({ windowStart: { $lt: now - windowMs * 2 } });
  }

  return { allowed, retryAfter, remaining: Math.max(0, limit - count) };
}
