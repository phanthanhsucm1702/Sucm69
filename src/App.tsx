import React, { useState, useEffect } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, LineChart, Info, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { solveQuadratic, EquationResult } from './utils/solver';
import ParabolaGraph from './components/ParabolaGraph';

const App: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-3);
  const [c, setC] = useState<number>(2);
  const [result, setResult] = useState<EquationResult | null>(null);

  useEffect(() => {
    setResult(solveQuadratic(a, b, c));
  }, [a, b, c]);

  const handleReset = () => {
    setA(1);
    setB(0);
    setC(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Calculator size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              MathMaster: Giải PT Bậc Hai
            </h1>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} /> Làm mới
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="text-blue-500" size={20} /> Nhập hệ số
            </h2>
            
            <div className="flex flex-col gap-6 mb-8">
              <div className="text-center mb-4">
                <BlockMath math={`ax^2 + bx + c = 0`} />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 ml-1">Hệ số a</label>
                  <input 
                    type="number" 
                    value={a} 
                    onChange={(e) => setA(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-mono text-center"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 ml-1">Hệ số b</label>
                  <input 
                    type="number" 
                    value={b} 
                    onChange={(e) => setB(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-mono text-center"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 ml-1">Hệ số c</label>
                  <input 
                    type="number" 
                    value={c} 
                    onChange={(e) => setC(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-mono text-center"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-blue-700 font-medium mb-1 flex items-center gap-2">
                <Info size={16} /> Phương trình hiện tại:
              </h3>
              <div className="text-center py-2 overflow-x-auto">
                <InlineMath math={`${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b === 0 ? '' : (b > 0 ? '+ ' : '- ') + Math.abs(b) + 'x'} ${c === 0 ? '' : (c > 0 ? '+ ' : '- ') + Math.abs(c)} = 0`} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LineChart className="text-blue-500" size={20} /> Biểu đồ Parabol
            </h2>
            <ParabolaGraph a={a} b={b} c={c} roots={result?.roots || []} />
          </div>
        </section>

        {/* Results Section */}
        <section className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${a}-${b}-${c}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Main Result Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={24} /> Các bước giải chi tiết
                </h2>

                <div className="space-y-6">
                  {result?.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="pt-1 text-slate-700 leading-relaxed font-medium">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                {result?.roots.length === 0 && result.type === 'no-solution' && (
                  <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <span className="font-semibold">Phương trình vô nghiệm thực.</span>
                  </div>
                )}

                {result?.roots.length === 1 && (
                  <div className="mt-8 p-6 bg-green-50 text-green-700 rounded-xl border border-green-100">
                    <p className="text-sm uppercase tracking-wider font-bold mb-1 opacity-70">Kết quả</p>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold">x = {result.roots[0].toFixed(4)}</span>
                    </div>
                  </div>
                )}

                {result?.roots.length === 2 && (
                  <div className="mt-8 p-6 bg-green-50 text-green-700 rounded-xl border border-green-100">
                    <p className="text-sm uppercase tracking-wider font-bold mb-1 opacity-70">Kết quả</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="p-3 bg-white/50 rounded-lg">
                        <span className="block text-xs font-bold opacity-60">Nghiệm x₁</span>
                        <span className="text-2xl font-bold">{result.roots[0].toFixed(4)}</span>
                      </div>
                      <div className="p-3 bg-white/50 rounded-lg">
                        <span className="block text-xs font-bold opacity-60">Nghiệm x₂</span>
                        <span className="text-2xl font-bold">{result.roots[1].toFixed(4)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips / Knowledge Section */}
              <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Info className="text-blue-400" size={20} /> Ghi nhớ công thức
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-bold text-blue-400">BIỆT THỨC</p>
                    <InlineMath math={`\\Delta = b^2 - 4ac`} />
                  </div>
                  <div className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-bold text-blue-400">NGHIỆM KÉP (Δ = 0)</p>
                    <InlineMath math={`x = -\\frac{b}{2a}`} />
                  </div>
                  <div className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                    <p className="text-xs font-bold text-blue-400">2 NGHIỆM (Δ {'>'} 0)</p>
                    <InlineMath math={`x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-slate-400 text-sm">
        <p>© 2026 MathMaster AI Solver. Công cụ học tập chuyên nghiệp.</p>
      </footer>
    </div>
  );
};

export default App;
