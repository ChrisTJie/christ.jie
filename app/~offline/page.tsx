import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";

export default function OfflinePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-24 text-center">
      <p className="font-mono text-[13px] tracking-widest text-tertiary">
        SIGNAL_LOST // OFFLINE_MODE
      </p>
      <h1 className="max-w-xl text-3xl font-bold text-on-surface md:text-4xl">
        目前離線，無法載入最新頁面
      </h1>
      <p className="max-w-lg text-on-surface-variant leading-relaxed">
        你已安裝的內容仍可瀏覽。恢復連線後，重新整理即可同步最新作品與媒體。
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary" icon="refresh">
          返回首頁
        </Button>
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 font-mono text-sm text-primary-container underline-offset-4 hover:underline"
        >
          瀏覽已快取作品
        </Link>
      </div>
    </main>
  );
}
