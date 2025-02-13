import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  phone: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  
vehicleNumber: {
    type: String,
    required : true,
}
},{timestamps:true});

const Client = mongoose.model('Client', clientSchema);

export default Client;