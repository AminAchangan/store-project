import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";

export default function Breadcrumb() {
  const pathname = usePathname() ?? "/";
  const pathArray = pathname.split("/").filter((item) => item !== "");
  const [lastItemName, setLastItemName] = useState<string | null>(null);

  useEffect(() => {
    const lastItem = pathArray[pathArray.length - 1];

    if (/^[0-9a-fA-F-]{36}$/.test(lastItem)) {
      axios
        .get(`/api/products/${lastItem}`)
        .then((res) => {
          setLastItemName(res.data.name);
        })
        .catch(() => {
          setLastItemName(null);
        });
    } else {
      setLastItemName(null);
    }
  }, [pathname]);

  const crumbs = pathArray.map((item, index) => {
    const href = "/" + pathArray.slice(0, index + 1).join("/");
    const isLast = index === pathArray.length - 1;
    const name =
      isLast && lastItemName
        ? lastItemName
        : decodeURIComponent(item).replace(/-/g, " ");
    return { name, href };
  });

  return (
    <div className="flex w-full items-center justify-normal sm:justify-center">
      <div className="flex gap-3 text-sm text-primary-400 items-center">
        <Link href={"/"}>Home</Link>
        <BiChevronRight />
        {crumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-3">
            <Link
              href={crumb.href}
              className="text-muted-foreground hover:underline"
            >
              {crumb.name}
            </Link>
            {index !== crumbs.length - 1 && <BiChevronRight />}
          </span>
        ))}
      </div>
    </div>
  );
}
