import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("/api/Loginへ到達")

  /** formDataで来たらformData()で受け取る必要がある */
  const data = await req.formData();

  /** ここでDBとの照合などの処理 */
  console.log(data.get("name"))
  console.log(data.get("pass"))
  const ok = true;

  if (!ok) {
    return NextResponse.json({ msg: "ログイン情報が誤っています。" }, { status: 500 })
  }

  // 301 Redirectをしたが、うまくいかず。
  // Cookieの設定は完璧、"/login"から"/"にリダイレクトをした形跡はある。認証も通っている。
  // しかし、ページ遷移がされない。SPA特有の"ナニカ"の可能性が高い。
  // 今回は、locationをjsonで返し。フロント側でページ遷移をさせることで解決。
  const res = NextResponse.json({ msg: "Login OK", location: "/" }, { status: 200, headers: { 'Set-Cookie': "BBB=Nice; path=/" } });

  return res;
}
