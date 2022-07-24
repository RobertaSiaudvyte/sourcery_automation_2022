const isRightTriangle = require('./isRightTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isRightTriangle(3, 4, 5)).toBe(true);
});

test('3, 4, 5 is triangle', () => {
    expect(isRightTriangle(3, 4, 5)).toBe(true);
});

test('0, 1, 2 is not triangle', () => {
    expect(isRightTriangle(0, 1, 2)).toBe(false);
});

test('5, 2, 8 is not triangle', () => {
    expect(isRightTriangle(5,2,8)).toBe(false);
});

test('10000, 29, 30 is not triangle', () => {
    expect(isRightTriangle(10000,29,30)).toBe(false);
});

test('10, 20, 30 is triangle', () => {
    expect(isRightTriangle(10,20,30)).toBe(false);
});