import AppRouterDashboard from "@/app/ui/dashboard/app-router-dashboard";
import PagesRouterDashboard from "@/app/ui/dashboard/pages-router-dashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/app/ui/skeletons";
import { PagesRouterIframe } from "@/pages/components/PagesRouterIframe";

export default function ComparePage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-3xl font-bold mb-4">Router Comparison</h1>
        <p className="text-gray-600 mb-8">
          App RouterとPages Routerの実際の動作の違いを比較します。
        </p>

        {/* 比較テーブル */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">主な違い</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">機能</th>
                  <th className="text-left p-2">App Router</th>
                  <th className="text-left p-2">Pages Router</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">レンダリング方式</td>
                  <td className="p-2 text-blue-600">
                    React Server Components + Streaming が標準
                  </td>
                  <td className="p-2 text-orange-600">
                    HTMLは一括返却（ストリーミング不可）
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">スケルトンスクリーン</td>
                  <td className="p-2 text-blue-600">
                    loading.tsx + Suspense による ルート/セグメント単位
                  </td>
                  <td className="p-2 text-orange-600">自前実装（CSR）</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">データ取得</td>
                  <td className="p-2 text-blue-600">
                    コンポーネント単位で並列取得（RSC）
                  </td>
                  <td className="p-2 text-orange-600">
                    ページ単位で取得（getServerSideProps）
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Time to First Byte</td>
                  <td className="p-2 text-blue-600">早い（部分表示）</td>
                  <td className="p-2 text-orange-600">
                    遅い（全HTML生成後に返却）
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Suspense</td>
                  <td className="p-2 text-blue-600">SSR対応</td>
                  <td className="p-2 text-orange-600">CSRのみ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ダッシュボード比較 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ********************************************************************
           * App Router版
           * RSC + Suspense による Streaming SSR を検証
           * 各セクションはデータ取得完了次第、順次描画される
           ********************************************************************
           */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
            <div className="mb-4 pb-4 border-b">
              <h2 className="text-xl font-semibold text-blue-600">
                App Router (Next.js 14+)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Server Components + Suspense + Streaming
              </p>
              <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                💡 各セクションが準備でき次第、順次表示されます
              </div>
            </div>
            <Suspense fallback={<DashboardSkeleton />}>
              <AppRouterDashboard />
            </Suspense>
          </div>

          {/* ********************************************************************
           * Pages Router版
           * getServerSideProps によるページ単位のブロッキングSSRを検証
           * HTML生成完了までレスポンスが返らない
           ********************************************************************
           */}
          <PagesRouterIframe />
        </div>

        {/* 説明セクション */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">観察ポイント</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">
                ✨ App Router (Suspense使用)
              </h4>
              <ul className="space-y-1 ml-4 list-disc">
                <li>
                  各セクション（カード、チャート、請求書）が
                  <strong className="text-blue-700">
                    準備でき次第、順次表示
                  </strong>
                  されます
                </li>
                <li>
                  各セクションの上に
                  <strong className="text-blue-700">
                    ロード完了の通知とロード時間
                  </strong>
                  が表示されます
                </li>
                <li>
                  ロード中は
                  <strong className="text-blue-700">
                    スケルトンスクリーン
                  </strong>
                  が表示され、どのセクションがロード中かが分かります
                </li>
                <li>
                  ユーザーは
                  <strong className="text-blue-700">
                    早い段階でコンテンツを見ることができ
                  </strong>
                  、段階的に情報が増えていく様子を体験できます
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2">
                ⏳ Pages Router (従来方式)
              </h4>
              <ul className="space-y-1 ml-4 list-disc">
                <li>
                  <strong className="text-orange-700">
                    全データ取得が完了するまで
                  </strong>
                  、スケルトンスクリーンが表示されます
                </li>
                <li>
                  すべてのデータが揃ってから
                  <strong className="text-orange-700">一括で表示</strong>
                  されます
                </li>
                <li>
                  最も遅いデータソースに依存するため、
                  <strong className="text-orange-700">
                    全体のロード時間が長くなる
                  </strong>
                  可能性があります
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">
                🚀 パフォーマンス比較
              </h4>
              <p>
                App Routerは
                <strong className="text-green-700">
                  Time to First Byte（TTFB）が早く
                </strong>
                、
                ユーザー体験が向上します。特に遅いデータソースがある場合、違いが顕著に現れます。
                ページをリロードして、左側（App
                Router）では各セクションが順次表示され、 右側（Pages
                Router）では全データ取得後に一括表示される様子を観察してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
