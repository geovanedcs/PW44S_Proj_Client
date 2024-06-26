const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'BRL',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}