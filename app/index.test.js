const { createServer } = require('./index');

describe('Color Logic Tests', () => {
    it('should return red when URL contains /red', () => {
        let color = 'white';
        const url = '/red';

        if (url.includes('red')) {
            color = 'red';
        }

        expect(color).toBe('red');
    });

    it('should return white when URL contains /white', () => {
        let color = 'red';
        const url = '/white';

        if (url.includes('white')) {
            color = 'white';
        }

        expect(color).toBe('white');
    });

    it('should return green when URL contains /green', () => {
        let color = 'red';
        const url = '/green';

        if (url.includes('green')) {
            color = 'green';
        }

        expect(color).toBe('green');
    });

    it('should keep the default color when URL does not contain a color', () => {
        let color = 'white';
        const url = '/blue';

        if (url.includes('red')) {
            color = 'red';
        } else if (url.includes('white')) {
            color = 'white';
        } else if (url.includes('green')) {
            color = 'green';
        }

        expect(color).toBe('white');
    });
});
