import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import type { INavItem } from "types/nav";

export enum Variant {
  Desktop = "desktop",
  Mobile = "mobile",
}

interface Props {
  item: INavItem;
  handleNavChange?: () => void;
  variant: Variant;
}

export default function NavItem({ item, handleNavChange, variant }: Props) {
  const router = useRouter();
  const isCurrentRoute = router.pathname === item.href;

  const activeLinkClasses = `text-gray-900 ${
    variant === Variant.Desktop ? "bg-gray-200" : "bg-gray-100"
  }`;

  let extraLinkClasses;
  let extraIconClasses;
  if (variant === Variant.Desktop) {
    extraLinkClasses = "text-sm";
    extraIconClasses = "mr-3";
  } else {
    extraLinkClasses = "text-md";
    extraIconClasses = "mr-4";
  }

  return (
    <Link href={item.href} key={item.name}>
      <a
        className={classNames(
          isCurrentRoute
            ? activeLinkClasses
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 font-medium rounded-md",
          extraLinkClasses
        )}
        onClick={handleNavChange}
      >
        <item.icon
          className={classNames(
            isCurrentRoute
              ? "text-gray-500"
              : "text-gray-400 group-hover:text-gray-500",
            "h-6 w-6",
            extraIconClasses
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
    </Link>
  );
}
