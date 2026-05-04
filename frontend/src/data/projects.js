/**
 * PHASE 1 — Static data.
 *
 * PHASE 2 MIGRATION:
 *   Replace this entire file with an API hook, e.g.:
 *     export async function fetchProjects() {
 *       const res = await fetch('/api/projects');
 *       return res.json();
 *     }
 *   Then update Projects.jsx to use React Query or useEffect to call fetchProjects().
 *   The PROJECTS array structure below is the contract the API must match.
 *
 * TODO(phase2): Replace static export with API call to GET /api/projects
 */

export const PROJECTS = [
  {
    id: 1,
    title: 'Spendly',
    description:
      'A personal expense tracker with category-based breakdowns and monthly summaries. Built with Python, Flask, and SQLite.',
    techStack: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/veershukla/spendly',
    highlight: false,
  },
  {
    id: 2,
    title: 'Pareto Problem Set',
    description:
      'A curated collection of high-leverage DSA problems designed around the Pareto principle — 20% of problems, 80% of interview coverage.',
    techStack: ['Java', 'DSA'],
    githubUrl: 'https://github.com/veershukla/paretoproblemset',
    highlight: false,
  },
  {
    id: 3,
    title: 'Agentic AI',
    description:
      'Exploration and implementations of agentic AI frameworks including LangGraph, CrewAI, AutoGen, and MCP (Model Context Protocol).',
    techStack: ['Python', 'LangGraph', 'CrewAI', 'AutoGen', 'MCP'],
    githubUrl: 'https://github.com/veershukla/agenticainew',
    highlight: true,
  },
  {
    id: 4,
    title: 'LeetCode Curation',
    description:
      'Topically organized LeetCode problems for structured interview preparation, grouped by pattern (sliding window, DP, graphs) rather than difficulty.',
    techStack: ['Java', 'Algorithms', 'Interview Prep'],
    githubUrl: 'https://github.com/veershukla/leetcode-curation-topical',
    highlight: false,
  },
  {
    id: 5,
    title: 'Claude Code Portfolio',
    description:
      'This portfolio site — built in one shot with Claude Code. React + Vite + Tailwind served by nginx in Docker, tunneled publicly via ngrok.',
    techStack: ['Claude Code', 'React', 'Vite', 'Tailwind CSS', 'Docker', 'ngrok'],
    githubUrl: 'https://github.com/veershukla/claude-code-in-one-shot',
    highlight: true,
  },
  {
    id: 6,
    title: 'DSA Visualizer',
    description:
      'Interactive visualizations for common data structures and algorithms — sorting, graph traversal, trees — to complement structured interview prep.',
    techStack: ['React', 'SVG', 'Canvas', 'JavaScript'],
    githubUrl: 'https://github.com/veershukla/dsa-visualizer',
    highlight: false,
  },
]
