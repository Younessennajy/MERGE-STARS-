export function generateMergeId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `MS-${num}`;
}
