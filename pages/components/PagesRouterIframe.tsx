"use client";

import { useState } from "react";
import { ClipLoader } from "react-spinners";

export function PagesRouterIframe() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-500">
      <div className="mb-4 pb-4 border-b">
        <h2 className="text-xl font-semibold text-orange-600">
          Pages Router (従来)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          getServerSideProps + ブロッキングレンダリング
        </p>
        <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
          ⏳ 全データ取得完了まで待機します
        </div>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center" style={{ height: '800px' }}>
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      <iframe 
        src="/dashboard" 
        className="w-full border-0"
        style={{ height: '800px', display: isLoading ? 'none' : 'block' }}
        title="Pages Router Dashboard"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}