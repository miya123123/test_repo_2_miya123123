export type CellType = 'wall' | 'floor' | 'door' | 'room' | 'corridor' | 'treasure' | 'monster' | 'trap'

export interface Position {
  x: number
  y: number
}

export interface Room {
  id: number
  x: number
  y: number
  width: number
  height: number
  type: 'room' | 'corridor'
  connected: boolean
  center: Position
}

export interface DungeonCell {
  type: CellType
  roomId?: number
  features?: string[]
}

export interface DungeonMap {
  width: number
  height: number
  cells: DungeonCell[][]
  rooms: Room[]
  metadata: {
    generatedAt: Date
    settings: any
    stats: {
      roomCount: number
      corridorLength: number
      treasureCount: number
      monsterCount: number
      trapCount: number
    }
  }
}

export interface GenerationSettings {
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