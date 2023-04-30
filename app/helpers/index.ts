export const typedJSONFetch = async <T> (
  ...params: Parameters<typeof fetch>
): Promise<T> => {
  const response = await fetch(...params);
  return await response.json();
}

export const normalizeHNTime = (time: number) => {
  return new Date(time * 1000).toLocaleDateString(
    [],
    { minute: 'numeric', hour: 'numeric' }
  );
}

export const multiple = (word: string, count: number) => {
  if (count === 1) return word;

  return word + 's';
}
