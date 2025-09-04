let bUnits = ['B', 'KB', 'MB', 'GB']

function getReadableSizeFromBytes(len) {
    let num = len;
    let unit = 0;
    while(unit < (bUnits.length - 1)) {
        if(num >= 1024) {
            num = num / 1024;
            unit++;
        } else {
            break;
        }
    }
    num = Math.round(num * 10) / 10
    return `${num} ${bUnits[unit > (bUnits.length - 1) ? bUnits.length : unit]}`
}

export { getReadableSizeFromBytes }