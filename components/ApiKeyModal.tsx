import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
  onKeySelected: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onKeySelected }) => {
  const handleSelectKey = async () => {
    // Check if running in AI Studio environment
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      try {
        await (window as any).aistudio.openSelectKey();
        onKeySelected();
      } catch (e) {
        console.error("API Key selection failed or cancelled", e);
      }
    } else {
      // Vercelなどの外部環境の場合
      alert("この機能はGoogle AI Studio開発環境でのみ動作します。\n製品版(Web公開版)では、環境変数としてAPIキーが設定されているため、この操作は不要です。");
      // 環境変数が設定されていれば、そのまま進めるように親コンポーネントへ通知することも検討できますが、
      // ここではユーザーへの通知のみにとどめます。
    }
  };

  return (
    <button
      onClick={handleSelectKey}
      className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
    >
      <Key className="w-4 h-4" />
      <span>APIキーを選択 (開発環境用)</span>
    </button>
  );
};