"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Download from "./Download";
const Nav = () => {
  const { user } = useAppSelector((state) => state.user);

  const pathname = usePathname();

  return (
    <Navbar className="bg-gradient-to-r from-blue-200 to-teal-100">
      <NavbarBrand>
        <p className="font-bold text-inherit">
          M<span className="text-blue-500">D</span> RIFAT
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" underline={`${pathname === "/" ? "always" : "none"}`}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            underline={`${pathname === "/project" ? "always" : "none"}`}
            href="/project"
          >
            All Project
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/blog"
            underline={`${pathname === "/blog" ? "always" : "none"}`}
          >
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user && (
          <NavbarItem>
            <Download user={user}></Download>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
