import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import AboutLink from "@/components/about-link";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b bg-primaryBlack">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center bg-primaryBlack">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl text-fontColorWhite">Ambivalance</p>
          </Link>
          <div className="flex flex-row space-x-4 ml-auto items-center">
            <AboutLink />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
