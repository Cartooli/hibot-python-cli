#!/usr/bin/env node
// Generates 64 static glossary term pages under ./glossary/
// Run: node generate-glossary.js

const fs = require('fs');
const path = require('path');

const DATA = {
  terms: [
    {
      category: "How the Internet Works",
      categorySlug: "internet",
      catColor: "#F5A524",
      terms: [
        { term: "URL", definition: "Uniform Resource Locator. The address you type into a browser to visit a website, like https://example.com/page. It tells the browser exactly which server to contact and which resource to request.", example: "When you type https://youtube.com into your browser, the URL tells your computer to use HTTPS to connect to YouTube's server and request the homepage." },
        { term: "Domain Name", definition: "The human-readable name for a website, like google.com or wikipedia.org. It's a friendly alias for a numeric IP address that computers actually use to find each other.", example: "Instead of typing 142.250.80.46, you type google.com — the domain name system translates one into the other." },
        { term: "DNS", definition: "Domain Name System. The internet's phone book. It translates domain names (like github.com) into IP addresses (like 140.82.121.3) so computers can locate each other on the network.", example: "When you visit reddit.com, your computer first asks a DNS server: 'What's the IP address for reddit.com?' The DNS server responds, and then your browser connects to that address." },
        { term: "HTTP Request", definition: "A message your browser sends to a server asking for something — a web page, an image, data from an API. HTTP stands for HyperText Transfer Protocol, and it defines the format of these messages.", example: "When you load a webpage, your browser sends an HTTP GET request to the server saying 'please send me this page.' The server responds with the HTML, CSS, and JavaScript files." },
        { term: "Server", definition: "A computer that listens for requests and sends back responses. It runs software that serves web pages, processes data, or provides access to databases. It's always on, always connected, and waiting for someone to ask it for something.", example: "When you visit a website, your browser sends a request to a server. That server — which might be a physical machine in a data center or a virtual one in the cloud — sends back the files your browser needs to display the page." },
        { term: "Client", definition: "The device or program that makes requests to a server. Your web browser is a client. Your phone app is a client. Anything that asks a server for data and displays the result is acting as a client.", example: "When you open Instagram, the Instagram app on your phone (the client) sends requests to Instagram's servers asking for your feed, stories, and messages." },
        { term: "Frontend", definition: "The part of a website or application that the user sees and interacts with. It runs in the browser and is built with HTML, CSS, and JavaScript. Everything visual — buttons, text, layouts, animations — is the frontend.", example: "The search bar on Google, the like button on Twitter, the video player on YouTube — these are all frontend elements that you interact with directly." },
        { term: "Backend", definition: "The part of a website or application that runs on the server. It handles business logic, processes data, communicates with databases, and sends information back to the frontend. Users never see the backend directly.", example: "When you search on Google, the frontend sends your query to the backend. The backend searches through billions of indexed pages, ranks the results, and sends them back to your browser for display." },
        { term: "Request-Response Cycle", definition: "The fundamental pattern of how the web works. A client sends a request to a server, the server processes it, and the server sends back a response. Every webpage load, every API call, every form submission follows this pattern.", example: "You click 'Submit' on a form (request). The server saves your data to a database and sends back a confirmation page (response). This round trip is one request-response cycle." },
        { term: "IP Address", definition: "A numeric label assigned to every device connected to the internet, like a postal address for computers. IPv4 addresses look like 192.168.1.1. Every server hosting a website has one.", example: "Your home router has a public IP address that identifies it on the internet. Google's servers have IP addresses too — DNS translates google.com into the right one." }
      ]
    },
    {
      category: "How Data is Stored and Moved",
      categorySlug: "data",
      catColor: "#60a5fa",
      terms: [
        { term: "Database", definition: "An organized system for storing, retrieving, and managing data. Think of it as a collection of structured information that a computer can search through quickly. Almost every app, website, and service stores its data in a database.", example: "Your school's student information system stores names, grades, and schedules in a database. When a teacher looks up your grades, the system queries the database and returns your records." },
        { term: "Table", definition: "A structured collection of data organized into rows and columns inside a database. Each table stores one type of thing — users, orders, products, messages. It's like a spreadsheet, but designed for computers to read quickly.", example: "A 'students' table might have columns for name, age, grade, and email. Each student is one row. The database can search, filter, and sort millions of rows in milliseconds." },
        { term: "Row", definition: "A single record in a database table. Each row represents one instance of whatever the table tracks — one user, one order, one message.", example: "In a 'books' table, each row is one book: title, author, year published, number of pages." },
        { term: "Query", definition: "A question you ask a database, written in a structured language like SQL. A query can retrieve data, filter it, sort it, combine it from multiple tables, or calculate summaries.", example: "SELECT name, grade FROM students WHERE grade > 90 — this query asks the database to return the names and grades of all students with a grade above 90." },
        { term: "SQL", definition: "Structured Query Language. The standard language for talking to relational databases. It lets you create tables, insert data, query data, update records, and delete information using readable commands.", example: "SQL reads almost like English: SELECT * FROM orders WHERE status = 'shipped' means 'give me all orders that have been shipped.'" },
        { term: "Filter", definition: "Narrowing down a dataset to only the records that match specific criteria. In SQL this is done with a WHERE clause. Filtering is one of the most common data operations.", example: "Filtering a list of 10,000 products to show only those under $20 and in stock." },
        { term: "Sort", definition: "Arranging data in a specific order — alphabetically, by date, by value, ascending or descending. In SQL this is done with ORDER BY.", example: "Sorting search results by relevance, or sorting a leaderboard by score from highest to lowest." },
        { term: "Join", definition: "Combining data from two or more database tables based on a related column. Joins are what make relational databases powerful — they let you connect related information stored in separate places.", example: "A 'students' table and a 'grades' table are separate, but both have a student_id column. A JOIN lets you combine them to see each student's name alongside their grades." },
        { term: "Aggregate", definition: "Performing a calculation across many rows to produce a single summary value. Common aggregations include counting rows, summing values, computing averages, and finding minimums or maximums.", example: "SELECT AVG(score) FROM tests WHERE subject = 'Math' — this aggregates all math test scores into a single average." },
        { term: "JSON", definition: "JavaScript Object Notation. A simple, human-readable format for structuring data as key-value pairs. It's the most common format for sending data between a frontend and a backend, or between two APIs.", example: 'A user profile in JSON: {"name": "Alex", "age": 13, "interests": ["coding", "music", "robotics"]}' }
      ]
    },
    {
      category: "How Logic Works",
      categorySlug: "logic",
      catColor: "#f472b6",
      terms: [
        { term: "Variable", definition: "A named container that stores a value in a program. You can create a variable, assign it a value, change that value, and use it in calculations or decisions. Variables are the basic building blocks of all programs.", example: "score = 0 creates a variable called score and sets it to zero. Later, score = score + 10 changes it to 10." },
        { term: "If/Then Condition", definition: "A decision point in code. The program checks whether something is true, and if it is, it runs a specific block of code. If not, it can do something else. This is how programs make choices.", example: "if temperature > 90: print('It is hot outside') — the program checks the temperature and only prints the message if the condition is true." },
        { term: "Loop", definition: "A structure that repeats a block of code multiple times. A loop can run a set number of times, or keep running until a condition changes. Loops let programs do repetitive tasks efficiently.", example: "for student in class_list: print(student.name) — this loop goes through every student in the list and prints their name, one by one." },
        { term: "Function", definition: "A reusable block of code that performs a specific task. You give it a name, define what it does, and then call it whenever you need that task done. Functions prevent you from writing the same code over and over.", example: "def calculate_average(numbers): return sum(numbers) / len(numbers) — this function takes a list of numbers and returns their average. You can call it anywhere in your program." },
        { term: "Input/Output", definition: "Input is data that goes into a program — from a user typing, a file being read, or an API sending information. Output is what the program produces — text on screen, data saved to a file, a response sent to a browser.", example: "A calculator app takes two numbers as input, performs a calculation, and displays the result as output." },
        { term: "For Loop", definition: "A loop that runs a specific number of times, usually iterating over a collection of items. It's the most common type of loop and is used whenever you need to do something to each item in a list.", example: "for i in range(5): print(i) — this prints the numbers 0, 1, 2, 3, 4. The loop runs exactly five times." },
        { term: "Boolean", definition: "A data type with only two possible values: true or false. Booleans are the foundation of all decision-making in programs — every if/then condition evaluates to a boolean.", example: "is_logged_in = True — this boolean variable tracks whether a user is currently logged into the system." },
        { term: "String", definition: "A sequence of characters — letters, numbers, symbols, spaces — treated as text by the program. Strings are always wrapped in quotes.", example: "greeting = 'Hello, world!' — this stores the text Hello, world! as a string variable." },
        { term: "Array / List", definition: "An ordered collection of values stored in a single variable. Each item has a position (index) starting from 0. Lists let you store and work with multiple related values together.", example: "colors = ['red', 'blue', 'green'] — this list has three items. colors[0] gives you 'red', colors[2] gives you 'green'." },
        { term: "Dictionary / Object", definition: "A collection of key-value pairs. Instead of accessing items by position (like a list), you access them by name. This is how most real-world data is structured in code.", example: "student = {'name': 'Alex', 'age': 13, 'grade': 8} — you can access student['name'] to get 'Alex'." }
      ]
    },
    {
      category: "How Systems Connect",
      categorySlug: "systems",
      catColor: "#a78bfa",
      terms: [
        { term: "API", definition: "Application Programming Interface. A set of rules that lets one program talk to another. When an app needs data from a server, or one service needs to trigger another, they communicate through an API. It's the messenger between systems.", example: "A weather app on your phone doesn't generate forecasts itself. It sends an API request to a weather service, which sends back the forecast data in JSON format." },
        { term: "REST API", definition: "Representational State Transfer API. The most common style of web API. It uses standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs. Almost every modern web service exposes a REST API.", example: "GET /api/users/42 asks the server for user number 42. POST /api/users creates a new user. DELETE /api/users/42 removes that user. The URL identifies the resource, the method identifies the action." },
        { term: "Request", definition: "A message sent from a client to a server asking it to do something — retrieve data, create a record, update information, or delete something. Every request includes a method (like GET or POST), a URL, and sometimes a body of data.", example: "When you submit a login form, your browser sends a POST request to the server with your username and password in the request body." },
        { term: "Response", definition: "The message a server sends back after receiving a request. It includes a status code (like 200 for success or 404 for not found) and usually contains the data that was requested or a confirmation of the action performed.", example: "After a successful login, the server sends back a 200 response with your account data. If you visit a page that doesn't exist, you get a 404 response." },
        { term: "Endpoint", definition: "A specific URL where an API can be accessed. Each endpoint represents a different resource or action. Think of it as one specific door into a system.", example: "/api/users is one endpoint (for user data). /api/orders is another (for order data). Each endpoint has its own purpose." },
        { term: "HTTP Methods", definition: "The verbs of the web. GET retrieves data. POST creates new data. PUT updates existing data. DELETE removes data. These four methods cover almost all operations in web applications.", example: "A to-do app might use GET /todos to list tasks, POST /todos to add one, PUT /todos/3 to update task 3, and DELETE /todos/3 to remove it." },
        { term: "Status Code", definition: "A three-digit number in every HTTP response that indicates whether the request succeeded or failed, and why. 200 means OK. 404 means not found. 500 means the server had an error.", example: "200 = success. 201 = created. 400 = bad request (you sent something wrong). 401 = unauthorized (you need to log in). 404 = not found. 500 = server error." },
        { term: "Full Stack", definition: "The complete set of technologies needed to build a web application — from the frontend that users see, to the backend that processes data, to the database that stores it. A 'full-stack developer' understands all of these layers.", example: "A full-stack project might use HTML/CSS/JavaScript for the frontend, Python with Flask for the backend, and PostgreSQL for the database." }
      ]
    },
    {
      category: "Core Web Technologies",
      categorySlug: "web",
      catColor: "#F5A524",
      terms: [
        { term: "HTML", definition: "HyperText Markup Language. The standard language for creating the structure and content of web pages. HTML defines what's on the page — headings, paragraphs, images, links, forms — using tags like h1, p, and img.", example: "h1 Welcome /h1 p This is a paragraph. /p — this HTML creates a heading and a paragraph that a browser knows how to display." },
        { term: "CSS", definition: "Cascading Style Sheets. The language that controls how HTML looks — colors, fonts, spacing, layout, animations. HTML provides the structure, CSS provides the visual design.", example: "h1 { color: blue; font-size: 32px; } — this CSS rule makes all h1 headings blue and 32 pixels tall." },
        { term: "JavaScript", definition: "The programming language of the web. It runs in the browser and makes web pages interactive — handling clicks, updating content without reloading, fetching data from APIs, and responding to user input in real time.", example: "button.addEventListener('click', function() { alert('You clicked!'); }); — this JavaScript code shows a popup when someone clicks a button." },
        { term: "Python", definition: "A general-purpose programming language known for its clean, readable syntax. It's widely used for backend web development, data analysis, machine learning, automation, and scripting. One of the best first languages to learn.", example: "numbers = [1, 2, 3, 4, 5]; total = sum(numbers); print(f'The total is {total}') — Python reads almost like English." },
        { term: "Node.js", definition: "A runtime that lets you run JavaScript outside the browser — on a server. Before Node.js, JavaScript could only run in web browsers. Now it can power backends, APIs, and command-line tools.", example: "With Node.js, you can build a web server in JavaScript: the same language running in the browser can also handle database queries and API logic on the server." },
        { term: "Text Editor", definition: "A program for writing and editing code. Unlike word processors, text editors work with plain text and often include features like syntax highlighting, auto-completion, and error detection. VS Code is the most popular one today.", example: "Visual Studio Code (VS Code) is a free text editor that highlights your code in different colors based on the language, shows errors in real time, and can run your code with one click." }
      ]
    },
    {
      category: "Infrastructure Concepts",
      categorySlug: "infrastructure",
      catColor: "#22d3ee",
      terms: [
        { term: "File System", definition: "The way a computer organizes and stores files in a hierarchy of folders (directories). Understanding file systems — paths, directories, file types — is essential for working with any programming environment.", example: "/home/alex/projects/my-website/index.html — this path tells the computer exactly where to find the file, starting from the root of the file system." },
        { term: "Command Line / Terminal", definition: "A text-based interface for interacting with your computer. Instead of clicking icons, you type commands. It's more powerful and precise than a graphical interface, and most development tools are designed to be used from the command line.", example: "cd projects — changes to the projects directory. ls — lists files. python app.py — runs a Python script. These simple commands are how developers navigate and control their systems." },
        { term: "Cloud", definition: "Servers owned by companies like Amazon, Google, or Microsoft that you can rent on demand. Instead of running your own physical server, you use theirs. Most modern websites and apps run on cloud infrastructure.", example: "When you use Netflix, the video isn't stored on your device. It streams from servers in Amazon's cloud (AWS). Netflix rents thousands of these servers to deliver video to millions of people simultaneously." },
        { term: "Framework", definition: "A pre-built collection of code and conventions that gives you a structure for building applications faster. Instead of writing everything from scratch, you use a framework's patterns and tools. Frameworks come and go — the concepts behind them persist.", example: "React (JavaScript), Flask (Python), and Rails (Ruby) are all frameworks. They handle common tasks like routing URLs, rendering pages, and managing data so you can focus on your specific application logic." },
        { term: "Protocol", definition: "A set of rules that define how data is formatted and transmitted between systems. HTTP is a protocol for web communication. HTTPS adds encryption. TCP/IP is the foundational protocol of the internet itself.", example: "HTTP defines that a request must have a method (GET), a URL (/page), and headers. Both the client and server follow this protocol so they can understand each other." },
        { term: "HTTPS", definition: "HTTP Secure. The encrypted version of HTTP. When you see the padlock icon in your browser, the connection is using HTTPS, which means the data traveling between your browser and the server is encrypted and can't be read by anyone intercepting it.", example: "Banking websites always use HTTPS. Without encryption, someone on the same WiFi network could potentially read your login credentials as they travel between your browser and the bank's server." }
      ]
    },
    {
      category: "Development Concepts",
      categorySlug: "dev",
      catColor: "#fb923c",
      terms: [
        { term: "Syntax", definition: "The rules that define how code must be written in a specific programming language — the grammar of code. Each language has its own syntax for variables, functions, loops, and other structures.", example: "In Python, you define a function with def greet(): — in JavaScript, you write function greet() {}. Same concept, different syntax." },
        { term: "Bug", definition: "An error in code that causes the program to behave incorrectly or crash. Debugging — finding and fixing bugs — is a core part of programming and develops critical thinking and problem-solving skills.", example: "If your loop runs 11 times instead of 10, that's a bug. If your app crashes when a user submits an empty form, that's a bug. Finding why it happens is the skill." },
        { term: "Version Control / Git", definition: "A system that tracks every change made to code over time, allowing you to revert to earlier versions, work on different features simultaneously, and collaborate with others without overwriting each other's work. Git is the standard tool for this.", example: "You make a change that breaks your website. With Git, you can see exactly what you changed and roll it back to the working version in seconds." },
        { term: "Deploy", definition: "The process of taking code from your local computer and putting it on a server where other people can access it. Deploying a website means making it live on the internet.", example: "You build a website on your laptop. Deploying it to a service like Vercel or Netlify makes it accessible to anyone in the world with a URL." }
      ]
    },
    {
      category: "Operating with AI",
      categorySlug: "operate",
      catColor: "#F5A524",
      terms: [
        { term: "Workflow", definition: "A defined sequence of steps that turns an input into an output. In AI-native operations, a workflow specifies what happens at each stage, what data moves between stages, and where a human reviews or approves. Workflows are the unit of leverage for small teams — once a workflow exists, it can be run again and again without re-deciding how.", example: "Inbound lead workflow: form submission → AI summarizes the message → categorize by intent → draft a reply → human approves → send. Five steps, repeatable, mostly automated." },
        { term: "Orchestration", definition: "Coordinating multiple tools, models, or services so they act as one system. Orchestration handles the order of operations, passes data between steps, retries failures, and decides when to escalate to a human. It's the difference between a pile of prompts and an operational system.", example: "A client-report orchestration pulls metrics from a spreadsheet, asks an AI to summarize the month, fetches screenshots from an analytics tool, assembles a PDF, and emails it. Each piece is simple; orchestration makes them work as one." },
        { term: "Agent", definition: "A program that uses a language model to decide what to do next, takes actions through tools, observes the results, and continues until a goal is met. Unlike a single prompt, an agent runs a loop — plan, act, observe, repeat. Agents are useful when the steps can't be fully scripted in advance.", example: "A research agent given 'find the top three competitors for this product' might search the web, read pages, take notes, deduplicate findings, and produce a summary — choosing each next action based on what it has already found." },
        { term: "Tool Calling", definition: "The capability that lets a language model invoke external functions — search a database, send an email, run a calculation, fetch a file — by emitting a structured request that your code executes. Tool calling is how AI moves from talking about work to actually doing it.", example: "Instead of asking the model to 'estimate' a customer's order total, you give it a calculate_total tool. The model calls the tool with the line items, your code runs the math, and the model uses the exact result in its reply." },
        { term: "Context Window", definition: "The amount of text — measured in tokens — that a language model can consider in a single call. Everything the model knows about the current task lives inside this window: instructions, prior conversation, retrieved documents, tool results. Run out of context and earlier information starts dropping out.", example: "Pasting a 500-page contract into a model with a 200K-token window works; pasting it into a 16K-token window does not. Managing what goes into the window is one of the core skills of operating AI systems." },
        { term: "Retrieval", definition: "Pulling the right information from a larger store and placing it into a model's context window so the model can use it. Retrieval is how you make AI grounded in your own data — your docs, your CRM, your knowledge base — without retraining the model.", example: "When a support agent asks 'what's our refund policy for enterprise customers?', the system retrieves the relevant policy paragraph from your knowledge base and includes it in the prompt. The model answers from real text, not memory." },
        { term: "Grounding", definition: "Tying a model's output to specific, verifiable sources — retrieved documents, structured data, tool results — instead of relying on its training memory. Grounded answers can be cited, audited, and trusted in operational settings.", example: "An ungrounded model might confidently invent a statistic. A grounded one quotes the exact line from the source document it was given, so an operator can verify the claim before acting on it." },
        { term: "Hallucination", definition: "When a language model produces output that sounds confident but is factually wrong or fabricated. Hallucinations happen most when the model is asked about things outside its training, with no grounding documents, or under vague instructions. Designing systems that prevent or catch them is core operational work.", example: "Asked for a customer's order history with no database access, a model may invent plausible-looking order IDs. The fix is grounding: give it tool access to the real order system instead of letting it guess." },
        { term: "Evaluation", definition: "Systematically measuring whether an AI workflow produces good outputs. Evaluation can be human review, automated checks, or a second model grading the first. Without evaluation you cannot tell whether a change to a prompt, model, or workflow made things better or worse.", example: "Before swapping the model behind your sales-email generator, you run 50 historical leads through both versions and have a reviewer rate the drafts. The new model wins on 38 of 50 — now you can ship the swap with evidence." },
        { term: "Prompt Architecture", definition: "The deliberate structure of a prompt — role, task, constraints, examples, output format, and context — designed for reliable results at scale. Prompt architecture treats a prompt as a piece of software: versioned, tested, and tuned.", example: "A weak prompt: 'summarize this email.' A structured one: 'You are a support triage assistant. Read the email below. Output a JSON object with fields: category, urgency (1-5), suggested_action, customer_name.' Same task, dramatically more reliable output." }
      ]
    },
    {
      category: "Thinking Skills",
      categorySlug: "thinking",
      catColor: "#818cf8",
      terms: [
        { term: "First-Principles Thinking", definition: "Breaking a problem down to its most fundamental truths and building understanding from there, rather than relying on conventions or analogies. In tech, this means understanding what a system actually does rather than just how to operate its interface.", example: "Instead of memorizing that VLOOKUP searches a column in Excel, you understand the concept: 'look up a value in one table based on a matching key in another.' That concept works in SQL, Python, or any tool." },
        { term: "Systems Thinking", definition: "The ability to see how individual components connect to form a larger whole. In software, this means understanding how the frontend, backend, database, APIs, and infrastructure work together as an integrated system.", example: "When a website is slow, a systems thinker doesn't just blame the server. They consider: is the database query inefficient? Is the API response too large? Is the frontend rendering too much data at once?" },
        { term: "Decomposition", definition: "Breaking a complex problem into smaller, manageable pieces that can be solved individually. This is one of the most important skills in programming and in life — no large problem is solved all at once.", example: "Building a to-do app seems overwhelming. Decomposed: (1) display a list of items, (2) add a new item, (3) mark an item complete, (4) delete an item. Now each piece is solvable." },
        { term: "Mental Model", definition: "An internal representation of how something works. A strong mental model of software systems lets you predict behavior, diagnose problems, and learn new tools quickly because you understand the underlying patterns.", example: "If your mental model of the web includes 'browser sends request, server processes, server sends response,' you can understand any web framework instantly — because they all follow this same model." },
        { term: "Architectural Thinking", definition: "The skill of designing systems at a high level — deciding which components are needed, how they connect, where data lives, and how information flows. It's thinking about the blueprint before writing any code.", example: "Before building an app, an architectural thinker asks: Where will the data live? How will the frontend get it? What happens if 1,000 people use this at once? These questions shape the entire system." },
        { term: "Abstraction", definition: "Hiding complexity behind a simpler interface. Every layer of software is an abstraction — a browser hides the complexity of HTTP requests, a function hides the complexity of its internal logic. Understanding abstraction is understanding how all software is built.", example: "When you call print('hello'), you don't need to know how the computer renders text on screen. The print function abstracts that complexity away, letting you focus on what you want to display." }
      ]
    }
  ]
};

function slugify(term) {
  return term
    .toLowerCase()
    .replace(/\s*\/\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function descSnippet(def) {
  const s = def.replace(/\s+/g, ' ').trim();
  return s.length > 155 ? s.slice(0, 152) + '...' : s;
}

// Flatten all terms with slugs
const allTerms = [];
DATA.terms.forEach(cat => {
  cat.terms.forEach(t => {
    allTerms.push({ ...t, category: cat.category, catColor: cat.catColor, categorySlug: cat.categorySlug, slug: slugify(t.term) });
  });
});

// Nav fragment (relative paths from glossary/ subdir)
const NAV = `<nav class="site-nav" aria-label="Site navigation">
  <a href="../index.html" class="home-link">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    Hi Bot Code
  </a>
  <div class="nav-divider" aria-hidden="true"></div>
  <div class="nav-links">
    <a href="../editor.html">Editor</a>
    <a href="../challenges/">Challenges</a>
    <a href="../showcase.html">Showcase</a>
    <a href="../ai-coding-landscape-2026.html">AI Guide</a>
    <a href="../ai-roi-calculator.html">Simple “was it worth it?” math</a>
    <a href="../get-started-coding.html">Get Started</a>
    <a href="../pull-requests-github.html">Pull Requests</a>
    <a href="../learn.html">Learn</a>
    <a href="../glossary.html" aria-current="page">Glossary</a>
  </div>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false" onclick="this.setAttribute('aria-expanded',this.getAttribute('aria-expanded')==='false'?'true':'false');this.closest('.site-nav').classList.toggle('nav-open')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
</nav>`;

const CSS = `
  :root {
    --bg: #0A0A0A; --ink: #f1f5f9; --muted: #a8b5c9; --accent: #F5A524;
    --accent-dim: rgba(245,165,36,.12); --panel: #121212; --panel-2: #1a1a1a;
    --border: rgba(168,181,201,.18); --border-hover: rgba(168,181,201,.38);
    --radius: 14px; --radius-sm: 8px; --shadow: 0 8px 30px rgba(0,0,0,.35);
    --font-ui: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font-ui); line-height: 1.65; -webkit-font-smoothing: antialiased; }
  .site-nav { position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,.94); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 20px; height: 50px; }
  .site-nav a.home-link { display: flex; align-items: center; gap: 7px; text-decoration: none; color: var(--accent); font-weight: 800; font-size: 14px; white-space: nowrap; margin-right: 4px; }
  .site-nav a.home-link:hover { text-decoration: underline; }
  .nav-divider { width: 1px; height: 18px; background: var(--border); margin: 0 10px; flex-shrink: 0; }
  .nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
  .nav-links a { color: var(--muted); font-size: 13px; font-weight: 500; padding: 5px 10px; border-radius: 6px; text-decoration: none; transition: color .15s, background .15s; white-space: nowrap; }
  .nav-links a:hover { color: var(--ink); background: rgba(255,255,255,.06); }
  .nav-links a[aria-current="page"] { color: var(--accent); }
  .page-body { max-width: 760px; margin: 0 auto; padding: 0 24px 80px; }
  .breadcrumb { padding: 20px 0 0; font-size: 13px; color: var(--muted); }
  .breadcrumb a { color: var(--muted); text-decoration: none; }
  .breadcrumb a:hover { color: var(--ink); text-decoration: underline; }
  .breadcrumb span { margin: 0 6px; }
  .term-header { padding: 28px 0 24px; border-bottom: 1px solid var(--border); margin-bottom: 32px; }
  .cat-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--panel-2); border: 1px solid var(--border); border-radius: 999px; padding: 3px 12px; font-size: 12px; font-weight: 500; color: var(--muted); margin-bottom: 14px; text-decoration: none; }
  .cat-badge:hover { color: var(--ink); }
  h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.2; margin: 0 0 10px; }
  .term-tagline { color: var(--muted); font-size: 1.05rem; margin: 0; }
  .definition-block { background: var(--panel-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px 28px; margin-bottom: 24px; }
  .definition-block h2 { font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin: 0 0 12px; }
  .definition-block p { font-size: 1.05rem; color: var(--ink); line-height: 1.75; margin: 0; }
  .example-block { background: var(--panel); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 18px 22px; margin-bottom: 32px; }
  .example-block h2 { font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent); margin: 0 0 8px; }
  .example-block p { font-family: var(--font-mono); font-size: 0.875rem; color: var(--muted); line-height: 1.7; margin: 0; }
  .related-section h2 { font-size: 1rem; font-weight: 700; margin: 0 0 14px; color: var(--ink); }
  .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 8px; margin-bottom: 36px; }
  .related-grid a { display: block; padding: 9px 14px; background: var(--panel-2); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--muted); font-size: 13px; font-weight: 500; text-decoration: none; transition: border-color .15s, color .15s, background .15s; }
  .related-grid a:hover { border-color: var(--accent); background: var(--accent-dim); color: var(--ink); }
  .learn-cta { background: var(--panel-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px 26px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .learn-cta p { margin: 0; color: var(--muted); font-size: 14px; }
  .learn-cta p strong { color: var(--ink); display: block; margin-bottom: 3px; font-size: 15px; }
  .learn-cta a { flex-shrink: 0; padding: 9px 18px; background: var(--accent-dim); border: 1px solid rgba(61,214,140,.3); color: var(--accent); font-size: 13px; font-weight: 600; text-decoration: none; border-radius: var(--radius-sm); white-space: nowrap; transition: background .15s; }
  .learn-cta a:hover { background: rgba(61,214,140,.2); }
  footer { text-align: center; padding: 36px 24px; border-top: 1px solid var(--border); color: var(--muted); font-size: .875rem; }
  footer a { color: var(--accent); text-decoration: none; }
  footer a:hover { text-decoration: underline; }
  .nav-toggle { display: none; background: none; border: none; color: var(--muted); cursor: pointer; padding: 4px; margin-left: auto; flex-shrink: 0; }
  @media (max-width: 640px) {
    .site-nav { padding: 0 16px; flex-wrap: wrap; }
    .nav-toggle { display: flex; align-items: center; }
    .nav-divider { display: none; }
    .nav-links { display: none; width: 100%; order: 10; padding: 8px 0; border-top: 1px solid var(--border); }
    .site-nav.nav-open .nav-links { display: flex; flex-direction: column; align-items: flex-start; }
    .nav-links a { padding: 8px 10px; width: 100%; }
    h1 { font-size: 1.6rem; }
  }
`;

function generateTermPage(termObj) {
  const { term, definition, example, category, catColor, categorySlug, slug } = termObj;
  const relatedTerms = allTerms.filter(t => t.category === category && t.slug !== slug);
  const shortDef = descSnippet(definition);

  const relatedLinks = relatedTerms.map(t =>
    `<a href="${t.slug}.html">${esc(t.term)}</a>`
  ).join('\n      ');

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term,
    "description": definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Tech &amp; Coding Glossary",
      "url": "https://code.hibot.space/glossary.html"
    }
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${esc(term)} — Tech Glossary | Hi Bot Code</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="description" content="What is ${esc(term)}? ${esc(shortDef)}" />
  <meta name="keywords" content="${esc(term)}, coding glossary, tech vocabulary, learn to code, programming terms, ${esc(category)}" />
  <meta name="author" content="code.hibot.space" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://code.hibot.space/glossary/${slug}.html" />

  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://code.hibot.space/glossary/${slug}.html" />
  <meta property="og:title" content="${esc(term)} — Tech &amp; Coding Glossary" />
  <meta property="og:description" content="${esc(shortDef)}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(term)} — Tech &amp; Coding Glossary" />
  <meta name="twitter:description" content="${esc(shortDef)}" />

  <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
  <style>${CSS}</style>
  <script type="application/ld+json">
  ${jsonLd}
  </script>
</head>
<body>
${NAV}

<main class="page-body">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="../index.html">Home</a>
    <span aria-hidden="true">/</span>
    <a href="../glossary.html">Glossary</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page">${esc(term)}</span>
  </nav>

  <header class="term-header">
    <a href="../glossary.html#${categorySlug}" class="cat-badge" style="border-color:${catColor}20;color:${catColor}">${esc(category)}</a>
    <h1>${esc(term)}</h1>
    <p class="term-tagline">${esc(shortDef.split('.')[0])}.</p>
  </header>

  <div class="definition-block">
    <h2>Definition</h2>
    <p>${esc(definition)}</p>
  </div>

  <div class="example-block">
    <h2>Example</h2>
    <p>${esc(example)}</p>
  </div>

  ${relatedLinks ? `<section class="related-section">
    <h2>More terms in <em>${esc(category)}</em></h2>
    <div class="related-grid">
      ${relatedLinks}
    </div>
  </section>` : ''}

  <div class="learn-cta">
    <p>
      <strong>See it in context</strong>
      Learn how ${esc(term)} fits into the bigger picture of how software actually works.
    </p>
    <a href="../learn-to-code-age-12.html">Read the Guide →</a>
  </div>
</main>

<footer>
  <p>Part of <a href="../index.html">code.hibot.space</a> — free, no sign-up, no tracking.</p>
  <p style="margin-top:6px">
    <a href="../glossary.html">All Terms</a> &nbsp;·&nbsp;
    <a href="../learn.html">Learn</a> &nbsp;·&nbsp;
    <a href="../get-started-coding.html">Get Started</a>
  </p>
</footer>
</body>
</html>`;
}

// Write files
const outDir = path.join(__dirname, 'glossary');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
  console.log('Created directory: glossary/');
}

let count = 0;
allTerms.forEach(term => {
  const html = generateTermPage(term);
  const outPath = path.join(outDir, `${term.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  count++;
  console.log(`  ✓ glossary/${term.slug}.html`);
});

console.log(`\nDone — generated ${count} term pages in glossary/`);
