export function convertTo12HourFormat(time: string) {
    if (!time || typeof time !== 'string' || !time.includes(':')) return '';

    const [hours, minutes] = time.split(':');

    let convertedHours = parseInt(hours, 10);
    if (isNaN(convertedHours)) return '';

    let meridiem = 'AM';

    if (convertedHours >= 12) {
        meridiem = 'PM';
        if (convertedHours > 12) convertedHours -= 12;
    } else if (convertedHours === 0) {
        convertedHours = 12;
    }

    const formattedHours = convertedHours.toString().padStart(2, '0');
    const formattedMinutes = (minutes || '00').padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
}

export function convertTo24HourFormat(time: string) {
    if (!time || typeof time !== 'string' || !time.includes(' ')) return '';

    const [rawTime, meridiem] = time.split(' ');
    if (!rawTime || !meridiem) return '';

    const [hours, minutes] = rawTime.split(':');
    let convertedHours = parseInt(hours, 10);
    if (isNaN(convertedHours)) return '';

    if (meridiem === 'PM' && convertedHours !== 12) {
        convertedHours += 12;
    } else if (meridiem === 'AM' && convertedHours === 12) {
        convertedHours = 0;
    }

    const formattedHours = convertedHours.toString().padStart(2, '0');
    const formattedMinutes = (minutes || '00').padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:00`;
}
