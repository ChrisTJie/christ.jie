import { Link } from "@/lib/navigation";
import { HeroSection } from "@/components/home/HeroSection";
import { ProfileStatCards } from "@/components/home/ProfileStatCards";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { MarkdownBlocks } from "@/components/ui/MarkdownBlocks";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="flex-grow pt-32 md:pt-[100px] flex flex-col gap-16 md:gap-[120px] px-4 md:px-16 max-w-[1280px] mx-auto w-full">
      <HeroSection />

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
            <MarkdownBlocks
              blocks={profile.bio}
              blockClassName="mb-4 last:mb-0"
            />
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
          <ProfileStatCards />
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
            className="group glass-panel p-6 rounded border border-transparent transition-all duration-300 motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:border-primary-container/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.12)]"
          >
            <MaterialIcon
              name="work"
              className="text-primary-container mb-3 text-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
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
            className="group glass-panel p-6 rounded border border-transparent transition-all duration-300 motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:border-primary-container/40 hover:shadow-[0_0_24px_rgba(0,245,255,0.12)]"
          >
            <MaterialIcon
              name="grid_view"
              className="text-primary-container mb-3 text-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
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
