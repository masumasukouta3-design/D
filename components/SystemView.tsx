
import React, { useState } from 'react';
import { GameState, GameAction } from '../types';

function uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToUint8Array(base64: string): Uint8Array {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

interface SystemViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const SystemView: React.FC<SystemViewProps> = ({ gameState, dispatch }) => {
    const [saveData, setSaveData] = useState('');
    const [loadData, setLoadData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCompressed, setIsCompressed] = useState(false);
    const [notification, setNotification] = useState<{type: 'success'|'error', message: string} | null>(null);

    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    }

    const handleExport = () => {
        try {
            const jsonString = JSON.stringify(gameState);
            setSaveData(jsonString);
            setIsCompressed(false);
            showNotification('セーブデータを書き出しました。');
        } catch (error) {
            console.error("Save export failed:", error);
            showNotification('セーブデータの書き出しに失敗しました。', 'error');
        }
    };

    const handleCompress = async () => {
        if (!saveData || isCompressed) return;
        setIsLoading(true);
        try {
            const stream = new Blob([saveData], { type: 'text/plain' }).stream().pipeThrough(new CompressionStream('gzip'));
            const compressed = await new Response(stream).arrayBuffer();
            const compressedBase64 = uint8ArrayToBase64(new Uint8Array(compressed));
            setSaveData(compressedBase64);
            setIsCompressed(true);
            showNotification('文字列を省略しました。');
        } catch (error) {
            console.error("Save compression failed:", error);
            showNotification('文字列の省略に失敗しました。', 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(saveData).then(() => {
            showNotification('クリップボードにコピーしました。');
        }, () => {
            showNotification('コピーに失敗しました。', 'error');
        });
    }

    const handleLoad = async () => {
        if (!loadData) return;
        setIsLoading(true);
        try {
            let jsonText = loadData;
            if (!loadData.trim().startsWith('{')) {
                const uint8Array = base64ToUint8Array(loadData);
                const stream = new Blob([uint8Array]).stream().pipeThrough(new DecompressionStream('gzip'));
                const decompressed = await new Response(stream).blob();
                jsonText = await decompressed.text();
            }
            
            const newState = JSON.parse(jsonText);

            if (typeof newState.money !== 'number' || !Array.isArray(newState.facilities)) {
                throw new Error("Invalid save data format.");
            }
            
            dispatch({ type: 'LOAD_GAME', payload: { newState } });
            showNotification('ゲームをロードしました！');
            setLoadData('');
        } catch (error) {
            console.error("Load failed:", error);
            showNotification('セーブデータの読み込みに失敗しました。データが破損しているか、形式が正しくありません。', 'error');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto pb-20">
             {notification && (
                <div className={`fixed top-24 right-4 p-4 border-4 border-[#2d1b2e] shadow-[6px_6px_0px_0px_#000] text-white font-bold ${notification.type === 'success' ? 'bg-[#16a34a]' : 'bg-[#dc2626]'} z-50 animate-fade-in`}>
                    {notification.message}
                </div>
            )}
            <div className="pixel-card p-6">
                <h2 className="text-2xl font-bold text-[#16a34a] mb-4 border-b-2 border-[#4a3b32] pb-2">💾 セーブ</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={handleExport} disabled={isLoading} className="bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn">
                        セーブを書き出し
                    </button>
                    <button onClick={handleCompress} disabled={!saveData || isCompressed || isLoading} className="bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn">
                        {isLoading ? '処理中...' : '文字列を省略'}
                    </button>
                     <button onClick={handleCopy} disabled={!saveData || isLoading} className="bg-[#64748b] hover:bg-[#475569] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn">
                        コピー
                    </button>
                </div>
                {saveData && (
                    <textarea 
                        readOnly
                        value={saveData}
                        className="w-full h-32 bg-[#f1f5f9] text-[#2d1b2e] p-2 border-2 border-[#4a3b32] focus:outline-none focus:bg-white font-mono text-xs"
                        placeholder="ここにセーブデータが出力されます"
                    />
                )}
            </div>
            <div className="pixel-card p-6">
                <h2 className="text-2xl font-bold text-[#dc2626] mb-4 border-b-2 border-[#4a3b32] pb-2">📤 ロード</h2>
                <textarea 
                    value={loadData}
                    onChange={(e) => setLoadData(e.target.value)}
                    className="w-full h-32 bg-[#f1f5f9] text-[#2d1b2e] p-2 border-2 border-[#4a3b32] focus:outline-none focus:bg-white font-mono text-xs"
                    placeholder="セーブデータをここに貼り付けてください"
                />
                <button onClick={handleLoad} disabled={!loadData || isLoading} className="w-full mt-4 bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn">
                    {isLoading ? '読み込み中...' : '読み込み'}
                </button>
            </div>
        </div>
    );
}

export default SystemView;
