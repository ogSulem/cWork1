export function generateID(items) {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}