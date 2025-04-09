declare class IngredientDto {
    name: string;
    quantity: string;
}
export declare class CreateHoagieDto {
    name: string;
    ingredients: IngredientDto[];
    pictureUrl?: string;
}
export {};
