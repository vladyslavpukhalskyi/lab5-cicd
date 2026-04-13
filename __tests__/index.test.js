describe('Simple Smoke Test', () => {
  it('має завжди проходити (тест середовища)', () => {
    expect(true).toBe(true);
  });

  it('перевіряє наявність базових файлів', () => {
    const fs = require('fs');
    const path = require('path');
    const indexExists = fs.existsSync(path.join(__dirname, '../src/index.js'));
    expect(indexExists).toBe(true);
  });
});