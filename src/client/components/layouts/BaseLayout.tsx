import { BaseNavbar } from "../ui";

type Props = {
  children: React.ReactNode;
};

export default function BaseLyout({ children }: Props) {
  return (
    <>
      <BaseNavbar />
      <div className="flex min-h-full flex-col items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}
