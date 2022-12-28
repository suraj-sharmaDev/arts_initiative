import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex w-full flex-wrap py-4">
      <div className="w-full lg:w-2/4">
        <h1 className="text-3xl font-bold">Why us?</h1>
        <p className="text-xl tracking-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
          porta massa. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Vestibulum auctor eros eget nisi
          viverra aliquet. In bibendum cursus varius. Proin sapien nisl, semper
          vel enim ut, consectetur congue eros. Vivamus tincidunt nulla eu
          sodales dignissim. Mauris sagittis malesuada nisl ut egestas.
          Vestibulum sit amet diam elementum, facilisis odio vitae, luctus
          velit. In mollis sem non ligula malesuada, eget rutrum nisi laoreet.
          Etiam vestibulum est eget ex pharetra tristique. Cras consectetur,
          orci et vestibulum eleifend, sem felis pharetra nulla, a tincidunt
          metus tortor vehicula mi. Etiam in nibh mauris.
        </p>
        <Link
          href="/auth/login"
          className="my-4 flex w-1/4 items-center justify-center rounded border-2 border-accent px-3 py-2 hover:bg-primary hover:text-gray-500"
        >
          <span className="font-bold">Join Us</span>
        </Link>
      </div>
      <div className="flex w-full items-center justify-center lg:w-2/4">
        <span
          className="w-full bg-white text-gray-400 lg:w-2/4"
          style={{ height: 200 }}
        >
          Image here
        </span>
      </div>
    </div>
  );
}
