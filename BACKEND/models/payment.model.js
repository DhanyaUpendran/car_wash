import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ['Cash', 'Card', 'Online'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    transactionId: {
      type: String,
      required: false, // Optional
      
    },
  },
  {
    timestamps: true, 
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
