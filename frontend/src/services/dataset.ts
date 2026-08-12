import { Skill, Role, Company, Project, GraphNode, GraphEdge } from '@/lib/types';

export const SKILLS_DATA: Skill[] = [
  { id: 'python', name: 'Python', category: 'Programming Languages', description: 'General-purpose language widely used in data science, ML, and backend development.', rolesCount: 7, relatedSkillsCount: 6, projectsCount: 6, companiesCount: 8 },
  { id: 'sql', name: 'SQL', category: 'Databases & Querying', description: 'Standard language for storing, manipulating, and retrieving data in databases.', rolesCount: 6, relatedSkillsCount: 4, projectsCount: 4, companiesCount: 9 },
  { id: 'machine-learning', name: 'Machine Learning', category: 'Artificial Intelligence', description: 'Algorithms and mathematical models that allow computers to learn from data.', rolesCount: 4, relatedSkillsCount: 5, projectsCount: 4, companiesCount: 7 },
  { id: 'statistics', name: 'Statistics', category: 'Mathematics & Analytics', description: 'Branch of mathematics dealing with data collection, analysis, and inference.', rolesCount: 3, relatedSkillsCount: 3, projectsCount: 3, companiesCount: 6 },
  { id: 'pandas', name: 'Pandas', category: 'Frameworks & Libraries', description: 'Python library for data manipulation and analysis.', rolesCount: 4, relatedSkillsCount: 2, projectsCount: 4, companiesCount: 6 },
  { id: 'data-visualization', name: 'Data Visualization', category: 'Analytics', description: 'Techniques for communicating data insights visually.', rolesCount: 3, relatedSkillsCount: 2, projectsCount: 3, companiesCount: 5 },
  { id: 'tensorflow', name: 'TensorFlow', category: 'Frameworks & Libraries', description: 'Open-source end-to-end platform for machine learning.', rolesCount: 2, relatedSkillsCount: 3, projectsCount: 2, companiesCount: 4 },
  { id: 'pytorch', name: 'PyTorch', category: 'Frameworks & Libraries', description: 'Flexible deep learning library preferred for AI research and production.', rolesCount: 3, relatedSkillsCount: 4, projectsCount: 3, companiesCount: 6 },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend Frameworks', description: 'Modern, fast web framework for building APIs with Python.', rolesCount: 4, relatedSkillsCount: 3, projectsCount: 3, companiesCount: 5 },
  { id: 'docker', name: 'Docker', category: 'DevOps & Containers', description: 'Containerization engine for isolating and deploying application workloads.', rolesCount: 6, relatedSkillsCount: 4, projectsCount: 5, companiesCount: 8 },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps & Containers', description: 'Container orchestration platform for automating deployment and scaling.', rolesCount: 4, relatedSkillsCount: 3, projectsCount: 3, companiesCount: 6 },
  { id: 'aws', name: 'AWS', category: 'Cloud Infrastructure', description: 'Comprehensive cloud platform offering compute, storage, and AI services.', rolesCount: 5, relatedSkillsCount: 4, projectsCount: 4, companiesCount: 8 },
  { id: 'gcp', name: 'GCP', category: 'Cloud Infrastructure', description: 'Google Cloud Platform suite for cloud computing and big data analytics.', rolesCount: 3, relatedSkillsCount: 3, projectsCount: 2, companiesCount: 5 },
  { id: 'azure', name: 'Azure', category: 'Cloud Infrastructure', description: 'Microsoft cloud platform for compute, storage, and AI services.', rolesCount: 2, relatedSkillsCount: 2, projectsCount: 1, companiesCount: 4 },
  { id: 'react', name: 'React', category: 'Frontend Development', description: 'JavaScript library for building modular, interactive web component interfaces.', rolesCount: 3, relatedSkillsCount: 3, projectsCount: 3, companiesCount: 6 },
  { id: 'nodejs', name: 'Node.js', category: 'Backend Development', description: 'Backend JavaScript runtime for scalable server-side applications.', rolesCount: 2, relatedSkillsCount: 2, projectsCount: 3, companiesCount: 5 },
  { id: 'typescript', name: 'TypeScript', category: 'Programming Languages', description: 'Typed superset of JavaScript that compiles to plain JavaScript.', rolesCount: 3, relatedSkillsCount: 3, projectsCount: 3, companiesCount: 7 },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend Development', description: 'React framework for production-grade web applications.', rolesCount: 2, relatedSkillsCount: 2, projectsCount: 2, companiesCount: 4 },
  { id: 'git', name: 'Git', category: 'DevOps & Tools', description: 'Distributed version control system for tracking code changes.', rolesCount: 3, relatedSkillsCount: 1, projectsCount: 2, companiesCount: 7 },
  { id: 'cicd', name: 'CI/CD', category: 'DevOps & Tools', description: 'Continuous integration and delivery for automated software delivery pipelines.', rolesCount: 2, relatedSkillsCount: 1, projectsCount: 2, companiesCount: 5 },
  { id: 'apache-spark', name: 'Apache Spark', category: 'Big Data', description: 'Distributed data processing framework for large-scale analytics.', rolesCount: 2, relatedSkillsCount: 2, projectsCount: 2, companiesCount: 4 },
  { id: 'airflow', name: 'Airflow', category: 'Big Data', description: 'Platform to programmatically author, schedule and monitor workflows.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 1, companiesCount: 3 },
  { id: 'kafka', name: 'Kafka', category: 'Big Data', description: 'Distributed event streaming platform for high-throughput data pipelines.', rolesCount: 2, relatedSkillsCount: 2, projectsCount: 2, companiesCount: 4 },
  { id: 'snowflake', name: 'Snowflake', category: 'Databases & Querying', description: 'Cloud-native data warehouse for scalable analytics.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 1, companiesCount: 2 },
  { id: 'nosql', name: 'NoSQL', category: 'Databases & Querying', description: 'Non-relational databases for flexible, scalable data storage.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 2, companiesCount: 3 },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases & Querying', description: 'Document-oriented NoSQL database for flexible schema data.', rolesCount: 0, relatedSkillsCount: 1, projectsCount: 1, companiesCount: 2 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases & Querying', description: 'Powerful open-source relational database management system.', rolesCount: 5, relatedSkillsCount: 3, projectsCount: 4, companiesCount: 7 },
  { id: 'graphql', name: 'GraphQL', category: 'Backend Development', description: 'Query language for APIs enabling precise data fetching.', rolesCount: 0, relatedSkillsCount: 1, projectsCount: 0, companiesCount: 1 },
  { id: 'rest-apis', name: 'REST APIs', category: 'Backend Development', description: 'Architectural style for building web service APIs over HTTP.', rolesCount: 2, relatedSkillsCount: 1, projectsCount: 2, companiesCount: 5 },
  { id: 'linux', name: 'Linux', category: 'Operating Systems', description: 'Open-source kernel and OS powering cloud infrastructure and security systems.', rolesCount: 5, relatedSkillsCount: 4, projectsCount: 4, companiesCount: 8 },
  { id: 'bash', name: 'Bash', category: 'Operating Systems', description: 'Unix shell and scripting language for automation and system administration.', rolesCount: 2, relatedSkillsCount: 1, projectsCount: 2, companiesCount: 4 },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Security & Compliance', description: 'Practices of protecting systems, networks, and programs from digital attacks.', rolesCount: 2, relatedSkillsCount: 3, projectsCount: 2, companiesCount: 4 },
  { id: 'penetration-testing', name: 'Penetration Testing', category: 'Security & Compliance', description: 'Authorized attack simulation to identify security vulnerabilities.', rolesCount: 1, relatedSkillsCount: 2, projectsCount: 1, companiesCount: 2 },
  { id: 'cryptography', name: 'Cryptography', category: 'Security & Compliance', description: 'Secure communication techniques using mathematical algorithms.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 0, companiesCount: 2 },
  { id: 'golang', name: 'Golang', category: 'Programming Languages', description: 'Compiled language known for concurrency and performance in backend systems.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 1, companiesCount: 3 },
  { id: 'java', name: 'Java', category: 'Programming Languages', description: 'Enterprise-grade programming language for large-scale backend systems.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 1, companiesCount: 4 },
  { id: 'spring-boot', name: 'Spring Boot', category: 'Backend Frameworks', description: 'Java framework for building production-ready web applications.', rolesCount: 0, relatedSkillsCount: 1, projectsCount: 0, companiesCount: 2 },
  { id: 'system-design', name: 'System Design', category: 'Architecture', description: 'Process of defining architecture, modules, interfaces, and data for systems.', rolesCount: 1, relatedSkillsCount: 1, projectsCount: 1, companiesCount: 4 },
];

export const ROLES_DATA: Role[] = [
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    department: 'Engineering / Machine Learning',
    description: 'Designs, builds, and deploys production machine learning models and infrastructure.',
    requiredSkills: ['python', 'machine-learning', 'pytorch', 'docker', 'sql', 'fastapi'],
    companies: ['nvidia', 'google', 'amazon', 'microsoft', 'ibm']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    department: 'Analytics / Machine Learning',
    description: 'Extracts actionable insights from complex structured and unstructured datasets using math & modeling.',
    requiredSkills: ['python', 'sql', 'statistics', 'machine-learning', 'power-bi'],
    companies: ['microsoft', 'google', 'deloitte', 'amazon', 'accenture']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    department: 'Business Intelligence',
    description: 'Transforms data into business intelligence through statistical querying, dashboarding, and trends.',
    requiredSkills: ['sql', 'power-bi', 'statistics', 'python'],
    companies: ['deloitte', 'accenture', 'microsoft', 'ibm', 'oracle']
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    department: 'AI & Research',
    description: 'Integrates foundation models, NLP systems, and generative AI capabilities into end-user products.',
    requiredSkills: ['python', 'pytorch', 'deep-learning', 'nlp', 'docker', 'fastapi'],
    companies: ['nvidia', 'google', 'microsoft', 'adobe']
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    department: 'Software Engineering',
    description: 'Architects robust server-side APIs, microservices, and database systems.',
    requiredSkills: ['python', 'fastapi', 'postgresql', 'docker', 'aws', 'linux'],
    companies: ['amazon', 'google', 'microsoft', 'oracle', 'ibm']
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Software Engineering',
    description: 'Crafts fast, modern, and accessible user interfaces and web applications.',
    requiredSkills: ['react', 'typescript', 'docker'],
    companies: ['adobe', 'google', 'microsoft', 'amazon']
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    department: 'Software Engineering',
    description: 'Builds complete end-to-end web applications across client interfaces and server infrastructure.',
    requiredSkills: ['react', 'typescript', 'python', 'fastapi', 'postgresql', 'docker'],
    companies: ['adobe', 'google', 'amazon', 'microsoft', 'oracle']
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    department: 'Security Operations',
    description: 'Protects enterprise networks, detects vulnerabilities, and defends against cyber threats.',
    requiredSkills: ['cybersecurity', 'linux', 'python', 'docker'],
    companies: ['ibm', 'deloitte', 'accenture', 'microsoft']
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    department: 'Infrastructure',
    description: 'Architects, provisions, and manages cloud infrastructure and automated deployment pipelines.',
    requiredSkills: ['aws', 'gcp', 'docker', 'kubernetes', 'linux'],
    companies: ['amazon', 'google', 'microsoft', 'oracle', 'ibm']
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    department: 'Operations',
    description: 'Automates deployment pipelines, container orchestration, and continuous system monitoring.',
    requiredSkills: ['docker', 'kubernetes', 'aws', 'linux', 'python'],
    companies: ['amazon', 'google', 'microsoft', 'oracle']
  }
];

export const COMPANIES_DATA: Company[] = [
  {
    id: 'nvidia',
    name: 'NVIDIA',
    industry: 'Hardware & AI Computing',
    description: 'Pioneer of GPU-accelerated computing and enterprise AI infrastructure.',
    openRoles: ['ml-engineer', 'ai-engineer'],
    techStack: ['Python', 'CUDA', 'C++', 'PyTorch', 'Deep Learning', 'Docker'],
    location: 'Santa Clara, CA'
  },
  {
    id: 'google',
    name: 'Google',
    industry: 'Cloud & AI Technology',
    description: 'Global technology leader in search, cloud platforms, and advanced AI research.',
    openRoles: ['ml-engineer', 'ai-engineer', 'backend-developer', 'cloud-engineer', 'data-scientist'],
    techStack: ['Python', 'TensorFlow', 'GCP', 'Kubernetes', 'C++', 'Go'],
    location: 'Mountain View, CA'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    industry: 'Enterprise Software & Cloud',
    description: 'World-leading developer of Azure, operating systems, and developer tools.',
    openRoles: ['data-scientist', 'ai-engineer', 'full-stack-developer', 'cybersecurity-analyst'],
    techStack: ['Azure', 'TypeScript', 'C#', 'Python', 'Power BI', 'SQL'],
    location: 'Redmond, WA'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    industry: 'E-Commerce & Cloud Infrastructure',
    description: 'Pioneer of AWS cloud services, automated logistics, and large-scale AI.',
    openRoles: ['cloud-engineer', 'devops-engineer', 'backend-developer', 'ml-engineer'],
    techStack: ['AWS', 'Java', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL'],
    location: 'Seattle, WA'
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    industry: 'Technology Consulting',
    description: 'Global provider of enterprise technology transformation and analytics advisory.',
    openRoles: ['data-analyst', 'data-scientist', 'cybersecurity-analyst'],
    techStack: ['SQL', 'Power BI', 'Python', 'Statistics', 'AWS'],
    location: 'New York, NY'
  },
  {
    id: 'ibm',
    name: 'IBM',
    industry: 'Hybrid Cloud & Enterprise Systems',
    description: 'Enterprise innovator in quantum computing, hybrid cloud, and AI governance.',
    openRoles: ['ml-engineer', 'cybersecurity-analyst', 'backend-developer'],
    techStack: ['Linux', 'Python', 'Docker', 'Kubernetes', 'Cybersecurity'],
    location: 'Armonk, NY'
  },
  {
    id: 'accenture',
    name: 'Accenture',
    industry: 'IT Services & Consulting',
    description: 'Global professional services enterprise delivering digital transformation solutions.',
    openRoles: ['data-analyst', 'data-scientist', 'cybersecurity-analyst'],
    techStack: ['SQL', 'Python', 'Power BI', 'Statistics', 'Cloud'],
    location: 'Chicago, IL'
  },
  {
    id: 'adobe',
    name: 'Adobe',
    industry: 'Creative Software & Cloud',
    description: 'Leader in digital media, document solutions, and creative design tools.',
    openRoles: ['frontend-developer', 'full-stack-developer', 'ai-engineer'],
    techStack: ['React', 'TypeScript', 'C++', 'Python', 'AWS'],
    location: 'San Jose, CA'
  },
  {
    id: 'oracle',
    name: 'Oracle',
    industry: 'Enterprise Database & Cloud',
    description: 'Pioneer of enterprise relational databases and Autonomous Cloud Infrastructure.',
    openRoles: ['backend-developer', 'cloud-engineer', 'devops-engineer', 'data-analyst'],
    techStack: ['SQL', 'PostgreSQL', 'Java', 'Docker', 'Linux', 'OCI'],
    location: 'Austin, TX'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'fraud-detection-system',
    title: 'Fraud Detection System',
    domain: 'FinTech / Machine Learning',
    description: 'Real-time financial transaction risk classifier using supervised anomaly detection.',
    skillsUsed: ['python', 'machine-learning', 'sql', 'fastapi', 'docker'],
    complexity: 'Advanced'
  },
  {
    id: 'recommendation-engine',
    title: 'Recommendation Engine',
    domain: 'E-Commerce AI',
    description: 'Collaborative filtering and embeddings-based product recommendation pipeline.',
    skillsUsed: ['python', 'pytorch', 'machine-learning', 'postgresql'],
    complexity: 'Advanced'
  },
  {
    id: 'computer-vision-pipeline',
    title: 'Computer Vision Pipeline',
    domain: 'Automated Inspection',
    description: 'Object detection and image segmentation system trained on custom visual datasets.',
    skillsUsed: ['python', 'computer-vision', 'pytorch', 'deep-learning', 'docker'],
    complexity: 'Advanced'
  },
  {
    id: 'customer-churn-predictor',
    title: 'Customer Churn Predictor',
    domain: 'Business Analytics',
    description: 'Predictive customer retention model integrated with interactive analytics dashboards.',
    skillsUsed: ['python', 'sql', 'statistics', 'power-bi'],
    complexity: 'Intermediate'
  },
  {
    id: 'cyber-threat-detector',
    title: 'Cyber Threat Detector',
    domain: 'Security Operations',
    description: 'Automated log analyzer and anomaly scanner for network intrusion prevention.',
    skillsUsed: ['cybersecurity', 'linux', 'python', 'docker'],
    complexity: 'Advanced'
  },
  {
    id: 'nlp-assistant',
    title: 'NLP Assistant',
    domain: 'Generative AI',
    description: 'RAG (Retrieval-Augmented Generation) pipeline for domain-specific query answering.',
    skillsUsed: ['python', 'nlp', 'pytorch', 'fastapi', 'docker'],
    complexity: 'Intermediate'
  },
  {
    id: 'sales-analytics-dashboard',
    title: 'Sales Analytics Dashboard',
    domain: 'Business Intelligence',
    description: 'Executive reporting interface tracking multi-region revenue metrics and KPIs.',
    skillsUsed: ['sql', 'power-bi', 'statistics'],
    complexity: 'Beginner'
  },
  {
    id: 'cloud-infrastructure-automation',
    title: 'Cloud Infra Automation',
    domain: 'DevOps & Cloud',
    description: 'Infrastructure-as-Code scripts provisioning scalable microservices on AWS/K8s.',
    skillsUsed: ['aws', 'docker', 'kubernetes', 'linux'],
    complexity: 'Intermediate'
  }
];

// Convert datasets into raw Graph Nodes
export const GRAPH_NODES: GraphNode[] = [
  ...SKILLS_DATA.map(s => ({
    id: s.id,
    label: s.name,
    type: 'Skill' as const,
    category: s.category,
    description: s.description,
    metadata: { rolesCount: s.rolesCount, relatedSkillsCount: s.relatedSkillsCount }
  })),
  ...ROLES_DATA.map(r => ({
    id: r.id,
    label: r.title,
    type: 'Role' as const,
    category: r.department,
    description: r.description,
    metadata: { companiesCount: r.companies.length, requiredSkillsCount: r.requiredSkills.length }
  })),
  ...COMPANIES_DATA.map(c => ({
    id: c.id,
    label: c.name,
    type: 'Company' as const,
    category: c.industry,
    description: c.description,
    metadata: { openRolesCount: c.openRoles.length, location: c.location }
  })),
  ...PROJECTS_DATA.map(p => ({
    id: p.id,
    label: p.title,
    type: 'Project' as const,
    category: p.domain,
    description: p.description,
    metadata: { complexity: p.complexity }
  }))
];

// Build relationships (Graph Edges)
export const GRAPH_EDGES: GraphEdge[] = [
  // 1. RELATED_TO (Skill <-> Skill)
  { id: 'e-py-ml', source: 'python', target: 'machine-learning', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-ml-dl', source: 'machine-learning', target: 'deep-learning', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-dl-pytorch', source: 'deep-learning', target: 'pytorch', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-dl-tf', source: 'deep-learning', target: 'tensorflow', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-py-fastapi', source: 'python', target: 'fastapi', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-py-sql', source: 'python', target: 'sql', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-sql-postgres', source: 'sql', target: 'postgresql', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-docker-k8s', source: 'docker', target: 'kubernetes', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-docker-aws', source: 'docker', target: 'aws', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-aws-gcp', source: 'aws', target: 'gcp', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-react-ts', source: 'react', target: 'typescript', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-sec-linux', source: 'cybersecurity', target: 'linux', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-ml-nlp', source: 'machine-learning', target: 'nlp', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-ml-cv', source: 'machine-learning', target: 'computer-vision', type: 'RELATED_TO', label: 'RELATED_TO' },
  { id: 'e-stats-sql', source: 'statistics', target: 'sql', type: 'RELATED_TO', label: 'RELATED_TO' },

  // 2. REQUIRES (Role -> Skill)
  { id: 'e-mleng-py', source: 'ml-engineer', target: 'python', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-mleng-ml', source: 'ml-engineer', target: 'machine-learning', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-mleng-pt', source: 'ml-engineer', target: 'pytorch', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-mleng-doc', source: 'ml-engineer', target: 'docker', type: 'REQUIRES', label: 'REQUIRES' },

  { id: 'e-ds-py', source: 'data-scientist', target: 'python', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-ds-sql', source: 'data-scientist', target: 'sql', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-ds-stat', source: 'data-scientist', target: 'statistics', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-ds-ml', source: 'data-scientist', target: 'machine-learning', type: 'REQUIRES', label: 'REQUIRES' },

  { id: 'e-ai-py', source: 'ai-engineer', target: 'python', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-ai-dl', source: 'ai-engineer', target: 'deep-learning', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-ai-nlp', source: 'ai-engineer', target: 'nlp', type: 'REQUIRES', label: 'REQUIRES' },

  { id: 'e-be-py', source: 'backend-developer', target: 'python', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-be-fastapi', source: 'backend-developer', target: 'fastapi', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-be-pg', source: 'backend-developer', target: 'postgresql', type: 'REQUIRES', label: 'REQUIRES' },

  { id: 'e-fe-react', source: 'frontend-developer', target: 'react', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-fe-ts', source: 'frontend-developer', target: 'typescript', type: 'REQUIRES', label: 'REQUIRES' },

  { id: 'e-sec-sec', source: 'cybersecurity-analyst', target: 'cybersecurity', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-sec-lin', source: 'cybersecurity-analyst', target: 'linux', type: 'REQUIRES', label: 'REQUIRES' },

  { id: 'e-cloud-aws', source: 'cloud-engineer', target: 'aws', type: 'REQUIRES', label: 'REQUIRES' },
  { id: 'e-cloud-k8s', source: 'cloud-engineer', target: 'kubernetes', type: 'REQUIRES', label: 'REQUIRES' },

  // 3. OFFERS (Company -> Role)
  { id: 'e-nv-mleng', source: 'nvidia', target: 'ml-engineer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-nv-aieng', source: 'nvidia', target: 'ai-engineer', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-goog-mleng', source: 'google', target: 'ml-engineer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-goog-aieng', source: 'google', target: 'ai-engineer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-goog-be', source: 'google', target: 'backend-developer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-goog-cloud', source: 'google', target: 'cloud-engineer', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-msft-ds', source: 'microsoft', target: 'data-scientist', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-msft-aieng', source: 'microsoft', target: 'ai-engineer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-msft-fs', source: 'microsoft', target: 'full-stack-developer', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-amzn-cloud', source: 'amazon', target: 'cloud-engineer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-amzn-devops', source: 'amazon', target: 'devops-engineer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-amzn-mleng', source: 'amazon', target: 'ml-engineer', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-del-da', source: 'deloitte', target: 'data-analyst', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-del-ds', source: 'deloitte', target: 'data-scientist', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-ibm-sec', source: 'ibm', target: 'cybersecurity-analyst', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-ibm-mleng', source: 'ibm', target: 'ml-engineer', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-adb-fe', source: 'adobe', target: 'frontend-developer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-adb-fs', source: 'adobe', target: 'full-stack-developer', type: 'OFFERS', label: 'OFFERS' },

  { id: 'e-orc-be', source: 'oracle', target: 'backend-developer', type: 'OFFERS', label: 'OFFERS' },
  { id: 'e-orc-cloud', source: 'oracle', target: 'cloud-engineer', type: 'OFFERS', label: 'OFFERS' },

  // 4. USES (Project -> Skill)
  { id: 'e-proj-fraud-py', source: 'fraud-detection-system', target: 'python', type: 'USES', label: 'USES' },
  { id: 'e-proj-fraud-ml', source: 'fraud-detection-system', target: 'machine-learning', type: 'USES', label: 'USES' },
  { id: 'e-proj-rec-pt', source: 'recommendation-engine', target: 'pytorch', type: 'USES', label: 'USES' },
  { id: 'e-proj-cv-cv', source: 'computer-vision-pipeline', target: 'computer-vision', type: 'USES', label: 'USES' },
  { id: 'e-proj-threat-sec', source: 'cyber-threat-detector', target: 'cybersecurity', type: 'USES', label: 'USES' },
  { id: 'e-proj-nlp-nlp', source: 'nlp-assistant', target: 'nlp', type: 'USES', label: 'USES' },
  { id: 'e-proj-dash-bi', source: 'sales-analytics-dashboard', target: 'power-bi', type: 'USES', label: 'USES' }
];
