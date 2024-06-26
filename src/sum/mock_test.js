const fetch = require('node-fetch');
const handleRecharge = require('./sum');

jest.mock('node-fetch', () => {
    return {
        default: jest.fn().mockRejectedValueOnce(new Error('Network request failed')),
    };
});

describe('handleRecharge function', () => {
    test('handles network request failure', async () => {
        const selectedClient = {
            key: 'client1',
            cards: [
                {
                    cardBalance: '5000'
                }
            ]
        };

        const clientList = [
            selectedClient,
        ];

        const rechargeAmount = '1000';

        const { updatedSelectedClient, newClientList } = await handleRecharge(selectedClient, rechargeAmount, clientList);
        expect(updatedSelectedClient.cards[0].cardBalance).toBe('6000.00');
        expect(newClientList[0].cards[0].cardBalance).toBe('6000.00');
    });
    test('throws error for invalid recharge amount', () => {
        const selectedClient = {
            key: 'client1',
            cards: [
                {
                    cardBalance: '5000'
                }
            ]
        };

        const clientList = [
            selectedClient,
        ];

        const rechargeAmount = '-1000';
        expect(() => handleRecharge(selectedClient, rechargeAmount, clientList)).toThrowError('Invalid recharge amount or current balance');

        const rechargeAmount2 = 'not a number';
        expect(() => handleRecharge(selectedClient, rechargeAmount2, clientList)).toThrowError('Invalid recharge amount or current balance');
    });
    test('throws error for invalid current balance', () => {
        const selectedClient = {
            key: 'client1',
            cards: [
                {
                    cardBalance: 'not a number'
                }
            ]
        };

        const clientList = [
            selectedClient,
        ];

        const rechargeAmount = '1000';
        expect(() => handleRecharge(selectedClient, rechargeAmount, clientList)).toThrowError('Invalid recharge amount or current balance');
    });
    test('throws error for no selected client', () => {
        const clientList = [

        ];

        const rechargeAmount = '1000';
        expect(() => handleRecharge(null, rechargeAmount, clientList)).toThrowError('No client or cards found');
    });
    test('throws error for no cards in selected client', () => {
        const selectedClient = {
            key: 'client1',
            cards: []
        };

        const clientList = [
            selectedClient,
        ];

        const rechargeAmount = '1000';
        expect(() => handleRecharge(selectedClient, rechargeAmount, clientList)).toThrowError('No client or cards found');
    });

});
