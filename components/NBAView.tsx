
import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { GameState, GameAction, NBAPlayer, PlayerPosition, MatchResult } from '../types';
import { NBA_PLAYER_COST, NBA_ROSTER_LIMIT, NBA_CONFERENCE_COOLDOWN_MS, NBA_PRIZE_MONEY } from '../constants';
import { TrophyIcon } from './icons';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface NBAViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  now: number;
}

const generatePlayer = async (): Promise<NBAPlayer | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a unique and culturally diverse name for a random NBA player. The name should not be a common one. The player has three stats: shooting, dunking, and dribbling, each a random integer from 1 to 5. The player's position must be one of: Center, Point Guard, Shooting Guard, or Forward. Return the result as a single clean JSON object.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        position: { type: Type.STRING },
                        stats: {
                            type: Type.OBJECT,
                            properties: {
                                shooting: { type: Type.INTEGER },
                                dunking: { type: Type.INTEGER },
                                dribbling: { type: Type.INTEGER },
                            },
                            required: ["shooting", "dunking", "dribbling"]
                        },
                    },
                    required: ["name", "position", "stats"]
                },
            },
        });

        const playerJson = JSON.parse(response.text);

        if (playerJson.name && playerJson.position && playerJson.stats) {
            return {
                id: `nba-player-${Date.now()}-${Math.random()}`,
                name: playerJson.name,
                position: playerJson.position,
                stats: {
                    shooting: Math.max(1, Math.min(5, playerJson.stats.shooting || 1)),
                    dunking: Math.max(1, Math.min(5, playerJson.stats.dunking || 1)),
                    dribbling: Math.max(1, Math.min(5, playerJson.stats.dribbling || 1)),
                }
            };
        }
        return null;
    } catch (error) {
        console.error("Error generating player:", error);
        return null;
    }
};

const PlayerCard: React.FC<{ player: NBAPlayer; onFire?: (id: string) => void; onSelect?: (id: string) => void; isSelected?: boolean; isSelectable?: boolean; }> = ({ player, onFire, onSelect, isSelected, isSelectable }) => (
    <div className={`pixel-card p-4 relative transition-all duration-200 ${isSelectable ? 'cursor-pointer hover:bg-gray-100' : ''} ${isSelected ? 'border-[#16a34a] bg-[#f0fdf4]' : 'bg-white'}`} onClick={isSelectable ? () => onSelect?.(player.id) : undefined}>
        <h4 className="text-lg font-bold text-[#2d1b2e] border-b border-gray-300 pb-1 mb-2">{player.name}</h4>
        <p className="text-sm font-bold text-gray-500 mb-2">{player.position}</p>
        <div className="flex justify-around text-center text-xs">
            <div className="bg-gray-100 p-1 border border-gray-300"><p className="text-gray-500">シュート</p><p className="font-bold text-lg text-[#b45309]">{player.stats.shooting}</p></div>
            <div className="bg-gray-100 p-1 border border-gray-300"><p className="text-gray-500">ダンク</p><p className="font-bold text-lg text-[#b45309]">{player.stats.dunking}</p></div>
            <div className="bg-gray-100 p-1 border border-gray-300"><p className="text-gray-500">ドリブル</p><p className="font-bold text-lg text-[#b45309]">{player.stats.dribbling}</p></div>
        </div>
        {onFire && (
            <button onClick={(e) => { e.stopPropagation(); onFire(player.id); }} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold border border-red-200 px-2 py-1 bg-white">解雇</button>
        )}
    </div>
);

const TournamentBracket: React.FC<{
    tournament: GameState['nbaState']['conference']['tournament'],
    playerTeamName: string,
}> = ({ tournament, playerTeamName }) => {
    
    if (!tournament) return null;

    const { bracket, results } = tournament;
    
    return (
        <div className="flex flex-col items-center space-y-6">
            <h3 className="text-2xl font-bold text-[#b45309] bg-[#fef3c7] px-4 py-2 border-2 border-[#4a3b32]">トーナメント結果</h3>
            <div className="w-full overflow-x-auto p-4 bg-[#f0fdf4] border-4 border-[#16a34a] shadow-[4px_4px_0px_0px_#16a34a]">
                <div className="flex justify-around min-w-max space-x-8">
                    {bracket.map((round, roundIndex) => (
                        <div key={roundIndex} className="flex flex-col justify-around space-y-4">
                            <h4 className="text-center font-bold text-[#15803d] border-b-2 border-[#15803d] pb-1">
                                {roundIndex === bracket.length - 1 ? '優勝' : roundIndex === bracket.length - 2 ? '決勝' : `R ${roundIndex + 1}`}
                            </h4>
                            {round.map((team, teamIndex) => (
                                <div key={teamIndex} className={`p-2 border-2 w-40 text-center font-bold text-sm ${team === playerTeamName ? 'bg-[#dcfce7] border-[#16a34a] text-[#166534]' : 'bg-white border-gray-400 text-gray-600'}`}>
                                    {team || '???'}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full space-y-4">
                <h3 className="text-xl font-bold text-[#4a3b32]">試合詳細</h3>
                {results.map(match => {
                    const isPlayerWinner = match.winner === playerTeamName;
                    const isPlayerLoser = match.teams.includes(playerTeamName) && !isPlayerWinner;

                    return (
                        <div key={match.matchId} className={`p-4 border-2 bg-white ${match.isPlayerMatch ? 'shadow-[4px_4px_0px_0px_#000]' : ''} ${isPlayerWinner ? 'border-[#16a34a]' : isPlayerLoser ? 'border-[#ef4444]' : 'border-gray-300'}`}>
                            <p className="text-xs text-gray-500 font-bold">Round {match.round}</p>
                            <div className="flex justify-between items-center text-lg my-2">
                                <span className={`w-1/3 text-right ${match.winner === match.teams[0] ? 'font-bold text-[#2d1b2e]' : 'text-gray-400'}`}>{match.teams[0]}</span>
                                <span className="text-gray-400 text-sm px-2">VS</span>
                                <span className={`w-1/3 text-left ${match.winner === match.teams[1] ? 'font-bold text-[#2d1b2e]' : 'text-gray-400'}`}>{match.teams[1]}</span>
                            </div>
                            <p className="text-center text-sm font-bold text-[#b45309] bg-[#fff7ed] py-1">Winner: {match.winner}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const NBAView: React.FC<NBAViewProps> = ({ gameState, dispatch, now }) => {
    const [teamNameInput, setTeamNameInput] = useState('');
    const [view, setView] = useState<'main' | 'roster' | 'hire'>('main');
    const [isScouting, setIsScouting] = useState(false);
    const [scoutedPlayer, setScoutedPlayer] = useState<NBAPlayer | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());

    const { nbaState } = gameState;

    const handleSetTeamName = () => {
        if (teamNameInput.trim().length > 0) {
            dispatch({ type: 'SET_NBA_TEAM_NAME', payload: { name: teamNameInput.trim() } });
        }
    };

    const handleScoutPlayer = async () => {
        setIsScouting(true);
        setError(null);
        setScoutedPlayer(null);
        const player = await generatePlayer();
        if (player) {
            setScoutedPlayer(player);
        } else {
            setError("選手のスカウトに失敗しました。");
        }
        setIsScouting(false);
    };

    const handleHirePlayer = () => {
        if (scoutedPlayer && gameState.money >= NBA_PLAYER_COST) {
            dispatch({ type: 'HIRE_NBA_PLAYER', payload: { player: scoutedPlayer, cost: NBA_PLAYER_COST } });
            setScoutedPlayer(null);
        }
    };
    
    const handleFirePlayer = (playerId: string) => {
        if (window.confirm("本当にこの選手を解雇しますか？")) {
            dispatch({ type: 'FIRE_NBA_PLAYER', payload: { playerId } });
        }
    };

    const handleTogglePlayerSelection = (playerId: string) => {
        const newSelection = new Set(selectedPlayers);
        if (newSelection.has(playerId)) {
            newSelection.delete(playerId);
        } else {
            if (newSelection.size < 5) {
                newSelection.add(playerId);
            }
        }
        setSelectedPlayers(newSelection);
    };

    const handleCreateTournament = () => {
        const playersToCompete = nbaState.roster.filter(p => selectedPlayers.has(p.id));
        dispatch({ type: 'CREATE_NBA_TOURNAMENT', payload: { selectedPlayers: playersToCompete } });
    };
    
    const handleSimulateTournament = () => {
        dispatch({ type: 'SIMULATE_NBA_TOURNAMENT' });
    };
    
    const finalRank = useMemo(() => {
        if (nbaState.conference.status !== 'finished' || !nbaState.conference.tournament) return null;
        const playerTeamName = nbaState.teamName!;
        const { results } = nbaState.conference.tournament;
        if (!results.some(r => r.teams.includes(playerTeamName))) return 16;
        
        const lastMatch = [...results].reverse().find(r => r.teams.includes(playerTeamName));
        if (!lastMatch) return 16;
        
        const isWinner = lastMatch.winner === playerTeamName;
        if (isWinner && lastMatch.round === 4) return 1;
        if (!isWinner && lastMatch.round === 4) return 2;
        if (!isWinner && lastMatch.round === 3) return 4;
        if (!isWinner && lastMatch.round === 2) return 8;
        return 16;
    }, [nbaState.conference.status, nbaState.conference.tournament, nbaState.teamName]);

    const handleEndTournament = () => {
        if (!finalRank) return;
        const prize = NBA_PRIZE_MONEY[finalRank as keyof typeof NBA_PRIZE_MONEY] || 0;
        dispatch({ type: 'END_NBA_TOURNAMENT', payload: { earnings: prize, trophyWon: finalRank === 1 } });
    };

    const lastPlayed = nbaState.conference.lastPlayed;
    const cooldownLeft = lastPlayed !== null ? ((lastPlayed ?? 0) + NBA_CONFERENCE_COOLDOWN_MS) - now : 0;
    const isConferenceOnCooldown = cooldownLeft > 0;

    const formatCooldown = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    if (!nbaState.teamName) {
        return (
            <div className="animate-fade-in text-center p-8 max-w-lg mx-auto pixel-card bg-[#fff7ed]">
                <h2 className="text-3xl font-bold text-[#b45309] mb-4">NBAチームを作成</h2>
                <p className="text-[#6b4423] mb-6 font-bold">あなたのバスケットボールチームに名前を付けて、栄光への道を歩み始めましょう！</p>
                <input
                    type="text"
                    value={teamNameInput}
                    onChange={(e) => setTeamNameInput(e.target.value)}
                    placeholder="チーム名を入力"
                    className="w-full bg-white text-[#2d1b2e] p-3 border-2 border-[#4a3b32] mb-4 focus:outline-none focus:bg-[#fffacd]"
                />
                <button onClick={handleSetTeamName} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-6 pixel-btn text-lg">
                    チームを作成
                </button>
            </div>
        );
    }

    if (nbaState.conference.status === 'selecting') {
         return (
            <div className="animate-fade-in pb-20">
                <div className="pixel-card p-6 mb-6 bg-[#f0fdf4]">
                    <h2 className="text-2xl font-bold text-[#15803d] mb-2">出場選手選択</h2>
                    <p className="text-[#4b5563] font-bold">トーナメントに出場する選手を5人選んでください。 ({selectedPlayers.size} / 5)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                    {nbaState.roster.map(p => <PlayerCard key={p.id} player={p} onSelect={handleTogglePlayerSelection} isSelected={selectedPlayers.has(p.id)} isSelectable={true} />)}
                </div>
                 <div className="flex space-x-4 justify-center">
                    <button onClick={() => dispatch({type: 'SET_CONFERENCE_STATUS', payload: {status: 'idle'}})} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 pixel-btn">戻る</button>
                    <button onClick={handleCreateTournament} disabled={selectedPlayers.size !== 5} className="bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-bold py-3 px-8 pixel-btn">トーナメントを作成</button>
                </div>
            </div>
        );
    }

    if (nbaState.conference.status === 'active' || nbaState.conference.status === 'finished') {
        const tournament = nbaState.conference.tournament;
        return (
            <div className="animate-fade-in pb-20">
                 <h2 className="text-3xl font-bold text-[#b45309] mb-6 text-center bg-[#fef3c7] border-4 border-[#4a3b32] p-4 inline-block shadow-[6px_6px_0px_0px_#4a3b32]">カンファレンス・トーナメント</h2>
                 {nbaState.conference.status === 'active' && (
                     <div className="text-center mb-6">
                        <button onClick={handleSimulateTournament} className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d1b2e] font-bold py-3 px-12 pixel-btn text-xl animate-bounce-pixel">
                            トーナメントを行う
                        </button>
                     </div>
                 )}
                 {tournament && <TournamentBracket tournament={tournament} playerTeamName={nbaState.teamName} />}
                 {nbaState.conference.status === 'finished' && (
                     <div className="mt-8 text-center pixel-card p-8 bg-[#f0fdf4]">
                         <h3 className="text-3xl font-bold text-[#15803d]">トーナメント終了！</h3>
                         <p className="text-2xl font-bold my-4 text-[#4a3b32]">最終順位: <span className="text-[#b45309] text-4xl">{finalRank}位</span></p>
                         <p className="text-xl font-bold text-[#4a3b32]">獲得賞金: <span className="text-[#16a34a]">{NBA_PRIZE_MONEY[finalRank as keyof typeof NBA_PRIZE_MONEY]?.toLocaleString() || 0}円</span></p>
                         {finalRank === 1 && <p className="text-[#fbbf24] text-3xl mt-2 font-bold animate-bounce-pixel drop-shadow-md">優勝おめでとう！</p>}
                         <button onClick={handleEndTournament} className="mt-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 px-8 pixel-btn text-lg">
                            結果を閉じる
                         </button>
                     </div>
                 )}
            </div>
        );
    }


    return (
        <div className="animate-fade-in pb-20">
            <header className="flex justify-between items-center mb-6 pixel-card bg-[#fff7ed] p-4">
                <h2 className="text-3xl font-bold text-[#b45309]">{nbaState.teamName}</h2>
                 <div className="flex items-center space-x-2 text-[#fbbf24]">
                    <TrophyIcon />
                    <span className="text-3xl font-bold text-[#4a3b32]">{nbaState.trophies}</span>
                </div>
            </header>
            
            <div className="mb-6 flex space-x-2 justify-center">
                <button onClick={() => setView('main')} className={`px-6 py-2 font-bold pixel-btn ${view === 'main' ? 'bg-[#16a34a] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>メイン</button>
                <button onClick={() => setView('roster')} className={`px-6 py-2 font-bold pixel-btn ${view === 'roster' ? 'bg-[#16a34a] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>ロスター</button>
                <button onClick={() => setView('hire')} className={`px-6 py-2 font-bold pixel-btn ${view === 'hire' ? 'bg-[#16a34a] text-white translate-y-1 shadow-none' : 'bg-white text-[#4a3b32] hover:-translate-y-1'}`}>スカウト</button>
            </div>

            {view === 'main' && (
                 <div className="pixel-card p-8 text-center bg-[#f0f9ff]">
                    <h3 className="text-2xl font-bold text-[#0369a1] mb-4">カンファレンス</h3>
                    <p className="text-[#4b5563] mb-6 font-bold">1日に1回、5人の選手を選んでトーナメントに参加し、賞金と栄光を勝ち取りましょう。</p>
                    {isConferenceOnCooldown ? (
                        <div className="bg-white p-4 border-2 border-[#bae6fd] inline-block">
                            <p className="text-lg text-[#ef4444] font-bold">次の参加可能まで</p>
                            <p className="text-3xl font-mono text-[#4a3b32]">{formatCooldown(cooldownLeft)}</p>
                        </div>
                    ) : (
                        <button onClick={() => dispatch({type: 'SET_CONFERENCE_STATUS', payload: {status: 'selecting'}})} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 px-12 pixel-btn text-xl">
                            参加する
                        </button>
                    )}
                </div>
            )}

            {view === 'roster' && (
                 <div>
                    <div className="text-right mb-2 text-sm font-bold text-[#4a3b32]">選手数: {nbaState.roster.length}/{NBA_ROSTER_LIMIT}</div>
                    {nbaState.roster.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8 font-bold">まだ選手がいません。「スカウト」タブから新しい選手を雇いましょう。</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {nbaState.roster.map(p => <PlayerCard key={p.id} player={p} onFire={handleFirePlayer} />)}
                        </div>
                    )}
                </div>
            )}

             {view === 'hire' && (
                <div className="text-center">
                    <button onClick={handleScoutPlayer} disabled={isScouting || nbaState.roster.length >= NBA_ROSTER_LIMIT} className="bg-[#9333ea] hover:bg-[#7e22ce] disabled:bg-gray-400 text-white font-bold py-3 px-8 pixel-btn text-lg mb-6">
                        {isScouting ? 'スカウト中...' : '新しい選手を探す'}
                    </button>
                    {nbaState.roster.length >= NBA_ROSTER_LIMIT && <p className="text-red-500 font-bold">ロスターが満員です。</p>}

                    {error && <p className="text-red-500 mt-4 font-bold">{error}</p>}

                    {scoutedPlayer && (
                        <div className="mt-6 max-w-sm mx-auto pixel-card p-6 bg-[#fff7ed] animate-fade-in">
                            <h3 className="text-xl font-bold mb-4 text-[#b45309]">スカウト成功！</h3>
                            <PlayerCard player={scoutedPlayer} />
                            <button onClick={handleHirePlayer} disabled={gameState.money < NBA_PLAYER_COST} className="w-full mt-6 bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-400 text-white font-bold py-3 px-4 pixel-btn">
                                雇う ({NBA_PLAYER_COST.toLocaleString()}円)
                            </button>
                             {gameState.money < NBA_PLAYER_COST && <p className="text-red-500 text-sm mt-2 font-bold">お金が足りません</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NBAView;
