import { Schema, model, Types, Document } from 'mongoose';
import Store from './Store'; // Import the Store model
import bcrypt from 'bcrypt';

interface IUser extends Document {

    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    Address: string;
    Phone: string;
    UserType: 'Seller' | 'Buyer' | 'Admin';
    StoreId: Types.ObjectId; // Reference to the Store model
    comparePassword(candidatePassword: string): Promise<boolean>;

}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: String, required: true },
    UserType: { type: String, required: true, enum: ['Seller', 'Buyer', 'Admin'] },
    StoreId: { type: Schema.Types.ObjectId, ref: 'Store' }, // Foreign key reference to the Store model
});

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);
export { User, IUser };
