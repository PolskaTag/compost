import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
import { ItemCategory } from "../db/models.js";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    // const user = req.user;

    const itemCategory = new ItemCategory({
      ...req.body,
      // user: user._id,
    });
    const itemDoc = await itemCategory.save();

    res.status(200).json({
      success: true,
      message: `ItemCategory has been added successfully!`,
      ItemCategory: itemDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// fetch all items api
router.get("/", async (req, res) => {
  try {
    const itemCategories = await ItemCategory.find({ user: req.user._id });

    res.status(200).json({
      itemCategories,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// get an ItemCategory using an id
router.get("/:id", async (req, res) => {
  try {
    const itemCategoryId = req.params.id;

    const doc = await ItemCategory.findOne({ _id: itemId });

    if (!doc) {
      res.status(404).json({
        message: `Cannot find ItemCategory with the id: ${itemId}.`,
      });
    }

    res.status(200).json({
      itemCategory: doc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const itemCategoryId = req.params.id;
    const update = req.body;
    const query = { _id: itemCategoryId };

    const doc = await ItemCategory.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "ItemCategory has been updated successfully!",
      itemCategory: doc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const doc = await ItemCategory.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `ItemCategory has been deleted successfully!`,
      doc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

export default router;
