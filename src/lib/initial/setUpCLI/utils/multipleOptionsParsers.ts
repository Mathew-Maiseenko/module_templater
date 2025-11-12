// utils/multipleOptionsParsers.ts
export function collectVariables(
  value: string,
  previous: string[] | undefined
): string[] {
  return (previous || []).concat([value]);
}

export function parseCollectedVariables(
  vars: string[]
): Record<string, string> {
  return vars.reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
}
