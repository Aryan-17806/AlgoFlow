import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LinkedListSearchVisualizer() {
  const [target, setTarget] = useState("30");

  const [list] = useState([
    { id: "node-10", value: "10" },
    { id: "node-20", value: "20" },
    { id: "node-30", value: "30" },
    { id: "node-40", value: "40" }
  ]);

  // Stepper Tracking Timelines
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);

  // Live Display Flags
  const [currIdx, setCurrIdx] = useState(-1);
  const [foundIdx, setFoundIdx] = useState(-1);
  const [codeLine, setCodeLine] = useState(0);
  const [status, setStatus] = useState("Ready");

  const timerRef = useRef(null);
  useEffect(() => () => stop(), []);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const buildSearchSteps = (t) => {
    const frames = [];
    const n = list.length;
    const targetTrim = String(t).trim();

    if (n === 0) {
      frames.push({ currIdx: -1, foundIdx: -1, codeLine: 3, status: "List is empty" });
      return frames;
    }

    // Step 1: Initialize Head Pointer Location
    frames.push({ currIdx: 0, foundIdx: -1, codeLine: 6, status: `Start search execution at head (${list[0].value})` });

    for (let i = 0; i < n; i++) {
      // Step 2: Main conditional loop check line
      frames.push({ currIdx: i, foundIdx: -1, codeLine: 8, status: `Checking node [${i}] value = ${list[i].value}` });

      if (list[i].value === targetTrim) {
        frames.push({ currIdx: i, foundIdx: i, codeLine: 9, status: `Found target '${targetTrim}' at index position [${i}]` });
        return frames;
      }

      // Step 3: Shift variable iterator over to trailing pointer
      if (i < n - 1) {
        frames.push({ currIdx: i + 1, foundIdx: -1, codeLine: 11, status: `Condition false. Advance 'curr' loop pointer to index ${i + 1}` });
      }
    }

    // Step 4: Out of bounds execution catch
    frames.push({ currIdx: -1, foundIdx: -1, codeLine: 13, status: `Reached list terminal. Target '${targetTrim}' not found` });
    return frames;
  };

  const applyFrame = (f) => {
    if (!f) return;
    setCurrIdx(f.currIdx);
    setFoundIdx(f.foundIdx);
    setCodeLine(f.codeLine);
    setStatus(f.status);
  };

  const stepForward = () => {
    let s = steps;
    if (!s.length) {
      if (!String(target).trim()) return;
      s = buildSearchSteps(target);
      setSteps(s);
      setStepIdx(0);
      applyFrame(s[0]);
      return;
    }
    const next = Math.min(stepIdx + 1, s.length - 1);
    setStepIdx(next);
    applyFrame(s[next]);
  };

  const play = () => {
    if (timerRef.current) return;
    if (!String(target).trim()) return;

    stop();
    const s = buildSearchSteps(target);
    setSteps(s);
    let p = 0;
    setStepIdx(0);
    applyFrame(s[0]);

    timerRef.current = setInterval(() => {
      p++;
      if (p >= s.length) return stop();
      setStepIdx(p);
      applyFrame(s[p]);
    }, 1000);
  };

  const reset = () => {
    stop();
    setSteps([]);
    setStepIdx(-1);
    setCurrIdx(-1);
    setFoundIdx(-1);
    setCodeLine(0);
    setStatus("Ready");
  };

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        {/* APP BRAND HEADER SECTION */}
        <h2 className="title mb-4">Linked List Search Visualizer</h2>

        <div className="row g-4">
          {/* LEFT CONTAINER COMPONENT PANEL */}
          <div className="col-lg-7">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <input
                  className="input-dark"
                  placeholder="Target Value"
                  value={target}
                  onChange={(e) => { setTarget(e.target.value); reset(); }}
                />

                <button className="btn btn-warning btn-sm" onClick={play}>Play Search</button>
                <button className="btn btn-info btn-sm" onClick={stepForward}>Step →</button>
                <button className="btn btn-danger btn-sm" onClick={reset}>Reset Search</button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              {/* DYNAMICALLY UPDATED VIRTUALIZED SANDBOX REGISTER BLOCK */}
              <div className="staging-container mb-4 p-2 rounded">
                <div className="staging-title">HEAPPTR ALLOCATION REGISTERS</div>
                <div className="d-flex justify-content-center align-items-center dynamic-stage-box">
                  {currIdx === -1 ? (
                    <span className="text-muted italic-font">[No Active Sandbox Allocation Stack]</span>
                  ) : (
                    <div className="d-flex gap-4 register-metrics-fade">
                      <div className="register-pill">
                        <span className="reg-label">POINTER:</span>
                        <span className="reg-val text-orange">curr</span>
                      </div>
                      <div className="register-pill">
                        <span className="reg-label">TARGET:</span>
                        <span className="reg-val text-yellow">{target}</span>
                      </div>
                      <div className="register-pill">
                        <span className="reg-label">ADDR LNK:</span>
                        <span className="reg-val text-blue">
                          {foundIdx !== -1 ? "MATCH_HIT" : `node_ptr[${currIdx}]`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ITERATIVE NODE CANVAS INTERFACE */}
              <div className="d-flex flex-wrap align-items-center justify-content-center gap-1 py-5 live-sequence-wrapper">
                {list.length === 0 && <div className="empty-text">List Empty [Head ➔ NULL]</div>}

                <AnimatePresence mode="popLayout">
                  {list.map((node, i) => {
                    const isCurr = i === currIdx;
                    const isMatch = i === foundIdx;
                    return (
                      <motion.div key={node.id} layout className="d-flex align-items-center" transition={{ type: "spring", stiffness: 220, damping: 22 }}>
                        <div className="node-column-wrapper">
                          {isCurr && (
                            <div className={`tracker-tag ${isMatch ? "bg-success-tag" : "bg-orange-tag"}`}>{isMatch ? "MATCH!" : "curr"}</div>
                          )}

                          <div className="node-block" style={{ borderColor: isMatch ? "#238636" : isCurr ? "#f97316" : "#30363d", boxShadow: isMatch ? "0 0 15px rgba(35,134,54,0.6)" : isCurr ? "0 0 10px rgba(249,115,22,0.3)" : "none" }}>
                            <div className="node-val-zone">{node.value}</div>
                            <div className="node-pointer-zone">*</div>
                          </div>
                          <div className="index-sub-label">[{i}]</div>
                        </div>

                        <div className="link-arrow" style={{ color: isCurr && !isMatch ? "#f97316" : "#8b949e" }}>➔</div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <div className="null-cap-block">NULL</div>
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
                  "bool searchNode(Node* head, int target) {",
                  "    // Check if the starting list is entirely empty",
                  "    if (head == nullptr) return false;",
                  "    ",
                  "    // Set iterative evaluation pointer",
                  "    Node* curr = head;",
                  "    while (curr != nullptr) {",
                  "        if (curr->data == target) {",
                  "            return true; // Match confirmed",
                  "        }",
                  "        curr = curr->next; // Traverse forward",
                  "    }",
                  "    return false; // Target not located",
                  "}"
                ].map((line, num) => (
                  <div key={num} className={`code-line-row ${codeLine === num + 1 ? "line-highlight-active" : ""}`}>
                    <span className="line-number-gutter">{num + 1}</span>
                    <pre className="line-code-prose">{line}</pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark p-3">
              <h5 className="mb-2 text-secondary">Memory Structural Blueprint</h5>
              <p className="blueprint-desc mb-3">
                Unlike contiguous array data blocks, a raw Linked List node requires sequential traversal because items are scattered randomly across variable memory fields.
              </p>
              
              <div className="blueprint-visual-box p-3 rounded text-center">
                <div className="d-inline-flex border-blueprint rounded overflow-hidden text-center fw-bold text-white mb-2">
                  <div className="blueprint-zone bg-black text-warning">DATA VALUE</div>
                  <div className="blueprint-zone bg-dark-blue text-info">NEXT ADDR</div>
                </div>
                <div className="blueprint-subtext mt-1">Every variable node points explicitly to its trailing neighbor.</div>
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
        .input-dark { background: #000000; border: 1px solid #30363d; color: white; padding: 6px 12px; border-radius: 4px; width: 80px; outline: none; font-size: 14px; text-align: center; }
        
        .staging-container { background: #000000; border: 1px dashed #30363d; }
        .staging-title { font-size: 11px; letter-spacing: 1px; color: #8b949e; font-weight: bold; margin-bottom: 4px; }
        .dynamic-stage-box { min-height: 50px; font-size: 13px; }
        .italic-font { font-style: italic; }

        /* Allocation Register Internal Styling */
        .register-metrics-fade { animation: fadeIn 0.2s ease-in-out; }
        .register-pill { background: #0d1117; border: 1px solid #21262d; border-radius: 4px; padding: 4px 10px; font-family: monospace; font-size: 12px; display: flex; gap: 6px; }
        .reg-label { color: #8b949e; }
        .reg-val { font-weight: bold; }
        .text-orange { color: #f97316; }
        .text-yellow { color: #ffdf5d; }
        .text-blue { color: #58a6ff; }

        .live-sequence-wrapper { min-height: 140px; background: #000000; border-radius: 6px; border: 1px solid #21262d; margin-bottom: 20px;}
        .node-column-wrapper { display: flex; flex-direction: column; align-items: center; position: relative; min-width: 90px; }
        .node-block { display: flex; border: 1px solid #30363d; border-radius: 6px; overflow: hidden; background: #0d1117; transition: border-color 0.2s ease; }
        .node-val-zone { padding: 6px 14px; font-weight: bold; background: #000000; min-width: 45px; text-align: center; border-right: 1px solid #30363d; font-size: 15px; }
        .node-pointer-zone { padding: 6px 12px; color: #58a6ff; font-weight: bold; display: flex; align-items: center; justify-content: center; font-size: 14px; background: #0d1117; }
        
        .tracker-tag { font-size: 10px; color: black; font-weight: bold; padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; height: 16px; display: flex; align-items: center; justify-content: center; position: absolute; top: -20px; }
        .bg-orange-tag { background: #f97316; }
        .bg-success-tag { background: #238636; color: white !important; }
        
        .index-sub-label { font-size: 11px; color: #8b949e; margin-top: 4px; }
        .link-arrow { font-size: 16px; padding: 0 4px; font-weight: bold; transition: color 0.2s ease; margin-left: 2px; }
        .null-cap-block { background: #0d1117; border: 1px solid #30363d; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; color: #8b949e; height: 34px; display: flex; align-items: center; }
        
        .info-status-panel { background: #000000; border-radius: 6px; border: 1px solid #21262d; font-size: 14px; text-align: left; }
        .text-blue-msg { color: #58a6ff; font-family: monospace; }
        
        .compiler-code-screen { background: #000000; border: 1px solid #21262d; border-radius: 6px; overflow: hidden; font-family: monospace; display: flex; flex-direction: column; }
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

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}