import { Schema, model } from 'mongoose';

interface IStore {
    StoreId: number;
    StoreName: string;
}

const storeSchema = new Schema<IStore>({
    StoreId: { type: Number, required: true, unique: true },
    StoreName: { type: String, required: true },
});

const Store = model<IStore>('Store', storeSchema);

export default Store;
