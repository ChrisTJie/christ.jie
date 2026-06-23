import Image from "next/image";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="flex-grow pt-32 md:pt-[100px] flex flex-col gap-16 md:gap-[120px] px-4 md:px-16 max-w-[1280px] mx-auto w-full">
      {/* Hero */}
      <section className="min-h-[58vh] md:min-h-[70vh] flex flex-col justify-center relative">
        <div className="absolute inset-0 z-0 opacity-20 blur-3xl rounded-full bg-primary-container w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen pointer-events-none" />
        <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          <div className="flex flex-col gap-10 max-w-3xl">
            <div className="font-mono text-[13px] font-medium tracking-wider text-tertiary flex items-center gap-2">
              <span className="w-8 h-px bg-tertiary" />
              SYSTEM_INITIALIZED
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
              {profile.headline}
              <br />
              <span className="text-primary-container">{profile.headlineAccent}</span>
            </h1>
            <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/projects/" variant="primary" icon="arrow_forward">
                INITIATE_SEQUENCE
              </Button>
              <Button href="/experience/" variant="secondary" icon="terminal">
                VIEW_LOGS
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-primary-container/20 blur-xl rounded opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative border border-primary/30 overflow-hidden rounded aspect-[3/4] max-w-sm mx-auto md:mx-0 md:ml-auto xr-hologram">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={400}
                height={533}
                className="w-full h-full object-cover xr-hologram-image"
                priority
              />
              <div className="xr-hologram-scan" aria-hidden="true" />
              <div className="xr-hologram-corners" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 text-tertiary/40 font-mono text-[10px]">
          <div>&gt; XR_RUNTIME: ACTIVE</div>
          <div>&gt; SPATIAL_TRACK: 6DOF</div>
          <div>&gt; ANCHOR_SYNC: 12ms</div>
          <div className="h-32 w-px bg-gradient-to-b from-tertiary/40 to-transparent ml-2 mt-4" />
        </div>
      </section>

      {/* About */}
      <section className="flex flex-col gap-10">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">ABOUT_ME</h2>
          <div className="flex-grow h-px bg-tertiary/20" />
          <span className="font-mono text-[13px] font-medium tracking-wider text-tertiary">
            [01]
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 bg-surface-container-highest p-8 border border-tertiary/20 neon-border rounded relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-tertiary/30 group-hover:text-tertiary/60 transition-colors">
              <MaterialIcon name="fingerprint" className="text-4xl" />
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              &gt; IDENTITY_DATA
            </h3>
            {profile.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 20)}
                className="text-on-surface-variant mb-4 leading-relaxed last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex gap-4 flex-wrap">
              <div className="flex flex-col">
                <span className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-1">
                  LOCATION
                </span>
                <span className="text-on-surface">{profile.location}</span>
              </div>
              <div className="w-px bg-tertiary/20" />
              <div className="flex flex-col">
                <span className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-1">
                  STATUS
                </span>
                <span className="text-primary-container flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse" />
                  {profile.status}
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-5">
            {profile.stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-surface-container-highest p-6 border border-tertiary/20 flex-grow rounded flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors"
              >
                <span className="text-4xl md:text-5xl font-bold text-primary-container mb-2">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="font-mono text-[13px] font-medium tracking-wider text-tertiary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-semibold text-on-surface">QUICK_ACCESS</h2>
          <div className="flex-grow h-px bg-tertiary/20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href="/experience/"
            className="group glass-panel p-6 rounded hover:border-primary/50 transition-colors"
          >
            <MaterialIcon
              name="work"
              className="text-primary-container mb-3 text-2xl"
            />
            <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-container transition-colors">
              Experience_Log
            </h3>
            <p className="text-on-surface-variant text-sm">
              專業經歷、學歷與核心技能完整紀錄
            </p>
          </Link>
          <Link
            href="/projects/"
            className="group glass-panel p-6 rounded hover:border-primary/50 transition-colors"
          >
            <MaterialIcon
              name="grid_view"
              className="text-primary-container mb-3 text-2xl"
            />
            <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-container transition-colors">
              Project_Archive
            </h3>
            <p className="text-on-surface-variant text-sm">
              技術部署與互動系統作品集
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
