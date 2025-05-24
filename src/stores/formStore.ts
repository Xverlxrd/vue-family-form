import { defineStore } from 'pinia';

interface ParentData {
    name: string;
    age: number | null;
}

interface ChildData {
    name: string;
    age: number | null;
}

interface FormData {
    parent: ParentData;
    children: ChildData[];
}

export const useFormStore = defineStore('form', {
    state: (): { savedData: FormData | null } => ({
        savedData: null
    }),
    actions: {
        saveFormData(data: FormData): void {
            this.savedData = data;
        },
        getSavedData(): FormData | null {
            return this.savedData;
        }
    }
});