const CURRENCY_FORMAT = new Intl.NumberFormat('PT-BR', {
    currency: 'BRL',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}