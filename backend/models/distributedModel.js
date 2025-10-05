import mongoose from "mongoose";

const distributedSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      FirstName: String,
      Phone: String,
      Notes: String
    }
  ],
  uploadedAt: { type: Date, default: Date.now }
});

const DistributedList =
  mongoose.models.DistributedList ||
  mongoose.model("DistributedList", distributedSchema);

export default DistributedList;
