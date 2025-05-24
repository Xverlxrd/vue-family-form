import type {FormData} from "@/types/form";

export function validateForm(formData: FormData): string[] {
    const errors: string[] = [];

    const parentName = formData.parent.name.trim();
    const parentAge = formData.parent.age;

    if (!parentName) {
        errors.push("✖ Имя родителя обязательно для заполнения");
    }

    if (parentAge === null) {
        errors.push("✖ Возраст родителя обязателен для заполнения");
    } else if (typeof parentAge === "number") {
        if (parentAge < 18) {
            errors.push("✖ Возраст родителя должен быть не менее 18 лет");
        } else if (parentAge > 120) {
            errors.push("✖ Возраст родителя должен быть не более 120 лет");
        }
    }

    formData.children.forEach((child, index) => {
        const childName = child.name?.trim();
        const childAge = child.age;

        if (!childName) {
            errors.push(`✖ Имя ребенка #${index + 1} обязательно для заполнения`);
        }

        if (childAge === null) {
            errors.push(`✖ Возраст ребенка #${index + 1} обязателен для заполнения`);
        } else if (typeof childAge === "number") {
            if (childAge < 1) {
                errors.push(`✖ Возраст ребенка #${index + 1} должен быть не менее 1 года`);
            } else if (childAge > 18) {
                errors.push(`✖ Возраст ребенка #${index + 1} должен быть не более 18 лет`);
            }
        }
    });

    return errors;
}
