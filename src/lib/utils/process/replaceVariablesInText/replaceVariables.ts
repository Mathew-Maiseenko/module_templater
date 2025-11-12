export const replaceVariables = (
  input: string,
  variables: Record<string, string>
) => {
  const errors: string[] = [];

  const resText = input.replace(/{{(\w+)}}/g, (_, variableName) => {
    if (!variables[variableName]) {
      errors.push(`Variable: ${variableName} does not exist`);
      return `{{${variableName}}}`; // или variableName
    }
    return variables[variableName];
  });

  return { value: resText, errors };
};
