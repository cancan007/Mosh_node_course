const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');


describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        //throw new Error('something failed.');
        const result = lib.absolute(1);
        expect(result).toBe(1);  // expect result to be 1
    });

    it('should return a positive number if input is negative', () => {
        //throw new Error('something failed.');
        const result = lib.absolute(-1);
        expect(result).toBe(1);  // expect result to be 1
    });

    it('should return 0 if input is 0', () => {
        //throw new Error('something failed.');
        const result = lib.absolute(0);
        expect(result).toBe(0);  // expect result to be 1
    });
});


describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toBe('Welcome Mosh');
        expect(result).toMatch(/Mosh/); // if include Mosh, true === .toContain('Mosh')
    });
});


describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe('USD');

        // Proper way
        expect(result).toContain('USD');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(12345);
        //expect(result).toBe({ id: 12345, price: 10 });  // toBe: compare memory location
        expect(result).toEqual({ id: 12345, price: 10, category: 'a' });  // toEqual: compare object equality
        expect(result).toMatchObject({ id: 12345, price: 10 });  // toMatchObject: if contain these properties, true
        expect(result).toHaveProperty('id', 12345);

    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // Null
        // undefined
        // NaN
        // ''
        // 0
        // false
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({ username: 'mosh' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function (customerId) {
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 };
        }

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toEqual(9);
    })
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        /*
        const mockFunction = jest.fn();
        //mockFunction.mockReturnValue(1);
        //mockFunction.mockResolvedValue(1);
        //mockFunction.mockRejectedValue(new Error('...'));
        mockFunction(); */

        /*
        db.getCustomerSync = function (customerId) {
            return { email: 'a' };
        } 

        let mailSent = false;
        mail.send = function (email, message) {
            mailSent = true;
        } */

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });
        expect(mail.send).toHaveBeenCalled();  // method is called or not
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
        //expect(mail.send).toHaveBeenCalledWith('a', '...');

    });
});