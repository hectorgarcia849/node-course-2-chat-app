const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Rikki';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt === 'number').toBe(true);
        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('text', text);


    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Rikki';
        const lat = 15;
        const ln = 19;
        const url = 'https://www.google.com/maps?q=15,19';
        const message = generateLocationMessage(from, lat, ln);
        expect(typeof message.createdAt === 'number').toBe(true);
        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('url', url);
    });
});