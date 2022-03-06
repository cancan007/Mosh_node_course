const lib = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { lib.fizzBuzz('a') }).toThrow();
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toEqual('FizzBuzz');
    });

    it('should return Fizz if input is divisible by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toEqual('Fizz');
    });

    it('should return Buzz if input is divisible by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toEqual('Buzz');
    });

    it('should return input if it is not divisible by 3 or 5', () => {
        const result = lib.fizzBuzz(2);
        expect(result).toEqual(2);
    });
});