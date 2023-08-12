import mongoose from 'mongoose'
import Url from './schema/Url.js';
const uri = "mongodb+srv://lokvisnu009:lokvisnu2004@cluster0.obzbx6e.mongodb.net/sitemonitor?retryWrites=true&w=majority";
mongoose.connect(uri)
export async function AddUrlTOList(email, url) {
    const newUrl = new Url({
        id: Date.now().toString(),
        email: email,
        url: url,
        isDown: false
    })
    await newUrl.save();
}
