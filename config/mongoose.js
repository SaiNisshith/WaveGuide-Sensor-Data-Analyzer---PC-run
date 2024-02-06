const mongoose = require('mongoose');

main().catch(err => console.log(err));


async function main() {
  await mongoose.connect(process.env.UWG_MONGODB_ATLAS_URL);
  console.log("Successfully connected to the DB");

}