export function formatDM(dateString:string){
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default",{month:"long"});
    return `${month} ${day}`
}
export function formatMY(dateString:string){
    const date = new Date(dateString);
    const month = date.toLocaleString("default",{month:"long"});
    const year = date.getFullYear();
    return `${month} ${year}`
}

export function formatDMY(dateString:string){
    const date = new Date(dateString);
    const month = date.toLocaleString("default",{month:"long"});
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`
}
export function formatYear(dateString:string){
    const date = new Date(dateString)
    const year = date.getFullYear();
    return year
}