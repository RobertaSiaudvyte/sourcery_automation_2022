const isTriangle = require('./isTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isTriangle(3, 4, 5)).toBe(true);
});

test('3, 4, 5 is triangle', () => {
    expect(isTriangle(3, 4, 5)).toBe(true);
});

test('0, 1, 2 is not triangle', () => {
    expect(isTriangle(0,1,2)).toBe(false);
});

test('5, 2, 8 is not triangle', () => {
    expect(isTriangle(5,2,8)).toBe(false);
});

test('1000, 29, 30 is triangle', () => {
    expect(isTriangle(1000,29,30)).toBe(true);
});