
export interface BookData {
  title: string;
  subtitle: string;
  author: string;
  genre: string;
  synopsis: string;
  characters: string;
  keywords: string;
  characterImages: File[]; 
  
  // Book Category & Design Layout
  bookCategory: 'novel' | 'business' | 'practical' | 'manga' | 'essay' | 'spiritual' | 'magazine';
  designLayout: 'full_art' | 'abstract' | 'minimal' | 'symbolic' | 'magazine' | 'collage' | 'vintage' | 'art_deco' | 'grunge' | 'pop_art' | 'solid_cutout' | 'solid_color' | 'split_vertical' | 'split_horizontal' | 'collage_photo' | 'four_panel' | 'film_strip';
  
  // Professional Design Controls
  composition: 'center' | 'rule_of_thirds' | 'diagonal' | 'symmetrical' | 'framing' | 'negative_space' | 'golden_ratio' | 'leading_lines' | 'dutch_angle' | 'bokeh';
  mood: 'cinematic' | 'natural' | 'dramatic' | 'mysterious' | 'uplifting' | 'horror' | 'romantic' | 'ethereal' | 'corporate' | 'noir' | 'whimsical' | 'gritty';
  lighting: 'none' | 'studio' | 'natural' | 'backlight' | 'rembrandt' | 'neon_rim' | 'bioluminescent' | 'soft_box' | 'harsh';
  coverTexture: 'none' | 'matte' | 'paper' | 'canvas' | 'noise' | 'leather' | 'crumpled' | 'scratched' | 'glitter';

  // Art Style
  artStyle: 'anime' | 'scenic-anime' | 'fantasy' | 'childrens' | 'watercolor' | 'oil' | 'realistic' | 'ink' | 'pixel' | 'flat' | 'cyberpunk' | 'ukiyo-e' | 'paper' | 'charcoal' | '3d' | 'hand-drawn' | 'colored-pencil';
  
  // Color Settings
  colorCount: 'auto' | 'grayscale' | 'single-color' | '2-colors' | '3-colors' | '5-colors';
  colorTone: 'auto' | 'warm' | 'cool' | 'pastel' | 'vivid' | 'dark' | 'muted' | 'sepia' | 'neon';
  
  // Obi Settings
  showObi: boolean;
  obiMain: string;
  obiSub: string;
  obiColor: 'yellow' | 'white' | 'red' | 'black' | 'blue' | 'green' | 'pink' | 'purple' | 'orange' | 'navy' | 'cyan';
  obiBorderColor: 'none' | 'black' | 'white' | 'red' | 'blue' | 'navy' | 'gold';
  obiHeight: 'medium' | 'large' | 'xl';
  obiEffect: 'none' | 'glossy' | 'stripe' | 'dotted';
  
  // Obi Text Styling
  obiFont: 'mincho' | 'gothic' | 'maru' | 'kaisei' | 'potta' | 'dela' | 'rampart' | 'mochiy' | 'dot' | 'yuji' | 'hachi' | 'bizgothic' | 'bizmincho' | 'ibm' | 'zenold' | 'yomogi';
  obiTextColor: 'auto' | 'black' | 'white' | 'red' | 'blue' | 'gold' | 'navy' | 'gray' | 'brown';
  obiTextSize: 'small' | 'medium' | 'large';
  obiTextAlign: 'left' | 'center' | 'right';

  // Obi Badge (Bomb)
  showBadge: boolean;
  obiBadgeText: string;
  obiBadgeColor: 'gold' | 'red' | 'blue' | 'green' | 'pink' | 'white' | 'black';
  obiBadgeTextColor: 'auto' | 'black' | 'white' | 'red' | 'blue' | 'gold';
  obiBadgeBorderColor: 'none' | 'white' | 'black' | 'gold' | 'red';
  obiBadgeFont: 'mincho' | 'gothic' | 'maru' | 'kaisei' | 'potta' | 'dela' | 'rampart' | 'mochiy' | 'dot' | 'yuji' | 'hachi' | 'bizgothic' | 'bizmincho' | 'ibm' | 'zenold' | 'yomogi';
  obiBadgeAnchorX: 'left' | 'center' | 'right';
  obiBadgeAnchorY: 'top-edge' | 'middle' | 'bottom';
  obiBadgeScale: 'small' | 'medium' | 'large';
  
  // Title Overlay Settings (Global)
  showTitle: boolean;
  titleOrientation: 'vertical' | 'horizontal';
  titleAlign: 'top' | 'center' | 'bottom';

  // Main Title Styling
  titleFont: 'mincho' | 'gothic' | 'maru' | 'kaisei' | 'potta' | 'dela' | 'rampart' | 'mochiy' | 'dot' | 'yuji' | 'hachi' | 'bizgothic' | 'bizmincho' | 'ibm' | 'zenold' | 'yomogi';
  titleColor: 'white' | 'black' | 'gold' | 'silver' | 'red' | 'blue' | 'pink' | 'purple';
  titleSize: 'normal' | 'large' | 'xl' | 'huge';
  titleShadow: 'none' | 'soft' | 'hard' | 'neon';
  titleOutline: boolean;
  titleOutlineColor: 'black' | 'white' | 'red' | 'blue' | 'gold';
  titleOutlineWidth: 'thin' | 'normal' | 'thick' | 'heavy';
  titleTracking: 'tighter' | 'tight' | 'normal' | 'wide' | 'widest';
  titleLineHeight: 'tight' | 'normal' | 'relaxed' | 'loose'; 
  
  // Title Accent (Partial Styling)
  titleAccentText: string; 
  titleAccentFont: 'mincho' | 'gothic' | 'maru' | 'kaisei' | 'potta' | 'dela' | 'rampart' | 'mochiy' | 'dot' | 'yuji' | 'hachi' | 'bizgothic' | 'bizmincho' | 'ibm' | 'zenold' | 'yomogi';
  titleAccentColor: 'white' | 'black' | 'gold' | 'silver' | 'red' | 'blue' | 'pink' | 'purple';
  titleAccentSize: 'xs' | 'small' | 'normal' | 'large' | 'xl'; 

  // Subtitle Styling
  subtitleFont: 'mincho' | 'gothic' | 'maru' | 'kaisei' | 'potta' | 'dela' | 'rampart' | 'mochiy' | 'dot' | 'yuji' | 'hachi' | 'bizgothic' | 'bizmincho' | 'ibm' | 'zenold' | 'yomogi';
  subtitleColor: 'white' | 'black' | 'gold' | 'silver' | 'red' | 'blue' | 'pink' | 'purple';
  subtitleSize: 'small' | 'normal' | 'large' | 'xl';
  subtitleOutline: boolean;
  subtitleOutlineColor: 'black' | 'white' | 'red' | 'blue' | 'gold';
  subtitleTracking: 'tighter' | 'tight' | 'normal' | 'wide' | 'widest';
  subtitleOrientation: 'vertical' | 'horizontal'; 

  // Author Styling
  authorFont: 'mincho' | 'gothic' | 'maru' | 'kaisei' | 'potta' | 'dela' | 'rampart' | 'mochiy' | 'dot' | 'yuji' | 'hachi' | 'bizgothic' | 'bizmincho' | 'ibm' | 'zenold' | 'yomogi';
  authorColor: 'white' | 'black' | 'gold' | 'silver' | 'red' | 'blue' | 'pink' | 'purple';
  authorSize: 'small' | 'normal' | 'large' | 'xl';
  authorOutline: boolean;
  authorOutlineColor: 'black' | 'white' | 'red' | 'blue' | 'gold';
  authorTracking: 'tighter' | 'tight' | 'normal' | 'wide' | 'widest';
  authorOrientation: 'vertical' | 'horizontal'; 
}

export interface GeneratedImageResult {
  imageUrl: string;
  promptUsed: string;
}

export interface GeneratedCoverProps {
  result: GeneratedImageResult;
  bookData: BookData;
  onRegenerate: () => void;
}
