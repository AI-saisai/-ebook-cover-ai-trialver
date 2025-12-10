
import React from 'react';
import { X, BookOpen, Key, MousePointer, Download, HelpCircle, Move, Maximize2, RotateCw, ArrowRightFromLine } from 'lucide-react';

interface UserManualModalProps {
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col max-h-[90vh] animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white">操作マニュアル</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded-full transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-gray-300 space-y-8 leading-relaxed flex-1">
            
            {/* Section 1 */}
            <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                    利用開始までの準備 (APIキー)
                </h3>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-sm space-y-3">
                    <p>本アプリを使用するには、Googleの無料APIキーが必要です。</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a> にアクセスしてログインします。</li>
                        <li>「Get API key」→「Create API key」をクリックします。</li>
                        <li>生成されたキーをコピーします。</li>
                        <li>アプリ右上の「⚙️ (設定)」ボタンを押し、キーを貼り付けて保存します。</li>
                    </ol>
                </div>
            </section>

            {/* Section 2 */}
            <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                    基本的な使い方
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="shrink-0 p-2 bg-gray-800 rounded h-fit"><Key className="w-5 h-5 text-yellow-500" /></div>
                        <div>
                            <h4 className="font-bold text-white mb-1">作品情報の入力</h4>
                            <p className="text-sm">カテゴリーやあらすじを入力します。<br/>迷ったら、カテゴリーを選んで<span className="text-indigo-400 font-bold">「🪄 おすすめ設定を適用」</span>ボタンを押してください。ジャンルに合った最適なデザインが自動でセットされます。</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="shrink-0 p-2 bg-gray-800 rounded h-fit"><MousePointer className="w-5 h-5 text-blue-400" /></div>
                        <div className="w-full">
                            <h4 className="font-bold text-white mb-2">編集・カスタマイズ (重要)</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 flex items-center gap-3">
                                    <span className="p-1.5 bg-blue-900/50 rounded text-blue-300"><Move className="w-4 h-4" /></span>
                                    <div>
                                        <span className="font-bold text-white block">移動</span>
                                        <span className="text-xs">ドラッグで自由に配置</span>
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 flex items-center gap-3">
                                    <span className="p-1.5 bg-green-900/50 rounded text-green-300"><Maximize2 className="w-4 h-4" /></span>
                                    <div>
                                        <span className="font-bold text-white block">拡大・縮小</span>
                                        <span className="text-xs">文字上でマウスホイール</span>
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 flex items-center gap-3">
                                    <span className="p-1.5 bg-green-600/30 rounded text-green-300"><RotateCw className="w-4 h-4" /></span>
                                    <div>
                                        <span className="font-bold text-white block">回転</span>
                                        <span className="text-xs">上の緑ハンドルをドラッグ</span>
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 flex items-center gap-3">
                                    <span className="p-1.5 bg-pink-900/50 rounded text-pink-300"><ArrowRightFromLine className="w-4 h-4" /></span>
                                    <div>
                                        <span className="font-bold text-white block">改行幅の調整</span>
                                        <span className="text-xs">横の青ハンドルをドラッグ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="shrink-0 p-2 bg-gray-800 rounded h-fit"><Download className="w-5 h-5 text-green-400" /></div>
                        <div>
                            <h4 className="font-bold text-white mb-1">保存</h4>
                            <p className="text-sm">「表紙を保存」ボタンで高解像度(JPG)でダウンロードされます。Kindle出版(KDP)にそのままアップロードできます。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                    よくある質問
                </h3>
                <div className="space-y-3 text-sm">
                    <details className="bg-gray-800/30 rounded-lg open:bg-gray-800/50 transition-colors group">
                        <summary className="p-3 cursor-pointer font-medium text-white select-none group-hover:text-indigo-300 transition-colors">Q. 画像が生成されません / エラーが出ます</summary>
                        <div className="p-3 pt-0 text-gray-400 leading-relaxed">
                            APIキーが正しく設定されていないか、あらすじに不適切な表現（過度な暴力・性描写など）が含まれている可能性があります。表現を修正して再度お試しください。
                        </div>
                    </details>
                    <details className="bg-gray-800/30 rounded-lg open:bg-gray-800/50 transition-colors group">
                        <summary className="p-3 cursor-pointer font-medium text-white select-none group-hover:text-indigo-300 transition-colors">Q. 縦書きの文字が保存時にズレます</summary>
                        <div className="p-3 pt-0 text-gray-400 leading-relaxed">
                            ブラウザの表示倍率（ズーム）が100%でない場合にズレることがあります。ブラウザのズームを100%に戻してから保存してください。それでもズレる場合は、スクリーンショット機能のご利用を推奨します。
                        </div>
                    </details>
                    <details className="bg-gray-800/30 rounded-lg open:bg-gray-800/50 transition-colors group">
                        <summary className="p-3 cursor-pointer font-medium text-white select-none group-hover:text-indigo-300 transition-colors">Q. 別のパソコンで使うには？</summary>
                        <div className="p-3 pt-0 text-gray-400 leading-relaxed">
                            APIキーはお使いのブラウザにのみ保存されます。別のパソコンやブラウザで使う場合は、再度APIキーの設定を行ってください（同じキーを使い回して問題ありません）。
                        </div>
                    </details>
                </div>
            </section>

        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-800 shrink-0 flex justify-end">
            <button
                onClick={onClose}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-indigo-900/20"
            >
                閉じる
            </button>
        </div>

      </div>
    </div>
  );
};
