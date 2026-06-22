"use server";

import { Resend } from "resend";

const resend = new Resend("re_SvrsVFkn_5BGvLjR7tMMK4SLt3UDxNJVi");

export async function sendEmail() {
  const send = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "coundreyjames@gmail.com",
    subject: "Hello World Greeting",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
  console.log(send.data);
}
