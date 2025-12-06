"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "app/context/LanguageContext";

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

export function Comments({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?slug=${slug}`);
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const submitUsername =
      username.trim() || (language === "zh" ? "匿名" : "Anonymous");

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, username: submitUsername, content }),
      });

      if (res.ok) {
        setUsername("");
        setContent("");
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to submit comment", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-xl font-semibold mb-6">
        {language === "zh" ? "评论" : "Comments"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-600 dark:text-neutral-400">
            {language === "zh" ? "昵称" : "Name"}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder={
              language === "zh"
                ? "你的名字 (可选，默认为匿名)"
                : "Your name (optional, default is Anonymous)"
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-neutral-600 dark:text-neutral-400">
            {language === "zh" ? "内容" : "Comment"}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500"
            rows={3}
            placeholder={
              language === "zh" ? "写下你的想法..." : "Write your thoughts..."
            }
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-md text-sm font-medium disabled:opacity-50 active:scale-95 transition-transform"
        >
          {loading
            ? language === "zh"
              ? "提交中..."
              : "Submitting..."
            : language === "zh"
            ? "发表评论"
            : "Post Comment"}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {comment.username}
              </span>
              <span className="text-xs text-neutral-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {comment.content}
            </p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-neutral-500 text-sm italic">
            {language === "zh"
              ? "暂无评论，来抢沙发吧！"
              : "No comments yet. Be the first!"}
          </p>
        )}
      </div>
    </div>
  );
}
