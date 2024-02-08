import Link from "next/link";

import { socialMediaLinks } from "@/constants/social-media-links";

import { buttonVariants } from "./ui/button";

type Props = {};

const SocialMediaLinks = (props: Props) => {
  return (
    <ul className="m-0 flex list-none items-center justify-center gap-6">
      {socialMediaLinks.map((social, index) => (
        <li key={index}>
          <Link
            href={social.url}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <social.icon className="h-5 w-5" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { SocialMediaLinks };
