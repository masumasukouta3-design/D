
import React, { useState, useLayoutEffect } from 'react';
import { GameAction } from '../types';

interface TutorialStep {
    title: string;
    content: string;
    targetId?: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const steps: TutorialStep[] = [
    {
        title: 'ようこそ！',
        content: 'ますえり鬼畜農場へようこそ！このチュートリアルでは、ゲームの基本的な流れを説明します。',
        position: 'center',
    },
    {
        title: 'ゲームの目標',
        content: 'あなたの目標は、農場を経営してお金を稼ぎ、帝国を築くことです。現在のお金はここに表示されます。',
        targetId: 'money-display',
        position: 'bottom',
    },
    {
        title: 'メイン画面',
        content: 'これらのタブを使って、農場、市場、倉庫など、さまざまな施設に移動できます。',
        targetId: 'tabs-nav',
        position: 'bottom',
    },
    {
        title: '① 市場',
        content: '「市場」では、作物の種や新しい施設を購入できます。まずはここでお買い物をしましょう。',
        targetId: 'market-tab',
        position: 'bottom',
    },
    {
        title: '② 農場',
        content: '「農場」では、購入した種を施設に植えて育てます。作物が育ったら収穫するのもここです。',
        targetId: 'farm-tab',
        position: 'bottom',
    },
    {
        title: '③ 倉庫',
        content: '「倉庫」では、収穫した作物や作った商品を保管・売却できます。ここでお金に換えましょう。',
        targetId: 'warehouse-tab',
        position: 'bottom',
    },
    {
        title: 'チュートリアル完了！',
        content: '基本は「市場で買う→農場で育てる→倉庫で売る」のサイクルです。研究、遺跡、会社経営など、たくさんの要素を探検して、最高の農場主を目指しましょう！',
        position: 'center',
    },
];

const Tutorial: React.FC<{ dispatch: React.Dispatch<GameAction> }> = ({ dispatch }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const currentStep = steps[stepIndex];

    useLayoutEffect(() => {
        if (currentStep.targetId) {
            const elem = document.querySelector(`[data-tutorial-id="${currentStep.targetId}"]`);
            if (elem) {
                setTargetRect(elem.getBoundingClientRect());
            } else {
                setTargetRect(null);
            }
        } else {
            setTargetRect(null);
        }
    }, [stepIndex, currentStep.targetId]);

    const handleNext = () => setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
    const handlePrev = () => setStepIndex(prev => Math.max(prev - 1, 0));
    const handleFinish = () => dispatch({ type: 'COMPLETE_TUTORIAL' });

    const getTooltipPosition = () => {
        if (!targetRect || currentStep.position === 'center') {
            return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }

        const style: React.CSSProperties = {};
        const offset = 16;

        switch (currentStep.position) {
            case 'bottom':
                style.top = `${targetRect.bottom + offset}px`;
                style.left = `${targetRect.left + targetRect.width / 2}px`;
                style.transform = 'translateX(-50%)';
                break;
            case 'top':
                style.bottom = `${window.innerHeight - targetRect.top + offset}px`;
                style.left = `${targetRect.left + targetRect.width / 2}px`;
                style.transform = 'translateX(-50%)';
                break;
            default:
                style.top = `${targetRect.bottom + offset}px`;
                style.left = `${targetRect.left + targetRect.width / 2}px`;
                style.transform = 'translateX(-50%)';
        }
        return style;
    };
    
    return (
        <div className="fixed inset-0 z-[100]">
            {/* Spotlight effect */}
            <div
                className="fixed inset-0 transition-all duration-300"
                style={{
                    boxShadow: targetRect ? `0 0 0 9999px rgba(15, 23, 42, 0.8)` : 'none',
                    backgroundColor: !targetRect ? 'rgba(15, 23, 42, 0.8)' : 'transparent'
                }}
            />
             {targetRect && (
                <div
                    className="absolute rounded-lg border-2 border-dashed border-white transition-all duration-300 pointer-events-none animate-pulse"
                    style={{
                        top: targetRect.top - 4,
                        left: targetRect.left - 4,
                        width: targetRect.width + 8,
                        height: targetRect.height + 8,
                    }}
                />
            )}
            
            {/* Tooltip */}
            <div 
                className="absolute bg-slate-800 rounded-lg p-6 shadow-2xl max-w-sm w-full transition-all duration-300 border border-slate-600 animate-fade-in"
                style={getTooltipPosition()}
            >
                <h3 className="text-xl font-bold text-green-300 mb-2">{currentStep.title}</h3>
                <p className="text-slate-300 mb-4">{currentStep.content}</p>
                <div className="flex justify-between items-center">
                    <button onClick={handleFinish} className="text-sm text-slate-400 hover:text-white">スキップ</button>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-500">{stepIndex + 1} / {steps.length}</span>
                        <button onClick={handlePrev} disabled={stepIndex === 0} className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1 px-3 rounded">前へ</button>
                        {stepIndex < steps.length - 1 ? (
                             <button onClick={handleNext} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded">次へ</button>
                        ) : (
                             <button onClick={handleFinish} className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded">完了</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
