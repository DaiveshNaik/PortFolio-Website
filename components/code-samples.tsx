'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import TechLogos from './tech-logos'

interface CodeSample {
  language: string
  logo: keyof typeof TechLogos
  code: string
  output: string
  extension: string
}

const codeSamples: CodeSample[] = [
  {
    language: 'JavaScript',
    logo: 'JavaScript',
    extension: '.js',
    code: `// Hello World in JavaScript
const greeting = "Hello, World!";
console.log(greeting);

// Arrow function example
const sayHello = (name) => {
  return \`Hello, \${name}! Welcome to my portfolio.\`;
};

console.log(sayHello("Visitor"));`,
    output: `Hello, World!
Hello, Visitor! Welcome to my portfolio.`,
  },
  {
    language: 'TypeScript',
    logo: 'TypeScript',
    extension: '.ts',
    code: `// Hello World in TypeScript
interface Greeting {
  message: string;
  recipient: string;
}

const createGreeting = (name: string): Greeting => ({
  message: "Hello, World!",
  recipient: name,
});

const greeting: Greeting = createGreeting("Developer");
console.log(\`\${greeting.message} - \${greeting.recipient}\`);`,
    output: `Hello, World! - Developer`,
  },
  {
    language: 'Java / Spring Boot',
    logo: 'SpringBoot',
    extension: '.java',
    code: `package com.portfolio.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }

    @GetMapping("/skills")
    public String[] getSkills() {
        return new String[]{"Java", "Spring Boot", "React", "Next.js"};
    }
}`,
    output: `[Spring Boot Application Started]
Mapping [/hello] onto com.portfolio.api.HelloWorldController#helloWorld()
Mapping [/skills] onto com.portfolio.api.HelloWorldController#getSkills()

> GET /hello
"Hello, World!"`,
  },
  {
    language: 'Python',
    logo: 'Python',
    extension: '.py',
    code: `# Hello World in Python
def greet(name: str) -> str:
    """Return a personalized greeting."""
    return f"Hello, {name}! Welcome to my portfolio."

# Main execution
if __name__ == "__main__":
    print("Hello, World!")
    print(greet("Developer"))
    
    # List comprehension example
    languages = ["Python", "JavaScript", "TypeScript"]
    greetings = [f"I love {lang}!" for lang in languages]
    print(greetings)`,
    output: `Hello, World!
Hello, Developer! Welcome to my portfolio.
['I love Python!', 'I love JavaScript!', 'I love TypeScript!']`,
  },
  {
    language: 'React',
    logo: 'React',
    extension: '.tsx',
    code: `// Hello World in React
import { useState } from 'react';

const HelloWorld = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex flex-col items-center">
      <h1>Hello, World!</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(c => c + 1)}>
        Click me!
      </button>
    </div>
  );
};

export default HelloWorld;`,
    output: `[Component Rendered]
Hello, World!
You clicked 0 times
[Button: Click me!]`,
  },
  {
    language: 'Node.js',
    logo: 'NodeJS',
    extension: '.js',
    code: `// Hello World in Node.js
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World from Node.js!');
});

server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}/\`);
  console.log('Hello, World!');
});`,
    output: `Server running at http://localhost:3000/
Hello, World!`,
  },
  {
    language: 'Bash',
    logo: 'Linux',
    extension: '.sh',
    code: `#!/bin/bash
# Hello World in Bash - Linux Expert Mode

echo "Hello, World!"

# System info
echo "System: $(uname -a)"
echo "User: $(whoami)"
echo "PWD: $(pwd)"

# Array example
languages=("JavaScript" "Python" "TypeScript")
for lang in "\${languages[@]}"; do
    echo "I code in $lang"
done

# Check if Docker is running
if systemctl is-active --quiet docker; then
    echo "Docker is running ✓"
fi`,
    output: `Hello, World!
System: Linux ubuntu 6.8.0-generic x86_64 GNU/Linux
User: daivesh
PWD: /home/daivesh/projects
I code in JavaScript
I code in Python
I code in TypeScript
Docker is running ✓`,
  },
  {
    language: 'Docker',
    logo: 'Docker',
    extension: 'file',
    code: `# Dockerfile for Node.js Application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]`,
    output: `[+] Building 45.2s (12/12) FINISHED
 => [builder 1/5] FROM node:20-alpine
 => [builder 2/5] WORKDIR /app
 => [builder 3/5] COPY package*.json ./
 => [builder 4/5] RUN npm ci
 => [builder 5/5] RUN npm run build
 => [runner 1/3] COPY --from=builder
 => Successfully built image: portfolio:latest`,
  },
  {
    language: 'SQL',
    logo: 'PostgreSQL',
    extension: '.sql',
    code: `-- Hello World in PostgreSQL
SELECT 'Hello, World!' AS greeting;

-- Create a users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email) VALUES 
    ('Daivesh Naik', 'daivesh@example.com'),
    ('John Doe', 'john@example.com');

-- Query with join
SELECT u.name, COUNT(p.id) as project_count
FROM users u
LEFT JOIN projects p ON u.id = p.user_id
GROUP BY u.name;`,
    output: `    greeting
---------------
 Hello, World!
(1 row)

CREATE TABLE
INSERT 0 2

    name       | project_count
---------------+---------------
 Daivesh Naik |             5
 John Doe     |             2
(2 rows)`,
  },
  {
    language: 'GitLab CI',
    logo: 'GitLab',
    extension: '.yml',
    code: `# GitLab CI/CD Pipeline Configuration
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "20"

build:
  stage: build
  image: node:\${NODE_VERSION}
  script:
    - echo "Hello, World from GitLab CI!"
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

test:
  stage: test
  script:
    - npm run test
    - npm run lint

deploy:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - kubectl apply -f k8s/
  only:
    - main`,
    output: `Running with gitlab-runner 16.8.0
Preparing the "docker" executor
Using Docker executor with image node:20
$ echo "Hello, World from GitLab CI!"
Hello, World from GitLab CI!
$ npm ci
added 1247 packages in 23s
$ npm run build
Build completed successfully!
Job succeeded`,
  },
]

export default function CodeSamples() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const activeSample = codeSamples[activeIndex]
  const LogoComponent = TechLogos[activeSample.logo]

  const copyCode = () => {
    navigator.clipboard.writeText(activeSample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* Language Tabs */}
      <div className="flex flex-wrap gap-2">
        {codeSamples.map((sample, index) => {
          const Logo = TechLogos[sample.logo]
          return (
            <motion.button
              key={sample.language}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-secondary'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-4 h-4">
                <Logo />
              </div>
              <span className="hidden sm:inline">{sample.language}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Code Editor */}
      <div className="glass rounded-xl overflow-hidden border border-border/50">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5">
                <LogoComponent />
              </div>
              <span className="font-mono">hello{activeSample.extension}</span>
            </div>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-black/80"
          >
            <pre className="font-mono text-xs sm:text-sm overflow-x-auto">
              <code className="text-gray-300">
                {activeSample.code.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-gray-600 select-none shrink-0 text-right pr-4">
                      {i + 1}
                    </span>
                    <span className={getLineColor(line)}>{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>

        {/* Output Section */}
        <div className="border-t border-border/50">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40">
            <span className="text-xs font-mono text-muted-foreground">Output:</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`output-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-black/60 font-mono text-xs sm:text-sm"
            >
              <pre className="text-green-400 whitespace-pre-wrap">{activeSample.output}</pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function getLineColor(line: string): string {
  if (line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('--')) {
    return 'text-gray-500'
  }
  if (line.includes('const ') || line.includes('let ') || line.includes('var ') || line.includes('def ') || line.includes('function')) {
    return 'text-cyan-400'
  }
  if (line.includes('import') || line.includes('from') || line.includes('require')) {
    return 'text-purple-400'
  }
  if (line.includes('"') || line.includes("'") || line.includes('`')) {
    return 'text-green-300'
  }
  if (line.includes('return') || line.includes('export') || line.includes('SELECT') || line.includes('FROM')) {
    return 'text-pink-400'
  }
  return 'text-gray-300'
}
