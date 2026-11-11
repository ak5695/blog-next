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

export function Comments({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
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
    <div className="mt-12 pt-8 border-t border-[var(--border)] ">
      <h2 className="text-xl font-semibold mb-6">
        {language === "zh" ? "评论" : "Comments"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--ink-medium)]">
            {language === "zh" ? "昵称" : "Name"}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder={
              language === "zh"
                ? "你的名字 (可选，默认为匿名)"
                : "Your name (optional, default is Anonymous)"
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[var(--ink-medium)]">
            {language === "zh" ? "内容" : "Comment"}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded-md border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500"
            rows={3}
            placeholder={
              language === "zh" ? "写下你的想法..." : "Write your thoughts..."
            }
            required
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          onClick={() => navigator.vibrate?.(15)}
          className="px-4 py-2 bg-[var(--surface-muted)] text-[var(--ink-black)] rounded-md text-sm font-medium disabled:opacity-50 active:scale-90 active:bg-[var(--surface-muted)] transition-transform"
        >
          {mutation.isPending
            ? language === "zh"
              ? "提交中..."
              : "Submitting..."
            : language === "zh"
            ? "发表评论"
            : "Post Comment"}
        </button>
      </form>

      <div className="space-y-6">
        {isLoading ? (
          <p className="text-[var(--ink-medium)] text-sm italic">
            {language === "zh" ? "加载中..." : "Loading..."}
          </p>
        ) : (
          <>
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--ink-black)]">
                    {comment.username}
                  </span>
                  <span className="text-xs text-[var(--ink-medium)]">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[var(--ink-medium)] text-sm">
                  {comment.content}
                </p>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-[var(--ink-medium)] text-sm italic">
                {language === "zh"
                  ? "暂无评论，来抢沙发吧！"
                  : "No comments yet. Be the first!"}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
