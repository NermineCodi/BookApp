import mongoose from "mongoose";
import Category from "./Category.js";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: Category,
      },
    ],
    image: {
      name: String,
      extension: String,
      imageType: String,
      destination: {
        type: String,
        required: true,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

bookSchema.pre(["find", "findOne"], function () {
  this.populate(["author", "category"]);
});

const Book = model("Book", bookSchema);
export default Book;
