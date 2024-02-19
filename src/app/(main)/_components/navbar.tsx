import UserAccountNav from "@/components/auth/user-account-nav";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="flex flex-col gap-20 bg-transparent p-5">
      <UserAccountNav />
    </div>
  );
};

export default NavBar;
