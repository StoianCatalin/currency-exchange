
export default function removeNonNumericCharacters(value: string): string {
    return value.replace(/[^\d.]/g,'');
}
