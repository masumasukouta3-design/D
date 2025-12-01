
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface PixelArtProps {
    prompt: string;
    aspectRatio?: '1:1' | '16:9';
    className?: string;
    placeholderText?: string;
    text?: string;
}

const memoryCache: Record<string, string> = {};
const FAILED_CACHE: Set<string> = new Set();

interface QueueItem {
    id: string;
    task: () => Promise<void>;
    retries: number;
}

// Queue system to prevent 429s (Resource Exhausted)
const requestQueue: QueueItem[] = [];
let isProcessing = false;
let backoffMultiplier = 1;
const MAX_RETRIES = 5;

const processQueue = async () => {
    if (isProcessing || requestQueue.length === 0) return;
    isProcessing = true;

    const item = requestQueue[0]; // Peek at the first item

    try {
        await item.task();
        
        // Success
        requestQueue.shift(); // Remove from queue
        backoffMultiplier = 1; // Reset backoff
        
        // Wait a bit before processing next to be nice to the API (2 seconds)
        setTimeout(() => {
            isProcessing = false;
            processQueue();
        }, 2000);

    } catch (e: any) {
        const isRateLimit = e.status === 429 || e.message?.includes('429') || e.message?.includes('Resource has been exhausted') || e.message?.includes('Quota exceeded');
        
        if (isRateLimit && item.retries < MAX_RETRIES) {
             // Rate limited - Retry logic
             item.retries++;
             backoffMultiplier = Math.min(backoffMultiplier * 2, 32); // Max 32x backoff
             const delay = 2000 * backoffMultiplier;
             
             console.warn(`Pixel Art Rate Limit Hit for "${item.id}". Waiting ${delay}ms... (Attempt ${item.retries}/${MAX_RETRIES})`);
             
             setTimeout(() => {
                 isProcessing = false;
                 processQueue(); // Retry same item
             }, delay);

        } else {
            // Fatal error or max retries exceeded
            if (item.retries >= MAX_RETRIES) {
                console.warn(`Max retries reached for "${item.id}". Using fallback.`);
            } else {
                console.error(`Pixel art generation fatal error for "${item.id}":`, e);
            }
            
            // Remove from queue so we don't get stuck
            requestQueue.shift();
            
            // Short delay before next item
            setTimeout(() => {
                isProcessing = false;
                processQueue();
            }, 200); 
        }
    }
};

const enqueueRequest = (id: string, task: () => Promise<void>) => {
    requestQueue.push({ id, task, retries: 0 });
    processQueue();
};

// Generate a deterministic pixel art placeholder (Identicon-style)
const generateFallbackImage = (seed: string, size: number = 32): string => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate a base color from hash
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    const color = '#' + '00000'.substring(0, 6 - c.length) + c;
    
    // Fill background
    ctx.fillStyle = '#f3f4f6'; 
    ctx.fillRect(0, 0, size, size);
    
    // Generate symmetric pattern
    ctx.fillStyle = color;
    for(let x = 0; x < size / 2; x++) {
        for(let y = 0; y < size; y++) {
             const i = (x * size + y);
             const bit = ((hash >> (i % 24)) ^ (hash >> (y % 16))) & 1;
             if(bit === 1) {
                 ctx.fillRect(x, y, 1, 1);
                 ctx.fillRect(size - 1 - x, y, 1, 1);
             }
        }
    }
    return canvas.toDataURL();
}

export const usePixelArtGen = (prompt: string, aspectRatio: '1:1' | '16:9' = '1:1') => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const cacheKey = `pixel_art_v4_${prompt}_${aspectRatio}`; 

    useEffect(() => {
        // 1. Memory Cache
        if (memoryCache[cacheKey]) {
            setImageUrl(memoryCache[cacheKey]);
            return;
        }
        
        // 2. LocalStorage Cache
        try {
            const localData = localStorage.getItem(cacheKey);
            if (localData) {
                setImageUrl(localData);
                memoryCache[cacheKey] = localData;
                return;
            }
        } catch(e) { console.warn("LocalStorage access failed", e); }

        // 3. Failed previously? Use fallback immediately.
        if (FAILED_CACHE.has(cacheKey)) {
             setImageUrl(generateFallbackImage(prompt));
             setError(true);
             return;
        }

        setLoading(true);
        
        // 4. Enqueue API Request
        enqueueRequest(prompt, async () => {
            // Double check cache inside the task in case it was populated while queued
            if (memoryCache[cacheKey]) {
                setImageUrl(memoryCache[cacheKey]);
                setLoading(false);
                return;
            }
            if (FAILED_CACHE.has(cacheKey)) {
                 setImageUrl(generateFallbackImage(prompt));
                 setLoading(false);
                 return;
            }

            try {
                const response = await ai.models.generateImages({
                    model: 'imagen-4.0-generate-001',
                    prompt: prompt + ", pixel art style, 16-bit, retro game asset, distinct outlines, vibrant, white background, isometric view if building, single isolated object",
                    config: {
                        numberOfImages: 1,
                        aspectRatio: aspectRatio,
                        outputMimeType: 'image/jpeg',
                    },
                });
                
                const base64 = response.generatedImages?.[0]?.image?.imageBytes;
                if (base64) {
                    const fullUrl = `data:image/jpeg;base64,${base64}`;
                    try {
                        localStorage.setItem(cacheKey, fullUrl);
                    } catch(e) { 
                        console.warn("LocalStorage full, skipping cache");
                    }
                    memoryCache[cacheKey] = fullUrl;
                    setImageUrl(fullUrl);
                    setLoading(false);
                } else {
                    throw new Error("No image data returned");
                }
            } catch (err: any) {
                // Propagate 429 to the queue manager for retry
                if (err.status === 429 || err.message?.includes('429') || err.message?.includes('Resource has been exhausted') || err.message?.includes('Quota exceeded')) {
                    throw err; 
                }
                
                // Handle other fatal errors
                console.warn(`Failed generation for: ${prompt}. Using fallback.`);
                FAILED_CACHE.add(cacheKey);
                setImageUrl(generateFallbackImage(prompt));
                setError(true);
                setLoading(false);
            }
        });

    }, [prompt, aspectRatio, cacheKey]);

    return { imageUrl: imageUrl || generateFallbackImage(prompt), loading, error };
}

const PixelArt: React.FC<PixelArtProps> = ({ prompt, aspectRatio = '1:1', className, placeholderText, text }) => {
    const { imageUrl, loading } = usePixelArtGen(prompt, aspectRatio as '1:1' | '16:9');

    return (
        <div className={`relative overflow-hidden ${className} bg-gray-50`}>
            <img 
                src={imageUrl} 
                alt={prompt} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-50 blur-sm' : 'opacity-100'}`}
                style={{ imageRendering: 'pixelated' }}
            />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-4 h-4 border-2 border-t-transparent border-[#4a3b32] rounded-full animate-spin"></div>
                </div>
            )}
            {text && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 truncate text-center font-pixel py-0.5">
                    {text}
                </div>
            )}
        </div>
    );
};

export default PixelArt;
