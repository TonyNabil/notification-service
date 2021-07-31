import ISendNotification from "./ISendNotification"

export default class MailService implements ISendNotification {

    async send(data) {
        if (data.userId)
            this.sendOne(data)
        else
            this.sendGroup(data)
    }

    async sendOne(data) {
        console.log(`sendOne ${data.notificationType}`)
    }

    async sendGroup(data) {
        console.log(`sendGroup ${data.notificationType}`)
    }

    getRateLimterObject(max, duration) {
        return {
            max,
            duration
        }
    }


}