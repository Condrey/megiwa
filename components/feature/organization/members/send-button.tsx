"use client";

import { Button } from "@/components/ui/button";
import { sendEmail } from "./action";

export default function SendButton() {
  async function sendTheMail() {
    await sendEmail();
  }

  return <Button onClick={sendTheMail}>Send</Button>;
}
