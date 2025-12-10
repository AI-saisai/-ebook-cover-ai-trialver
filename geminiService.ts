import { GoogleGenAI, Part } from "@google/genai";
import { BookData, GeneratedImageResult } from "../types";

// Vercelなどのビルド環境で 'process' が未定義エラーになるのを防ぐためのおまじない
declare const process: any;

// Helper to process image: Resize and Convert to JPEG to reduce payload size
const processImage = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Resize if too large (max 1024px on longest side) to prevent Rpc/XHR errors
        const MAX_DIM = 1024;
        if (width > MAX_DIM || height > MAX_DIM) {
          const scale = MAX_DIM / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            reject(new Error("Canvas context unavailable"));
            return;
        }
        // Fill white background just in case transparency causes issues
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG, 70% quality to optimize payload size
        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, 0.7);
        const base64 = dataUrl.split(',')[1];
        resolve({ base64, mimeType });
      };
      img.onerror = (e) => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const generateBookCover = async (data: BookData): Promise<GeneratedImageResult> => {
  // Use process.env.API_KEY directly as required
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 1. STRUCTURAL LAYOUT FRAMEWORK (MANDATORY)
  let structuralMandate = "IMAGE STRUCTURE: Full page vertical illustration.";
  let layoutInstruction = "Cinematic Composition.";

  switch(data.designLayout) {
      case 'abstract':
          structuralMandate = "IMAGE STRUCTURE: ABSTRACT GEOMETRIC PATTERNS ONLY. NO characters, NO realistic scenes. Use shapes, lines, and gradients.";
          layoutInstruction = "Professional Corporate abstract art.";
          break;
      case 'minimal':
          structuralMandate = "IMAGE STRUCTURE: EXTREME NEGATIVE SPACE (80%). Single tiny iconic subject in center. Solid flat background.";
          layoutInstruction = "Modern Minimalist Design.";
          break;
      case 'symbolic':
          structuralMandate = "IMAGE STRUCTURE: SINGLE CENTRAL SYMBOLIC OBJECT. One distinct object (e.g., a key, a sword, a flower, a gem) placed perfectly in the center. SOLID or SIMPLE GRADIENT BACKGROUND. NO complex scenery, NO full characters, NO messy details. Iconic and clean.";
          layoutInstruction = "Iconic, Symbolic, Minimalist, Emblem style.";
          break;
      case 'solid_cutout':
          structuralMandate = "IMAGE STRUCTURE: SOLID FLAT COLOR BACKGROUND (Hex color) with a sharp CUTOUT subject in foreground. No background details.";
          layoutInstruction = "Pop Art / Poster style.";
          break;
      case 'solid_color':
          structuralMandate = "IMAGE STRUCTURE: SOLID FLAT COLOR BACKGROUND ONLY. NO characters, NO objects, NO texture. Just a clean, solid color canvas.";
          layoutInstruction = "Pure solid color background.";
          break;
      case 'split_vertical':
          structuralMandate = "IMAGE STRUCTURE: VERTICAL SPLIT SCREEN (50/50). The image is divided perfectly down the middle. Left side = Scene A, Right side = Scene B.";
          layoutInstruction = "Duality theme.";
          break;
      case 'split_horizontal':
          structuralMandate = "IMAGE STRUCTURE: HORIZONTAL SPLIT SCREEN. Top half = Sky/Macro, Bottom half = Landscape/Character.";
          layoutInstruction = "Movie Poster style.";
          break;
      case 'four_panel':
          structuralMandate = "IMAGE STRUCTURE: 4-PANEL COMIC STRIP. Image is divided into 4 rectangular frames.";
          layoutInstruction = "Manga page layout.";
          break;
      case 'film_strip':
          structuralMandate = "IMAGE STRUCTURE: VERTICAL FILM STRIP. 3-4 frames stacked vertically with film sprocket holes on sides.";
          layoutInstruction = "Cinematic sequence.";
          break;
      case 'collage_photo':
          structuralMandate = "IMAGE STRUCTURE: PHOTOMONTAGE COLLAGE. Multiple overlapping cutouts, torn paper edges.";
          layoutInstruction = "Mixed media art.";
          break;
      case 'vintage':
           structuralMandate = "IMAGE STRUCTURE: VINTAGE BOOK FRAME. Decorative ornamental border around the edges.";
           layoutInstruction = "Antique paper texture.";
           break;
  }

  // 2. Map Composition Rules
  let compRule = "";
  switch(data.composition) {
      case 'center': compRule = "Center-focused composition. Symmetrical."; break;
      case 'rule_of_thirds': compRule = "Rule of Thirds. Focal point at grid intersection."; break;
      case 'diagonal': compRule = "Diagonal dynamic composition."; break;
      case 'negative_space': compRule = "High Negative Space (Top 40% empty)."; break;
      case 'golden_ratio': compRule = "Golden Ratio Spiral composition."; break;
      case 'dutch_angle': compRule = "Dutch Angle (Tilted camera)."; break;
      default: compRule = "Balanced composition.";
  }

  // 3. Map Mood
  let moodRule = data.mood || "Cinematic";
  
  // 4. Map Lighting
  let lightingRule = data.lighting !== 'none' ? `${data.lighting} lighting` : "Professional lighting";

  // 5. Map Art Style (Generic Descriptions for Safety)
  const stylePrompts: Record<string, string> = {
    anime: "Japanese Anime Style. Cel-shaded, sharp lines, vibrant colors.",
    'scenic-anime': "High-quality Scenic Anime Style. Hyper-detailed clouds, dramatic lighting, lens flares, emotional atmosphere, highly polished digital art.",
    fantasy: "Nostalgic Japanese Fantasy Animation Style. Soft gouache textures, painted backgrounds, natural color palette, rounded character features, organic feel.",
    watercolor: "Traditional Watercolor Painting. Wet-on-wet technique, visible paper texture, soft bleeding edges, translucent colors. NOT digital.",
    oil: "Impasto Oil Painting. Thick visible brushstrokes, textured canvas, classical fine art aesthetic.",
    flat: "Vector Flat Design. No gradients, clean shapes, corporate illustration.",
    pixel: "Pixel Art. 16-bit retro game style, low resolution aesthetic.",
    cyberpunk: "Cyberpunk Concept Art. Neon lights, dark rain, chrome, futuristic.",
    '3d': "High-quality 3D Character Render. Smooth surfaces, subsurface scattering, ambient occlusion, cute proportions, soft lighting.",
    'childrens': "Children's Picture Book Illustration. Soft pastels or crayons, friendly rounded shapes, whimsical.",
    'hand-drawn': "Rough Pencil Sketch. Graphite texture, white background, unpolished.",
    'colored-pencil': "Colored Pencil Illustration. Visible cross-hatching lines, rough paper grain texture.",
    'ukiyo-e': "Traditional Japanese Woodblock Print. Flat colors, thick black outlines, textured paper.",
    'ink': "Sumi-e Ink Wash Painting. High contrast black and white.",
    realistic: "Hyper-realistic 8k photography style.",
    charcoal: "Charcoal Sketch. Smudged, dark, expressive.",
    paper: "Paper Cutout Art. Layered paper depth, drop shadows."
  };
  
  // Fallback
  let selectedStyle = stylePrompts[data.artStyle] || stylePrompts.anime;

  // Build Color Logic
  let colorInstruction = "";
  if (data.colorCount === 'grayscale') {
      colorInstruction = "STRICT COLOR: GRAYSCALE ONLY. Black, White, Grey. NO COLORS.";
  } else if (data.colorCount === 'single-color') {
      colorInstruction = "STRICT COLOR: MONOCHROMATIC. Use variations of ONE single Hue only.";
  } else if (data.colorCount === '2-colors') {
      colorInstruction = "STRICT COLOR: DUOTONE. Only 2 dominant colors.";
  } else if (data.colorTone !== 'auto') {
      colorInstruction = `Color Tone: ${data.colorTone} palette.`;
  }

  // --- CHARACTER REFERENCE LOGIC ---
  let characterRefInstruction = "";
  const uploadedCount = data.characterImages ? data.characterImages.length : 0;
  
  // Don't use character references if layout is abstract, solid, or symbolic
  const ignoreCharacters = data.designLayout === 'abstract' || data.designLayout === 'solid_color' || data.designLayout === 'symbolic';

  if (uploadedCount > 0 && !ignoreCharacters) {
      if (uploadedCount === 1) {
          // SINGLE CHARACTER
          characterRefInstruction = `
          **REFERENCE IMAGE INSTRUCTION (HIGHEST PRIORITY)**:
          - The attached image shows the DEFINITIVE appearance of the main character.
          - YOU MUST MAINTAIN the character's key visual features: Hair color, Hair style, Eye color, Face shape, and Clothing design.
          - DO NOT create a random character. Re-draw the character from the reference image, but adapt it to the requested [${data.artStyle}] art style.
          - The character should be integrated naturally into the scene described in the synopsis.
          `;
      } else {
          // MULTIPLE CHARACTERS (2 Images)
          characterRefInstruction = `
          **MULTI-REFERENCE MODE (CRITICAL - 2 DISTINCT SUBJECTS)**:
          - You have been provided with **2 separate reference images**.
          - **IMAGE 1 (First Input)**: Source for the FIRST CHARACTER (or Subject A).
          - **IMAGE 2 (Second Input)**: Source for the SECOND CHARACTER (or Subject B).
          - **MANDATORY**: You must include BOTH subjects in the final composition.
          - **STRICT VISUAL CONSISTENCY**: 
             1. Character A must look like Image 1. 
             2. Character B must look like Image 2.
             3. **DO NOT BLEND** the two images into one person. Draw them as two separate entities interacting in the scene.
          - Maintain their specific hair/clothes features while adapting to the [${data.artStyle}] art style.
          `;
      }
  }

  // Construct prompt
  const prompt = `
    Create a professional E-Book Cover Illustration.
    
    CRITICAL INSTRUCTIONS:
    1. **STRUCTURAL LAYOUT (HIGHEST PRIORITY)**: ${structuralMandate}
    2. **NO TEXT**: Textless image.
    3. **ART STYLE**: ${selectedStyle}
    4. **COLORS**: ${colorInstruction}
    ${characterRefInstruction}
    
    **VISUAL DESCRIPTION**:
    - **Layout Concept**: ${layoutInstruction}
    - **Composition**: ${compRule}
    - **Mood**: ${moodRule}
    - **Lighting**: ${lightingRule}

    **SUBJECT / CONTENT**:
    - Genre: ${data.genre}
    - Synopsis: ${data.synopsis}
    ${ignoreCharacters 
        ? '(IGNORE specific character details in the prompt. Focus on the central symbolic object or abstract theme based on the synopsis/genre.)' 
        : `- Characters Description: ${data.characters}`}
    
    High quality, 8k resolution, masterpiece.
  `;

  let parts: Part[] = [{ text: prompt }];

  if (uploadedCount > 0) {
    try {
      for (const file of data.characterImages.slice(0, 2)) {
         const { base64, mimeType } = await processImage(file);
         parts.push({
            inlineData: {
              data: base64,
              mimeType: mimeType
            }
         });
      }
    } catch (e) {
      console.warn("Failed to process image upload", e);
    }
  }

  // Retry logic
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ role: 'user', parts: parts }],
        config: {
          imageConfig: { aspectRatio: "9:16" },
          // buildエラー回避のため、安全設定はデフォルトに任せて省略します
        },
      });

      if (response.candidates && response.candidates.length > 0 && response.candidates[0].content?.parts) {
        const responseParts = response.candidates[0].content.parts;
        for (const part of responseParts) {
          if (part.inlineData && part.inlineData.data) {
            const base64EncodeString = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            return {
                imageUrl: `data:${mimeType};base64,${base64EncodeString}`,
                promptUsed: prompt
            };
          }
        }
      }
      throw new Error("Generated content did not contain a valid image.");

    } catch (err: any) {
        console.error(`Attempt ${attempt + 1} failed:`, err);
        lastError = err;
        if (attempt < 2) {
             await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
    }
  }

  throw lastError || new Error("Failed to generate image after multiple attempts.");
};