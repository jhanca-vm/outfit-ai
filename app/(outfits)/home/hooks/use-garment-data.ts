export default function useGarmentData() {
  return {
    man: {
      casual: {
        top: [
          ['t-shirt', 'Camiseta'],
          ['polo shirt', 'Polo'],
          ['jacket', 'Chaqueta']
        ],
        bottom: [
          ['jeans', 'Jeans'],
          ['joggers', 'Joggers'],
          ['shorts', 'Shorts']
        ],
        shoes: [
          ['sneakers', 'Tenis'],
          ['loafers', 'Mocasines']
        ]
      },
      sporty: {
        top: [
          ['t-shirt', 'Camiseta'],
          ['sweatshirt', 'Sudadera']
        ],
        bottom: [
          ['joggers', 'Joggers'],
          ['shorts', 'Shorts']
        ],
        shoes: [['running shoes', 'Tenis']]
      },
      urban: {
        top: [
          ['hoodie', 'Sudadera'],
          ['jacket', 'Chaqueta']
        ],
        bottom: [
          ['jeans', 'Jeans'],
          ['joggers', 'Joggers']
        ],
        shoes: [
          ['vans', 'Vans'],
          ['boots', 'Botas']
        ]
      },
      elegant: {
        top: [
          ['shirt', 'Camisa'],
          ['blazer', 'Blazer']
        ],
        bottom: [['dress pants', 'Clásico']],
        shoes: [
          ['oxford shoes', 'Oxford'],
          ['brogues', 'Brogue']
        ]
      }
    }
  }
}
