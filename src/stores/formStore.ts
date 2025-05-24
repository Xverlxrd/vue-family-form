import {defineStore} from 'pinia';
import type {FormData} from "@/types/form";

export const useFormStore = defineStore('form', {
    state: (): { savedData: FormData | null } => ({
        savedData: null
    }),
    actions: {
        saveFormData(data: FormData): void {
            this.savedData = {
                parent: {
                    name: data.parent.name,
                    age: data.parent.age !== null ? Number(data.parent.age) : null
                },
                children: data.children.map(child => ({
                    id: child.id,
                    name: child.name,
                    age: child.age !== null ? Number(child.age) : null
                }))
            };
        }
    }
});