export type Product = {
    id: string;
    created_at: string;
    name: string;
    slug: string;
    summary: string;
    description: string;
    price_cents: number;
    thumbnail_url: string;
    images: string[];
    category_id: string;
    stock_count: number;
    nutritional_info: {
        sugar: string;
        calories: number;
        allergens: string[];
    };
    is_featured: boolean;
    categories: {
        name: string;
    };
}