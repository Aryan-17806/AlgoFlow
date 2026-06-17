import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LinkedListDeleteVisualizer() {
  const [list, setList] = useState([
    { id: "node-10", value: "10" },
    { id: "node-20", value: "20" },
    { id: "node-30", value: "30" },
    { id: "node-40", value: "40" },
    { id: "node-50", value: "50" }
  ]);
  const [input, setInput] = useState("");

  // Stepper & Animation States
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [currIdx, setCurrIdx] = useState(-1);
  const [deleteTargetIdx, setDeleteTargetIdx] = useState(-1);
  const [codeLine, setCodeLine] = useState(0);
  const [status, setStatus] = useState("Ready");
  const [activeOp, setActiveOp] = useState(null);  

  const timerRef = useRef(null);
  useEffect(() => () => stop(), []);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const addNode = () => {
    if (!input.trim()) return;
    resetStateOnly();
    const val = input.trim();
    setList([...list, { id: `node-${Date.now()}-${val}`, value: val }]);
    setInput("");
  };

  // Build sequential execution frames for Deleting Head Node
  const buildDeleteHeadSteps = () => {
    const frames = [];
    if (list.length === 0) {
      frames.push({ currIdx: -1, delIdx: -1, codeLine: 3, status: "List empty. Underflow caught." });
      return frames;
    }
    frames.push({ currIdx: 0, delIdx: -1, codeLine: 6, status: "Isolate target pointer: pointing 'temp' to head node." });
    frames.push({ currIdx: -1, delIdx: 0, codeLine: 7, status: "Repositioning Head Reference: head = head->next" });
    frames.push({ currIdx: -1, delIdx: -1, codeLine: 8, status: "Safely deallocating isolated original head block from stack memory.", triggerDelete: true });
    return frames;
  };

  // Build sequential execution frames for Deleting Tail Node
  const buildDeleteTailSteps = () => {
    const frames = [];
    const n = list.length;
    if (n === 0) {
      frames.push({ currIdx: -1, delIdx: -1, codeLine: 3, status: "List empty. Underflow caught." });
      return frames;
    }
    if (n === 1) {
      frames.push({ currIdx: 0, delIdx: -1, codeLine: 6, status: "Single node variant matched. Marking absolute reference." });
      frames.push({ currIdx: -1, delIdx: 0, codeLine: 7, status: "Setting head reference link pointer entirely to NULL." });
      frames.push({ currIdx: -1, delIdx: -1, codeLine: 8, status: "Deallocating tail memory block.", triggerDelete: true });
      return frames;
    }

    frames.push({ currIdx: 0, delIdx: -1, codeLine: 12, status: "Initializing traversal pointer at head node." });
    for (let i = 0; i < n - 2; i++) {
      frames.push({ currIdx: i + 1, delIdx: -1, codeLine: 13, status: `Traversing backward boundaries... index [${i + 1}]` });
    }
    frames.push({ currIdx: n - 2, delIdx: -1, codeLine: 16, status: "Target parent node discovered. Pointing parent pointer link next boundary to NULL." });
    frames.push({ currIdx: n - 2, delIdx: n - 1, codeLine: 17, status: "Isolating target tail block address register location." });
    frames.push({ currIdx: -1, delIdx: -1, codeLine: 18, status: "Executing system free command on detached memory node structural context.", triggerDelete: true });
    return frames;
  };

  // Build sequential execution frames for Deleting by Value match
  const buildDeleteValueSteps = (targetVal) => {
    const frames = [];
    const n = list.length;
    const trimVal = String(targetVal).trim();
    
    if (n === 0) {
      frames.push({ currIdx: -1, delIdx: -1, codeLine: 3, status: "List is empty." });
      return frames;
    }
    if (list[0].value === trimVal) {
      frames.push({ currIdx: 0, delIdx: -1, codeLine: 6, status: "Match discovered immediately at head pointer node structure target." });
      frames.push({ currIdx: -1, delIdx: 0, codeLine: 7, status: "Shifting structural core head pointer assignment onto head->next." });
      frames.push({ currIdx: -1, delIdx: -1, codeLine: 8, status: "Freeing primary node sequence memory blocks entirely.", triggerDelete: true });
      return frames;
    }

    frames.push({ currIdx: 0, delIdx: -1, codeLine: 12, status: "Initializing 'curr' iterator memory loop tracing boundaries at root head." });
    let matchIdx = -1;
    for (let i = 0; i < n - 1; i++) {
      frames.push({ currIdx: i, delIdx: -1, codeLine: 13, status: `Checking trailing linkage pointer parameters... does index [${i + 1}] equal target ${trimVal}?` });
      if (list[i + 1].value === trimVal) {
        matchIdx = i + 1;
        frames.push({ currIdx: i, delIdx: matchIdx, codeLine: 14, status: `Target value matched! Isolating specific deletion node at index [${matchIdx}].` });
        frames.push({ currIdx: i, delIdx: matchIdx, codeLine: 15, status: "Updating parent node reference: parent->next = targeted_node->next" });
        frames.push({ currIdx: -1, delIdx: -1, codeLine: 16, status: "Severing target linkages and executing heap context address free sweeps.", triggerDelete: true });
        break;
      }
    }

    if (matchIdx === -1) {
      frames.push({ currIdx: -1, delIdx: -1, codeLine: 19, status: `Value "${trimVal}" not discovered anywhere across link lists bounds.` });
    }
    return frames;
  };

  const applyFrame = (f) => {
    if (!f) return;
    setCurrIdx(f.currIdx);
    setDeleteTargetIdx(f.delIdx);
    setCodeLine(f.codeLine);
    setStatus(f.status);

    if (f.triggerDelete) {
      setTimeout(() => {
        setList(prev => {
          if (activeOp === "head") return prev.slice(1);
          if (activeOp === "tail") return prev.slice(0, -1);
          if (activeOp === "value") {
            const targetVal = String(input).trim();
            // Fallback to searching index directly if match index was cached
            if (f.delIdx !== -1) {
              return prev.filter((_, idx) => idx !== f.delIdx);
            }
            return prev.filter(item => item.value !== targetVal);
          }
          return prev;
        });
        setInput("");
      }, 300);
    }
  };

  const triggerTimeline = (operationType, stepEngineSequence) => {
    stop();
    setActiveOp(operationType);
    setSteps(stepEngineSequence);
    let p = 0;
    setStepIdx(0);
    applyFrame(stepEngineSequence[0], stepEngineSequence, p);

    timerRef.current = setInterval(() => {
      p++;
      if (p >= stepEngineSequence.length) {
        stop();
        return;
      }
      setStepIdx(p);
      applyFrame(stepEngineSequence[p], stepEngineSequence, p);
    }, 1200);
  };

  const playDeleteHead = () => triggerTimeline("head", buildDeleteHeadSteps());
  const playDeleteTail = () => triggerTimeline("tail", buildDeleteTailSteps());
  const playDeleteValue = () => {
    if (!input.trim()) return;
    triggerTimeline("value", buildDeleteValueSteps(input));
  };

  const stepForward = () => {
    if (!steps.length) return;
    const next = Math.min(stepIdx + 1, steps.length - 1);
    setStepIdx(next);
    applyFrame(steps[next], steps, next);
  };

  const resetStateOnly = () => {
    stop();
    setSteps([]);
    setStepIdx(-1);
    setCurrIdx(-1);
    setDeleteTargetIdx(-1);
    setCodeLine(0);
    setStatus("Ready");
    setActiveOp(null);
  };

  const resetAll = () => {
    resetStateOnly();
    setList([
      { id: "node-10", value: "10" },
      { id: "node-20", value: "20" },
      { id: "node-30", value: "30" },
      { id: "node-40", value: "40" },
      { id: "node-50", value: "50" }
    ]);
    setInput("");
  };

  const getCompilerSourceCode = () => {
    if (activeOp === "head") {
      return [
        "void deleteHead(Node*& head) {",
        "    // Check list underflow constraints",
        "    if (head == nullptr) return;",
        "    ",
        "    // Capture reference address location",
        "    Node* temp = head;",
        "    head = head->next; // Advance root forward",
        "    delete temp; // Deallocate stack layer",
        "}"
      ];
    }
    if (activeOp === "tail") {
      return [
        "void deleteTail(Node*& head) {",
        "    if (head == nullptr) return;",
        "    if (head->next == nullptr) {",
        "        delete head; head = nullptr; return;",
        "    }",
        "    ",
        "    // Traverse downstream boundaries",
        "    Node* curr = head;",
        "    while (curr->next->next != nullptr) {",
        "        curr = curr->next;",
        "    }",
        "    ",
        "    Node* temp = curr->next;",
        "    curr->next = nullptr; // Terminate trailing link",
        "    delete temp; // Release heap blocks",
        
        "}"
      ];
    }
    return [
      "void deleteValue(Node*& head, int val) {",
      "    if (head == nullptr) return;",
      "    if (head->data == val) {",
      "        Node* temp = head; head = head->next;",
      "        delete temp; return;",
      "    }",
      "    ",
      "    // Evaluate reference positions",
      "    Node* curr = head;",
      "    while (curr->next != nullptr) {",
      "        if (curr->next->data == val) {",
      "            Node* temp = curr->next;",
      "            curr->next = curr->next->next;",
      "            delete temp; return;",
      "        }",
      "        curr = curr->next;",
      "    }",
      "}"
    ];
  };

  const codeSnippetLines = getCompilerSourceCode();

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        {/* APP BRAND HEADER SECTION */}
        <h2 className="title mb-4">Linked List Deletion Visualizer</h2>

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
                />

                <button className="btn btn-info btn-sm" onClick={addNode}>Add Node</button>
                <button className="btn btn-warning btn-sm" onClick={playDeleteValue}>Delete Value</button>
                <button className="btn btn-warning btn-sm" onClick={playDeleteHead}>Play Head</button>
                <button className="btn btn-warning btn-sm" onClick={playDeleteTail}>Play Tail</button>
                <button className="btn btn-info btn-sm" onClick={stepForward}>Step →</button>
                <button className="btn btn-danger btn-sm" onClick={resetAll}>Reset List</button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              {/* DYNAMICALLY UPDATED VIRTUALIZED SANDBOX REGISTER BLOCK */}
              <div className="staging-container mb-4 p-2 rounded">
                <div className="staging-title">HEAPPTR ALLOCATION REGISTERS</div>
                <div className="d-flex justify-content-center align-items-center dynamic-stage-box">
                  {currIdx === -1 && deleteTargetIdx === -1 ? (
                    <span className="text-muted italic-font">[No Active Sandbox Allocation Stack]</span>
                  ) : (
                    <div className="d-flex gap-4 register-metrics-fade">
                      <div className="register-pill">
                        <span className="reg-label">ITERATOR:</span>
                        <span className="reg-val text-orange">
                          {currIdx !== -1 ? `curr_ptr[${currIdx}]` : "NULL"}
                        </span>
                      </div>
                      <div className="register-pill">
                        <span className="reg-label">ISOLATED ADDR:</span>
                        <span className="reg-val text-red">
                          {deleteTargetIdx !== -1 ? `temp_target[${deleteTargetIdx}]` : "NONE"}
                        </span>
                      </div>
                      <div className="register-pill">
                        <span className="reg-label">STACK METRIC:</span>
                        <span className="reg-val text-blue">
                          {activeOp ? `${activeOp.toUpperCase()}_DISPATCH` : "IDLE"}
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
                    const isDelTarget = i === deleteTargetIdx;
                    return (
                      <motion.div 
                        key={node.id} 
                        layout 
                        className="d-flex align-items-center" 
                        transition={{ type: "spring", stiffness: 220, damping: 22 }}
                        exit={{ scale: 0.6, opacity: 0, x: -20, transition: { duration: 0.25 } }}
                      >
                        <div className="node-column-wrapper">
                          {(isCurr || isDelTarget) && (
                            <div className={`tracker-tag ${isDelTarget ? "bg-red-tag" : "bg-orange-tag"}`}>
                              {isDelTarget ? "KILL_NODE" : "curr_ptr"}
                            </div>
                          )}

                          <div 
                            className="node-block" 
                            style={{ 
                              borderColor: isDelTarget ? "#da3633" : isCurr ? "#f97316" : "#30363d", 
                              boxShadow: isDelTarget ? "0 0 15px rgba(218,54,51,0.6)" : isCurr ? "0 0 10px rgba(249,115,22,0.3)" : "none" 
                            }}
                          >
                            <div className="node-val-zone" style={{ color: isDelTarget ? "#da3633" : "white" }}>
                              {node.value}
                            </div>
                            <div className="node-pointer-zone">*</div>
                          </div>
                          <div className="index-sub-label">[{i}]</div>
                        </div>

                        <div className="link-arrow" style={{ color: isCurr && !isDelTarget ? "#f97316" : "#8b949e" }}>➔</div>
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
                {codeSnippetLines.map((line, num) => (
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

        /* Allocation Register Metrics Styling */
        .register-metrics-fade { animation: fadeIn 0.2s ease-in-out; display: flex; }
        .register-pill { background: #0d1117; border: 1px solid #21262d; border-radius: 4px; padding: 4px 10px; font-family: monospace; font-size: 12px; display: flex; gap: 6px; }
        .reg-label { color: #8b949e; }
        .reg-val { font-weight: bold; }
        .text-orange { color: #f97316; }
        .text-red { color: #f85149; }
        .text-blue { color: #58a6ff; }

        .live-sequence-wrapper { min-height: 140px; background: #000000; border-radius: 6px; border: 1px solid #21262d; margin-bottom: 20px;}
        .node-column-wrapper { display: flex; flex-direction: column; align-items: center; position: relative; min-width: 90px; }
        .node-block { display: flex; border: 1px solid #30363d; border-radius: 6px; overflow: hidden; background: #0d1117; transition: border-color 0.2s ease; }
        .node-val-zone { padding: 6px 14px; font-weight: bold; background: #000000; min-width: 45px; text-align: center; border-right: 1px solid #30363d; font-size: 15px; }
        .node-pointer-zone { padding: 6px 12px; color: #58a6ff; font-weight: bold; display: flex; align-items: center; justify-content: center; font-size: 14px; background: #0d1117; }
        
        .tracker-tag { font-size: 10px; color: black; font-weight: bold; padding: 1px 6px; border-radius: 4px; margin-bottom: 4px; height: 16px; display: flex; align-items: center; justify-content: center; position: absolute; top: -20px; z-index: 5; }
        .bg-orange-tag { background: #f97316; }
        .bg-red-tag { background: #da3633; color: white !important; }
        
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