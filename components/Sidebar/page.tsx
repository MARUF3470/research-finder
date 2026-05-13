"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinks = ({ searchedData }: { searchedData: any }) => {

  const pathname = usePathname();

  return (
    <div>
      {searchedData?.map((search: any) => {

        const isActive = pathname === `/research/${search.id}`;

        return (
          <div key={search.id}>
            <Link
              href={`/research/${search.id}`}
              className={`
                block px-3 py-2 rounded-md transition
                ${isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {search.query}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SideBarLinks;