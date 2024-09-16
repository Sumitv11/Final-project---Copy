export default function dateFormatter(dateString: string): string {
    const newDate = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };
    
    const formattedDate = newDate.toLocaleString('en-US', options);
    return formattedDate;
}
