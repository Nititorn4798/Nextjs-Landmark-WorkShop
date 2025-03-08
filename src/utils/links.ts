type NavLinks = {
  href: string;
  label: string;
};

// const links: { href: string, label: string }[]

export const links: NavLinks[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/favorites", label: "Favorites" },
  { href: "/camp", label: "Camp" },
  { href: "/camp/create", label: "Create Landmark" },
];
