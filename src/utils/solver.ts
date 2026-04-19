export interface EquationResult {
  a: number;
  b: number;
  c: number;
  delta: number;
  type: 'no-solution' | 'one-solution' | 'two-solutions' | 'linear' | 'infinite-solutions';
  roots: number[];
  steps: string[];
}

export const solveQuadratic = (a: number, b: number, c: number): EquationResult => {
  const steps: string[] = [];
  
  if (a === 0) {
    if (b === 0) {
      if (c === 0) {
        return { a, b, c, delta: 0, type: 'infinite-solutions', roots: [], steps: ['Phương trình có vô số nghiệm.'] };
      }
      return { a, b, c, delta: 0, type: 'no-solution', roots: [], steps: ['Phương trình vô nghiệm.'] };
    }
    const x = -c / b;
    return { a, b, c, delta: 0, type: 'linear', roots: [x], steps: [`Đây là phương trình bậc nhất: ${b}x + ${c} = 0`, `Nghiệm x = -c/b = ${x.toFixed(2)}`] };
  }

  const delta = b * b - 4 * a * c;
  steps.push(`Tính Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${delta}`);

  if (delta < 0) {
    steps.push(`Vì Δ < 0, phương trình vô nghiệm thực.`);
    return { a, b, c, delta, type: 'no-solution', roots: [], steps };
  } else if (delta === 0) {
    const x = -b / (2 * a);
    steps.push(`Vì Δ = 0, phương trình có nghiệm kép:`);
    steps.push(`x = -b / (2a) = -(${b}) / (2 * ${a}) = ${x.toFixed(2)}`);
    return { a, b, c, delta, type: 'one-solution', roots: [x], steps };
  } else {
    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);
    steps.push(`Vì Δ > 0, phương trình có hai nghiệm phân biệt:`);
    steps.push(`√Δ = ${sqrtDelta.toFixed(2)}`);
    steps.push(`x₁ = (-b + √Δ) / 2a = (-${b} + ${sqrtDelta.toFixed(2)}) / (2 * ${a}) = ${x1.toFixed(2)}`);
    steps.push(`x₂ = (-b - √Δ) / 2a = (-${b} - ${sqrtDelta.toFixed(2)}) / (2 * ${a}) = ${x2.toFixed(2)}`);
    return { a, b, c, delta, type: 'two-solutions', roots: [x1, x2], steps };
  }
};
