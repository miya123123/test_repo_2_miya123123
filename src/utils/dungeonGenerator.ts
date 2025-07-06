import { DungeonMap, DungeonCell, Room, GenerationSettings, Position } from '../types/dungeon'

export function generateDungeon(settings: GenerationSettings): DungeonMap {
  const { width, height, roomCount, roomMinSize, roomMaxSize, corridorWidth, treasureChance, monsterChance, trapChance } = settings
  
  // Initialize grid with walls
  const cells: DungeonCell[][] = Array(height).fill(null).map(() =>
    Array(width).fill(null).map(() => ({ type: 'wall' as const }))
  )
  
  const rooms: Room[] = []
  
  // Generate rooms
  for (let i = 0; i < roomCount; i++) {
    const room = generateRoom(i, width, height, roomMinSize, roomMaxSize, rooms)
    if (room) {
      rooms.push(room)
      carveRoom(cells, room)
    }
  }
  
  // Connect rooms with corridors
  connectRooms(cells, rooms, corridorWidth)
  
  // Add features (treasures, monsters, traps)
  addFeatures(cells, rooms, treasureChance, monsterChance, trapChance)
  
  const stats = calculateStats(cells, rooms)
  
  return {
    width,
    height,
    cells,
    rooms,
    metadata: {
      generatedAt: new Date(),
      settings,
      stats
    }
  }
}

function generateRoom(id: number, mapWidth: number, mapHeight: number, minSize: number, maxSize: number, existingRooms: Room[]): Room | null {
  const maxAttempts = 100
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const width = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize
    const height = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize
    const x = Math.floor(Math.random() * (mapWidth - width - 2)) + 1
    const y = Math.floor(Math.random() * (mapHeight - height - 2)) + 1
    
    const newRoom: Room = {
      id,
      x,
      y,
      width,
      height,
      type: 'room',
      connected: false,
      center: { x: x + Math.floor(width / 2), y: y + Math.floor(height / 2) }
    }
    
    // Check for overlap with existing rooms
    if (!existingRooms.some(room => roomsOverlap(newRoom, room))) {
      return newRoom
    }
  }
  
  return null
}

function roomsOverlap(room1: Room, room2: Room): boolean {
  return !(room1.x + room1.width + 1 < room2.x || 
           room2.x + room2.width + 1 < room1.x || 
           room1.y + room1.height + 1 < room2.y || 
           room2.y + room2.height + 1 < room1.y)
}

function carveRoom(cells: DungeonCell[][], room: Room): void {
  for (let y = room.y; y < room.y + room.height; y++) {
    for (let x = room.x; x < room.x + room.width; x++) {
      if (y >= 0 && y < cells.length && x >= 0 && x < cells[0].length) {
        cells[y][x] = { type: 'room', roomId: room.id }
      }
    }
  }
}

function connectRooms(cells: DungeonCell[][], rooms: Room[], corridorWidth: number): void {
  if (rooms.length < 2) return
  
  // Create minimum spanning tree to connect all rooms
  const unconnected = [...rooms]
  const connected = [unconnected.shift()!]
  
  while (unconnected.length > 0) {
    let shortestDistance = Infinity
    let closestPair: [Room, Room] | null = null
    
    for (const connectedRoom of connected) {
      for (const unconnectedRoom of unconnected) {
        const distance = Math.abs(connectedRoom.center.x - unconnectedRoom.center.x) + 
                        Math.abs(connectedRoom.center.y - unconnectedRoom.center.y)
        if (distance < shortestDistance) {
          shortestDistance = distance
          closestPair = [connectedRoom, unconnectedRoom]
        }
      }
    }
    
    if (closestPair) {
      const [from, to] = closestPair
      createCorridor(cells, from.center, to.center, corridorWidth)
      connected.push(to)
      unconnected.splice(unconnected.indexOf(to), 1)
    }
  }
}

function createCorridor(cells: DungeonCell[][], from: Position, to: Position, width: number): void {
  const points = getCorridorPoints(from, to)
  
  for (const point of points) {
    for (let dy = -Math.floor(width / 2); dy <= Math.floor(width / 2); dy++) {
      for (let dx = -Math.floor(width / 2); dx <= Math.floor(width / 2); dx++) {
        const x = point.x + dx
        const y = point.y + dy
        
        if (y >= 0 && y < cells.length && x >= 0 && x < cells[0].length) {
          if (cells[y][x].type === 'wall') {
            cells[y][x] = { type: 'corridor' }
          }
        }
      }
    }
  }
}

function getCorridorPoints(from: Position, to: Position): Position[] {
  const points: Position[] = []
  
  // L-shaped corridor
  let current = { ...from }
  
  // Move horizontally first
  while (current.x !== to.x) {
    points.push({ ...current })
    current.x += current.x < to.x ? 1 : -1
  }
  
  // Then move vertically
  while (current.y !== to.y) {
    points.push({ ...current })
    current.y += current.y < to.y ? 1 : -1
  }
  
  points.push({ ...current })
  
  return points
}

function addFeatures(cells: DungeonCell[][], rooms: Room[], treasureChance: number, monsterChance: number, trapChance: number): void {
  for (const room of rooms) {
    const roomCells: Position[] = []
    
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        if (cells[y][x].type === 'room') {
          roomCells.push({ x, y })
        }
      }
    }
    
    // Add treasure
    if (Math.random() < treasureChance && roomCells.length > 0) {
      const pos = roomCells[Math.floor(Math.random() * roomCells.length)]
      cells[pos.y][pos.x] = { type: 'treasure', roomId: room.id }
    }
    
    // Add monster
    if (Math.random() < monsterChance && roomCells.length > 0) {
      const pos = roomCells[Math.floor(Math.random() * roomCells.length)]
      if (cells[pos.y][pos.x].type === 'room') {
        cells[pos.y][pos.x] = { type: 'monster', roomId: room.id }
      }
    }
    
    // Add trap
    if (Math.random() < trapChance && roomCells.length > 0) {
      const pos = roomCells[Math.floor(Math.random() * roomCells.length)]
      if (cells[pos.y][pos.x].type === 'room') {
        cells[pos.y][pos.x] = { type: 'trap', roomId: room.id }
      }
    }
  }
}

function calculateStats(cells: DungeonCell[][], rooms: Room[]) {
  let treasureCount = 0
  let monsterCount = 0
  let trapCount = 0
  let corridorLength = 0
  
  for (const row of cells) {
    for (const cell of row) {
      switch (cell.type) {
        case 'treasure':
          treasureCount++
          break
        case 'monster':
          monsterCount++
          break
        case 'trap':
          trapCount++
          break
        case 'corridor':
          corridorLength++
          break
      }
    }
  }
  
  return {
    roomCount: rooms.length,
    corridorLength,
    treasureCount,
    monsterCount,
    trapCount
  }
}