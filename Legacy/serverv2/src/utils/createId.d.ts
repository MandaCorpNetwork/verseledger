export declare enum IDPrefix {
    System = "X-",
    User = "U-"
}
export declare const createId: (prefix?: IDPrefix) => string;
