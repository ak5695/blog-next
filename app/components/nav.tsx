import Image from "next/image";
import Link from "next/link";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blog",
  },
  "/product": {
    name: "Product",
  },
  "/contact": {
    name: "Contact",
  },
};

export function Navbar() {
  return (
    <aside
      className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black/70 shadow-md tracking-tight "
      style={{ height: "3rem" }}
    >
      <nav
        className="flex justify-start items-center max-w-xl h-full fade md:overflow-auto scroll-pr-6  mx-4  lg:mx-auto"
        id="nav"
      >
        <div className="flex flex-row items-center space-x-0 pr-10">
          <Image
            className="inline-block mr-4 cursor-pointer"
            src={"/freedom.png"}
            width={30}
            height={30}
            alt="freedom"
          ></Image>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all text-center hover:text-neutral-800 border-2 border-transparent rounded-xl hover:border-white hover:rounded-xl dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-0 "
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
