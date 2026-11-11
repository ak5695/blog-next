"use client";

import { Guestbook } from "app/components/guestbook";
import { TerminalBlock } from "app/components/ui/TerminalBlock";

export function GuestbookTerminal() {
    return (
        <section className="min-h-[80vh] py-4 md:py-10 max-w-4xl mx-auto px-0 md:px-4 flex flex-col justify-start">

            <div className="mb-6 font-mono text-sm text-[var(--ink-medium)]">
                <span className="text-[var(--cli-accent)]">➜</span> ~ ./write_message.sh
            </div>

            <TerminalBlock
                title="registry.log"
                className="w-full bg-[var(--surface)] backdrop-blur-xl border-[var(--border)]"
            >
                <div className="text-[var(--ink-black)] font-mono mb-4 text-sm">
                    {/* Fixed: Escaped '>' */}
                    <span className="text-[var(--cli-accent)]">&gt; SYSTEM MSG:</span> Protocol initiated. Leave a trace in the void.
                </div>
                <hr className="border-[var(--border)] mb-8" />

                <div className="font-mono text-sm text-[var(--ink-medium)]">
                    <Guestbook />
                </div>
            </TerminalBlock>

        </section>
    );
}
