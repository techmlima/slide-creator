export enum Colors {
    WHITE = 'white',
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    GOLDEN_ROD = 'goldenrod'
}

export function values() {
   return [Colors.YELLOW, Colors.GOLDEN_ROD, Colors.WHITE, Colors.BLACK, Colors.GREEN, Colors.RED] 
}

export function getNameByEnum(color: Colors){
    let mapName = new Map()
    mapName.set(Colors.YELLOW, 'Amarelo')
    mapName.set(Colors.GOLDEN_ROD, 'Amarelo Queimado')
    mapName.set(Colors.WHITE, 'Branco')
    mapName.set(Colors.BLACK, 'Preto')
    mapName.set(Colors.GREEN, 'Verde')
    mapName.set(Colors.RED, 'Vermelho')

    return mapName.get(color)
}