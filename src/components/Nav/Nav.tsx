"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Download from "./Download";
import { ChevronLeft, Menu } from "lucide-react";
import { isCollapsed, logOut } from "@/redux/features/user/userSlice";
const Nav = () => {
  const dispatch = useAppDispatch();
  const { user, collapsed, decodeUser } = useAppSelector((state) => state.user);

  const pathname = usePathname();

  return (
    <Navbar className="max-w-7xl mx-auto bg-gradient-to-r from-blue-200 to-teal-100 fixed top-0">
      <NavbarContent className="md:hidden">
        {collapsed ? (
          <ChevronLeft
            onClick={() => dispatch(isCollapsed(false))}
          ></ChevronLeft>
        ) : (
          <Menu onClick={() => dispatch(isCollapsed(true))}></Menu>
        )}
      </NavbarContent>
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
        {decodeUser ? (
          <NavbarItem>
            <Link
              href="/dashboard"
              underline={`${pathname === "/dashboard" ? "always" : "none"}`}
            >
              Admin Dashboard
            </Link>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden"></NavbarItem>
        )}
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
        {decodeUser ? (
          <NavbarItem className="hidden"></NavbarItem>
        ) : (
          <NavbarItem>
            <Link
              href="/login"
              underline={`${pathname === "/login" ? "always" : "none"}`}
            >
              Login
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        {user && (
          <NavbarItem className="hidden sm:block">
            <Download user={user}></Download>
          </NavbarItem>
        )}
        <NavbarItem className="block sm:hidden">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Menu></Menu>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              closeOnSelect={false}
              variant="flat"
            >
              <DropdownItem className="block sm:hidden" key="download">
                {user && <Download user={user}></Download>}
              </DropdownItem>
              <DropdownItem
                className="block sm:hidden"
                as={Link}
                key="Home"
                href="/"
              >
                Home
              </DropdownItem>
              {decodeUser ? (
                <DropdownItem
                  className="block sm:hidden"
                  as={Link}
                  key="dashboard"
                  href="/dashboard"
                >
                  Admin Dashboard
                </DropdownItem>
              ) : (
                <DropdownItem className="hidden"></DropdownItem>
              )}
              <DropdownItem
                className="block sm:hidden"
                as={Link}
                key="project"
                href="/project"
              >
                Project
              </DropdownItem>
              <DropdownItem
                className="block sm:hidden"
                as={Link}
                key="blog"
                href="/blog"
              >
                Blog
              </DropdownItem>
              {decodeUser ? (
                <DropdownItem
                  onClick={() => {
                    dispatch(logOut());
                  }}
                  key="logout"
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              ) : (
                <DropdownItem as={Link} key="login" href="/login">
                  Login
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
