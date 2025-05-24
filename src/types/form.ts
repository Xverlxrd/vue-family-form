export interface ParentData {
    name: string;
    age: number | null;
}

export interface ChildData {
    id: number;
    name: string;
    age: number | null;
}

export interface FormData {
    parent: ParentData;
    children: ChildData[];
}