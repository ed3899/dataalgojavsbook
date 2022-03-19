function template(strings: any, ...keys: any) {
  return function (...values: any) {
    console.log(`strings - ${strings}`);
    let dict = values[values.length - 1] || {};
    console.log(`dict - ${dict}`);

    let result = [strings[0]];
    console.log(`result - ${result}`);
    
    console.log(`typeof ${strings[1]}`);

    keys.forEach(function (key: any, i: any) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      console.log(
        `key - ${key}, value ${value}, strings[i (${i}) + 1](${strings[i + 1]})`
      );
      result.push(value, strings[i + 1]);
      console.log(`result at ${i} is ${result}`);
    });

    console.log(`Final result is ${result}`);
    return result.join("");
  };
}

let t1Closure = template`${0}${1}${0}!`;
//let t1Closure = template(["","","","!"],0,1,0);

t1Closure("Y", "A");
