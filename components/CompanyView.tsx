
import React, { useState } from 'react';
import { GameState, GameAction, Company, Product } from '../types';
import { COMPANY_COST, INITIAL_COMPANIES } from '../constants';
import { CitizenIcon } from './icons';

interface CompanyViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const CitizenModal: React.FC<{
    isOpen: boolean,
    onClose: () => void,
    maxAmount: number,
    currentAmount: number,
    targetName: string,
    onConfirm: (amount: number, type: 'assign' | 'withdraw') => void
}> = ({ isOpen, onClose, maxAmount, currentAmount, targetName, onConfirm }) => {
    const [amount, setAmount] = useState(1);
    const MAX_ASSIGNMENT = 3000;

    if (!isOpen) return null;

    const maxAssignable = Math.min(maxAmount, MAX_ASSIGNMENT - currentAmount);

    const handleAssignAll = () => {
        if (maxAssignable > 0) {
            onConfirm(maxAssignable, 'assign');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4">
                <h2 className="text-xl font-bold text-[#4a3b32] mb-4 border-b-4 border-[#4a3b32] pb-2">{targetName} - 国民管理</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-[#6b4423] mb-2 font-bold">数 (配置可能: {maxAssignable}, 現在: {currentAmount}/{MAX_ASSIGNMENT})</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-full bg-white text-[#2d1b2e] p-2 border-2 border-[#4a3b32] focus:outline-none focus:bg-[#fefce8]"
                            min="1"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => onConfirm(amount, 'assign')} disabled={amount > maxAssignable || maxAssignable <= 0} className="col-span-1 bg-[#60a5fa] hover:bg-[#3b82f6] disabled:bg-gray-400 text-white font-bold py-2 px-2 text-xs pixel-btn">配置</button>
                        <button onClick={handleAssignAll} disabled={maxAssignable <= 0} className="col-span-1 bg-[#4ade80] hover:bg-[#22c55e] disabled:bg-gray-400 text-white font-bold py-2 px-2 text-xs pixel-btn">全配置</button>
                        <button onClick={() => onConfirm(amount, 'withdraw')} disabled={amount > currentAmount || currentAmount <= 0} className="col-span-1 bg-[#fbbf24] hover:bg-[#f59e0b] disabled:bg-gray-400 text-[#2d1b2e] font-bold py-2 px-2 text-xs pixel-btn">引き払う</button>
                    </div>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 pixel-btn">閉じる</button>
            </div>
        </div>
    );
};


const AssignCompanyModal: React.FC<{
    isOpen: boolean,
    onClose: () => void,
    tenantId: string,
    unassignedCompanies: Company[],
    onAssign: (companyId: string, tenantId: string) => void,
}> = ({ isOpen, onClose, tenantId, unassignedCompanies, onAssign }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4">
                <h2 className="text-xl font-bold text-[#4a3b32] mb-4 border-b-4 border-[#4a3b32] pb-2">会社を入居させる</h2>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {unassignedCompanies.length > 0 ? unassignedCompanies.map(c => (
                        <div key={c.id} className="p-2 border-2 border-[#d2b48c] flex justify-between items-center bg-white">
                            <p className="font-bold text-[#2d1b2e]">{c.name}</p>
                            <button onClick={() => onAssign(c.id, tenantId)} className="bg-[#60a5fa] text-white font-bold py-1 px-3 text-xs pixel-btn">選択</button>
                        </div>
                    )) : <p className="text-center text-gray-500">入居可能な会社がありません。</p>}
                </div>
                 <button onClick={onClose} className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 pixel-btn">閉じる</button>
            </div>
        </div>
    );
}

const CompanyCard: React.FC<{ company: Company, gameState: GameState, dispatch: React.Dispatch<GameAction> }> = ({ company, gameState, dispatch }) => {
    const companyInfo = gameState.companyData[company.typeId];
    const [modalOpen, setModalOpen] = useState(false);

    const handleProduce = (productId: string, all: boolean) => {
        const product = gameState.productData[productId];
        let maxCanMake = Infinity;
        Object.keys(product.recipe).forEach((cropId) => {
            const required = product.recipe[cropId];
            const owned = gameState.products[cropId] || 0;
            maxCanMake = Math.min(maxCanMake, Math.floor(owned / required));
        });

        const quantity = all ? maxCanMake : 1;
        if (quantity > 0) {
            dispatch({ type: 'PRODUCE_PRODUCT', payload: { companyId: company.id, productId, quantity } });
        }
    };
    
    const handleCitizenManagement = (amount: number, type: 'assign' | 'withdraw') => {
        const actionType = type === 'assign' ? 'ASSIGN_CITIZENS' : 'WITHDRAW_CITIZENS';
        dispatch({ type: actionType, payload: { targetId: company.id, targetType: 'company', amount }});
    };

    return (
        <div className="pixel-card p-4 flex flex-col space-y-3 bg-[#fff]">
            <div className="border-b-2 border-[#d2b48c] pb-2">
                <h3 className="text-lg font-bold text-[#0369a1]">{company.name}</h3>
                <p className="text-xs text-gray-500">時価: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(company.marketValue)} 円</span></p>
            </div>
            <div className="flex justify-between items-center text-sm bg-[#f0f9ff] p-2 border border-[#bae6fd]">
                <div className="flex items-center text-[#0369a1]">
                    <CitizenIcon /> <span className="ml-1 font-bold">{company.assignedCitizens}</span>
                </div>
                <button onClick={() => setModalOpen(true)} className="bg-[#0369a1] text-white font-bold py-1 px-2 text-xs pixel-btn">管理</button>
            </div>
             {company.tenantId ? <p className="text-xs text-[#15803d] font-bold">✅ テナント入居中</p> : <p className="text-xs text-[#b45309] font-bold">❌ 未入居</p>}

            <div className="border-t-2 border-[#d2b48c] pt-2 space-y-3">
                <h4 className="font-bold text-sm text-[#4a3b32]">生産ライン</h4>
                {companyInfo.products.map(productId => {
                    const product = gameState.productData[productId];
                    return (
                        <div key={productId} className="bg-[#fafaf9] border border-[#e7e5e4] p-2">
                            <p className="font-bold text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500">必要: {Object.entries(product.recipe).map(([cropId, q]) => `${gameState.cropData[cropId].name} x${q}`).join(', ')}</p>
                            <div className="flex space-x-2 mt-2">
                                <button onClick={() => handleProduce(productId, false)} className="flex-1 bg-[#60a5fa] hover:bg-[#3b82f6] text-white font-bold py-1 text-xs pixel-btn">1個</button>
                                <button onClick={() => handleProduce(productId, true)} className="flex-1 bg-[#4ade80] hover:bg-[#22c55e] text-white font-bold py-1 text-xs pixel-btn">全部</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <CitizenModal 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                maxAmount={gameState.citizens}
                currentAmount={company.assignedCitizens}
                targetName={company.name}
                onConfirm={handleCitizenManagement}
            />
        </div>
    );
};

const CompanyView: React.FC<CompanyViewProps> = ({ gameState, dispatch }) => {
  const [tab, setTab] = useState<'manage' | 'buy'>('manage');

  const handleBuyCompany = (typeId: string) => {
    if (gameState.money < COMPANY_COST) return;
    const companyInfo = INITIAL_COMPANIES[typeId];
    const existingCount = gameState.companies.filter(c => c.typeId === typeId).length;
    const newCompany: Company = {
        id: `comp-${Date.now()}-${Math.random()}`,
        typeId,
        name: `${companyInfo.name} #${existingCount + 1}`,
        marketValue: companyInfo.baseMarketValue,
        productionRecord: 0,
        assignedCitizens: 0,
        tenantId: null
    };
    dispatch({ type: 'BUY_COMPANY', payload: { company: newCompany, cost: COMPANY_COST } });
  };
  
  const groupedCompanies = gameState.companies.reduce((acc, company) => {
    const typeId = company.typeId;
    if (!acc[typeId]) {
        acc[typeId] = [];
    }
    acc[typeId].push(company);
    return acc;
  }, {} as Record<string, Company[]>);

  return (
    <div className="animate-fade-in pb-20">
        <div className="flex justify-center mb-6 space-x-4">
            <button onClick={() => setTab('manage')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${tab === 'manage' ? 'bg-[#0ea5e9] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>🏢 経営</button>
            <button onClick={() => setTab('buy')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${tab === 'buy' ? 'bg-[#0ea5e9] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>💰 買収</button>
        </div>

        {tab === 'manage' && (
             <div>
                {gameState.companies.length === 0 ? (
                    <p className="text-center text-gray-500 mt-8">所有している会社はありません。</p>
                ) : (
                    <div className="space-y-4">
                        {Object.keys(groupedCompanies).map(typeId => {
                            const companies = groupedCompanies[typeId];
                            return (
                                <details key={typeId} className="pixel-card open:bg-[#f0f9ff]" open>
                                    <summary className="font-bold text-lg p-4 cursor-pointer list-none text-[#0369a1] bg-white border-b-2 border-[#4a3b32]">
                                        {INITIAL_COMPANIES[typeId].name} ({companies.length})
                                    </summary>
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {companies.map(c => <CompanyCard key={c.id} company={c} gameState={gameState} dispatch={dispatch} />)}
                                        </div>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                )}
            </div>
        )}

        {tab === 'buy' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(INITIAL_COMPANIES).map(companyInfo => {
                     const existingCount = gameState.companies.filter(c => c.typeId === companyInfo.id).length;
                     const limitReached = existingCount >= 10;
                     return (
                         <div key={companyInfo.id} className="pixel-card p-6 flex flex-col justify-between">
                             <div>
                                <h3 className="text-xl font-bold text-[#0369a1]">{companyInfo.name}</h3>
                                <p className="text-gray-600 text-sm mt-2">基本時価: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(companyInfo.baseMarketValue)} 円</span></p>
                                <p className="text-gray-600 text-sm">所持数: {existingCount} / 10</p>
                                <div className="mt-4 bg-[#f0f9ff] p-2 border border-[#bae6fd]">
                                    <p className="text-xs font-bold text-[#0369a1] mb-1">生産可能商品:</p>
                                    <ul className="list-disc list-inside text-xs text-gray-600">
                                        {companyInfo.products.map(pid => <li key={pid}>{gameState.productData[pid].name}</li>)}
                                    </ul>
                                </div>
                             </div>
                             <button
                                onClick={() => handleBuyCompany(companyInfo.id)}
                                disabled={gameState.money < COMPANY_COST || limitReached}
                                className="w-full mt-6 bg-[#a855f7] hover:bg-[#9333ea] disabled:bg-gray-400 text-white font-bold py-3 px-4 pixel-btn"
                            >
                                {limitReached ? '上限です' : `買収する (${new Intl.NumberFormat('ja-JP').format(COMPANY_COST)} 円)`}
                             </button>
                         </div>
                     );
                })}
            </div>
        )}

    </div>
  );
};

export default CompanyView;
