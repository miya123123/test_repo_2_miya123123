import { Wand2, Download, Settings, Dices } from 'lucide-react'

interface ControlPanelProps {
  settings: {
    width: number
    height: number
    roomCount: number
    roomMinSize: number
    roomMaxSize: number
    corridorWidth: number
    treasureChance: number
    monsterChance: number
    trapChance: number
  }
  onSettingsChange: (settings: ControlPanelProps['settings']) => void
  onGenerate: () => void
  onExport: () => void
  isGenerating: boolean
  hasData: boolean
}

export function ControlPanel({ 
  settings, 
  onSettingsChange, 
  onGenerate, 
  onExport, 
  isGenerating, 
  hasData 
}: ControlPanelProps) {
  const handleSliderChange = (key: keyof typeof settings, value: number) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const handleRandomize = () => {
    const randomSettings = {
      width: Math.floor(Math.random() * 30) + 20,
      height: Math.floor(Math.random() * 30) + 20,
      roomCount: Math.floor(Math.random() * 10) + 5,
      roomMinSize: Math.floor(Math.random() * 3) + 3,
      roomMaxSize: Math.floor(Math.random() * 8) + 8,
      corridorWidth: Math.floor(Math.random() * 2) + 1,
      treasureChance: Math.random() * 0.4 + 0.1,
      monsterChance: Math.random() * 0.3 + 0.1,
      trapChance: Math.random() * 0.2 + 0.05,
    }
    onSettingsChange(randomSettings)
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl text-slate-200" style={{ fontFamily: 'Cinzel, serif' }}>Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Map Size */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Map Size</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Width: {settings.width}</label>
              <input
                type="range"
                min="20"
                max="100"
                value={settings.width}
                onChange={(e) => handleSliderChange('width', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Height: {settings.height}</label>
              <input
                type="range"
                min="20"
                max="100"
                value={settings.height}
                onChange={(e) => handleSliderChange('height', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Room Settings */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Room Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Room Count: {settings.roomCount}</label>
              <input
                type="range"
                min="3"
                max="20"
                value={settings.roomCount}
                onChange={(e) => handleSliderChange('roomCount', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Min Size: {settings.roomMinSize}</label>
              <input
                type="range"
                min="3"
                max="8"
                value={settings.roomMinSize}
                onChange={(e) => handleSliderChange('roomMinSize', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Max Size: {settings.roomMaxSize}</label>
              <input
                type="range"
                min="6"
                max="20"
                value={settings.roomMaxSize}
                onChange={(e) => handleSliderChange('roomMaxSize', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Corridor Settings */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Corridor Settings</h4>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Width: {settings.corridorWidth}</label>
            <input
              type="range"
              min="1"
              max="3"
              value={settings.corridorWidth}
              onChange={(e) => handleSliderChange('corridorWidth', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Feature Chances */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Feature Chances</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Treasure: {Math.round(settings.treasureChance * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={settings.treasureChance * 100}
                onChange={(e) => handleSliderChange('treasureChance', parseInt(e.target.value) / 100)}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider treasure-slider"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Monster: {Math.round(settings.monsterChance * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={settings.monsterChance * 100}
                onChange={(e) => handleSliderChange('monsterChance', parseInt(e.target.value) / 100)}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider monster-slider"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Trap: {Math.round(settings.trapChance * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={settings.trapChance * 100}
                onChange={(e) => handleSliderChange('trapChance', parseInt(e.target.value) / 100)}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider trap-slider"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-slate-600">
          <button
            onClick={handleRandomize}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Dices className="w-4 h-4" />
            Randomize Settings
          </button>
          
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Dungeon'}
          </button>

          <button
            onClick={onExport}
            disabled={!hasData || isGenerating}
            className="w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-300 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
        </div>
      </div>
    </div>
  )
}