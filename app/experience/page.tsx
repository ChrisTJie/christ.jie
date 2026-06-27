import type { Metadata } from "next";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Chip } from "@/components/ui/Chip";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { markdownBlockKey } from "@/lib/markdown";
import {
  certifications,
  education,
  experiences,
  skills,
} from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience Log",
  description: "專業經歷、學歷與核心技能完整紀錄",
};

export default function ExperiencePage() {
  return (
    <main className="flex-grow pt-32 md:pt-[100px] px-4 md:px-16 max-w-7xl mx-auto w-full mb-16">
      <header className="mb-12 md:mb-16 pt-4 md:pt-24 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
          Experience_<span className="text-primary-container">Log</span>
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl">
          專業經歷、系統建置與學術背景的時序紀錄。
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-16">
        {/* Timeline */}
        <section className="lg:col-span-8 relative">
          <h2 className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-10 flex items-center gap-2">
            <MaterialIcon name="work" className="text-[18px]" />
            PROFESSIONAL_TIMELINE
          </h2>
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-0 top-2 bottom-0 timeline-line" />
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-10 relative group">
                <div
                  className={`absolute -left-[37px] md:-left-[53px] top-1.5 w-3 h-3 rounded-full transition-transform group-hover:scale-150 ${exp.active
                    ? "bg-primary-container timeline-node"
                    : exp.emphasis
                      ? "bg-tertiary shadow-[0_0_10px_rgba(141,209,220,0.8)]"
                      : "bg-surface-variant border border-tertiary"
                    }`}
                />
                <div
                  className={`p-6 md:p-10 rounded-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden ${exp.active
                    ? "glass-panel"
                    : "bg-surface-variant border border-transparent hover:border-tertiary/30"
                    } ${exp.muted ? "opacity-80 hover:opacity-100" : ""}`}
                >
                  {exp.active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-[13px] font-medium tracking-wider text-tertiary">
                        {exp.company}
                      </p>
                    </div>
                    <div className="font-mono text-[13px] font-medium tracking-wider text-on-surface-variant bg-surface-variant px-3 py-1 rounded border border-tertiary/20 w-fit">
                      {exp.period}
                    </div>
                  </div>
                  {exp.description && (
                    <MarkdownContent className="mb-6 text-on-surface-variant">
                      {exp.description}
                    </MarkdownContent>
                  )}
                  {exp.highlights && (
                    <ul className="text-on-surface-variant space-y-2 mb-6">
                      {exp.highlights.map((item, index) => (
                        <li
                          key={markdownBlockKey(index, item)}
                          className="flex items-start gap-2"
                        >
                          <span className="text-primary-container font-bold mt-0.5 shrink-0">
                            &gt;
                          </span>
                          <MarkdownContent variant="inline" className="min-w-0">
                            {item}
                          </MarkdownContent>
                        </li>
                      ))}
                    </ul>
                  )}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-12">
          <div>
            <h2 className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-10 flex items-center gap-2">
              <MaterialIcon name="school" className="text-[18px]" />
              ACADEMIC_DATA
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-panel p-6 rounded-lg border-l-2 border-l-primary-container"
                >
                  <h3 className="font-bold text-primary mb-1">{edu.degree}</h3>
                  <p className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-3">
                    {edu.school}
                  </p>
                  <p className="text-on-surface-variant text-sm mb-3 leading-relaxed">
                    {edu.detail}
                  </p>
                  <p className="font-mono text-[13px] font-medium tracking-wider text-on-surface-variant">
                    {edu.graduated}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-10 flex items-center gap-2">
              <MaterialIcon name="workspace_premium" className="text-[18px]" />
              CERTIFICATIONS
            </h2>
            <div className="flex flex-col gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-surface-variant p-4 rounded-lg flex items-center gap-4 hover:bg-surface-bright transition-colors border border-tertiary/10"
                >
                  <div className="w-10 h-10 rounded bg-surface flex items-center justify-center border border-tertiary/20">
                    <MaterialIcon
                      name={cert.icon}
                      className="text-primary-container text-[20px]"
                    />
                  </div>
                  <div>
                    <h4 className="font-mono text-[13px] font-bold text-primary">
                      {cert.name}
                    </h4>
                    <p className="font-mono text-[13px] font-medium tracking-wider text-tertiary">
                      {cert.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[13px] font-medium tracking-wider text-tertiary mb-10 flex items-center gap-2">
              <MaterialIcon name="terminal" className="text-[18px]" />
              CORE_COMPETENCIES
            </h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between font-mono text-[13px] font-medium tracking-wider mb-1">
                    <span className="text-on-surface">{skill.name}</span>
                    <span
                      className={
                        skill.highlight ? "text-primary-container" : "text-tertiary"
                      }
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.highlight ? "bg-primary-container" : "bg-tertiary"}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
