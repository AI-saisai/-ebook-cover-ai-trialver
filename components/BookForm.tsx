
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BookData } from '../types';
import { LayoutTemplate, Book, Wand2, Palette, Bomb, Lock } from 'lucide-react';

interface BookFormProps {
  onGenerate: (data: BookData) => void;
  isLoading: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<BookData>({
    title: '星屑の錬金術師',
    subtitle: '古代遺跡に眠る秘宝と、\n世界の終焉',
    author: '山田 太郎',
    genre: 'ファンタジー、冒険',
    synopsis: '若き錬金術師エリオットは、失われた古代文明の遺跡で、時を操るという伝説の秘宝「クロノス・ギア」を発見する。しかし、その秘宝は世界を崩壊させる力も秘めていた。',
    characters: '',
    keywords: '遺跡, 秘宝, 錬金術, 時間, 魔法',
    characterImages: [],
    
    // Category & Layout
    bookCategory: 'novel',
    designLayout: 'full_art',
    
    // Pro Controls (Disabled/Default)
    composition: 'center',
    mood: 'cinematic',
    lighting: 'none',
    coverTexture: 'none',

    // Art Style
    artStyle: 'anime',
    // Color Settings
    colorCount: 'auto',
    colorTone: 'auto',
    
    // Obi (Limited)
    showObi: true,
    obiMain: '時を超える冒険が、\n今始まる。',
    obiSub: '',
    obiColor: 'yellow',
    obiBorderColor: 'none',
    obiHeight: 'medium',
    obiEffect: 'none',
    obiFont: 'gothic',
    obiTextColor: 'black',
    obiTextSize: 'medium',
    obiTextAlign: 'center',
    
    // Badge (Limited)
    showBadge: true,
    obiBadgeText: 'アニメ化\n決定！',
    obiBadgeColor: 'red',
    obiBadgeTextColor: 'white',
    obiBadgeBorderColor: 'white',
    obiBadgeFont: 'potta',
    obiBadgeAnchorX: 'right',
    obiBadgeAnchorY: 'middle',
    obiBadgeScale: 'medium',
    
    // Title defaults
    showTitle: true,
    titleOrientation: 'vertical',
    titleAlign: 'top',
    
    // Main Title (Simplified)
    titleFont: 'mincho',
    titleColor: 'white',
    titleSize: 'xl',
    titleShadow: 'hard', 
    titleOutline: true, 
    titleOutlineColor: 'black',
    titleOutlineWidth: 'normal',
    titleTracking: 'normal',
    titleLineHeight: 'normal',

    // Title Accent (Disabled)
    titleAccentText: '',
    titleAccentFont: 'mincho',
    titleAccentColor: 'gold',
    titleAccentSize: 'normal',
    
    // Subtitle defaults
    subtitleFont: 'mincho',
    subtitleColor: 'white',
    subtitleSize: 'normal',
    subtitleOutline: true,
    subtitleOutlineColor: 'black',
    subtitleTracking: 'normal',
    subtitleOrientation: 'vertical',

    // Author defaults
    authorFont: 'mincho',
    authorColor: 'white',
    authorSize: 'normal',
    authorOutline: true,
    authorOutlineColor: 'black',
    authorTracking: 'widest',
    authorOrientation: 'vertical',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
       const checked = (e.target as HTMLInputElement).checked;
       setFormData(prev => ({ ...prev, [name]: checked }));
       return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const applyPreset = () => {
    const cat = formData.bookCategory;
    let updates: Partial<BookData> = {};

    switch(cat) {
        case 'business':
            updates = {
                designLayout: 'abstract',
                artStyle: 'flat',
                titleFont: 'bizgothic',
                titleColor: 'white',
                titleOrientation: 'horizontal',
                subtitleOrientation: 'horizontal',
                authorOrientation: 'horizontal',
            };
            break;
        case 'novel':
            updates = {
                designLayout: 'full_art',
                artStyle: 'anime',
                titleFont: 'mincho',
                titleOrientation: 'vertical',
                subtitleOrientation: 'vertical',
                authorOrientation: 'vertical',
            };
            break;
        case 'manga':
             updates = {
                designLayout: 'full_art',
                artStyle: 'anime',
                titleFont: 'dela',
                titleColor: 'gold',
                titleOrientation: 'horizontal',
                subtitleOrientation: 'horizontal',
                authorOrientation: 'horizontal',
             };
             break;
    }
    
    setFormData(prev => ({ ...prev, ...updates }));
    alert(`「${cat}」向けの推奨設定を適用しました！`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const labelClass = "block text-sm font-medium text-gray-300 mb-1";
  const inputClass = "w-full bg-dark/50 border border-gray-600 rounded p-2.5 text-sm text-white focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all";
  
  const FontOptions = () => (
    <>
        <optgroup label="定番">
            <option value="mincho">明朝体</option>
            <option value="gothic">ゴシック</option>
            <option value="maru">丸ゴシック</option>
        </optgroup>
        <optgroup label="ビジネス・UD">
            <option value="bizgothic">BIZ UDゴシック</option>
            <option value="bizmincho">BIZ UD明朝</option>
        </optgroup>
        <optgroup label="デザイン">
            <option value="dela">極太ゴシック</option>
            <option value="pop">ポップ体</option>
            <option value="yomogi">手書き風</option>
        </optgroup>
    </>
  );
  
  const ColorOptions = () => (
      <>
        <option value="white">白</option>
        <option value="black">黒</option>
        <option value="gold">金</option>
        <option value="silver">銀</option>
        <option value="red">赤</option>
        <option value="blue">青</option>
        <option value="pink">ピンク</option>
      </>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Basic Info & Style */}
      <div className="space-y-4">
        
        {/* Category & Layout Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700">
             <div className="grid grid-cols-2 gap-4 mb-4">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Book className="w-4 h-4 text-primary" />
                        <label className="text-sm font-medium text-gray-200">カテゴリー</label>
                    </div>
                    <select 
                        name="bookCategory" 
                        value={formData.bookCategory} 
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="novel">小説・ラノベ</option>
                        <option value="business">ビジネス・経済</option>
                        <option value="practical">実用書</option>
                        <option value="manga">マンガ</option>
                    </select>
                 </div>
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                        <LayoutTemplate className="w-4 h-4 text-primary" />
                        <label className="text-sm font-medium text-gray-200">スタイル</label>
                    </div>
                    <select 
                        name="designLayout" 
                        value={formData.designLayout} 
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="full_art">全面イラスト</option>
                        <option value="abstract">抽象・幾何学</option>
                        <option value="minimal">ミニマル</option>
                        <option value="solid_color">単色背景</option>
                    </select>
                 </div>
             </div>
             
             <button 
                type="button"
                onClick={applyPreset}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded text-gray-200 text-sm transition-colors"
             >
                <Wand2 className="w-4 h-4" />
                <span>おすすめ設定を適用 (プリセット)</span>
             </button>
        </div>

        {/* Text Inputs - Title & Subtitle (Forced Side-by-Side) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>タイトル</label>
            <textarea name="title" value={formData.title} onChange={handleChange} rows={2} className={`${inputClass} resize-y`} required />
          </div>
          <div>
            <label className={labelClass}>サブタイトル</label>
            <textarea name="subtitle" value={formData.subtitle} onChange={handleChange} rows={2} className={`${inputClass} resize-y`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>著者名</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>ジャンル</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Art Style (Simplified & Side-by-Side) */}
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className={labelClass}>画風</label>
                   <select name="artStyle" value={formData.artStyle} onChange={handleChange} className={inputClass}>
                      <option value="anime">アニメ・マンガ</option>
                      <option value="fantasy">ファンタジー</option>
                      <option value="watercolor">水彩画</option>
                      <option value="oil">油絵</option>
                      <option value="flat">フラット</option>
                      <option value="realistic">実写</option>
                    </select>
                </div>
                <div>
                   <label className={labelClass}>色調</label>
                   <select name="colorTone" value={formData.colorTone} onChange={handleChange} className={inputClass}>
                      <option value="auto">おまかせ</option>
                      <option value="warm">暖色</option>
                      <option value="cool">寒色</option>
                      <option value="dark">ダーク</option>
                      <option value="pastel">パステル</option>
                    </select>
                </div>
            </div>
        </div>
        
        {/* Contents Details */}
        <div>
            <label className={labelClass}>あらすじ・内容</label>
            <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} rows={3} className={`${inputClass}`} />
        </div>
      </div>

      {/* 2. Title Settings Section */}
      <div className="border-t border-gray-700 pt-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" id="showTitle" name="showTitle" checked={formData.showTitle} onChange={handleChange}
                        className="w-4 h-4 text-primary rounded border-gray-600 focus:ring-primary"
                    />
                    <label htmlFor="showTitle" className="text-sm font-medium text-gray-200 select-none cursor-pointer">
                        タイトルを表示
                    </label>
                </div>
            </div>

            {formData.showTitle && (
                <div className="space-y-3">
                    {/* Main Title Settings */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="col-span-1"><label className={labelClass}>フォント</label><select name="titleFont" value={formData.titleFont} onChange={handleChange} className={inputClass}><FontOptions /></select></div>
                        <div className="col-span-1"><label className={labelClass}>サイズ</label><select name="titleSize" value={formData.titleSize} onChange={handleChange} className={inputClass}><option value="normal">中</option><option value="large">大</option><option value="xl">特大</option><option value="huge">最大</option></select></div>
                        <div className="col-span-1"><label className={labelClass}>色</label><select name="titleColor" value={formData.titleColor} onChange={handleChange} className={inputClass}><ColorOptions /></select></div>
                        <div className="col-span-1"><label className={labelClass}>向き</label><select name="titleOrientation" value={formData.titleOrientation} onChange={handleChange} className={inputClass}><option value="vertical">縦書き</option><option value="horizontal">横書き</option></select></div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* 3. Obi Settings (Limited for Trial) */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-gray-300" />
                <h3 className="text-sm font-medium text-gray-300">帯 (オビ)</h3>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" id="showObi" name="showObi" checked={formData.showObi} onChange={handleChange} className="w-4 h-4 text-primary rounded border-gray-600" />
                <label htmlFor="showObi" className="text-xs text-gray-400">表示</label>
            </div>
        </div>
        
        {formData.showObi && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <textarea name="obiMain" value={formData.obiMain} onChange={handleChange} rows={2} className={`${inputClass} resize-y`} placeholder="キャッチコピー" />
                   <textarea name="obiSub" value={formData.obiSub} onChange={handleChange} rows={2} className={`${inputClass} resize-y`} placeholder="あおり文" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                       <label className={labelClass}>色</label>
                       <select name="obiColor" value={formData.obiColor} onChange={handleChange} className={inputClass}>
                         <option value="yellow">黄</option><option value="white">白</option><option value="black">黒</option>
                         <option disabled>🔴 赤 (PRO版)</option>
                         <option disabled>🔵 青 (PRO版)</option>
                         <option disabled>🟢 緑 (PRO版)</option>
                         <option disabled>🟣 紫 (PRO版)</option>
                       </select>
                    </div>
                     <div>
                       <label className={labelClass}>太さ</label>
                       <select name="obiHeight" value={formData.obiHeight} onChange={handleChange} className={inputClass}>
                         <option value="medium">普通</option><option value="large">太め</option>
                         <option disabled>極太 (PRO版)</option>
                       </select>
                    </div>
                     <div>
                       <label className={labelClass}>効果</label>
                       <select name="obiEffect" value={formData.obiEffect} onChange={handleChange} className={inputClass} disabled>
                         <option value="none">なし (PRO版で解放)</option>
                       </select>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* 4. Badge Settings (Limited for Trial) */}
      <div className="border-t border-gray-700 pt-4">
         <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
                <Bomb className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-gray-300">バッジ (爆弾マーク)</span>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" id="showBadge" name="showBadge" checked={formData.showBadge} onChange={handleChange} className="w-4 h-4 text-primary rounded border-gray-600" />
                <label htmlFor="showBadge" className="text-xs text-gray-400">表示</label>
            </div>
        </div>

        {formData.showBadge && (
            <div className="space-y-4 bg-gray-800/30 p-3 rounded border border-gray-700/50">
                <input type="text" name="obiBadgeText" value={formData.obiBadgeText} onChange={handleChange} className={inputClass} placeholder="バッジ文字" />
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className={labelClass}>色</label>
                        <select name="obiBadgeColor" value={formData.obiBadgeColor} onChange={handleChange} className={inputClass}>
                            <option value="red">赤</option><option value="gold">金</option>
                            <option disabled>🔵 青 (PRO版)</option>
                            <option disabled>⚪ 白 (PRO版)</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>文字色</label>
                        <select name="obiBadgeTextColor" value={formData.obiBadgeTextColor} onChange={handleChange} className={inputClass}>
                            <option value="white">白</option><option value="black">黒</option>
                        </select>
                    </div>
                    <div className="flex items-end justify-center pb-2">
                        <span className="text-xs text-yellow-500 font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" /> PRO版で全機能解放
                        </span>
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-700">
        <label className={labelClass}>生成キーワード</label>
        <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} className={inputClass} placeholder="キーワード..." />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md font-bold text-white text-base shadow-lg transition-all transform hover:-translate-y-0.5 mt-2
          ${isLoading 
            ? 'bg-gray-600 cursor-not-allowed opacity-50' 
            : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/50'
          }`}
      >
        {isLoading ? '生成中...' : '表紙を生成する'}
      </button>
    </form>
  );
};
