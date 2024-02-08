import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  imageUrl: string;
  name: string;
};

const UserAvatar = ({ imageUrl, name }: Props) => {
  return (
    <Avatar className="relative h-8 w-8">
      <div className="relative aspect-square h-full w-full">
        <AvatarImage
          src={imageUrl}
          alt="profile picture"
          referrerPolicy="no-referrer"
        />
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      </div>
    </Avatar>
  );
};

export default UserAvatar;
