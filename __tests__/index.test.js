const request = require('supertest');
const express = require('express');
// Шлях до твого головного файлу сервера. 
// Якщо сервер експортується з index.js, вкажи шлях до нього.
const app = require('../src/index'); 

describe('API Tests', () => {
  it('має повертати головну сторінку', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('має повертати список справ (якщо є такий роут)', async () => {
    const res = await request(app).get('/items');
    // Якщо роут /items існує, статус має бути 200
    if (res.statusCode !== 404) {
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    }
  });
});