export function convertRemToPixels(rem : number){
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getClassName(styledComponent : any){
    const className = String(styledComponent).replace(".", "");
    return className;
}
