from app.database import driver


def seed_database():
    with driver.session() as session:

        # Clear existing data so we don't end up with old relationships and nodes
        session.run("MATCH (n) DETACH DELETE n")

        # -----------------------------
        # Skills (~38 skills)
        # -----------------------------

        skills = [
            ("Python", "General-purpose programming language."),
            ("SQL", "Query language for databases."),
            ("Machine Learning", "Building models from data."),
            ("Statistics", "Data analysis and probability."),
            ("Pandas", "Data manipulation library."),
            ("Data Visualization", "Visualizing insights."),
            ("TensorFlow", "Deep learning framework."),
            ("FastAPI", "Python web framework."),
            ("Docker", "Containerization platform."),
            ("Kubernetes", "Container orchestration."),
            ("AWS", "Cloud computing services."),
            ("GCP", "Google cloud platform."),
            ("Azure", "Microsoft cloud platform."),
            ("React", "Frontend JavaScript library."),
            ("Node.js", "Backend JavaScript runtime."),
            ("TypeScript", "Typed JavaScript superset."),
            ("Next.js", "React framework."),
            ("Git", "Version control system."),
            ("CI/CD", "Continuous integration and delivery."),
            ("PyTorch", "Deep learning framework."),
            ("Apache Spark", "Big data processing framework."),
            ("Airflow", "Workflow automation tool."),
            ("Kafka", "Event streaming platform."),
            ("Snowflake", "Cloud data warehouse."),
            ("NoSQL", "Non-relational databases."),
            ("MongoDB", "Document database."),
            ("PostgreSQL", "Relational database."),
            ("GraphQL", "API query language."),
            ("REST APIs", "Web service architecture."),
            ("Linux", "Operating system."),
            ("Bash", "Shell scripting."),
            ("Cybersecurity", "Protecting systems and networks."),
            ("Penetration Testing", "Security testing."),
            ("Cryptography", "Secure communication techniques."),
            ("Golang", "Concurrent programming language."),
            ("Java", "Enterprise programming language."),
            ("Spring Boot", "Java framework."),
            ("System Design", "Designing scalable architectures.")
        ]

        for name, description in skills:
            session.run(
                """
                MERGE (s:Skill {name: $name})
                SET s.description = $description
                """,
                name=name,
                description=description,
            )

        # -----------------------------
        # Roles (12 roles)
        # -----------------------------

        roles = [
            ("Data Scientist", "Analyzes data and builds statistical and machine learning models."),
            ("Machine Learning Engineer", "Builds and deploys machine learning systems."),
            ("Data Analyst", "Uses data to generate business insights and reports."),
            ("Data Engineer", "Builds data pipelines and infrastructure."),
            ("Backend Engineer", "Builds APIs and server-side applications."),
            ("Frontend Engineer", "Builds user interfaces and client-side applications."),
            ("Full Stack Developer", "Builds both frontend and backend systems."),
            ("Cloud Engineer", "Designs and manages cloud infrastructure."),
            ("DevOps Engineer", "Manages infrastructure, CI/CD, and deployments."),
            ("Cybersecurity Analyst", "Protects systems from vulnerabilities and attacks."),
            ("AI Engineer", "Develops artificial intelligence solutions."),
            ("Business Intelligence Analyst", "Creates dashboards and data reports for business strategy.")
        ]

        for name, description in roles:
            session.run(
                """
                MERGE (r:Role {name: $name})
                SET r.description = $description
                """,
                name=name,
                description=description,
            )

        # -----------------------------
        # Companies (10 companies)
        # -----------------------------

        companies = [
            ("Google", "Multinational technology company focusing on search and AI."),
            ("Microsoft", "Technology and cloud computing company."),
            ("Amazon", "Technology and e-commerce company."),
            ("NVIDIA", "Computing and AI hardware company."),
            ("Stripe", "Financial infrastructure platform for the internet."),
            ("Netflix", "Streaming entertainment service."),
            ("Meta", "Social technology company."),
            ("OpenAI", "AI research and deployment company."),
            ("Databricks", "Unified data analytics platform."),
            ("Snowflake", "Cloud data platform company.")
        ]

        for name, description in companies:
            session.run(
                """
                MERGE (c:Company {name: $name})
                SET c.description = $description
                """,
                name=name,
                description=description,
            )

        # -----------------------------
        # Projects (10 projects)
        # -----------------------------

        projects = [
            ("Customer Churn Prediction", "Predict customers likely to leave a service."),
            ("Fraud Detection System", "Identify potentially fraudulent transactions."),
            ("Career Recommendation Engine", "Recommend career roles based on skills."),
            ("Sales Analytics Dashboard", "Analyze business sales performance."),
            ("Real-time Chat Application", "Scalable messaging platform."),
            ("E-commerce Storefront", "Online shopping platform."),
            ("CI/CD Pipeline Automation", "Automated code testing and deployment."),
            ("Data Lake Migration", "Migrating legacy data to cloud storage."),
            ("Generative AI Chatbot", "LLM-powered conversational agent."),
            ("Network Security Audit", "Comprehensive vulnerability assessment.")
        ]

        for name, description in projects:
            session.run(
                """
                MERGE (p:Project {name: $name})
                SET p.description = $description
                """,
                name=name,
                description=description,
            )

        # -----------------------------
        # Role → Skill relationships (REQUIRES, REQUIRED_FOR)
        # -----------------------------

        role_skills = {
            "Data Scientist": ["Python", "SQL", "Machine Learning", "Statistics", "Pandas", "Data Visualization"],
            "Machine Learning Engineer": ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Docker", "Git"],
            "Data Analyst": ["Python", "SQL", "Statistics", "Pandas", "Data Visualization"],
            "Data Engineer": ["Python", "SQL", "Apache Spark", "Airflow", "Kafka", "AWS"],
            "Backend Engineer": ["Python", "Golang", "Java", "SQL", "PostgreSQL", "REST APIs", "System Design"],
            "Frontend Engineer": ["React", "TypeScript", "Next.js", "Git", "REST APIs"],
            "Full Stack Developer": ["React", "TypeScript", "Node.js", "SQL", "PostgreSQL", "Docker"],
            "Cloud Engineer": ["AWS", "GCP", "Azure", "Linux", "Docker", "Kubernetes"],
            "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Bash", "Git"],
            "Cybersecurity Analyst": ["Linux", "Bash", "Cybersecurity", "Penetration Testing", "Cryptography"],
            "AI Engineer": ["Python", "Machine Learning", "PyTorch", "TensorFlow", "FastAPI", "Docker"],
            "Business Intelligence Analyst": ["SQL", "Data Visualization", "Statistics", "Pandas"]
        }

        for role, skills_list in role_skills.items():
            for skill in skills_list:
                session.run(
                    """
                    MATCH (r:Role {name: $role})
                    MATCH (s:Skill {name: $skill})
                    MERGE (r)-[:REQUIRES]->(s)
                    MERGE (s)-[:REQUIRED_FOR]->(r)
                    """,
                    role=role,
                    skill=skill,
                )

        # -----------------------------
        # Role → Company relationships (OFFERED_BY, HIRED_FOR)
        # -----------------------------

        role_companies = {
            "Data Scientist": ["Google", "Microsoft", "Meta", "Netflix"],
            "Machine Learning Engineer": ["Google", "NVIDIA", "OpenAI", "Meta"],
            "Data Analyst": ["Amazon", "Microsoft", "Netflix", "Stripe"],
            "Data Engineer": ["Databricks", "Snowflake", "Netflix", "Amazon"],
            "Backend Engineer": ["Stripe", "Amazon", "Google", "Netflix"],
            "Frontend Engineer": ["Meta", "Stripe", "Microsoft", "Amazon"],
            "Full Stack Developer": ["Stripe", "OpenAI", "Databricks"],
            "Cloud Engineer": ["AWS", "Google", "Microsoft", "Snowflake"],
            "DevOps Engineer": ["Netflix", "Amazon", "Databricks", "Stripe"],
            "Cybersecurity Analyst": ["Google", "Microsoft", "AWS"],
            "AI Engineer": ["OpenAI", "Google", "NVIDIA", "Meta"],
            "Business Intelligence Analyst": ["Amazon", "Microsoft", "Stripe"]
        }

        for role, companies_list in role_companies.items():
            for company in companies_list:
                session.run(
                    """
                    MATCH (r:Role {name: $role})
                    MATCH (c:Company {name: $company})
                    MERGE (r)-[:OFFERED_BY]->(c)
                    MERGE (c)-[:HIRED_FOR]->(r)
                    """,
                    role=role,
                    company=company,
                )

        # -----------------------------
        # Project → Skill relationships (USES_SKILL)
        # -----------------------------

        project_skills = {
            "Customer Churn Prediction": ["Python", "Pandas", "Machine Learning", "Statistics"],
            "Fraud Detection System": ["Python", "SQL", "Machine Learning", "Statistics", "Apache Spark"],
            "Career Recommendation Engine": ["Python", "Machine Learning", "FastAPI", "NoSQL"],
            "Sales Analytics Dashboard": ["SQL", "Pandas", "Data Visualization", "React"],
            "Real-time Chat Application": ["Node.js", "TypeScript", "React", "NoSQL", "Kafka"],
            "E-commerce Storefront": ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
            "CI/CD Pipeline Automation": ["Git", "Docker", "Kubernetes", "CI/CD", "AWS"],
            "Data Lake Migration": ["AWS", "Apache Spark", "SQL", "Python"],
            "Generative AI Chatbot": ["Python", "PyTorch", "FastAPI", "Docker", "React"],
            "Network Security Audit": ["Linux", "Bash", "Cybersecurity", "Penetration Testing"]
        }

        for project, skills_list in project_skills.items():
            for skill in skills_list:
                session.run(
                    """
                    MATCH (p:Project {name: $project})
                    MATCH (s:Skill {name: $skill})
                    MERGE (p)-[:USES_SKILL]->(s)
                    """,
                    project=project,
                    skill=skill,
                )

        # -----------------------------
        # Skill → Skill relationships (RELATED_TO)
        # -----------------------------

        related_skills = [
            ("Python", "Pandas"),
            ("Python", "Machine Learning"),
            ("Machine Learning", "Statistics"),
            ("SQL", "PostgreSQL"),
            ("Machine Learning", "TensorFlow"),
            ("Machine Learning", "PyTorch"),
            ("Python", "FastAPI"),
            ("Docker", "Kubernetes"),
            ("React", "Next.js"),
            ("React", "TypeScript"),
            ("Node.js", "TypeScript"),
            ("AWS", "GCP"),
            ("AWS", "Azure"),
            ("Apache Spark", "Kafka"),
            ("Cybersecurity", "Penetration Testing")
        ]

        for skill_a, skill_b in related_skills:
            session.run(
                """
                MATCH (a:Skill {name: $skill_a})
                MATCH (b:Skill {name: $skill_b})
                MERGE (a)-[:RELATED_TO]->(b)
                MERGE (b)-[:RELATED_TO]->(a)
                """,
                skill_a=skill_a,
                skill_b=skill_b,
            )

    print("SUCCESS: CareerGraph database seeded successfully with expanded dataset.")


if __name__ == "__main__":
    try:
        seed_database()
    except Exception as error:
        print("ERROR: Failed to seed CognoDB.")
        print(error)
    finally:
        driver.close()