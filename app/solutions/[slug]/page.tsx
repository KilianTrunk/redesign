import Link from "next/link";
import { notFound } from "next/navigation";
import { SolutionContent } from "./solution-content";

// Solution data mapping
const SOLUTION_DATA: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image?: string;
  features?: string[];
}> = {
  "dcam-assessment": {
    title: "DCAM® Assessment",
    description: "Data Culture & Analytics Maturity assessment framework",
    longDescription: "Our DCAM® Assessment provides a comprehensive evaluation of your organization's data culture and analytics maturity. We assess current capabilities, identify gaps, and provide actionable recommendations to accelerate your data-driven transformation.",
    category: "Assess & Benchmark",
    features: [
      "Comprehensive maturity assessment",
      "Gap analysis and prioritization",
      "Actionable improvement roadmap",
      "Benchmarking against industry standards",
      "Executive summary and detailed reports"
    ]
  },
  "cdmc-assessment": {
    title: "CDMC Assessment",
    description: "Chief Data & Analytics Officer capability assessment",
    longDescription: "Evaluate and strengthen your CDO/CAO capabilities with our comprehensive assessment framework. We help you understand your current state and develop a clear path to becoming a high-impact data leader.",
    category: "Assess & Benchmark",
    features: [
      "CDO/CAO capability evaluation",
      "Leadership assessment framework",
      "Career development planning",
      "Stakeholder alignment analysis",
      "Success metrics definition"
    ]
  },
  "dama-assessment": {
    title: "DAMA® Assessment",
    description: "Data Management Association standards assessment",
    longDescription: "Align your data management practices with industry standards using our DAMA®-based assessment. We evaluate your data governance, quality, and management capabilities against globally recognized frameworks.",
    category: "Assess & Benchmark",
    features: [
      "DAMA-DMBOK alignment assessment",
      "Data governance evaluation",
      "Data quality framework review",
      "Compliance and risk assessment",
      "Standards-based recommendations"
    ]
  },
  "data-ai-strategy": {
    title: "Data & AI Strategy",
    description: "Strategic planning for data and AI initiatives",
    longDescription: "Develop a comprehensive data and AI strategy that aligns with your business objectives. We help you create a roadmap that delivers measurable value while managing risks and ensuring adoption.",
    category: "Strategy & Operating Model",
    features: [
      "Business-aligned strategy development",
      "ROI-focused roadmap creation",
      "Risk and compliance framework",
      "Change management planning",
      "Success metrics and KPIs"
    ]
  },
  "data-ai-operating-model": {
    title: "Data & AI Operating Model",
    description: "Design and implement effective operating structures",
    longDescription: "Build an operating model that supports sustainable data and AI capabilities. We design organizational structures, processes, and governance frameworks that scale with your needs.",
    category: "Strategy & Operating Model",
    features: [
      "Organizational design and structure",
      "Process and workflow optimization",
      "Governance framework development",
      "Roles and responsibilities definition",
      "Performance management systems"
    ]
  },
  "data-ai-governance": {
    title: "Data & AI Governance",
    description: "Establish robust governance frameworks",
    longDescription: "Implement comprehensive data and AI governance that balances innovation with control. Our framework ensures compliance, manages risk, and enables responsible use of data and AI technologies.",
    category: "Strategy & Operating Model",
    features: [
      "Data governance framework",
      "AI ethics and responsible AI policies",
      "Compliance and regulatory alignment",
      "Risk management strategies",
      "Audit and monitoring capabilities"
    ]
  },
  "ortecha-trust": {
    title: "Ortecha Trust",
    description: "Building trust in data and AI systems",
    longDescription: "Trust is the foundation of successful data and AI initiatives. Our Ortecha Trust framework helps organizations build confidence in their data assets and AI systems through transparency, reliability, and ethical practices.",
    category: "Strategy & Operating Model",
    features: [
      "Trust framework development",
      "Data quality and reliability assessment",
      "Ethical AI implementation",
      "Transparency and explainability",
      "Stakeholder confidence building"
    ]
  },
  "enterprise-architecture": {
    title: "Enterprise Architecture",
    description: "Design scalable data and AI architectures",
    longDescription: "Create a future-ready enterprise architecture that supports your data and AI ambitions. We design technical foundations that are scalable, secure, and aligned with your business strategy.",
    category: "Enterprise Architecture & Tooling",
    features: [
      "Architecture assessment and design",
      "Technology stack optimization",
      "Integration and interoperability",
      "Scalability and performance planning",
      "Migration and modernization strategies"
    ]
  },
  "zero-trust-data-entitlements": {
    title: "Zero Trust Data Entitlements",
    description: "Implement zero trust security for data access",
    longDescription: "Secure your data assets with a zero trust approach to entitlements and access control. We implement fine-grained access controls that protect sensitive data while enabling appropriate use.",
    category: "Enterprise Architecture & Tooling",
    features: [
      "Zero trust security implementation",
      "Fine-grained access controls",
      "Data entitlement management",
      "Security policy frameworks",
      "Compliance and audit capabilities"
    ]
  },
  "data-tooling": {
    title: "Data Tooling",
    description: "Select and implement the right data tools",
    longDescription: "Navigate the complex data tooling landscape with confidence. We help you select, implement, and integrate the right combination of tools that meet your specific needs and budget.",
    category: "Enterprise Architecture & Tooling",
    features: [
      "Tool selection and evaluation",
      "Implementation planning and execution",
      "Integration and interoperability",
      "Vendor management and support",
      "Cost optimization strategies"
    ]
  },
  "data-lineage": {
    title: "Data Lineage",
    description: "Track and understand data flows and transformations",
    longDescription: "Establish comprehensive data lineage capabilities to track data from source to consumption. Understand dependencies, transformations, and impacts to ensure data quality and compliance.",
    category: "Enterprise Architecture & Tooling",
    features: [
      "Data lineage mapping and documentation",
      "Impact analysis capabilities",
      "Data quality monitoring",
      "Compliance and audit trails",
      "Change management support"
    ]
  },
  "metadata-management": {
    title: "Metadata Management",
    description: "Centralized metadata management and governance",
    longDescription: "Implement robust metadata management to improve data discoverability, understanding, and governance. Create a single source of truth for all your data assets and their relationships.",
    category: "Enterprise Architecture & Tooling",
    features: [
      "Metadata repository implementation",
      "Data catalog and discovery",
      "Business glossary development",
      "Metadata quality and governance",
      "Integration with existing systems"
    ]
  },
  "data-literacy-culture": {
    title: "Data Literacy & Culture",
    description: "Build data-literate organizations and cultures",
    longDescription: "Transform your organization into a data-literate culture where everyone can effectively use data to make decisions. We combine training, processes, and cultural change to embed data-driven thinking.",
    category: "Literacy & Culture",
    features: [
      "Data literacy assessment and strategy",
      "Cultural change programs",
      "Leadership alignment and engagement",
      "Data-driven decision making frameworks",
      "Measurement and continuous improvement"
    ]
  },
  "data-culture-assessment": {
    title: "Data Culture Assessment",
    description: "Evaluate and improve data culture maturity",
    longDescription: "Measure your current data culture maturity and identify opportunities for improvement. Our assessment provides actionable insights to accelerate your journey toward becoming a truly data-driven organization.",
    category: "Literacy & Culture",
    features: [
      "Culture maturity assessment",
      "Leadership and employee surveys",
      "Behavioral analysis and insights",
      "Improvement roadmap development",
      "Change management recommendations"
    ]
  },
  "data-ai-literacy-scan": {
    title: "Data & AI Literacy Scan",
    description: "Comprehensive literacy assessment and development",
    longDescription: "Conduct a thorough assessment of data and AI literacy across your organization. Identify skill gaps, develop targeted training programs, and track progress toward literacy goals.",
    category: "Literacy & Culture",
    features: [
      "Comprehensive literacy assessment",
      "Skill gap analysis",
      "Personalized development plans",
      "Training program design",
      "Progress tracking and measurement"
    ]
  },
  "data-ai-training": {
    title: "Data & AI Training",
    description: "Comprehensive training programs for data and AI skills",
    longDescription: "Equip your teams with the skills they need to succeed in a data-driven world. Our training programs combine technical skills, business acumen, and practical application to deliver real value.",
    category: "Training & Adoption",
    features: [
      "Technical skills development",
      "Business application training",
      "Leadership and management training",
      "Hands-on workshops and exercises",
      "Certification preparation"
    ]
  },
  "dcam-training": {
    title: "DCAM® Training",
    description: "Data Culture & Analytics Maturity training",
    longDescription: "Master the DCAM® framework with our comprehensive training program. Learn to assess, develop, and implement data culture and analytics capabilities that drive organizational success.",
    category: "Training & Adoption",
    features: [
      "DCAM® framework mastery",
      "Assessment methodology training",
      "Implementation strategies",
      "Case studies and best practices",
      "Certification preparation"
    ]
  },
  "cdmc-training": {
    title: "CDMC Training",
    description: "Chief Data & Analytics Officer development",
    longDescription: "Develop the skills and capabilities needed to be an effective Chief Data & Analytics Officer. Our program combines leadership development, technical knowledge, and strategic thinking.",
    category: "Training & Adoption",
    features: [
      "CDO/CAO skill development",
      "Leadership and influence training",
      "Strategic planning capabilities",
      "Stakeholder management skills",
      "Executive communication training"
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = SOLUTION_DATA[slug];

  if (!solution) {
    notFound();
  }

  return <SolutionContent solution={solution} />;
}

// Generate static params for all solutions
export async function generateStaticParams() {
  return Object.keys(SOLUTION_DATA).map((slug) => ({
    slug,
  }));
}
