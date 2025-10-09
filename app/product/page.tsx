import Link from "next/link";

export default function Product() {
  return (
    <main className="px-2 py-4 max-w-[20rem]">
      <ul className="space-y-4">
        <li className="flex justify-between">
          <Link
            href="https://www.aristotle.dufran.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Aristotle.AI
          </Link>
          2025.09
        </li>
        <li className="flex justify-between">
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
