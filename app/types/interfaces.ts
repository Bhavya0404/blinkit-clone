export interface BasicDetails {
    id: string;
    name: string;
}

export interface Category extends BasicDetails {
    display_order: number;
    is_active: boolean;
    image_url: string;
}

export interface ProductType extends BasicDetails, Category {
    secondary_images: string[];
    price: string;
    discounted_price: string;
    weight: string;
    weight_units: string,
    subcategory_id: string;
    company: string;
    additional_attributes: {
        shelf_life: string;
        storage_tips: string;
        return_policy: string;
        country_of_origin: string;
        customer_care_details: string;
    };
    outOfStock: boolean;
}