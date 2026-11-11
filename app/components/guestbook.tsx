"use client";

import { useState } from "react";
import { useLanguage } from "app/context/LanguageContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

export function Guestbook() {
  const { language } = useLanguage();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const slug = "guestbook-page";
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", slug],
    queryFn: async () => {
      const res = await fetch(`/api/comments?slug=${slug}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newComment: {
      slug: string;
      username: string;
      content: string;
    }) => {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("Failed to post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      setUsername("");
      setContent("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const submitUsername =
      username.trim() || (language === "zh" ? "匿名" : "Anonymous");

    mutation.mutate({ slug, username: submitUsername, content });
  };

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {language === "zh" ? "留言板" : "Guestbook"}
      </h1>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded-md border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 text-base md:text-sm"
          placeholder={
            language === "zh" ? "你的名字 (可选)" : "Your name (optional)"
          }
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded-md border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 text-base md:text-sm"
          rows={3}
          placeholder={
            language === "zh" ? "写下你的留言..." : "Leave a message..."
          }
          required
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          onClick={() => {
            if (navigator.vibrate) {
              navigator.vibrate(15);
            }
          }}
          className="w-full px-6 py-2 bg-[var(--surface-muted)] text-[var(--ink-black)] rounded-md text-sm font-medium disabled:opacity-50 active:scale-90 active:bg-[var(--surface-muted)] transition-transform whitespace-nowrap"
        >
          {mutation.isPending
            ? language === "zh"
              ? "提交中..."
              : "Submitting..."
            : language === "zh"
              ? "签写留言"
              : "Sign Guestbook"}
        </button>
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-[var(--ink-medium)] text-sm italic text-center py-8">
            {language === "zh" ? "加载中..." : "Loading..."}
          </p>
        ) : (
          <>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col p-4 border border-[var(--border)] rounded-lg bg-[var(--surface-muted)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[var(--ink-black)] text-sm">
                    {comment.username}
                  </span>
                  <span className="text-xs text-[var(--ink-medium)] font-mono">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[var(--ink-medium)] text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-[var(--ink-medium)] text-sm italic text-center py-8">
                {language === "zh"
                  ? "还没有留言，来写第一条吧！"
                  : "No messages yet. Be the first!"}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
