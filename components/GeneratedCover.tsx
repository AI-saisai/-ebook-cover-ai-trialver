
import React, { useState, useRef, useEffect } from 'react';
import { GeneratedImageResult, BookData, GeneratedCoverProps } from '../types';
import { RefreshCw, Move, Maximize2, ArrowRightFromLine, Lock } from 'lucide-react';

// --- Draggable Text Component (Simplified for Trial) ---
interface DraggableTextProps {
  id: string;
  children: React.ReactNode;
  className?: string; 
  baseClassName?: string;
  style?: React.CSSProperties;
  isVertical?: boolean;
  disabled?: boolean;
}

const DraggableText: React.FC<DraggableTextProps> = ({ 
  id, 
  children, 
  className = '', 
  baseClassName = '',
  style = {} as React.CSSProperties, 
  isVertical = false,
  disabled = false 
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rotation = 0; // Rotation locked in trial
  const [fontSizeMult, setFontSizeMult] = useState(1);
  const [constraintSize, setConstraintSize] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [baseSize, setBaseSize] = useState<number | null>(null);
  
  const elementRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number, y: number } | null>(null);
  const offsetStart = useRef<{ x: number, y: number } | null>(null);
  const resizeStart = useRef<{ x: number, y: number, size: number } | null>(null);

  useEffect(() => {
    setConstraintSize(null);
  }, [isVertical]);

  useEffect(() => {
    if (elementRef.current) {
      const computed = window.getComputedStyle(elementRef.current);
      const size = parseFloat(computed.fontSize);
      if (!isNaN(size) && size > 0) {
        setBaseSize(size);
        setFontSizeMult(1); 
      }
    }
  }, [baseClassName]); 

  useEffect(() => {
    const el = elementRef.current;
    if (!el || disabled) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = -e.deltaY;
      const scaleStep = 0.05;
      setFontSizeMult(prev => Math.max(0.2, Math.min(5, prev + (delta > 0 ? scaleStep : -scaleStep))));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
        el.removeEventListener('wheel', onWheel);
    };
  }, [disabled]);


  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    if ((e.target as HTMLElement).dataset.handle) return; 
    
    e.preventDefault();
    e.stopPropagation();
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragStart.current || !offsetStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({
      x: offsetStart.current.x + dx,
      y: offsetStart.current.y + dy
    });
  };

  const handleMouseUp = () => {
    dragStart.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleResizeDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    
    const startSize = constraintSize || (isVertical 
        ? elementRef.current?.offsetHeight || 0 
        : elementRef.current?.offsetWidth || 0);

    resizeStart.current = { 
        x: e.clientX, 
        y: e.clientY,
        size: startSize
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeUp);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizeStart.current) return;
    const dx = e.clientX - resizeStart.current.x;
    const dy = e.clientY - resizeStart.current.y;
    const delta = isVertical ? dy : dx;
    setConstraintSize(Math.max(50, resizeStart.current.size + delta));
  };

  const handleResizeUp = () => {
    resizeStart.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeUp);
  };

  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
    fontSize: baseSize ? `${baseSize * fontSizeMult}px` : undefined,
    cursor: disabled ? 'default' : 'move',
    position: 'relative',
    writingMode: isVertical ? 'vertical-rl' : 'horizontal-tb',
    [isVertical ? 'height' : 'width']: constraintSize ? `${constraintSize}px` : 'max-content',
    flexShrink: 0,
    whiteSpace: 'pre-wrap', 
    wordBreak: 'break-word',
    fontKerning: 'normal',
    letterSpacing: '0.05em', 
  };

  return (
    <div 
      ref={elementRef}
      id={id} 
      className={`
        draggable-element
        ${className} ${baseClassName}
        ${!disabled && isHovered ? 'outline outline-1 outline-dashed outline-white/50 bg-black/10' : ''} 
        transition-colors rounded z-30 hover:z-50 shrink-0
      `}
      style={combinedStyle}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {!disabled && isHovered && (
        <>
            <div 
              data-handle="true"
              onMouseDown={handleResizeDown}
              className={`
                absolute w-5 h-5 bg-primary border-2 border-white rounded-full z-50
                flex items-center justify-center shadow-md
                hover:scale-125 transition-transform
                ${isVertical 
                    ? 'bottom-[-10px] left-1/2 -translate-x-1/2 cursor-ns-resize' 
                    : 'right-[-10px] top-1/2 -translate-y-1/2 cursor-ew-resize'}
              `}
              title={isVertical ? "縦の長さを調整" : "横幅(改行)を調整"}
            >
              <ArrowRightFromLine className={`w-3 h-3 text-white ${isVertical ? 'rotate-90' : ''}`} />
            </div>
        </>
      )}
    </div>
  );
};


export const GeneratedCover: React.FC<GeneratedCoverProps> = ({ result, bookData, onRegenerate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Trial Version: Download Disabled
  const handleDownload = () => {
    alert("【無料体験版】\n画像の保存機能は製品版でのみご利用いただけます。\n\n製品版では、帯やバッジの作成、高画質保存、詳細なレイアウト設定など全ての機能が解放されます。");
  };

  // Helper functions for styles
  const getFontClass = (font: string) => {
    const fonts: Record<string, string> = {
        mincho: 'font-mincho', gothic: 'font-sans', maru: 'font-maru', kaisei: 'font-kaisei',
        potta: 'font-potta', dela: 'font-dela', rampart: 'font-rampart', mochiy: 'font-mochiy',
        dot: 'font-dot', yuji: 'font-yuji', hachi: 'font-hachi', bizgothic: 'font-bizgothic',
        bizmincho: 'font-bizmincho', ibm: 'font-ibm', zenold: 'font-zenold', yomogi: 'font-yomogi'
    };
    return fonts[font] || 'font-serif';
  };

  const isHeavyFont = (font: string) => {
      return ['dela', 'rampart', 'potta', 'dot', 'mochiy'].includes(font);
  };
  
  const getTrackingClass = (tracking: string) => {
      const tracks: Record<string, string> = {
          tighter: 'tracking-tighter', tight: 'tracking-tight', wide: 'tracking-wide', widest: 'tracking-widest'
      };
      return tracks[tracking] || 'tracking-normal';
  };

  const getLineHeightStyle = (lh: string | undefined): number => {
      const map: Record<string, number> = {
          tight: 1.2,
          normal: 1.5,
          relaxed: 1.8,
          loose: 2.2
      };
      return map[lh || 'normal'] || 1.5;
  };

  const getTitleSizeClass = (type: 'main' | 'sub' | 'author') => {
      if (type === 'author') {
          return ({ small: 'text-base', normal: 'text-lg', large: 'text-xl', xl: 'text-2xl' } as any)[bookData.authorSize] || 'text-xl';
      }
      if (type === 'sub') {
           return ({ small: 'text-sm', normal: 'text-base', large: 'text-lg', xl: 'text-xl' } as any)[bookData.subtitleSize] || 'text-lg';
      }
      return ({ normal: 'text-6xl', large: 'text-7xl', xl: 'text-8xl', huge: 'text-9xl' } as any)[bookData.titleSize] || 'text-8xl';
  };
  
  const getTextColorClass = (colorName: string) => {
      const colors: Record<string, string> = {
          black: 'text-black', red: 'text-red-600', blue: 'text-blue-500', pink: 'text-pink-400',
          purple: 'text-purple-500', white: 'text-white'
      };
      return colors[colorName] || 'text-white';
  };

  const getSolidColorStyle = (colorName: string): React.CSSProperties => {
      if (colorName === 'gold') return { color: '#FFD700' };
      if (colorName === 'silver') return { color: '#C0C0C0' };
      return {};
  };
  
  const getCombinedTextShadow = (hasOutline: boolean, outlineColor: string, shadowType: string = 'none', outlineWidth: string = 'normal'): React.CSSProperties => {
      let styles: React.CSSProperties = {};
      let shadows = [];

      if (hasOutline) {
          const c = outlineColor || 'black';
          const colorHex = ({
            'black': '#000000', 'white': '#ffffff', 'red': '#dc2626',
            'blue': '#2563eb', 'gold': '#d97706'
          } as Record<string, string>)[c] || '#000000';
          
          let width = '4px'; 
          if (outlineWidth === 'thin') width = '2px';
          if (outlineWidth === 'thick') width = '6px';
          if (outlineWidth === 'heavy') width = '8px';

          styles.WebkitTextStrokeWidth = width; 
          styles.WebkitTextStrokeColor = colorHex;
          styles.paintOrder = 'stroke fill';
      }

      if (shadowType && shadowType !== 'none') {
          switch(shadowType) {
            case 'soft': shadows.push('0 4px 10px rgba(0,0,0,0.6)'); break;
            case 'hard': shadows.push('3px 3px 0px rgba(0,0,0,0.5)'); break;
            case 'neon': shadows.push(`0 0 10px rgba(255,255,255,0.8)`, `0 0 20px rgba(255,255,255,0.4)`); break;
          }
      }
      
      if (shadows.length > 0) {
          styles.textShadow = shadows.join(', ');
      }
      
      return styles;
  };

  const isMainTitleVertical = bookData.titleOrientation === 'vertical';

  const getTitleContainerStyles = (): { className: string, style: React.CSSProperties } => {
      let className = 'absolute z-10 pointer-events-none '; 
      let style: React.CSSProperties = {};
      
      let bottomOffset = '10%'; 

      if (isMainTitleVertical) {
          className += 'right-[6%] flex flex-row-reverse gap-4 items-start ';
          if (bookData.titleAlign === 'top') style.top = '6%';
          else if (bookData.titleAlign === 'center') { style.top = '50%'; style.transform = 'translateY(-50%)'; }
          else if (bookData.titleAlign === 'bottom') style.bottom = bottomOffset;
      } else {
          className += 'left-0 w-full flex flex-col items-center gap-1 ';
          if (bookData.titleAlign === 'top') style.top = '8%';
          else if (bookData.titleAlign === 'center') { style.top = '50%'; style.transform = 'translateY(-50%)'; }
          else if (bookData.titleAlign === 'bottom') style.bottom = bottomOffset;
      }
      
      return { className, style };
  };

  // Obi Styles Helpers
  const getObiColors = (color: string) => {
    switch(color) {
      case 'white': return 'bg-white text-gray-900 shadow-xl';
      case 'black': return 'bg-gray-900 text-white shadow-black/50';
      case 'yellow': default: return 'bg-[#ffd900] text-gray-900 shadow-yellow-500/30';
    }
  };

  const getObiHeightClass = () => {
    return bookData.obiHeight === 'large' ? 'h-[25%]' : 'h-[20%]';
  };

  const getObiAlignClass = () => {
    switch (bookData.obiTextAlign) {
      case 'left': return 'items-start text-left px-8';
      case 'right': return 'items-end text-right px-8';
      case 'center': default: return 'items-center text-center px-4';
    }
  };

  const getObiTextSizeClass = (type: 'main' | 'sub') => {
      if (type === 'main') {
          return ({ small: 'text-xl', medium: 'text-2xl', large: 'text-3xl' } as any)[bookData.obiTextSize] || 'text-2xl';
      } else {
           return ({ small: 'text-xs', medium: 'text-sm', large: 'text-base' } as any)[bookData.obiTextSize] || 'text-sm';
      }
  };

  const getBadgeStyle = () => {
      let classes = 'bg-[#ffd700] text-black border-yellow-200'; 
      const color = bookData.obiBadgeColor;
      if(color==='red') classes='bg-red-600 text-white';
      else if(color==='gold') classes='bg-yellow-500 text-black';
      
      return `${classes} border-transparent`;
  };

  const getBadgeScaleClass = () => {
      if (bookData.obiBadgeScale === 'small') return 'text-sm';
      if (bookData.obiBadgeScale === 'large') return 'text-3xl';
      return 'text-lg'; 
  };
  
  const getBadgeMinSize = () => {
      switch (bookData.obiBadgeScale) {
          case 'small': return '80px';
          case 'large': return '150px';
          default: return '110px'; 
      }
  };

  const getBadgeInitialPosition = () => {
      const obiHeight = bookData.obiHeight === 'large' ? 25 : 20;
      
      let bottom = '2%';
      if (bookData.obiBadgeAnchorY === 'top-edge') bottom = `${obiHeight}%`;
      else if (bookData.obiBadgeAnchorY === 'middle') bottom = `${obiHeight/2}%`;
      
      let style: React.CSSProperties = { bottom, transform: 'translateY(50%)' };
      
      if (bookData.obiBadgeAnchorX === 'center') {
          style = { ...style, left: '50%', transform: 'translate(-50%, 50%)' };
      } else if (bookData.obiBadgeAnchorX === 'right') {
          style = { ...style, right: '8%', transform: 'translateY(50%) rotate(12deg)' };
      } else {
          style = { ...style, left: '8%', transform: 'translateY(50%) rotate(-12deg)' };
      }
      return style;
  };

  const titleLayout = getTitleContainerStyles();

  return (
    <div className="w-full flex flex-col items-center gap-6 animate-fadeIn">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[400px] aspect-[10/16] shadow-2xl rounded-sm bg-gray-800 select-none overflow-hidden group"
      >
        <img 
          src={result.imageUrl} 
          alt="Generated Book Cover" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          crossOrigin="anonymous" 
        />
        
        {/* TRIAL WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="text-white/20 text-6xl font-black rotate-[-30deg] border-4 border-white/20 px-8 py-4">
                SAMPLE<br/>TRIAL
            </div>
        </div>
        <div className="absolute bottom-2 right-2 text-white/50 text-xs font-bold pointer-events-none z-50">
            E-Book Cover AI (Free Trial)
        </div>

        {bookData.showTitle && (
            <div className={titleLayout.className} style={titleLayout.style}>
                
                {/* SUBTITLE */}
                {bookData.subtitle && (
                    <DraggableText 
                        id="subtitle" 
                        key={`subtitle-${bookData.subtitleSize}-${bookData.subtitleFont}-${bookData.subtitleOrientation}`}
                        isVertical={bookData.subtitleOrientation === 'vertical'}
                        className="pointer-events-auto"
                        baseClassName={getTitleSizeClass('sub')}
                    >
                        <h2 
                            className={`
                                whitespace-pre-wrap break-words
                                ${getFontClass(bookData.subtitleFont)}
                                ${getTextColorClass(bookData.subtitleColor)}
                                ${getTrackingClass(bookData.subtitleTracking)}
                                ${isHeavyFont(bookData.subtitleFont) ? 'font-normal tracking-wider' : 'font-extrabold'}
                                cursor-move
                            `}
                            style={{
                                ...getCombinedTextShadow(bookData.subtitleOutline, bookData.subtitleOutlineColor),
                                ...getSolidColorStyle(bookData.subtitleColor),
                                writingMode: bookData.subtitleOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
                                textOrientation: bookData.subtitleOrientation === 'vertical' ? 'upright' : 'mixed',
                                lineHeight: 1.6 
                            }}
                        >
                            {bookData.subtitle}
                        </h2>
                    </DraggableText>
                )}

                {/* MAIN TITLE */}
                <DraggableText 
                    id="title" 
                    key={`title-${bookData.titleSize}-${bookData.titleFont}-${bookData.titleOrientation}`}
                    isVertical={isMainTitleVertical}
                    className="pointer-events-auto"
                    baseClassName={getTitleSizeClass('main')}
                    style={{ lineHeight: getLineHeightStyle(bookData.titleLineHeight) }}
                >
                    <h1 
                        className={`
                            whitespace-pre-wrap break-words
                            ${getFontClass(bookData.titleFont)} 
                            ${getTextColorClass(bookData.titleColor)} 
                            ${getTrackingClass(bookData.titleTracking)}
                            ${isHeavyFont(bookData.titleFont) ? 'font-normal tracking-wider' : 'font-extrabold'}
                            cursor-move
                        `}
                        style={{
                            ...getCombinedTextShadow(bookData.titleOutline, bookData.titleOutlineColor, bookData.titleShadow, bookData.titleOutlineWidth),
                            ...getSolidColorStyle(bookData.titleColor),
                            writingMode: isMainTitleVertical ? 'vertical-rl' : 'horizontal-tb',
                            textOrientation: isMainTitleVertical ? 'upright' : 'mixed',
                        }}
                    >
                        {bookData.title}
                    </h1>
                </DraggableText>

                {/* AUTHOR */}
                {bookData.author && (
                    <DraggableText 
                        id="author" 
                        key={`author-${bookData.authorSize}-${bookData.authorFont}-${bookData.authorOrientation}`}
                        isVertical={bookData.authorOrientation === 'vertical'}
                        className="pointer-events-auto"
                        baseClassName={getTitleSizeClass('author')}
                    >
                        <p
                            className={`
                                break-words
                                ${getFontClass(bookData.authorFont)}
                                ${getTextColorClass(bookData.authorColor)}
                                ${getTrackingClass(bookData.authorTracking)}
                                ${isHeavyFont(bookData.authorFont) ? 'font-normal' : 'font-bold'}
                                cursor-move
                            `}
                            style={{
                                ...getCombinedTextShadow(bookData.authorOutline, bookData.authorOutlineColor),
                                ...getSolidColorStyle(bookData.authorColor),
                                writingMode: bookData.authorOrientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
                                textOrientation: bookData.authorOrientation === 'vertical' ? 'upright' : 'mixed',
                                lineHeight: 1.6
                            }}
                        >
                            {bookData.author}
                        </p>
                    </DraggableText>
                )}
            </div>
        )}

        {/* Obi Rendering (Limited) */}
        {bookData.showObi && (
            <div className={`absolute bottom-0 w-full flex items-center justify-center ${getObiHeightClass()} z-20 pointer-events-none`}>
                 <div 
                    className={`w-full h-full flex flex-col py-2 gap-2 relative pointer-events-auto ${getObiColors(bookData.obiColor)} ${getObiAlignClass()}`} 
                 >
                    <DraggableText id="obi-main" key={`obi-main-${bookData.obiTextSize}`} baseClassName={getObiTextSizeClass('main')}>
                        <p 
                            className={`font-black tracking-tighter whitespace-pre-wrap break-words cursor-move ${getFontClass(bookData.obiFont)} ${bookData.obiTextColor !== 'auto' ? getTextColorClass(bookData.obiTextColor) : ''}`}
                            style={{...getSolidColorStyle(bookData.obiTextColor), lineHeight: 1.3}}
                        >
                          {bookData.obiMain}
                        </p>
                    </DraggableText>
    
                    {bookData.obiSub && (
                      <DraggableText id="obi-sub" key={`obi-sub-${bookData.obiTextSize}`} baseClassName={getObiTextSizeClass('sub')}>
                          <p 
                            className={`font-bold mt-1 whitespace-pre-wrap break-words cursor-move ${getFontClass(bookData.obiFont)} ${bookData.obiTextColor !== 'auto' ? getTextColorClass(bookData.obiTextColor) : ''}`}
                            style={{...getSolidColorStyle(bookData.obiTextColor), lineHeight: 1.5}}
                          >
                            {bookData.obiSub}
                          </p>
                      </DraggableText>
                    )}
                 </div>
            </div>
        )}

        {/* Badge Rendering (Limited) */}
        {bookData.showBadge && bookData.obiBadgeText && (
            <div className="absolute z-30 pointer-events-none" style={getBadgeInitialPosition()}>
                <DraggableText 
                    id="badge"
                    key={`badge-${bookData.obiBadgeScale}`}
                    className="pointer-events-auto flex items-center justify-center" 
                    baseClassName={getBadgeScaleClass()}
                >
                    <div 
                        className={`rounded-full flex items-center justify-center text-center shadow-lg border-4 cursor-move ${getBadgeStyle()}`}
                        style={{ 
                            minWidth: getBadgeMinSize(),
                            minHeight: getBadgeMinSize(),
                            aspectRatio: '1 / 1',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <p className={`font-bold leading-tight whitespace-pre-wrap ${getFontClass(bookData.obiBadgeFont)} ${getTextColorClass(bookData.obiBadgeTextColor)}`} style={{lineHeight: 1.3}}>
                            {bookData.obiBadgeText}
                        </p>
                    </div>
                </DraggableText>
            </div>
        )}
      </div>

      <div className="w-full max-w-[400px] flex flex-col gap-4">
         <div className="flex gap-4">
             <button onClick={onRegenerate} className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-bold shadow-md transition-all border border-gray-600">
                <RefreshCw className="w-5 h-5" />
                画像を再生成
            </button>
            <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 bg-gray-800 border border-gray-600 text-gray-400 px-4 py-3 rounded-lg font-bold shadow-none cursor-not-allowed hover:bg-gray-800">
                <Lock className="w-4 h-4" />
                保存 (製品版のみ)
            </button>
         </div>
         
         <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 w-full text-sm text-gray-300">
             <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                    <span className="p-1 bg-blue-900/50 rounded text-blue-300"><Move className="w-4 h-4" /></span> 
                    <span>文字はドラッグで移動</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="p-1 bg-green-900/50 rounded text-green-300"><Maximize2 className="w-4 h-4" /></span> 
                    <span>文字の上でマウスホイールを回して拡大縮小</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="p-1 bg-pink-900/50 rounded text-pink-300"><ArrowRightFromLine className="w-4 h-4" /></span> 
                    <span>ホバー時のハンドルを引いて改行幅を調整</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
