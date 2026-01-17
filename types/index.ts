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

export type Order={
    id: string;
    created_at: string;
    status: string;
    total_amount_cents: number;
    order_items: {
        name: string;
        quantity: number;
    }[];
}

export interface OrderItemInput {
  id: string;
  quantity: number;
}

export interface OrderRequestBody {
  items: OrderItemInput[];
  user_id: string;
  customer_email: string;
}

export interface DessertRow {
  id: string;
  price_cents: number;
  name: string;
}