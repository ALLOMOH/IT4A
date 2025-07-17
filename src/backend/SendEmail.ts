import { Resend } from 'resend';

type SendEmailType = {
    from: string,
    to:string,
    subject: string,
    html:string,

}


export default async function SendEmail ({
    from,
    to,
    subject,
    html,
}: SendEmailType): Promise<void> {
    const resend = new Resend('re_xxxxxxxxx');

    await resend.emails.send({
        from,
        to: Array.isArray(to) ? to : [to] = "allomohangealex@gmail.com",
        subject,
        html,
    })
    ;
}