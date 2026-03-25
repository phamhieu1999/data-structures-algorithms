/**
 * ĐÁP ÁN — Math Practice
 */

// BÀI 1: Pow(x, n)
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}

// BÀI 2: Multiply Strings
function multiply(num1, num2) {
  const m = num1.length, n = num2.length;
  const result = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + result[p2];
      result[p2] = sum % 10;
      result[p1] += Math.floor(sum / 10);
    }
  }
  const str = result.join('').replace(/^0+/, '');
  return str || '0';
}

// BÀI 3: Excel Sheet Column Title
function convertToTitle(n) {
  let result = '';
  while (n > 0) {
    n--;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result;
}

console.log("=== Solutions: Math ===");
console.log(myPow(2, -2));           // 0.25
console.log(myPow(2, 10));           // 1024
console.log(multiply("123", "456")); // "56088"
console.log(multiply("0", "0"));     // "0"
console.log(convertToTitle(28));     // "AB"
console.log(convertToTitle(701));    // "ZY"
