import LilProfile from "./LilProfile";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <nav className="flex flex-col justify-between h-screen sticky top-0">
      <NavLinks />
      <LilProfile />
    </nav>
  );
}
