import Image from "next/image";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <aside   className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-black/90 shadow-md tracking-tight ">
      <footer className="flex justify-end items-center max-w-xl h-full fade md:overflow-auto scroll-pr-6  mx-4  lg:mx-auto">
        <p className=" text-neutral-600 dark:text-neutral-300">
          © {new Date().getFullYear()} All rights reserved.
          <Image
            className="inline-block ml-4 cursor-pointer"
            src={"/freedom.png"}
            width={20}
            height={20}
            alt="freedom"
          ></Image>
        </p>
      </footer>
    </aside>
  );
}
