const randomSuffix = () => Math.random().toString(36).slice(2, 10);

export const createTimestamp = () => new Date().toISOString();

export const createLocalId = (prefix = 'entity') => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now().toString(36)}-${randomSuffix()}`;
};
