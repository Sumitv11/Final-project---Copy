export function areObjectsEqual<T>(obj1:T, obj2:T) {
    const stringifiedObj1 = JSON.stringify(obj1);
    const stringifiedObj2 = JSON.stringify(obj2);
    return stringifiedObj1 === stringifiedObj2;
}