module.exports = {
    testEnvironment: 'node',
    rootDir: 'src', // Relative to the project root inside the container
    roots: ['<rootDir>'], // Look for tests within the rootDir
    testRegex: '.*\\.spec\\.ts$', // Matches test files ending in `.spec.ts`
    transform: {
      '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
    },
    moduleFileExtensions: ['ts', 'js', 'json'], // Recognize TypeScript and JavaScript files
  };
  