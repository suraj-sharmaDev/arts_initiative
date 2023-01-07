import React, { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export interface DropdownProps {
  title: string | undefined;
  list?: Array<{
    icon?: JSX.Element;
    title: string;
    onClick?: () => void;
  }>;
}

export default function Dropdown({ title, list }: DropdownProps) {
  const domRef = useRef(null);
  const [isCollapsed, setCollapsed] = useState(true);
  useOnClickOutside(domRef, () => setCollapsed(true));

  return (
    <div
      ref={domRef}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className="relative cursor-pointer"
    >
      <span className="flex items-center">
        {title}
        <ChevronDownIcon
          className={`ml-1 h-4 w-4 transition-all duration-200 ease-in ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </span>
      {list && isCollapsed == false && (
        <ul className="absolute top-6 -left-[4rem] w-[15rem] divide-y bg-white py-3 text-primary">
          {list.map((item, idx) => (
            <li
              className="flex items-center gap-2 p-4 hover:bg-gray-100"
              onClick={item.onClick && item.onClick}
              key={idx}
            >
              {item.icon && item.icon}
              <span className="text-gray-500">{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
