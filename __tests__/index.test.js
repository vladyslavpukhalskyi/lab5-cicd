const fs = require('fs');
const path = require('path');

describe('Project Structure Test', () => {
  it('should find the index.js file', () => {
    const filePath = path.join(__dirname, '../src/index.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });
});