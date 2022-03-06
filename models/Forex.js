import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ForexSchema = new Schema({
  date: Date,
  currencies: Array,
});

const Forex = mongoose.model('Forex', ForexSchema);

export default Forex;