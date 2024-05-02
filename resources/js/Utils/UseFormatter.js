const CURRENCY = "IDR";

const LOCALE = "id-ID";

const TIME_ZONE = "Asia/Jakarta";

const DATETIME_FORMAT = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: TIME_ZONE,
};

const DATE_FORMAT = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: TIME_ZONE,
};

export const formatCurrency = (data) => {
    if (!data) {
        data = 0;
    }
    return new Intl.NumberFormat(LOCALE, {
        style: "currency",
        currency: CURRENCY,
    }).format(data);
};

export const formatDate = (data) => {
    if (!data) {
        return "No defined";
    }
    const date = Date.parse(data);
    return Intl.DateTimeFormat(LOCALE, DATE_FORMAT).format(date);
};

export const formatDatetime = (data) => {
    if (!data) {
        return "No defined";
    }
    const date = Date.parse(data);
    return Intl.DateTimeFormat(LOCALE, DATETIME_FORMAT).format(date);
};
