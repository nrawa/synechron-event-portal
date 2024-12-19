function dateGlobalization(value, locale="en-IN"){
    if(!value) return value;
    return new Intl.DateTimeFormat(locale,{
        weekday:'long',
        DAY: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(new Date(value));
}

function currencyGlobalization(value,locale="en-IN",currency='INR'){
    if(!value) return value;
    return new Intl.NumberFormat(locale,{
        currency,
        style:'currency',
        maximumFractionDigits: 2,
        minimumFractionDigits:2
    }).format(value);
}

export { dateGlobalization, currencyGlobalization };