"use client";

import { Guestbook } from "app/components/guestbook";
import { TerminalBlock } from "app/components/ui/TerminalBlock";

export function GuestbookTerminal() {
    return (
        <section className="min-h-[80vh] py-4 md:py-10 max-w-4xl mx-auto px-0 md:px-4 flex flex-col justify-start">

            <div className="mb-6 font-mono text-sm text-neutral-500">
                <span className="text-[rgb(255,82,87)]">➜</span> ~ ./write_message.sh
            </div>

            <TerminalBlock
                title="registry.log"
                className="w-full bg-black/80 backdrop-blur-xl border-white/10"
            >
                <div className="text-neutral-300 font-mono mb-4 text-sm">
                    {/* Fixed: Escaped '>' */}
                    <span className="text-[rgb(255,82,87)]">&gt; SYSTEM MSG:</span> Protocol initiated. Leave a trace in the void.
                </div>
                <hr className="border-white/10 mb-8" />

                <div className="font-mono text-sm text-neutral-400">
                    <Guestbook />
                </div>
            </TerminalBlock>

        </section>
    );
}
