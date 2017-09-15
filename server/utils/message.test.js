const expect = require('expect');
const {generateMessage} = require('./message');

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