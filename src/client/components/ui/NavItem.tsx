import NextLink from "next/link";
import classNames from "classnames";

const NavItem = ({
  href,
  text,
  icon,
  active,
  onClick,
}: {
  href: string;
  text: string;
  icon: any;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const Icon = icon;

  return (
    <NextLink href={href}>
      <span
        onClick={onClick}
        className={classNames(
          active
            ? "bg-primary text-white hover:bg-primary hover:text-white"
            : "",
          "flex items-center rounded-lg p-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="ml-3">{text}</span>
      </span>
    </NextLink>
  );
};

export default NavItem;
