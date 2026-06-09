import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_LIST = [
  { id: "node-10", value: "10" },
  { id: "node-20", value: "20" },
  { id: "node-30", value: "30" }
];

export default function LinkedListInsertVisualizer() {
  const [value, setValue] = useState("40");
  const [index, setIndex] = useState("1");
  const [list, setList] = useState(INITIAL_LIST);

  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(-1);

  const [currIdx, setCurrIdx] = useState(-1);
  const [insertIdx, setInsertIdx] = useState(-1);
  const [staging, setStaging] = useState(null);
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

  const uniqueId = (v) => `node-new-${v}-${Date.now().toString(36).slice(-4)}`;

  const buildSteps = (mode, val, idxText) => {
    const frames = [];
    const base = [...list]; 
    const n = base.length;
    let idx = mode === "head" ? 0 : mode === "tail" ? n : parseInt(idxText, 10);
    if (Number.isNaN(idx) || idx < 0) idx = 0;
    if (idx > n) idx = n;

    const node = { id: uniqueId(val), value: String(val) };

    frames.push({ list: base, staging: { ...node, targetNext: "NULL" }, currIdx: -1, insertIdx: -1, codeLine: 3, status: `Allocated Node(${val})` });

    if (idx === 0) {
      frames.push({ list: base, staging: { ...node, targetNext: base[0]?.value ?? "NULL" }, currIdx: -1, insertIdx: -1, codeLine: 6, status: `Linking new node to head` });
      frames.push({ list: [node, ...base], staging: null, currIdx: -1, insertIdx: 0, codeLine: 7, status: `Inserted at head successfully!` });
    } else {
      frames.push({ list: base, staging: { ...node, targetNext: "NULL" }, currIdx: 0, insertIdx: -1, codeLine: 11, status: `Start scanning from head` });
      for (let i = 0; i < idx - 1; i++) {
        frames.push({ list: base, staging: { ...node, targetNext: "NULL" }, currIdx: i + 1, insertIdx: -1, codeLine: 12, status: `Moved curr to index ${i + 1}` });
      }

      const nextVal = base[idx]?.value ?? "NULL";
      frames.push({ list: base, staging: { ...node, targetNext: nextVal }, currIdx: idx - 1, insertIdx: -1, codeLine: 16, status: `Prepared new->next = ${nextVal}` });
      const newList = [...base.slice(0, idx), node, ...base.slice(idx)];
      frames.push({ list: newList, staging: null, currIdx: -1, insertIdx: idx, codeLine: 17, status: `Inserted at index ${idx} successfully!` });
    }

    return frames;
  };

  const applyFrame = (f) => {
    if (!f) return;
    setList(f.list);
    setStaging(f.staging);
    setCurrIdx(f.currIdx);
    setInsertIdx(f.insertIdx);
    setCodeLine(f.codeLine);
    setStatus(f.status);
  };

  const stepForward = (mode) => {
    let s = steps;
    if (!s.length || stepIdx === s.length - 1) {
      if (!String(value).trim()) return;
      s = buildSteps(mode, value, index);
      setSteps(s);
      setStepIdx(0);
      applyFrame(s[0]);
      return;
    }
    const next = Math.min(stepIdx + 1, s.length - 1);
    setStepIdx(next);
    applyFrame(s[next]);
  };

  const play = (mode) => {
    if (timerRef.current) return;
    let s = steps;
    
    if (!s.length || stepIdx === s.length - 1) {
      if (!String(value).trim()) return;
      s = buildSteps(mode, value, index);
      setSteps(s);
      applyFrame(s[0]);
    }

    let p = stepIdx === -1 || stepIdx === s.length - 1 ? 0 : stepIdx;
    setStepIdx(p);
    applyFrame(s[p]);

    timerRef.current = setInterval(() => {
      p++;
      if (p >= s.length) {
        return stop();
      }
      setStepIdx(p);
      applyFrame(s[p]);
    }, 900);
  };

  const resetAll = () => {
    stop();
    setList(INITIAL_LIST);
    setSteps([]);
    setStepIdx(-1);
    setCurrIdx(-1);
    setInsertIdx(-1);
    setStaging(null);
    setCodeLine(0);
    setStatus("Ready");
  };

  return (
    <div className="visualizer-container">
      <div className="container-fluid p-4">
        <h2 className="title mb-4">Linked List Insertion Visualizer</h2>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card-dark p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <input className="input-dark" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
                <input className="input-dark-sm" placeholder="Idx" value={index} onChange={(e) => setIndex(e.target.value)} />

                <button className="btn btn-warning btn-sm fw-bold text-dark" onClick={() => { stop(); setSteps([]); play("head"); }}>Play Head</button>
                <button className="btn btn-outline-light btn-sm fw-bold" onClick={() => { stop(); setSteps([]); play("tail"); }}>Play Tail</button>
                <button className="btn btn-primary btn-sm fw-bold" onClick={() => { stop(); setSteps([]); play("index"); }}>Play Index</button>
                <button className="btn btn-info btn-sm fw-bold text-dark" onClick={() => stepForward("index")}>Step →</button>
                <button className="btn btn-danger btn-sm fw-bold" onClick={resetAll}>Reset List</button>
              </div>
            </div>

            <div className="card-dark p-4 text-center">
              <div className="staging-container mb-4 p-3 rounded">
                <div className="staging-title">HEAPPTR ALLOCATION REGISTERS</div>
                <div className="d-flex justify-content-center align-items-center dynamic-stage-box">
                  {staging ? (
                    <motion.div className="node-block staging-node-pulse" layout id={staging.id} initial={{ scale: 0.6, y: -8 }} animate={{ scale: 1, y: 0 }}>
                      <div className="node-val-zone bg-success-text">{staging.value}</div>
                      <div className="node-pointer-zone text-warning">next ➔ {staging.targetNext}</div>
                    </motion.div>
                  ) : (
                    <div className="text-muted italic-font">[No Active Sandbox Allocation Stack]</div>
                  )}
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center justify-content-center gap-1 py-4 live-sequence-wrapper">
                {list.length === 0 && <div className="empty-text">List Empty [Head ➔ NULL]</div>}

                <AnimatePresence mode="popLayout">
                  {list.map((node, i) => {
                    const isCurr = i === currIdx;
                    const isNew = i === insertIdx;
                    return (
                      <motion.div key={node.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="d-flex align-items-center">
                        <div className="node-column-wrapper">
                          <div className="tracker-tag-container">
                            {isCurr && <div className="tracker-tag">curr</div>}
                          </div>
                          <div className="node-block" style={{ borderColor: isNew ? "#22c55e" : isCurr ? "#f97316" : "#444446", boxShadow: isNew ? "0 0 14px rgba(34,197,94,0.5)" : "none" }}>
                            <div className="node-val-zone">{node.value}</div>
                            <div className="node-pointer-zone">*</div>
                          </div>
                          <div className="index-sub-label">[{i}]</div>
                        </div>
                        <div className="link-arrow" style={{ color: isCurr ? "#f97316" : "#a1a1aa" }}>➔</div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {list.length > 0 && <div className="null-cap-block">NULL</div>}
              </div>

              <div className="info-status-panel p-3">
                <strong>Machine Status:</strong> <span className="text-blue-msg">{status}</span>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card-dark p-3">
              <h5 className="mb-3 text-zinc-header">Interactive Line-by-Line Execution</h5>
              <div className="compiler-code-screen">
                {[
                  "void insertNode(Node*& head, int val, int pos) {",
                  "    // Phase 1: Allocate",
                  "    Node* temp = new Node{val, nullptr};",
                  "",
                  "    if (pos == 0) {",
                  "        temp->next = head;",
                  "        head = temp;",
                  "        return;",
                  "    }",
                  "    // Phase 2: Scan",
                  "    Node* curr = head;",
                  "    for(int i=0; curr != nullptr && i < pos-1; i++) {",
                  "        curr = curr->next;",
                  "    }",
                  "    // Phase 3: Relink",
                  "    temp->next = curr->next;",
                  "    curr->next = temp;",
                  "}"
                ].map((line, num) => (
                  <div key={num} className={`code-line-row ${codeLine === num + 1 ? "line-highlight-active" : ""}`}>
                    <span className="line-number-gutter">{num + 1}</span>
                    <pre className="line-code-prose">{line}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .visualizer-container { background: #09090b; color: #f4f4f5; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif; }
        .title { font-weight: 700; color: #ffffff; letter-spacing: -0.5px; }
        .card-dark { background: #18181b; border: 1px solid #27272a; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.6); }
        .input-dark { background: #09090b; border: 1px solid #3f3f46; color: #ffffff; padding: 6px 12px; border-radius: 6px; width: 100px; outline: none; transition: border 0.2s; }
        .input-dark:focus { border-color: #3b82f6; }
        .input-dark-sm { background: #09090b; border: 1px solid #3f3f46; color: #ffffff; padding: 6px 12px; border-radius: 6px; width: 65px; outline: none; transition: border 0.2s; }
        .input-dark-sm:focus { border-color: #3b82f6; }
        
        .staging-container { background: #09090b; border: 1px dashed #3f3f46; }
        .staging-title { font-size: 11px; letter-spacing: 1.5px; color: #a1a1aa; font-weight: bold; margin-bottom: 12px; }
        .dynamic-stage-box { min-height: 65px; }
        .live-sequence-wrapper { min-height: 140px; }
        
        .node-column-wrapper { display: flex; flex-direction: column; align-items: center; position: relative; min-width: 95px; }
        .tracker-tag-container { height: 24px; display: flex; align-items: flex-end; margin-bottom: 4px; }
        .tracker-tag { font-size: 11px; background: #f97316; color: #000000; font-weight: 800; padding: 1px 8px; border-radius: 4px; text-transform: uppercase; }
        
        .node-block { display: flex; border: 2px solid #27272a; border-radius: 8px; overflow: hidden; background: #18181b; transition: border-color 0.2s; }
        .node-val-zone { padding: 8px 14px; font-weight: 700; color: #ffffff; background: #27272a; min-width: 45px; text-align: center; border-right: 1px solid #3f3f46; }
        .node-pointer-zone { padding: 8px 12px; color: #60a5fa; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 14px; background: #18181b; }
        
        .bg-success-text { background: #22c55e !important; color: #ffffff !important; }
        .staging-node-pulse { border-color: #eab308 !important; box-shadow: 0 0 14px rgba(234,179,8,0.4) !important; }
        
        .index-sub-label { font-size: 12px; color: #71717a; margin-top: 6px; font-weight: 500; }
        .link-arrow { font-size: 18px; padding: 0 6px; font-weight: bold; margin-top: 14px; }
        .null-cap-block { background: #27272a; border: 1px solid #3f3f46; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; color: #a1a1aa; height: 34px; margin-top: 28px; display: flex; align-items: center;}
        
        .info-status-panel { background: #09090b; border-radius: 8px; border: 1px solid #27272a; font-size: 14px; text-align: left; color: #e4e4e7; }
        .text-blue-msg { color: #60a5fa; font-weight: 600; }
        .text-zinc-header { color: #a1a1aa; font-weight: 600; }
        .italic-font { color: #52525b !important; font-style: italic; font-size: 13px; }
        .empty-text { color: #ef4444; font-weight: 600; font-size: 14px; }

        .compiler-code-screen { background: #09090b; border: 1px solid #27272a; border-radius: 8px; overflow: hidden; font-family: 'Courier New', Courier, monospace; display: flex; flex-direction: column; py: 4px; }
        .code-line-row { display: flex; align-items: center; background: #09090b; padding: 3px 0; }
        .line-number-gutter { width: 35px; text-align: right; font-size: 11px; color: #52525b; background: #18181b; padding-right: 8px; user-select: none; border-right: 1px solid #27272a; font-weight: bold; }
        .line-code-prose { margin: 0; padding-left: 12px; font-size: 12px; color: #d4d4d8; white-space: pre; }
        
        .line-highlight-active { background: rgba(234,179,8,0.12) !important; border-left: 3px solid #eab308; }
        .line-highlight-active .line-number-gutter { background: rgba(234,179,8,0.2) !important; color: #ffffff; }
        .line-highlight-active .line-code-prose { color: #fde047; font-weight: bold; }
      `}</style>
    </div>
  );
}