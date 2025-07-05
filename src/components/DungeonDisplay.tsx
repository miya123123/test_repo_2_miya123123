import { DungeonMap, CellType } from '../types/dungeon'
import { Loader2 } from 'lucide-react'

interface DungeonDisplayProps {
  dungeon: DungeonMap | null
  isGenerating: boolean
}

const cellColors: Record<CellType, string> = {
  wall: 'bg-slate-700',
  floor: 'bg-slate-200',
  door: 'bg-purple-500',
  room: 'bg-slate-50',
  corridor: 'bg-slate-300',
  treasure: 'bg-yellow-500',
  monster: 'bg-red-500',
  trap: 'bg-orange-500',
}

const cellIcons: Record<CellType, string> = {
  wall: '■',
  floor: '·',
  door: '□',
  room: '·',
  corridor: '·',
  treasure: '💎',
  monster: '👹',
  trap: '⚠️',
}

export function DungeonDisplay({ dungeon, isGenerating }: DungeonDisplayProps) {
  if (isGenerating) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
            <p className="text-slate-300 text-lg">Generating your dungeon...</p>
            <p className="text-slate-500 text-sm mt-2">Placing rooms, carving corridors, and adding features</p>
          </div>
        </div>
      </div>
    )
  }

  if (!dungeon) {
    return (
      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">🏰</div>
            <h3 className="text-xl text-slate-300 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Ready to Generate</h3>
            <p className="text-slate-500">Configure your settings and click "Generate Dungeon" to create your first procedural dungeon!</p>
          </div>
        </div>
      </div>
    )
  }

  const { cells, metadata } = dungeon
  const maxDisplaySize = 800
  const cellSize = Math.min(maxDisplaySize / dungeon.width, maxDisplaySize / dungeon.height, 12)

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Dungeon Map */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-xl text-slate-200 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Dungeon Map</h3>
            <div className="text-sm text-slate-400">
              {dungeon.width}×{dungeon.height} • {metadata.stats.roomCount} rooms • Generated {metadata.generatedAt.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="overflow-auto max-h-96 bg-slate-900 rounded border border-slate-600 p-2">
            <div 
              className="grid gap-px bg-slate-700 p-1 rounded"
              style={{
                gridTemplateColumns: `repeat(${dungeon.width}, ${cellSize}px)`,
                gridTemplateRows: `repeat(${dungeon.height}, ${cellSize}px)`
              }}
            >
              {cells.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`${cellColors[cell.type]} flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110 hover:z-10 relative`}
                    style={{ 
                      width: `${cellSize}px`, 
                      height: `${cellSize}px`,
                      fontSize: `${Math.max(cellSize / 3, 8)}px`
                    }}
                    title={`${cell.type} (${x}, ${y})`}
                  >
                    {cellSize > 8 && (cell.type === 'treasure' || cell.type === 'monster' || cell.type === 'trap') && (
                      <span className="block">{cellIcons[cell.type]}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Legend and Stats */}
        <div className="lg:w-80">
          <div className="mb-6">
            <h4 className="text-lg text-slate-200 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Legend</h4>
            <div className="space-y-2">
              {Object.entries(cellColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${color} rounded flex items-center justify-center text-xs`}>
                    {cellIcons[type as CellType]}
                  </div>
                  <span className="text-slate-300 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-lg text-slate-200 mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Dungeon Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Rooms:</span>
                <span className="text-slate-200">{metadata.stats.roomCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Corridor Length:</span>
                <span className="text-slate-200">{metadata.stats.corridorLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Treasures:</span>
                <span className="text-yellow-400">{metadata.stats.treasureCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monsters:</span>
                <span className="text-red-400">{metadata.stats.monsterCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Traps:</span>
                <span className="text-orange-400">{metadata.stats.trapCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}