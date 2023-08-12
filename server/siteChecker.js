import isUp from 'is-up';
import Url from "./database/schema/Url.js";
import axios from 'axios'
import nodemailer from 'nodemailer'


export function SiteChecker() {
    setInterval(checkSites, 10000);
}

async function checkSites() {
    const urlsList = await Url.find({})
    urlsList.forEach((urlItem) => {
        CheckifUrlUp(urlItem)
    })
}

const CheckifUrlUp = async ({ url, email, id, isDown }) => {

    let IsDOWN = await Check(url);
    console.log(`${url}:${IsDOWN}`)
    if (isDown !== IsDOWN)
        await Url.updateOne({ id: id }, { isDown: IsDOWN });

    if (!isDown && IsDOWN) // Previously its not down but now its down
        MailUser(email, url);
}
const Check = async (url) => {

    var isDown = false;
    if (await isUp(url)) {
        const DOWN_RESPONSETIME = 4000;
        axios.interceptors.request.use((config) => {
            config.metadata = { startTime: Date.now() }
            return config;
        }, (error) => {
            console.log(error);
        });
        axios.interceptors.response.use((response) => {
            response.config.metadata.endTime = Date.now()
            response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
            return response;
        }, (error) => {
            console.log(error);
        })
        const response = await axios.get(url);
        const responseDuration = await response.duration;
        console.log(`${url} : ${responseDuration}`)
        if (responseDuration > DOWN_RESPONSETIME) {
            isDown = true;
        }
    }
    else
        isDown = true;

    return isDown;
}
const MailUser = (email, url) => {
    var mailOptions = {
        from: '"Site Monitor Team"',
        to: `${email}`,
        subject: `Your Site ${url} is Down`,
        text: `Your Site ${url} is Down Since ${Date.now()}ms. Take Necessay action to restore the service`,
    };

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "8f44e5a6227ff0",
            pass: "5235144478e9f5"
        }
    });
    transport.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log(error);
    });
}