import { TablerIconsProps } from "@tabler/icons-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";

type SocialMediaLinkProps = {
  name: string;
  url: string;
  icon: (props: TablerIconsProps) => JSX.Element;
};

export const socialMediaLinks: SocialMediaLinkProps[] = [
  {
    name: "Github",
    url: "https://nanagaisie1.github.io/",
    icon: IconBrandGithub,
  },
  {
    name: "X",
    url: "https://x.com/nanagaisie",
    icon: IconBrandX,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/nana-gaisie-1b2a2b1b2/",
    icon: IconBrandLinkedin,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/nanagaisie/",
    icon: IconBrandInstagram,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/nana.gaisie.5/",
    icon: IconBrandFacebook,
  },
];
