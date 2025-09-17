import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="px-2 py-4 max-w-[20rem]">
      <ul className="space-y-4">
        <li className="flex justify-between">
          E-mail
          <span>ji569414123@gmail.com</span>
        </li>
        <li className="flex justify-between">
          X.com
          <Link
            href="https://x.com/dufran_cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            dufran_cn
          </Link>
        </li>
        <li className="flex justify-between">
          Github
          <Link
            href="https://github.com/ak5695"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            杜弗兰
          </Link>
        </li>
        <li className="flex justify-between">
          WeChat
          <Image
            className=""
            src="/weixin.jpg"
            width={100}
            height={100}
            alt="official.jpg"
          ></Image>
        </li>
        <li className="flex justify-between">
          Official
          <Image
            className=""
            src="/official.jpg"
            width={100}
            height={100}
            alt="official.jpg"
          ></Image>
        </li>
      </ul>
    </main>
  );
}
