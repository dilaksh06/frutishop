import { Schema, model, Types, Document } from 'mongoose';

interface IFruit extends Document {
    ProductID: Types.ObjectId;
    ProductName: string;
    Description: string;
    Price: number;
    Quantity: number;
    CategoryID: Types.ObjectId; // Foreign Key from Category
    SellerID: Types.ObjectId; // Foreign Key from Fruit Seller
    ImageURL: string;
}

const fruitSchema = new Schema<IFruit>({
    ProductID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    ProductName: { type: String, required: true },
    Description: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    CategoryID: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category model
    SellerID: { type: Schema.Types.ObjectId, ref: 'FruitSeller', required: true }, // Reference to Fruit Seller model
    ImageURL: { type: String, required: true },
});

const Fruit = model<IFruit>('Fruit', fruitSchema);

export default Fruit;
