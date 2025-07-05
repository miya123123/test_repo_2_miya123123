import { useState, useCallback } from 'react'
import { DungeonDisplay } from './components/DungeonDisplay'
import { ControlPanel } from './components/ControlPanel'
import { DungeonMap } from './types/dungeon'
import { generateDungeon } from './utils/dungeonGenerator'

function App() {
  const [dungeon, setDungeon] = useState<DungeonMap | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [settings, setSettings] = useState({
    width: 50,
    height: 50,
    roomCount: 8,
    roomMinSize: 4,
    roomMaxSize: 12,
    corridorWidth: 1,
    treasureChance: 0.2,
    monsterChance: 0.15,
    trapChance: 0.1,
  })

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500))
      const newDungeon = generateDungeon(settings)
      setDungeon(newDungeon)
    } catch (error) {
      console.error('Error generating dungeon:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [settings])

  const handleSettingsChange = useCallback((newSettings: typeof settings) => {
    setSettings(newSettings)
  }, [])

  const handleExport = useCallback(() => {
    if (!dungeon) return
    
    const dataStr = JSON.stringify(dungeon, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `dungeon_${Date.now()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }, [dungeon])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            ⚔️ Dungeon Generator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Create procedural dungeons for your tabletop RPGs and game development projects. 
            Generate rooms, corridors, treasures, monsters, and traps with our advanced algorithm.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-1">
            <ControlPanel 
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onGenerate={handleGenerate}
              onExport={handleExport}
              isGenerating={isGenerating}
              hasData={!!dungeon}
            />
          </div>
          
          <div className="xl:col-span-3">
            <DungeonDisplay 
              dungeon={dungeon}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        <footer className="mt-16 text-center text-slate-400">
          <p>Created with ❤️ for the tabletop RPG community</p>
        </footer>
      </div>
    </div>
  )
}

export default App