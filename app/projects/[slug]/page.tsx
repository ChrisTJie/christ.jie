import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { notFound } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Chip } from "@/components/ui/Chip";
import { getProjectBySlug, projects } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="pt-32 pb-[120px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 font-mono text-[13px] text-on-surface-variant hover:text-primary-container transition-colors mb-8"
        >
          <MaterialIcon name="arrow_back" className="text-[18px]" />
          BACK_TO_ARCHIVE
        </Link>

        <section className="mb-24">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-surface-container-high border border-tertiary/20 overflow-hidden mb-8 group">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={1400}
              height={600}
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute top-4 left-4 font-mono text-[12px] font-medium tracking-widest text-tertiary opacity-70">
              SYS.OP. [ACTIVE] // {project.category}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <span className="w-2 h-2 bg-primary-container animate-pulse" />
              <span className="w-2 h-2 bg-on-surface-variant" />
              <span className="w-2 h-2 bg-on-surface-variant" />
            </div>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-pure-white mb-2 tracking-tight">
              {project.title}
            </h1>
            <p className="text-2xl font-semibold text-primary-container mb-8">
              {project.subtitle}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-[120px]">
          <div className="lg:col-span-8 bg-surface-container-low border border-tertiary/10 p-8 hover:border-tertiary/30 transition-colors">
            <h2 className="font-mono text-[12px] font-medium tracking-widest text-tertiary mb-6 flex items-center gap-2">
              <MaterialIcon name="terminal" className="text-[18px]" />
              EXECUTIVE_SUMMARY
            </h2>
            {project.summary.map((paragraph) => (
              <p
                key={paragraph.slice(0, 30)}
                className="text-lg text-on-surface-variant mb-6 leading-relaxed last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            {(project.role || project.timeline) && (
              <div className="bg-surface-container-high border border-tertiary/20 p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-mono text-[12px] font-medium tracking-widest text-on-surface mb-4 opacity-60">
                  TIMELINE & ROLE
                </h3>
                {project.role && (
                  <div className="text-base text-pure-white mb-2">
                    <span className="text-primary-container mr-2">&gt;</span>
                    {project.role}
                  </div>
                )}
                {project.timeline && (
                  <div className="text-base text-pure-white">
                    <span className="text-primary-container mr-2">&gt;</span>
                    {project.timeline}
                  </div>
                )}
              </div>
            )}
            <div className="bg-surface-container-low border border-tertiary/10 p-6 flex-grow">
              <h3 className="font-mono text-[12px] font-medium tracking-widest text-tertiary mb-6">
                STACK_DEPLOYED
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <Chip key={tag} active={i === 0}>
                    {tag}
                  </Chip>
                ))}
              </div>
              <p className="font-mono text-[12px] text-on-surface-variant">
                DEPL: {project.deployed}
              </p>
            </div>
            {project.links && project.links.length > 0 && (
              <div className="bg-surface-container-low border border-tertiary/10 p-6">
                <h3 className="font-mono text-[12px] font-medium tracking-widest text-tertiary mb-4">
                  EXTERNAL_LINKS
                </h3>
                <div className="flex flex-col gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="font-mono text-[13px] text-primary-container hover:text-primary transition-colors"
                    >
                      &gt; {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8 border-b border-tertiary/20 pb-4">
            <h2 className="text-2xl font-semibold text-pure-white tracking-tight">
              VISUAL_ARCHIVE
            </h2>
            <span className="font-mono text-[12px] font-medium tracking-widest text-tertiary">
              {project.gallery.length.toString().padStart(2, "0")} ITEMS CACHED
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.gallery.map((item) => (
              <div
                key={item.label}
                className={`group relative bg-surface-container-high aspect-square overflow-hidden border border-transparent hover:border-primary-container/50 transition-colors ${item.wide ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <p className="font-mono text-[12px] font-medium tracking-widest text-tertiary">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
