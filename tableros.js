// LVL 1 = 4 VACIOS
var sud_00 = [
  [20, 3, 10, 40],
  [10, 40, 2, 30],
  [4, 20, 30, 10],
  [30, 10, 40, 2]
]
var sud_01 = [
  [20, 30, 4, 10],
  [10, 4, 30, 20],
  [30, 20, 10, 40],
  [4, 10, 2, 30]
]
// LVL 2 = 6 VACIOS
var sud_02 = [
  [20, 3, 40, 10],
  [1, 40, 20, 3],
  [3, 20, 10, 40],
  [40, 1, 30, 2]
]
var sud_03 = [
  [20, 30, 4, 10],
  [1, 40, 30, 2],
  [4, 20, 10, 3],
  [30, 1, 20, 40]
]
// LVL 3 = 8 VACIOS
var sud_04 = [
  [30, 2, 4, 10],
  [40, 1, 3, 20],
  [2, 30, 10, 4],
  [1, 40, 20, 3]
]
var sud_05 = [
  [20, 3, 4, 10],
  [1, 40, 30, 2],
  [4, 20, 10, 3],
  [30, 1, 2, 40]
]
// LVL 4 = 10 VACIOS
var sud_06 = [
  [1, 3, 40, 2],
  [40, 2, 30, 1],
  [2, 40, 1, 30],
  [3, 10, 2, 4]
]
var sud_07 = [
  [20, 3, 4, 10],
  [1, 40, 2, 3],
  [3, 20, 1, 40],
  [4, 1, 3, 2]
]
// LVL 5 = 12 VACIOS
var sud_08 = [
  [10, 2, 4, 3],
  [3, 4, 20, 1],
  [4, 1, 3, 2],
  [2, 30, 1, 40]
]

var tableros = new Array(
  [sud_00, sud_01],
  [sud_02, sud_03],
  [sud_04, sud_05],
  [sud_06, sud_07],
  [sud_08]
)

function RotarArray (Array_Original) {
  Paso_1 = []
  pos = 0

  while(pos < 4){
    ran = Math.floor((Math.random() * 2))
    if (ran == 0) {
      Paso_1[pos] = Array_Original[pos]
      Paso_1[pos + 1] = Array_Original[pos + 1]
    }else {
      Paso_1[pos] = Array_Original[pos + 1]
      Paso_1[pos + 1] = Array_Original[pos]
    }
    pos += 2
  }

  Paso_2 = [ ]
  Paso_2[0] = []
  Paso_2[1] = []
  Paso_2[2] = []
  Paso_2[3] = []

  pos = 0
  while(pos < 4){
    ran = Math.floor((Math.random() * 2))
    if (ran == 0) {
      for (x = 0; x < 4; x++) {
        Paso_2[x][pos] = Paso_1[x][pos]
        Paso_2[x][pos + 1] = Paso_1[x][pos + 1]
      }
    }else {
      for (x = 0; x < 4; x++) {
        Paso_2[x][pos] = Paso_1[x][pos + 1]
        Paso_2[x][pos + 1] = Paso_1[x][pos]
      }
    }
    pos += 2
  }

  return Paso_2
}
