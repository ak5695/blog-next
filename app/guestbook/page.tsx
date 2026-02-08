import { GuestbookTerminal } from "./components/GuestbookTerminal";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export default function GuestbookPage() {
  return <GuestbookTerminal />;
}
