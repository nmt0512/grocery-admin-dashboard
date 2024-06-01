export class Product {
    key?: number;
    id?: number;
    name?: string;
    code?: string;
    description?: string;
    unitPrice?: number;
    quantity?: number;
    categoryId?: number;
    images: string[] = [];
}

export class Category {
    key?: number;
    id?: number;
    name?: string;
    code?: string;
    imageUrl?: string;
}

export class Statistic {
    time?: string;
    revenue?: number;
}

