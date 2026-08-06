const fs = require("fs");

const readme = "README.md";
const factsFile = "data/ai-facts.json";
const stateFile = "data/state.json";

const facts = JSON.parse(fs.readFileSync(factsFile));

let state = JSON.parse(fs.readFileSync(stateFile));

const fact = facts[state.index];

const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
});

const replacement = `<!--START_SECTION:ai-fact-->

### 🧠 AI Insight

> **Category:** ${fact.category}

> ${fact.fact}

_Last Updated: ${today}_

<!--END_SECTION:ai-fact-->`;

let content = fs.readFileSync(readme, "utf8");

content = content.replace(
    /<!--START_SECTION:ai-fact-->[\s\S]*<!--END_SECTION:ai-fact-->/,
    replacement
);

fs.writeFileSync(readme, content);

state.index++;

if (state.index >= facts.length)
    state.index = 0;

fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));

console.log("Updated AI Fact");