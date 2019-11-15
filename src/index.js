import "./styles.css";

const createMatrix = (h, w) => {
  let m = [];
  for (let i = 0; i < h; i++) {
    if (!m[i]) m[i] = [];
    for (let j = 0; j < w; j++) {
      // m[i][j] = 0;
      m[i][j] = Math.round(Math.random(0, 1));
    }
  }
  return m;
};

const getCount = (cell, matrix) => {
  let sum = 0;
  const { x, y } = cell;
  for (let i = x - 1; i <= x + 1; i++) {
    // console.log('i', i)
    if (i < 0 || i >= matrix.length) continue;
    for (let j = y - 1; j <= y + 1; j++) {
      // console.log('j', j)
      if (j < 0 || j >= matrix[i].length) continue;
      if (!(i === x && j === y)) {
        // console.log(i,':', j, '=', matrix[i][j])
        sum += matrix[i][j];
      }
    }
  }
  return sum;
};

let matrix = createMatrix(10, 10);

const rules = count => (count < 2 || count > 3 ? 0 : 1);

const itt = m => {
  const nextM = [];
  let h = m.length;
  let w = m[0].length;
  for (let i = 0; i < h; i++) {
    if (!nextM[i]) nextM[i] = [];
    for (let j = 0; j < w; j++) {
      // console.log(
      //   i,
      //   j,
      //   m[i][j],
      //   getCount(m[i][j]),
      //   rules(getCount(m[i][j]), m),
      // )
      nextM[i][j] = rules(getCount({ x: i, y: j }, m));
    }
  }
  return nextM;
};

document.getElementById("app").innerHTML = matrix.join(`<br/>`).toString();

document.getElementById("button").addEventListener("click", () => {
  matrix = itt(matrix);

  document.getElementById("app").innerHTML = matrix.join(`<br/>`).toString();
});
