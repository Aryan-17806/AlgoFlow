import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LinkedListTraversalVisualizer() {
  const [list, setList] = useState([
    { id: "node-10", value: "10" },
    { id: "node-20", value: "20" },
    { id: "node-30", value: "30" },
    { id: "node-40", value: "40" }
  ]);
  const [input, setInput] = useState("");
  
  // Stepper & Async Engine Flags
  const [currIdx, setCurrIdx] = useState(-1);
  const [visited, setVisited] = useState([]);
  const [codeLine, setCodeLine] = useState(0);
  const [status, setStatus] = useState("Ready");
  const [running, setRunning] = useState(false);
  
  const stopSignal = useRef(false);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const startTraversal = async () => {
    if (running) return;
    setRunning(true);
    stopSignal.current = false;
    setCurrIdx(-1);
    setVisited([]);

    if (list.length === 0) {
      setCodeLine(3);
      setStatus("Traversal completed: List is empty [Head ➔ NULL]");
      setRunning(false);
      return;
    }

    // Line 6: Node* curr = head;
    setCodeLine(6);
    setStatus(`Initializing iterator: 'curr' assigned to head (${list[0].value})`);
    setCurrIdx(0);
    await sleep(1000);
    if (stopSignal.current) return;

    for (let i = 0; i < list.length; i++) {
      // Line 7: while(curr != nullptr)
      setCodeLine(7);
      setStatus(`Evaluating condition: 'curr' index [${i}] is valid and non-NULL`);
      setCurrIdx(i);
      await sleep(1000);
      if (stopSignal.current) return;

      // Line 8: print(curr->data)
      setCodeLine(8);
      setStatus(`Processing node: reading data stream value = ${list[i].value}`);
      await sleep(800);
      if (stopSignal.current) return;

      // Log this element as visited/processed
      setVisited((prev) => [...prev, i]);

      // Line 9: curr = curr->next;
      setCodeLine(9);
      if (i < list.length - 1) {
        setStatus(`Advancing reference: following link pointer to index ${i + 1}`);
        setCurrIdx(i + 1);
      } else {
        setStatus("Advancing reference: terminal node pointer links downstream to NULL");
        setCurrIdx(-1);
      }
      await sleep(1000);
      if (stopSignal.current) return;
    }

    // Line 11: End of function block
    setCodeLine(11);
    setStatus("Traversal complete: successfully hit list terminal boundary");
    setCurrIdx(-1);
    setRunning(false);
  };

  const addNode = () => {
    if (!input.trim()) return;
    resetStateOnly();
    const val = input.trim();
    setList([...list, { id: `node-${Date.now()}-${val}`, value: val }]);
    setInput("");
  };

  const resetStateOnly = () => {
    stopSignal.current = true;
    setRunning(false);
    setCurrIdx(-1);
    setVisited([]);
    setCodeLine(0);
    setStatus("Ready");
  };

  const resetAll = () => {
    resetStateOnly();
    setList([
      { id: "node-10", value: "10" },
      { id: "node-20", value: "20" },
      { id: "node-30", value: "30" },
      { id: "node-40", value: "40" }
    ]);
    setInput("");
  };

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        {/* APP BRAND HEADER SECTION */}
        <h1 className="app-brand-logo mb-4">AlgoFlow</h1>
        <h2 className="title mb-4">Linked List Traversal Visualizer</h2>

        <div className="row g-4">
          {/* LEFT CONTAINER COMPONENT PANEL */}
          <div className="col-lg-7">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <input
                  className="input-dark"
                  type="text"
                  placeholder="Value"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={running}
                />

                <button className="btn btn-info btn-sm" onClick={addNode} disabled={running}>Add Node</button>
                <button className="btn btn-warning btn-sm" onClick={startTraversal} disabled={running}>Start Traversal</button>
                <button className="btn btn-danger btn-sm" onClick={resetAll}>Reset Canvas</button>
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
                        <span className="reg-label">ITERATOR:</span>
                        <span className="reg-val text-orange">curr</span>
                      </div>
                      <div className="register-pill">
                        <span className="reg-label">TARGET ADDR:</span>
                        <span className="reg-val text-yellow">node_ptr[{currIdx}]</span>
                      </div>
                      <div className="register-pill">
                        <span className="reg-label">PROCESSED STACK:</span>
                        <span className="reg-val text-blue">{visited.length} elements</span>
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
                    const isVisited = visited.includes(i);
                    return (
                      <motion.div key={node.id} layout className="d-flex align-items-center" transition={{ type: "spring", stiffness: 220, damping: 22 }}>
                        <div className="node-column-wrapper">
                          {isCurr && (
                            <div className="tracker-tag bg-orange-tag">curr</div>
                          )}

                          <div 
                            className="node-block" 
                            style={{ 
                              borderColor: isCurr ? "#f97316" : isVisited ? "#238636" : "#30363d", 
                              boxShadow: isCurr ? "0 0 10px rgba(249,115,22,0.3)" : isVisited ? "0 0 8px rgba(35,134,54,0.2)" : "none" 
                            }}
                          >
                            <div 
                              className="node-val-zone" 
                              style={{ 
                                color: isCurr ? "#f97316" : "white",
                                background: isVisited ? "rgba(35,134,54,0.1)" : "#000000"
                              }}
                            >
                              {node.value}
                            </div>
                            <div className="node-pointer-zone" style={{ color: isVisited ? "#238636" : "#58a6ff" }}>*</div>
                          </div>
                          <div className="index-sub-label">[{i}]</div>
                        </div>

                        <div className="link-arrow" style={{ color: isCurr ? "#f97316" : isVisited ? "#238636" : "#8b949e" }}>➔</div>
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
                  "void traverseList(Node* head) {",
                  "    // Check list structure constraints",
                  "    if (head == nullptr) return;",
                  "    ",
                  "    // Establish tracker loop baseline",
                  "    Node* curr = head;",
                  "    while (curr != nullptr) {",
                  "        visitNode(curr->data); // Process layout",
                  "        curr = curr->next;     // Jump link pointer",
                  "    }",
                  "}"
                ].map((line, num) => (
                  <div key={num} className={`code-line-row ${codeLine === num + 1 ? "line-highlight-active" : ""}`}>
                    <span className="line-number-gutter">{num + 1}</span>
                    <pre className="line-code-prose">{line}</pre>
                  </div>
                ))}
              </div>
            </div>

            {/* MEMORY STRUCTURAL BLUEPRINT COMPONENT */}
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

        /* Register Tracking Badges */
        .register-metrics-fade { animation: fadeIn 0.2s ease-in-out; display: flex; }
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
        
        .tracker-tag { font-size: 10px; color: black; font-weight: bold; padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; height: 16px; display: flex; align-items: center; justify-content: center; position: absolute; top: -20px; z-index: 5; }
        .bg-orange-tag { background: #f97316; }
        
        .index-sub-label { font-size: 11px; color: #8b949e; margin-top: 4px; }
        .link-arrow { font-size: 16px; padding: 0 4px; font-weight: bold; transition: color 0.2s ease; margin-left: 2px; }
        .null-cap-block { background: #0d1117; border: 1px solid #30363d; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; color: #8b949e; height: 34px; display: flex; align-items: center; }
        
        .info-status-panel { background: #000000; border-radius: 6px; border: 1px solid #21262d; font-size: 14px; text-align: left; }
        .text-blue-msg { color: #58a6ff; font-family: monospace; }
        .empty-text { color: #8b949e; font-style: italic; font-size: 14px; }
        
        .compiler-code-screen { background: #000000; border: 1px solid #21262d; border-radius: 6px; overflow: hidden; font-family: monospace; display: flex; flex-direction: column; min-height: 230px; }
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