
import React, { useState } from 'react';
import { GameState, GameAction, Tenant, Company } from '../types';
import { TENANT_COST, TENANT_COMPANY_CAPACITY, TENANT_PROFIT_DURATION_MS, TENANT_PROFIT_MARKET_VALUE_MULTIPLIER, TENANT_PROFIT_CITIZEN_BONUS } from '../constants';
import { CitizenIcon } from './icons';

interface TenantViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
  onClaimProfit: (tenantId: string) => void;
  bonuses: { tenantTimeReduction: number };
}

// ... (CitizenModal and AssignCompanyModal logic remains identical, just applying pixel art classes to them)
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
    const handleAssignAll = () => { if (maxAssignable > 0) onConfirm(maxAssignable, 'assign'); };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#fff8dc] border-4 border-[#4a3b32] shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md m-4">
                <h2 className="text-xl font-bold text-[#4a3b32] mb-4 border-b-4 border-[#4a3b32] pb-2">{targetName} - 国民管理</h2>
                <div className="space-y-4">
                    <div>
                         <label className="block text-[#6b4423] mb-2 font-bold">数 (配置可能: {maxAssignable}, 現在: {currentAmount}/{MAX_ASSIGNMENT})</label>
                         <input type="number" value={amount} onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value, 10) || 1))} className="w-full bg-white text-[#2d1b2e] p-2 border-2 border-[#4a3b32] focus:outline-none" min="1" />
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

const TenantCard: React.FC<{
    tenant: Tenant,
    gameState: GameState,
    dispatch: React.Dispatch<GameAction>,
    now: number,
    onClaimProfit: (tenantId: string) => void,
    bonuses: { tenantTimeReduction: number };
}> = ({ tenant, gameState, dispatch, now, onClaimProfit, bonuses }) => {
    const companiesInTenant = gameState.companies.filter(c => c.tenantId === tenant.id);
    const totalMarketValue = companiesInTenant.reduce((sum, c) => sum + c.marketValue, 0);
    const profitState = gameState.tenantProfitState[tenant.id];

    const effectiveTenantProfitTime = TENANT_PROFIT_DURATION_MS * (1 - bonuses.tenantTimeReduction);

    const isProfitReady = profitState?.startTime !== null && now - profitState.startTime >= effectiveTenantProfitTime;
    const timeLeftMs = profitState?.startTime !== null ? (profitState.startTime + effectiveTenantProfitTime) - now : 0;
    
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [citizenModalOpen, setCitizenModalOpen] = useState(false);

    const formatTimeLeft = (ms: number) => {
        if (ms <= 0) return '利益獲得可能';
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `残り ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleAssignCompany = (companyId: string, tenantId: string) => {
        dispatch({ type: 'ASSIGN_COMPANY_TO_TENANT', payload: { companyId, tenantId }});
        setAssignModalOpen(false);
    }

    const handleCitizenManagement = (amount: number, type: 'assign' | 'withdraw') => {
        const actionType = type === 'assign' ? 'ASSIGN_CITIZENS' : 'WITHDRAW_CITIZENS';
        dispatch({ type: actionType, payload: { targetId: tenant.id, targetType: 'tenant', amount }});
    };
    
    const unassignedCompanies = gameState.companies.filter(c => c.tenantId === null);
    const earnings = (totalMarketValue * TENANT_PROFIT_MARKET_VALUE_MULTIPLIER) + (tenant.assignedCitizens * TENANT_PROFIT_CITIZEN_BONUS);

    return (
        <details className="pixel-card open:bg-[#fefce8] mb-4" open>
            <summary className="text-lg font-bold p-4 cursor-pointer list-none flex justify-between items-center text-[#1e3a8a] bg-[#e0f2fe] border-b-2 border-[#4a3b32]">
                {tenant.name}
                <span className="text-sm font-normal text-gray-600">会社: {companiesInTenant.length}/{TENANT_COMPANY_CAPACITY} | 国民: {tenant.assignedCitizens}人</span>
            </summary>
            <div className="p-4 space-y-4">
                {/* Profit Section */}
                <div className="bg-white border-2 border-[#d2b48c] p-4">
                    <p className="text-gray-600">時価総額合計: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(totalMarketValue)} 円</span></p>
                     <p className="text-gray-600">次回利益: <span className="text-[#15803d] font-bold">{new Intl.NumberFormat('ja-JP').format(Math.floor(earnings))} 円</span></p>
                    <div className="mt-3">
                         {profitState?.startTime === null ? (
                            <button onClick={() => dispatch({type: 'START_TENANT_PROFIT_COLLECTION', payload: { tenantId: tenant.id }})} disabled={companiesInTenant.length === 0} className="w-full bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-bold py-2 px-4 pixel-btn">回収開始</button>
                         ) : isProfitReady ? (
                             <button onClick={() => onClaimProfit(tenant.id)} className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] font-bold py-2 px-4 pixel-btn animate-bounce-pixel">利益獲得</button>
                         ) : (
                             <div className="text-center">
                                 <p className="text-sm font-mono font-bold text-[#4b5563]">{formatTimeLeft(timeLeftMs)}</p>
                                 <div className="w-full bg-gray-300 h-3 mt-1 border border-[#4a3b32]">
                                    <div className="bg-[#16a34a] h-full" style={{ width: `${100 - (timeLeftMs / effectiveTenantProfitTime) * 100}%` }}></div>
                                </div>
                             </div>
                         )}
                    </div>
                </div>

                {/* Citizen Management */}
                <div className="bg-white border-2 border-[#d2b48c] p-4 flex justify-between items-center">
                    <div className="flex items-center text-[#1e3a8a] font-bold">
                        <CitizenIcon />
                        <span className="ml-2">配置国民: {tenant.assignedCitizens} 人</span>
                    </div>
                    <button onClick={() => setCitizenModalOpen(true)} className="bg-[#64748b] hover:bg-[#475569] text-white font-bold py-1 px-3 text-xs pixel-btn">管理</button>
                </div>

                {/* Company List */}
                <div className="space-y-2">
                    <h4 className="font-bold text-[#4a3b32] border-b border-[#4a3b32] pb-1">入居中の会社</h4>
                    {companiesInTenant.map(c => (
                        <div key={c.id} className="flex justify-between items-center bg-[#f0f9ff] p-2 border border-[#bae6fd]">
                            <span className="font-bold text-[#0369a1]">{c.name}</span>
                            <button onClick={() => dispatch({type: 'REMOVE_COMPANY_FROM_TENANT', payload: { companyId: c.id }})} className="text-red-500 hover:text-red-700 text-xs font-bold">退去</button>
                        </div>
                    ))}
                    {companiesInTenant.length < TENANT_COMPANY_CAPACITY && (
                        <button onClick={() => setAssignModalOpen(true)} className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-white font-bold py-2 px-4 pixel-btn mt-2">会社を入居させる</button>
                    )}
                </div>
                 <AssignCompanyModal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} tenantId={tenant.id} unassignedCompanies={unassignedCompanies} onAssign={handleAssignCompany} />
                 <CitizenModal 
                    isOpen={citizenModalOpen}
                    onClose={() => setCitizenModalOpen(false)}
                    maxAmount={gameState.citizens}
                    currentAmount={tenant.assignedCitizens}
                    targetName={tenant.name}
                    onConfirm={handleCitizenManagement}
                />
            </div>
        </details>
    )
}

const TenantView: React.FC<TenantViewProps> = ({ gameState, dispatch, now, onClaimProfit, bonuses }) => {
    const [tab, setTab] = useState<'manage' | 'buy'>('manage');

    const handleBuyTenant = () => {
        if (gameState.money < TENANT_COST) return;
        const newTenant: Tenant = {
            id: `ten-${Date.now()}`,
            name: `テナント #${gameState.tenants.length + 1}`,
            assignedCitizens: 0
        };
        dispatch({ type: 'BUY_TENANT', payload: { tenant: newTenant, cost: TENANT_COST }});
    }

  return (
    <div className="animate-fade-in pb-20">
        <div className="flex justify-center mb-6 space-x-4">
            <button onClick={() => setTab('manage')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${tab === 'manage' ? 'bg-[#1e3a8a] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>🏘️ 管理</button>
            <button onClick={() => setTab('buy')} className={`px-6 py-2 font-bold text-lg transition-all pixel-btn ${tab === 'buy' ? 'bg-[#1e3a8a] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>🏗️ 購入</button>
        </div>
        
        {tab === 'manage' && (
            <div className="space-y-4">
                 {gameState.tenants.length === 0 ? (
                    <p className="text-center text-gray-500 mt-8">所有しているテナントはありません。</p>
                ) : (
                    gameState.tenants.map(t => <TenantCard key={t.id} tenant={t} gameState={gameState} dispatch={dispatch} now={now} onClaimProfit={onClaimProfit} bonuses={bonuses} />)
                )}
            </div>
        )}

        {tab === 'buy' && (
             <div className="pixel-card p-8 max-w-md mx-auto text-center">
                 <h3 className="text-2xl font-bold text-[#1e3a8a]">新しいテナント</h3>
                 <p className="my-4 text-gray-600">テナントを建設して、会社を入居させましょう。</p>
                 <p className="text-xl font-bold text-[#b45309] mb-6">{new Intl.NumberFormat('ja-JP').format(TENANT_COST)} 円</p>
                 <button 
                    onClick={handleBuyTenant}
                    disabled={gameState.money < TENANT_COST}
                    className="w-full bg-[#a855f7] hover:bg-[#9333ea] disabled:bg-gray-400 text-white font-bold py-3 px-4 pixel-btn"
                >
                    建設する
                 </button>
             </div>
        )}
    </div>
  );
};

export default TenantView;
