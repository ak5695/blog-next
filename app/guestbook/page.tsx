import { Guestbook } from "app/components/guestbook";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export default function GuestbookPage() {
  return (
    <section>
      <Guestbook />
    </section>
  );
}
