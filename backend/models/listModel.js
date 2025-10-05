import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  records: [
    {
      firstName: { type: String, required: true },
      phone: { type: String, required: true },
      notes: { type: String },
    },
  ],
});

// Prevent OverwriteModelError
const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
