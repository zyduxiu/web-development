function handleRecharge (selectedClient, rechargeAmount, clientList){
    if (!selectedClient || !selectedClient.cards||!selectedClient.cards[0]) {
        throw new Error('No client or cards found');
    }

    const currentBalance = parseFloat(selectedClient.cards[0].cardBalance);
    const rechargeValue = parseFloat(rechargeAmount);

    if (isNaN(currentBalance) || isNaN(rechargeValue) || rechargeValue <= 0) {
        throw new Error('Invalid recharge amount or current balance');
    }

    const newBalance = currentBalance + rechargeValue;

    const updatedCards = selectedClient.cards.map(card => ({
        ...card,
        cardBalance: newBalance.toFixed(2),
    }));

    const newClientList = clientList.map(client =>
        client.key === selectedClient.key ? {
            ...client,
            cards: updatedCards
        } : client
    );

    return {
        newClientList,
        updatedSelectedClient: {
            ...selectedClient,
            cards: updatedCards
        }
    };
}


module.exports = handleRecharge;