import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32  bg-slate-950 px-5 py-5 border-t-[1px] border-gray-800">
      <div className="text-center mb-5">
        <p className="text-neutral-100 text-sm">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
      <div className="flex justify-center items-center gap-5 text-neutral-100 text-sm mb-2">
        <Link href="/terms">利用規約</Link>
        <Link href="/privacy">プライバシーポリシー</Link>
      </div>
      <div className="text-center">
        <small className="text-neutral-100">
          &copy; {String(year)} MoRate. 映画・ドラマのレビュー比較サービス. All
          rights reserved.
        </small>
      </div>
    </footer>
  );
}
