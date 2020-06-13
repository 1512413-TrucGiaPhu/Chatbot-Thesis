const mongoose = require('mongoose');
const { Schema } = mongoose;


const phoneSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  display_technology: String,
  display_protection: String,
  display_resolution: String,
  display_size: String,
  back_camera_resolution: String,
  back_camera_video: String,
  back_camera_flash: String,
  back_camera_advanced: String,
  front_camera_resolution: String,
  front_camera_videocall: String,
  front_camera_other_infor: String,
  operating_system: String,
  os_version: String,
  chipset: String,
  cpu: String,
  gpu: String,
  ram: String,
  memory_internal: String,
  memory_available: String,
  memory_card_slot: String,
  mobile_network: String,
  sim: String,
  wifi: String,
  gps: String,
  bluetooth: String,
  charging_port: String,
  headphone_jack: String,
  other_port: String,
  design: String,
  material: String,
  dimensions: String,
  weight: String,
  battery_capacity: String,
  battery_type: String,
  battery_technology: String,
  advanced_security: String,
  special_features: String,
  recording: String,
  radio: String,
  watchfilm: String,
  music: String,
  time_of_lunch: String
});


module.exports = mongoose.model('phones', phoneSchema);