import Link from "next/link";

export default function Product() {
  return (
    <main className="px-2 py-4">
      <ul className="space-y-4">
        <li className="flex gap-10">
          <Link
            href="https://www.andy-dufran.life"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Coach.AI 
          </Link>
          <span>(building)</span>
          2025.09
        </li>
        <li className="flex gap-10">
          <Link
            href="https://www.corner-design.work"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Corner Design Tool
          </Link>
          2025.08
        </li>
      </ul>
    </main>
  );
}
