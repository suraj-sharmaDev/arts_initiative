import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex w-full flex-wrap space-y-3 py-4">
      <div className="flex w-full flex-col justify-center lg:w-2/4 lg:items-center">
        <h1 className="text-2xl font-bold">Why us?</h1>
        <p className="my-6 text-[1.1rem] tracking-tight lg:w-3/4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
          porta massa. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Vestibulum auctor eros eget nisi
          viverra aliquet.
        </p>
        <Link
          href="/auth/login"
          className="btn-primary btn-md btn px-5 py-3 text-white"
        >
          <span>Join Us</span>
        </Link>
      </div>
      <div className="flex h-[15rem] w-full items-center justify-center lg:h-[27rem] lg:w-2/4">
        <img src="/images/digital-art.png" className="h-full w-full" />
      </div>
    </div>
  );
}
