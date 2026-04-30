import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className=" bg-slate-950">
      <div className="flex items-center gap-10 max-w-9/12 mx-auto py-3">
        <div className="w-40">
          <Link href="/">
            <Image
              src="/site_logo.png"
              alt="MoRate"
              width={400}
              height={200}
              className="max-w-full h-auto"
            />
          </Link>
        </div>
        <nav className="justify-self-start">
          <ul className="flex justify-center items-center gap-8">
            <li>
              <Link href="/movies" className="text-neutral-100 font-semibold">
                映画
              </Link>
            </li>
            <li>
              <Link href="/tv" className="text-neutral-100 font-semibold">
                テレビ
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3 ml-auto">
          <div>
            <input
              type="search"
              name="search"
              placeholder="作品を検索"
              className="bg-[#131520] rounded py-1 px-2 text-neutral-100 border border-gray-500"
            />
          </div>
          <div className="">
            <Link
              href="/login"
              className="flex items-center justify-center w-20 text-neutral-100 border-neutral-100 border-2 rounded h-9 font-bold"
            >
              ログイン
            </Link>
          </div>
          <div className="">
            <Link
              href="/signup"
              className="flex items-center justify-center w-36 h-9 text-gray-900 rounded p-2 font-bold bg-neutral-100"
            >
              アカウント作成
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
