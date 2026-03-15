import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {

const navigate = useNavigate();
const categoryRef = useRef(null);

const scrollToCategory = () => {
  categoryRef.current.scrollIntoView({ behavior: "smooth" });
};

return (
<div className="home">


<section className="hero">

<div className="hero-left">


<h1>
Visualize Algorithms &
<span className="highlight"> Data Structures</span>
</h1>

<p>
Learn complex computer science concepts through interactive
step-by-step animations and real-time execution tracking.
</p>

<button className="start-btn" onClick={scrollToCategory}>
Get Started →
</button>

</div>
<div className="hero-right">

<iframe
  src="/fibonacci-demo.html"
  title="Algorithm Demo"
  className="hero-demo"
/>

</div>


</section>

{/* FEATURES */}

<section className="features">

<div className="feature-card">
<div className="icon">▶</div>
<h3>Step-by-Step Animations</h3>
<p>
Pause, rewind and jump to any step of the algorithm execution.
</p>
</div>

<div className="feature-card">
<div className="icon">▶</div>
<h3>Interactive Graph Editor</h3>
<p>
Build custom graphs instantly by clicking and dragging nodes.
</p>
</div>

<div className="feature-card">
<div className="icon">▶</div>
<h3>Pseudocode & Analysis</h3>
<p>
Side-by-side execution with time and space complexity.
</p>
</div>

<div className="feature-card">
<div className="icon">▶</div>
<h3>AI Guided Learning</h3>
<p>
Get hints and explanations for complex problems.
</p>
</div>

</section>

{/* EXPLORE CATEGORIES */}

<section ref={categoryRef} className="categories">

<h2>Explore Categories</h2>

<div className="category-buttons">

<button onClick={() => navigate("/searching")}>
Searching
</button>

<button onClick={() => navigate("/sorting")}>
Sorting
</button>

<button onClick={() => navigate("/linkedlist")}>
Linked List
</button>

<button onClick={() => navigate("/stack")}>
Stack
</button>

</div>

</section>

</div>
);
}

export default HomePage;