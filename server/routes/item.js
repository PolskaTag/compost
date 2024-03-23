import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
import { Item } from "../db/models.js";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// add address api
router.post("/add", async (req, res) => {
  try {
    // const user = req.user;

    const item = new Item({
      ...req.body,
      // user: user._id,
    });
    const itemDoc = await item.save();

    res.status(200).json({
      success: true,
      message: `Item has been added successfully!`,
      item: itemDoc,
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
    const items = await Item.find({ user: req.user._id });

    res.status(200).json({
      items,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// get an Item using an id
router.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const itemDoc = await Item.findOne({ _id: itemId });

    if (!itemDoc) {
      res.status(404).json({
        message: `Cannot find item with the id: ${itemId}.`,
      });
    }

    res.status(200).json({
      address: itemDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

// get an Item using an id
router.get("/:name", async (req, res) => {
  try {
    const itemName = req.params.name;

    const itemDoc = await Item.findOne({ name: itemName });

    if (!itemDoc) {
      res.status(404).json({
        message: `Cannot find item with the name: ${itemName}.`,
      });
    }

    res.status(200).json({
      address: itemDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const update = req.body;
    const query = { _id: itemId };

    await Item.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Item has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const itemDoc = await Item.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Item has been deleted successfully!`,
      itemDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

export default router;
