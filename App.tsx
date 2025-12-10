
import React, { useState } from 'react';
import { BookData, GeneratedImageResult } from './types';
import { generateBookCover } from './services/geminiService';
import { BookForm } from './components/BookForm';
import { GeneratedCover } from './components/GeneratedCover';
import { LoadingOverlay } from './components/LoadingOverlay';
import { BookOpen, AlertCircle, Rocket, Check, Sparkles, AlertTriangle, Key, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedImageResult | null>(null);
  const [currentBookData, setCurrentBookData] = useState<BookData | null>(null);

  const handleGenerate = async (data: BookData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentBookData(data);

    try {
      const generatedImage = await generateBookCover(data);
      setResult(generatedImage);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "画像の生成中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (currentBookData) {
      handleGenerate(currentBookData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 max-w-7xl mx-auto">
      <header className="w-full flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg shadow-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                E-Book Cover AI
                </h1>
                <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Free Trial</span>
                <span className="bg-red-500/20 text-red-300 border border-red-500/50 text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 期間限定
                </span>
                <span className="text-xs text-gray-500 font-bold self-end mb-0.5 ml-1">by SAISAI</span>
            </div>
            <p className="text-xs text-gray-400">電子書籍表紙メーカー (体験版)</p>
          </div>
        </div>
      </header>

      <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Form */}
        <section className="flex flex-col gap-6">
          
          {/* Usage Warning & Limited Time Notice */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-start gap-3 text-yellow-200 text-sm shadow-sm">
             <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-yellow-400" />
             <div className="leading-relaxed">
               <p className="font-bold mb-2 text-red-300 flex items-center gap-2">
                   <Clock className="w-4 h-4" />
                   本アプリは期間限定の公開です。
               </p>
               <p className="mb-3 text-yellow-100/70">予告なく公開を終了する場合がありますので、お早めにお試しください。</p>
               
               <div className="h-px bg-yellow-500/20 my-2 w-full"></div>
               
               <p>
               <strong>ご注意:</strong> アクセス集中によりエラーが出ることがあります。<br/>
               その際はしばらく待ってから再試行してください。
               </p>
             </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-xl border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">作品情報を入力</h2>
            <BookForm onGenerate={handleGenerate} isLoading={loading} />
          </div>

          {/* PRO Upsell Banner */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-indigo-500/30 p-5 rounded-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Rocket className="w-24 h-24 text-white transform rotate-45" />
             </div>
             <h3 className="font-bold text-indigo-200 flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                製品版(PRO)では何ができる？
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>帯の全色・全デザイン解放</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>高画質での画像保存・DL</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>透かし(Watermark)の解除</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>参考画像の挿入 (キャラ固定)</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>詳細な構図・ライティング設定</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>選べるフォント種類の大幅増加</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>文字・バッジの回転(傾き)調整</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300 font-medium sm:col-span-2 mt-1 pt-2 border-t border-gray-700/50">
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    <span>製品版（PRO）ではGoogleのAPIキーが必要です</span>
                </div>
             </div>
          </div>
        </section>

        {/* Right Column: Preview */}
        <section className="flex flex-col gap-6">
           <div className="bg-card p-6 rounded-xl shadow-xl border border-gray-700 min-h-[600px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">生成結果</h2>
            
            <div className="flex-1 flex items-center justify-center bg-dark/50 rounded-lg border-2 border-dashed border-gray-700 relative overflow-hidden">
              {loading && <LoadingOverlay />}
              
              {!loading && !result && !error && (
                <div className="text-center text-gray-500 p-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>左側のフォームに入力して<br/>「表紙を生成する」ボタンを押してください</p>
                </div>
              )}

              {error && (
                <div className="text-red-400 flex flex-col items-center p-8 text-center">
                  <AlertCircle className="w-12 h-12 mb-2" />
                  <p>{error}</p>
                </div>
              )}

              {result && currentBookData && (
                <GeneratedCover 
                  result={result} 
                  bookData={currentBookData} 
                  onRegenerate={handleRegenerate} 
                />
              )}
            </div>
           </div>
        </section>
      </main>
    </div>
  );
};

export default App;
