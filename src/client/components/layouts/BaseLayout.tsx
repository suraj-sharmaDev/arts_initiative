import { BaseNavbar } from "../ui";

type Props = {
  children: React.ReactElement;
};

export default function BaseLyout({ children }: Props) {
  return (
    <>
      <BaseNavbar pageProps={children?.props} />
      <div className="flex min-h-full flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}
