const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Item contains the base compost information about an individaul item like "apple".
 */
export const itemSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    itemCategories: [{ type: Schema.Types.ObjectId, ref: 'ItemCategory' }], // item category FK
    compostCategories: [{ type: Schema.Types.ObjectId, ref: 'CompostCategory' }], // compost category FK
    description: { type: String },
    moisture: { type: Number, min: 0, max: 100 },
    decayTime: { type: String },
    pests: { type: Boolean },
    odor: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    carbon: { type: Number, min: 0, max: 100, default: 0 },
    nitrogen: { type: Number, min: 0, max: 100, default: 0 },
});

/**
 * Item category should be a grouping of items such as "kitchen scraps", 
 * or "animal refuse".
 */
export const itemCategorySchema = new Schema({
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }], // compost category FK
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

/**
 * Compost category is likely to be boiled down to "Greens" or "Browns"
 * AKA: Nitrogen heavy items or carbon heavy items respectively.
 * There could be a case where we want a different kind of category so we'll
 * make this a table just in case.
 */
export const compostCategorySchema = new Schema({
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

/**
 * Virtual composts allow us to estimate the progess of compost items. We can 
 * use the information about the items in the compost, as well as location data
 * to advise the user about the progress of their compost, as well as some tips
 * to get better results from their compost.
 */
export const virtualCompostSchema = new Schema({
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    // lightLevel
    // outdoors
    // indoors
    // zipcode
    // lastWateredAt
    // lastWateredAmount
    // lastManaged - turning or some other aeration help
    // covered? - is it covered by something? This reduces water and heat loss
    // length
    // width
    // depth
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});