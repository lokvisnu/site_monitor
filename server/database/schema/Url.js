import mongoose, { model, Schema } from "mongoose";
const UrlSchema = new Schema({
    id: String,
    email: String,
    url: String,
    isDown: Boolean
})
const Url = model('url', UrlSchema);
export default Url;
