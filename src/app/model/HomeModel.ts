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

export class User {
    key?: string;
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export enum UserRoles {
    CUSTOMER = 'CUSTOMER',
    STAFF = 'STAFF'
}

