import React from 'react';
import { GameState, GameAction, Crop, Product } from '../types';
import { STAT_SELL_PRICE_MULTIPLIER, INITIAL_MINERALS, INITIAL_WEAPONS, INITIAL_SPECIALTY_GOODS } from '../constants';
import { StarIcon, ItemIcon } from './icons';

interface WarehouseViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  bonuses: { sellPriceMultiplier: number };
}

const WarehouseView: React.FC<WarehouseViewProps> = ({ gameState, dispatch, bonuses }) => {
  const { products, cropData, companyProducts, productData, minerals, weapons, specialtyGoods } = gameState;
  
  const calculateSellPrice = (crop: Crop): number => {
    const statBonus = (crop.stats.taste + crop.stats.durability + crop.stats.appearance) * STAT_SELL_PRICE_MULTIPLIER;
    return Math.floor(crop.baseSellPrice * (1 + statBonus));
  };

  const handleSellCrop = (cropId: string, quantity: number) => {
    const crop = cropData[cropId];
    const sellPrice = calculateSellPrice(crop);
    const earnings = sellPrice * quantity * bonuses.sellPriceMultiplier;
    dispatch({ type: 'SELL', payload: { cropId, quantity, earnings: Math.floor(earnings) } });
  };

  const handleSellProduct = (productId: string, quantity: number) => {
    const product = productData[productId];
    const earnings = product.sellPrice * quantity * bonuses.sellPriceMultiplier;
    dispatch({ type: 'SELL_COMPANY_PRODUCT', payload: { productId, quantity, earnings: Math.floor(earnings) } });
  };

  const handleSellMineral = (mineralId: string, quantity: number) => {
    const mineral = INITIAL_MINERALS[mineralId];
    const earnings = mineral.sellPrice * quantity * bonuses.sellPriceMultiplier;
    dispatch({ type: 'SELL_MINERAL', payload: { mineralId, quantity, earnings: Math.floor(earnings) } });
  };

  const handleSellWeapon = (weaponId: string, quantity: number) => {
    const weapon = INITIAL_WEAPONS[weaponId];
    const earnings = weapon.sellPrice * quantity * bonuses.sellPriceMultiplier;
    dispatch({ type: 'SELL_WEAPON', payload: { weaponId, quantity, earnings: Math.floor(earnings) } });
  };
  
  const handleSellSpecialtyGood = (specialtyGoodId: string, quantity: number) => {
    const good = INITIAL_SPECIALTY_GOODS[specialtyGoodId];
    const earnings = good.sellPrice * quantity * bonuses.sellPriceMultiplier;
    dispatch({ type: 'SELL_SPECIALTY_GOOD', payload: { specialtyGoodId, quantity, earnings: Math.floor(earnings) } });
  };

  const productIds = Object.keys(products).filter(id => products[id] > 0);
  const companyProductIds = Object.keys(companyProducts).filter(id => companyProducts[id] > 0);
  const mineralIds = Object.keys(minerals).filter(id => minerals[id] > 0);
  const weaponIds = Object.keys(weapons).filter(id => weapons[id] > 0);
  const specialtyGoodIds = Object.keys(specialtyGoods).filter(id => specialtyGoods[id] > 0);

  return (
    <div className="animate-fade-in space-y-12 pb-20">
        <div>
            <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 flex items-center gap-3 bg-[#dcfce7] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">🍎 作物倉庫</h2>
            {productIds.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">作物の倉庫は空です。</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productIds.map(cropId => {
                        const crop = cropData[cropId];
                        const quantity = products[cropId];
                        const currentPrice = calculateSellPrice(crop);
                        const bonusPrice = Math.floor(currentPrice * bonuses.sellPriceMultiplier);
                        return (
                            <div key={cropId} className="pixel-card p-4 flex flex-col relative overflow-hidden">
                                <ItemIcon id={cropId} className="absolute top-2 right-2 w-12 h-12 border border-gray-200 bg-white" />
                                <h3 className="text-xl font-bold text-[#15803d] pr-12">{crop.name}</h3>
                                <div className="bg-white border border-[#d2b48c] p-2 my-2">
                                    <p className="text-sm text-gray-600">所持数: <span className="font-bold">{quantity}</span></p>
                                    <p className="text-sm text-gray-600">売値: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(bonusPrice)} 円</span></p>
                                </div>
                                <div className="text-[#b45309] flex items-center mt-2 text-xs mb-4">
                                    <div className="flex items-center mr-3" title="美味しさ"><StarIcon /> {crop.stats.taste}</div>
                                    <div className="flex items-center mr-3" title="長持ちさ"><StarIcon /> {crop.stats.durability}</div>
                                    <div className="flex items-center" title="見た目の良さ"><StarIcon /> {crop.stats.appearance}</div>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleSellCrop(cropId, 10)}
                                        disabled={quantity < 10}
                                        className="bg-[#94a3b8] hover:bg-[#64748b] disabled:bg-[#cbd5e1] text-white font-bold py-2 text-sm pixel-btn"
                                    >
                                        10個
                                    </button>
                                    <button
                                        onClick={() => handleSellCrop(cropId, quantity)}
                                        className="bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-2 text-sm pixel-btn"
                                    >
                                        全部
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        
        {/* Products */}
        <div>
            <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 flex items-center gap-3 bg-[#e0f2fe] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">🥧 商品倉庫</h2>
            {companyProductIds.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">商品の倉庫は空です。</p>
            ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companyProductIds.map(productId => {
                        const product = productData[productId];
                        const quantity = companyProducts[productId];
                        const bonusPrice = Math.floor(product.sellPrice * bonuses.sellPriceMultiplier);
                        return (
                             <div key={productId} className="pixel-card p-4 flex flex-col relative">
                                <ItemIcon id={productId} className="absolute top-2 right-2 w-10 h-10 border border-gray-200 bg-white" />
                                <h3 className="text-xl font-bold text-[#0369a1] pr-10">{product.name}</h3>
                                <div className="bg-white border border-[#d2b48c] p-2 my-2">
                                    <p className="text-sm text-gray-600">所持数: <span className="font-bold">{quantity}</span></p>
                                    <p className="text-sm text-gray-600">売値: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(bonusPrice)} 円</span></p>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button onClick={() => handleSellProduct(productId, 10)} disabled={quantity < 10} className="bg-[#94a3b8] hover:bg-[#64748b] disabled:bg-[#cbd5e1] text-white font-bold py-2 text-sm pixel-btn">10個</button>
                                    <button onClick={() => handleSellProduct(productId, quantity)} className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2 text-sm pixel-btn">全部</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

        {/* Minerals */}
        <div>
            <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 flex items-center gap-3 bg-[#fef3c7] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">💎 鉱物倉庫</h2>
            {mineralIds.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">鉱物の倉庫は空です。</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mineralIds.map(mineralId => {
                        const mineral = INITIAL_MINERALS[mineralId];
                        const quantity = minerals[mineralId];
                        const bonusPrice = Math.floor(mineral.sellPrice * bonuses.sellPriceMultiplier);
                        return (
                            <div key={mineralId} className="pixel-card p-4 flex flex-col relative">
                                <ItemIcon id={mineralId} className="absolute top-2 right-2 w-10 h-10 border border-gray-200 bg-white" />
                                <h3 className="text-xl font-bold text-[#b45309] pr-10">{mineral.name}</h3>
                                <div className="bg-white border border-[#d2b48c] p-2 my-2">
                                    <p className="text-sm text-gray-600">所持数: <span className="font-bold">{quantity}</span></p>
                                    <p className="text-sm text-gray-600">売値: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(bonusPrice)} 円</span></p>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button onClick={() => handleSellMineral(mineralId, 10)} disabled={quantity < 10} className="bg-[#94a3b8] hover:bg-[#64748b] disabled:bg-[#cbd5e1] text-white font-bold py-2 text-sm pixel-btn">10個</button>
                                    <button onClick={() => handleSellMineral(mineralId, quantity)} className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-2 text-sm pixel-btn">全部</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        
        {/* Weapons */}
        <div>
             <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 flex items-center gap-3 bg-[#fee2e2] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">⚔️ 武器倉庫</h2>
             {weaponIds.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">武器の倉庫は空です。</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weaponIds.map(weaponId => {
                        const weapon = INITIAL_WEAPONS[weaponId];
                        const quantity = weapons[weaponId];
                        const bonusPrice = Math.floor(weapon.sellPrice * bonuses.sellPriceMultiplier);
                         return (
                            <div key={weaponId} className="pixel-card p-4 flex flex-col relative">
                                <ItemIcon id={weaponId} className="absolute top-2 right-2 w-10 h-10 border border-gray-200 bg-white" />
                                <h3 className="text-xl font-bold text-[#b91c1c] pr-10">{weapon.name}</h3>
                                <div className="bg-white border border-[#d2b48c] p-2 my-2">
                                    <p className="text-sm text-gray-600">所持数: <span className="font-bold">{quantity}</span></p>
                                    <p className="text-sm text-gray-600">売値: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(bonusPrice)} 円</span></p>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button onClick={() => handleSellWeapon(weaponId, 1)} disabled={quantity < 1} className="bg-[#94a3b8] hover:bg-[#64748b] disabled:bg-[#cbd5e1] text-white font-bold py-2 text-sm pixel-btn">1個</button>
                                    <button onClick={() => handleSellWeapon(weaponId, quantity)} className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-2 text-sm pixel-btn">全部</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* Specialty Goods */}
        <div>
            <h2 className="text-2xl font-bold text-[#4a3b32] mb-4 flex items-center gap-3 bg-[#f3e8ff] border-2 border-[#4a3b32] p-2 inline-block shadow-[4px_4px_0px_0px_#4a3b32]">🎁 特産品倉庫</h2>
             {specialtyGoodIds.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">特産品の倉庫は空です。</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialtyGoodIds.map(goodId => {
                        const good = INITIAL_SPECIALTY_GOODS[goodId];
                        const quantity = specialtyGoods[goodId];
                        const bonusPrice = Math.floor(good.sellPrice * bonuses.sellPriceMultiplier);
                         return (
                            <div key={goodId} className="pixel-card p-4 flex flex-col relative">
                                <ItemIcon id={goodId} className="absolute top-2 right-2 w-10 h-10 border border-gray-200 bg-white" />
                                <h3 className="text-xl font-bold text-[#7e22ce] pr-10">{good.name}</h3>
                                <div className="bg-white border border-[#d2b48c] p-2 my-2">
                                    <p className="text-sm text-gray-600">所持数: <span className="font-bold">{quantity}</span></p>
                                    <p className="text-sm text-gray-600">売値: <span className="text-[#b45309] font-bold">{new Intl.NumberFormat('ja-JP').format(bonusPrice)} 円</span></p>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button onClick={() => handleSellSpecialtyGood(goodId, 1)} disabled={quantity < 1} className="bg-[#94a3b8] hover:bg-[#64748b] disabled:bg-[#cbd5e1] text-white font-bold py-2 text-sm pixel-btn">1個</button>
                                    <button onClick={() => handleSellSpecialtyGood(goodId, quantity)} className="bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold py-2 text-sm pixel-btn">全部</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

    </div>
  );
};

export default WarehouseView;