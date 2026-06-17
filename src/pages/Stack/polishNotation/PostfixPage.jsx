import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostfixPage() {
  const [expression, setExpression] = useState("5 3 + 2 * 7 -");
  const [stack, setStack] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [tokenIdx, setTokenIdx] = useState(-1);
  
  // App Stepper Tracing Flags
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [codeLine, setCodeLine] = useState(0);
  const [status, setStatus] = useState("Ready to evaluate");
  const [running, setRunning] = useState(false);

  const timerRef = useRef(null);
  useEffect(() => () => stop(), []);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const buildPostfixSteps = (exprStr) => {
    const frames = [];
    const parsedTokens = exprStr.trim().split(/\s+/).filter(t => t !== "");
    
    if (parsedTokens.length === 0) {
      frames.push({ currentStack: [], tIdx: -1, line: 3, msg: "Expression is empty." });
      return { frames, parsedTokens };
    }

    let currentStack = [];
    // Line 6: Step baseline start iteration
    frames.push({ currentStack: [...currentStack], tIdx: -1, line: 6, msg: "Initializing postfix scanning pointer token arrays." });

    for (let i = 0; i < parsedTokens.length; i++) {
      const token = parsedTokens[i];
      
      // Line 8: Checking individual character arrays
      frames.push({ currentStack: [...currentStack], tIdx: i, line: 8, msg: `Scanning character token: "${token}"` });

      if (!isNaN(token)) {
        currentStack.push(Number(token));
        // Line 9: Push token onto core register array
        frames.push({ currentStack: [...currentStack], tIdx: i, line: 9, msg: `Token "${token}" is an operand. Push onto storage stack.` });
      } else {
        // Token is an operator
        if (currentStack.length < 2) {
          frames.push({ currentStack: [...currentStack], tIdx: i, line: 12, msg: "Syntax Error: Insufficient operands on stack!" });
          return { frames, parsedTokens };
        }
        
        // Pop right variable parameter then left variable parameter
        const val2 = currentStack.pop();
        frames.push({ currentStack: [...currentStack], tIdx: i, line: 12, msg: `Operator found. Pop right parameter variable (${val2})` });
        
        const val1 = currentStack.pop();
        frames.push({ currentStack: [...currentStack], tIdx: i, line: 13, msg: `Pop trailing left parameter variable (${val1})` });

        let result = 0;
        if (token === "+") result = val1 + val2;
        else if (token === "-") result = val1 - val2;
        else if (token === "*") result = val1 * val2;
        else if (token === "/") result = Math.floor(val1 / val2);

        currentStack.push(result);
        // Line 14: Push mathematical compilation result
        frames.push({ currentStack: [...currentStack], tIdx: i, line: 14, msg: `Execute calculation: ${val1} ${token} ${val2} = ${result}. Push outcome.` });
      }
    }

    // Line 18: Complete final stack evaluation
    if (currentStack.length === 1) {
      frames.push({ currentStack: [...currentStack], tIdx: parsedTokens.length, line: 18, msg: `Evaluation complete! Final answer computation result = ${currentStack[0]}` });
    } else {
      frames.push({ currentStack: [...currentStack], tIdx: parsedTokens.length, line: 18, msg: "Evaluation complete. Warning: Stack contains residual elements." });
    }

    return { frames, parsedTokens };
  };

  const applyFrame = (f) => {
    if (!f) return;
    setStack(f.currentStack);
    setTokenIdx(f.tIdx);
    setCodeLine(f.line);
    setStatus(f.msg);
  };

  const runEvaluation = () => {
    if (running) return;
    stop();
    setRunning(true);

    const { frames, parsedTokens } = buildPostfixSteps(expression);
    setTokens(parsedTokens);
    setSteps(frames);

    let p = 0;
    setStepIdx(0);
    applyFrame(frames[0]);

    timerRef.current = setInterval(() => {
      p++;
      if (p >= frames.length) {
        stop();
        setRunning(false);
        return;
      }
      setStepIdx(p);
      applyFrame(frames[p]);
    }, 1300);
  };

  const stepForward = () => {
    let s = steps;
    let currentTokens = tokens;
    if (!s.length) {
      const res = buildPostfixSteps(expression);
      s = res.frames;
      currentTokens = res.parsedTokens;
      setTokens(currentTokens);
      setSteps(s);
      setStepIdx(0);
      applyFrame(s[0]);
      return;
    }
    const next = Math.min(stepIdx + 1, s.length - 1);
    setStepIdx(next);
    applyFrame(s[next]);
  };

  const resetAll = () => {
    stop();
    setStack([]);
    setTokens([]);
    setTokenIdx(-1);
    setSteps([]);
    setStepIdx(-1);
    setCodeLine(0);
    setStatus("Ready to evaluate");
    setRunning(false);
  };

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        {/* APP BRAND HEADER SECTION */}
        <h2 className="title mb-4">Postfix Expression Stack Visualizer</h2>

        <div className="row g-4">
          {/* LEFT CONTAINER COMPONENT PANEL */}
          <div className="col-lg-7">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <input
                  className="input-dark postfix-input"
                  type="text"
                  placeholder="e.g. 5 3 + 2 *"
                  value={expression}
                  onChange={(e) => { setExpression(e.target.value); resetAll(); }}
                  disabled={running}
                />

                <button className="btn btn-warning btn-sm" onClick={runEvaluation} disabled={running}>Evaluate</button>
                <button className="btn btn-info btn-sm" onClick={stepForward} disabled={running}>Step →</button>
                <button className="btn btn-danger btn-sm" onClick={resetAll}>Reset Stack</button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              {/* VIRTUALIZED SANDBOX REGISTER BLOCK */}
              <div className="staging-container mb-4 p-2 rounded">
                <div className="staging-title">EXP TOKENIZATION SCANNER STREAM</div>
                <div className="d-flex justify-content-center align-items-center dynamic-stage-box gap-2">
                  {tokens.length === 0 ? (
                    <span className="text-muted italic-font">[Initialize Evaluation to Tokenize Input String]</span>
                  ) : (
                    tokens.map((token, idx) => (
                      <span 
                        key={idx} 
                        className={`token-badge ${idx === tokenIdx ? "token-active-highlight" : idx < tokenIdx ? "token-passed" : ""}`}
                      >
                        {token}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* VERTICAL CORE STACK CANVAS INTERFACE */}
              <div className="stack-sandbox-wrapper py-4 mb-4 d-flex flex-column-reverse align-items-center justify-content-start">
                <div className="stack-base-line mt-2">STACK BASE REGISTER</div>
                
                <AnimatePresence mode="popLayout">
                  {stack.length === 0 ? (
                    <div className="empty-stack-text py-4 italic-font text-muted">[Stack Vector Allocation Dynamic Empty]</div>
                  ) : (
                    stack.map((val, i) => (
                      <motion.div 
                        key={`${i}-${val}`}
                        layout
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, x: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="stack-element-block"
                      >
                        <span className="stack-idx-tag">[{i}]</span>
                        <div className="stack-val-inner">{val}</div>
                        {i === stack.length - 1 && <span className="top-ptr-badge">TOP</span>}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* INTEGRATED OUTPUT TERMINAL BAR */}
              <div className="info-status-panel p-3">
                <strong>Machine Status:</strong> <span className="text-blue-msg">{status}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN SIDEBAR TRACE DISPLAY & BLUEPRINT */}
          <div className="col-lg-5">
            <div className="card-dark p-3 mb-3">
              <h5 className="mb-2 text-secondary">Interactive Line-by-Line Execution</h5>
              <div className="compiler-code-screen">
                {[
                  "int evaluatePostfix(string exp) {",
                  "    stack<int> st;",
                  "    // Scan all space-delimited arguments",
                  "    for (string token : tokenize(exp)) {",
                  "        ",
                  "        if (isOperand(token)) {",
                  "            st.push(stoi(token));",
                  "        } else {",
                  "            int val2 = st.top(); st.pop();",
                  "            int val1 = st.top(); st.pop();",
                  "            st.push(applyOp(token, val1, val2));",
                  "        }",
                  "    }",
                  "    return st.top();",
                  "}"
                ].map((line, num) => {
                  // Offset mappings to match frame line definitions cleanly
                  const lineMapping = [1, 2, 4, 6, 0, 7, 8, 9, 12, 13, 14, 0, 0, 18, 19];
                  const currentLineMapped = lineMapping[num];
                  const isActive = codeLine === currentLineMapped && currentLineMapped !== 0;

                  return (
                    <div key={num} className={`code-line-row ${isActive ? "line-highlight-active" : ""}`}>
                      <span className="line-number-gutter">{num + 1}</span>
                      <pre className="line-code-prose">{line}</pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MEMORY STRUCTURAL BLUEPRINT COMPONENT */}
            <div className="card-dark p-3">
              <h5 className="mb-2 text-secondary">Memory Structural Blueprint</h5>
              <p className="blueprint-desc mb-3">
                Unlike random access linked chains, a **Stack** structural algorithm operates exclusively via **LIFO** (Last In, First Out) parameters. Items enter and exit via a singular stack apex layout point.
              </p>
              
              <div className="blueprint-visual-box p-3 rounded text-center">
                <div className="d-inline-flex border-blueprint rounded overflow-hidden text-center fw-bold text-white mb-2">
                  <div className="blueprint-zone bg-black text-warning">PUSH / INSERT</div>
                  <div className="blueprint-zone bg-dark-blue text-info">POP / DELETION</div>
                </div>
                <div className="blueprint-subtext mt-1">Operations can only ever interact with the active **TOP** pointing register element index.</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .visualizer-container { background: #000000; color: white; min-height: 100vh; font-family: system-ui, sans-serif; text-align: left; }
        .app-brand-logo { font-family: serif; font-weight: 700; font-size: 2.2rem; color: #ffffff; letter-spacing: 1px; }
        .title { font-weight: 700; color: #f0f6fc; font-size: 1.5rem; }
        .card-dark { background: #0d1117; border: 1px solid #21262d; border-radius: 6px; }
        .input-dark { background: #000000; border: 1px solid #30363d; color: white; padding: 6px 12px; border-radius: 4px; outline: none; font-size: 14px; text-align: center; }
        .postfix-input { width: 220px; text-align: left; font-family: monospace; letter-spacing: 1px; }
        
        .staging-container { background: #000000; border: 1px dashed #30363d; }
        .staging-title { font-size: 11px; letter-spacing: 1px; color: #8b949e; font-weight: bold; margin-bottom: 4px; }
        .dynamic-stage-box { min-height: 50px; font-size: 13px; }
        .italic-font { font-style: italic; }

        /* Token stream styling elements */
        .token-badge { padding: 4px 10px; background: #161b22; border: 1px solid #30363d; border-radius: 4px; font-family: monospace; font-size: 14px; color: #c9d1d9; font-weight: bold; transition: all 0.2s ease; }
        .token-active-highlight { background: #f97316 !important; border-color: #ffaa44 !important; color: #000000 !important; transform: scale(1.15); box-shadow: 0 0 10px rgba(249,115,22,0.4); }
        .token-passed { color: #484f58; border-color: #21262d; text-decoration: line-through; }

        /* Stack visual canvas alignment constructs */
        .stack-sandbox-wrapper { background: #000000; border: 1px solid #21262d; border-radius: 6px; min-height: 280px; width: 100%; position: relative; }
        .stack-base-line { width: 200px; border-top: 2px solid #da3633; font-size: 10px; letter-spacing: 1px; color: #8b949e; padding-top: 4px; font-weight: bold; font-family: monospace; }
        .empty-stack-text { font-size: 14px; color: #484f58; margin-top: auto; margin-bottom: auto; }
        
        .stack-element-block { width: 160px; height: 38px; background: #0d1117; border: 1px solid #30363d; margin-top: 4px; border-radius: 4px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; font-family: monospace; position: relative; }
        .stack-idx-tag { font-size: 11px; color: #484f58; }
        .stack-val-inner { font-size: 16px; font-weight: bold; color: #ffdf5d; margin-right: auto; padding-left: 14px; }
        .top-ptr-badge { font-size: 9px; background: #238636; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold; letter-spacing: 0.5px; position: absolute; right: -42px; animation: popIn 0.2s ease; }

        .info-status-panel { background: #000000; border-radius: 6px; border: 1px solid #21262d; font-size: 14px; text-align: left; }
        .text-blue-msg { color: #58a6ff; font-family: monospace; }
        
        .compiler-code-screen { background: #000000; border: 1px solid #21262d; border-radius: 6px; overflow: hidden; font-family: monospace; display: flex; flex-direction: column; min-height: 250px; }
        .code-line-row { display: flex; align-items: center; background: #000000; padding: 2px 0; }
        .line-number-gutter { width: 34px; text-align: right; font-size: 11px; color: #484f58; background: #0d1117; padding-right: 8px; user-select: none; border-right: 1px solid #21262d; }
        .line-code-prose { margin: 0; padding-left: 12px; font-size: 12px; color: #c9d1d9; white-space: pre; text-align: left; }
        
        .line-highlight-active { background: rgba(210,153,34,0.12) !important; border-left: 3px solid #d29922; }
        .line-highlight-active .line-number-gutter { background: rgba(210,153,34,0.2) !important; color: white; }
        .line-highlight-active .line-code-prose { color: #ffdf5d; font-weight: bold; }
        
        .btn-warning { background-color: #d29922; border-color: #30363d; color: black; font-weight: 600; }
        .btn-warning:hover { background-color: #e3b341; }
        .btn-info { background-color: #1f6feb; border-color: #30363d; color: white; font-weight: 600; }
        .btn-info:hover { background-color: #388bfd; }
        .btn-danger { background-color: #da3633; border-color: #30363d; color: white; font-weight: 600; }
        .btn-danger:hover { background-color: #f85149; }

        .blueprint-desc { font-size: 13px; color: #8b949e; line-height: 1.4; }
        .blueprint-visual-box { background: #000000; border: 1px solid #21262d; }
        .border-blueprint { border: 1px solid #30363d; }
        .blueprint-zone { padding: 8px 16px; font-size: 12px; letter-spacing: 0.5px; font-family: monospace; }
        .bg-dark-blue { background: #0d1117 !important; border-left: 1px solid #30363d; }
        .blueprint-subtext { font-size: 11px; color: #484f58; }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7) translateX(-5px); }
          to { opacity: 1; transform: scale(1) translateX(0); }
        }
      `}</style>
    </div>
  );
}