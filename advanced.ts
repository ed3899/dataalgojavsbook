const fib = function (_n: number): number {
  if (_n < 2) {
    return _n;
  } else {
    return fib(_n - 1) + fib(_n - 2);
  }
};

const dynFib = function (_n: number) {
  const val = [];

  for (let i = 0; i <= _n; ++i) {
    val[i] = 0;
  }

  if (_n === 1 || _n === 2) {
    return 1;
  } else {
    val[1] = 1;
    val[2] = 2;

    for (let i = 3; i <= _n; ++i) {
      val[i] = val[i - 1] + val[i - 2];
    }

    return val[_n - 1];
  }
};

const iterFib = function (_n: number) {
  let last = 1,
    nextLast = 1,
    result = 1;

  for (let i = 2; i < _n; ++i) {
    result = last + nextLast;
    [nextLast, last] = [last, result];
    return result;
  }
};

function lcs(_word1: string, _word2: string) {
  //Set max and index, useful for extracting longest common substring later
  let max = 0;
  let index = 0;
  //Setting up initial rows
  let lcsarr = new Array(_word1.length + 1);

  //Iterate through rows
  for (let i = 0; i <= _word1.length + 1; ++i) {
    lcsarr[i] = new Array(_word2.length + 1);
    // Set columns
    for (let j = 0; j <= _word2.length + 1; ++j) {
      lcsarr[i][j] = 0;
    }
  }

  for (let i = 0; i <= _word1.length; ++i) {
    for (let j = 0; j <= _word2.length; ++j) {
      if (i == 0 || j == 0) {
        lcsarr[i][j] = 0;
      } else {
        if (_word1[i - 1] == _word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
        } else {
          lcsarr[i][j] = 0;
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i;
      }
    }
  }

  console.log(lcsarr);
  console.log(index, max);

  var str = "";

  if (max == 0) {
    return "";
  } else {
    for (let i = index - max; i <= max; ++i) {
      str += _word2[i];
    }
    return str;
  }
}

const knapstack = function (
  capacity_: number,
  sizes_: number[],
  values_: number[],
  n_: number
): number {
  if (n_ === 0 || capacity_ === 0) {
    return 0;
  }

  if (sizes_[n_ - 1] > capacity_) {
    return knapstack(capacity_, sizes_, values_, n_ - 1);
  } else {
    return Math.max(
      values_[n_ - 1] +
        knapstack(capacity_ - sizes_[n_ - 1], sizes_, values_, n_ - 1),
      knapstack(capacity_, sizes_, values_, n_ - 1)
    );
  }
};

function dKnapsack(
  capacity: number,
  size: number[],
  value: number[],
  n: number
) {
  let K: number[][] = [];
  let s: number[] = [];

  for (let i = 0; i <= capacity + 1; i++) {
    K[i] = [];
  }

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) {
        K[i][w] = 0;
      } else if (size[i - 1] <= w) {
        //
        console.log(
          `${value[i - 1]} + ${
            K[i - 1][w - size[i - 1]]
          } with i:${i} and w:${w} vs ${K[i - 1][w]}. Size is ${size[i - 1]}`
        );

        K[i][w] = Math.max(
          value[i - 1] + K[i - 1][w - size[i - 1]],
          K[i - 1][w]
        );
      } else {
        K[i][w] = K[i - 1][w];
      }
      s.push(K[i][w]);
    }
  }

  console.log(K);

  return K[n][capacity];
}
let value = [4, 5, 10, 11, 13];
let size = [3, 4, 7, 8, 9];
let capacity = 16;
let n = 5;

function makeChange(origAmt: number, coins: number[]) {
  let remainAmt = 0;

  console.log(`${origAmt % 0.25} < ${origAmt}`);
  if (origAmt % 0.25 < origAmt) {
    coins[3] = parseInt(new Number(origAmt / 0.25).toFixed(5));

    console.log(coins[3]);

    remainAmt = origAmt % 0.25;

    console.log(remainAmt);

    origAmt = remainAmt;
  }
  if (origAmt % 0.1 < origAmt) {
    coins[2] = parseInt(new Number(origAmt / 0.1).toFixed(5));
    remainAmt = origAmt % 0.1;
    origAmt = remainAmt;
  }
  if (origAmt % 0.05 < origAmt) {
    coins[1] = parseInt(new Number(origAmt / 0.05).toFixed(5));
    remainAmt = origAmt % 0.05;
    origAmt = remainAmt;
  }

  coins[0] = parseInt(new Number(origAmt / 0.01).toFixed(5));
}

function showChange(coins: number[]) {
  if (coins[3] > 0) {
    console.log("Number of quarters - " + coins[3] + " - " + coins[3] * 0.25);
  }
  if (coins[2] > 0) {
    console.log("Number of dimes - " + coins[2] + " - " + coins[2] * 0.1);
  }
  if (coins[1] > 0) {
    console.log("Number of nickels - " + coins[1] + " - " + coins[1] * 0.05);
  }
  if (coins[0] > 0) {
    console.log("Number of pennies - " + coins[0] + " - " + coins[0] * 0.01);
  }
}

const origAmt = 0.2;

const coins: any = [];

makeChange(origAmt, coins);

showChange(coins);

console.log(.26 % .25)