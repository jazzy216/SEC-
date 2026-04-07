export const DOMAINS = [
  {
    id: 'domain1',
    code: '1.0',
    title: 'General Security Concepts',
    weight: '12%',
    color: '#00d4ff',
    topics: ['CIA Triad', 'AAA Framework', 'Zero Trust', 'Cryptography Basics', 'Authentication Types'],
  },
  {
    id: 'domain2',
    code: '2.0',
    title: 'Threats, Vulnerabilities & Mitigations',
    weight: '22%',
    color: '#ff3355',
    topics: ['Malware Types', 'Social Engineering', 'Application Attacks', 'Network Attacks', 'Vulnerability Scanning'],
  },
  {
    id: 'domain3',
    code: '3.0',
    title: 'Security Architecture',
    weight: '18%',
    color: '#a855f7',
    topics: ['Cloud Security', 'Network Design', 'Secure Infrastructure', 'Data Protection', 'Resilience & Recovery'],
  },
  {
    id: 'domain4',
    code: '4.0',
    title: 'Security Operations',
    weight: '28%',
    color: '#00ff88',
    topics: ['Incident Response', 'Identity & Access Management', 'Automation', 'Vulnerability Management', 'Alert Monitoring'],
  },
  {
    id: 'domain5',
    code: '5.0',
    title: 'Security Program Management & Oversight',
    weight: '20%',
    color: '#ffaa00',
    topics: ['Governance', 'Risk Management', 'Compliance', 'Data Privacy', 'Audits & Assessments'],
  },
];

export const FLASHCARDS = [
  // Domain 1
  { id: 'f1', domain: 'domain1', term: 'CIA Triad', definition: 'The three core principles of information security: Confidentiality (preventing unauthorized disclosure), Integrity (ensuring data is unaltered), and Availability (ensuring data is accessible when needed).' },
  { id: 'f2', domain: 'domain1', term: 'Zero Trust', definition: 'A security model based on "never trust, always verify." No implicit trust is granted based on network location — every access request must be authenticated and authorized.' },
  { id: 'f3', domain: 'domain1', term: 'MFA', definition: 'Multi-Factor Authentication. Requires 2 or more verification factors: Something you know (password), Something you have (smart card/token), Something you are (biometrics).' },
  { id: 'f4', domain: 'domain1', term: 'AAA Framework', definition: 'Authentication (who are you?), Authorization (what can you do?), and Accounting (what did you do?). Core framework for access control and auditing.' },
  { id: 'f5', domain: 'domain1', term: 'Least Privilege', definition: 'Users and systems should only have the minimum level of access rights needed to perform their job functions. Limits blast radius if credentials are compromised.' },
  { id: 'f6', domain: 'domain1', term: 'Hashing', definition: 'A one-way cryptographic function that converts data into a fixed-length digest. Used to verify integrity. Common algorithms: SHA-256, MD5 (legacy). Cannot be reversed.' },

  // Domain 2
  { id: 'f7', domain: 'domain2', term: 'Phishing', definition: 'Social engineering attack using deceptive emails to trick users into revealing credentials or clicking malicious links. Spear phishing targets specific individuals.' },
  { id: 'f8', domain: 'domain2', term: 'Ransomware', definition: 'Malware that encrypts victim\'s files and demands payment for the decryption key. Defense: backups, patching, email filtering, user training.' },
  { id: 'f9', domain: 'domain2', term: 'SQL Injection', definition: 'Attacker inserts malicious SQL code into an input field to manipulate a database. Defense: parameterized queries, input validation, WAF.' },
  { id: 'f10', domain: 'domain2', term: 'DDoS', definition: 'Distributed Denial of Service. Overwhelming a target with traffic from many sources to make it unavailable. Defense: rate limiting, CDN, traffic scrubbing.' },
  { id: 'f11', domain: 'domain2', term: 'Man-in-the-Middle', definition: 'Attacker secretly intercepts and potentially alters communication between two parties. Defense: TLS/HTTPS, certificate pinning, VPNs.' },
  { id: 'f12', domain: 'domain2', term: 'Social Engineering', definition: 'Psychological manipulation of people into performing actions or divulging information. Relies on human trust rather than technical exploits. Types: phishing, pretexting, baiting, vishing.' },

  // Domain 3
  { id: 'f13', domain: 'domain3', term: 'Defense in Depth', definition: 'Layered security approach where multiple security controls are placed throughout an IT system. If one layer fails, others still provide protection.' },
  { id: 'f14', domain: 'domain3', term: 'DMZ', definition: 'Demilitarized Zone. A network segment that sits between the public internet and the internal network. Hosts public-facing services (web servers) while protecting internal resources.' },
  { id: 'f15', domain: 'domain3', term: 'VLAN', definition: 'Virtual Local Area Network. Logically segments a physical network into separate broadcast domains. Used to isolate traffic and improve security (e.g., separating clinical devices from guest Wi-Fi).' },
  { id: 'f16', domain: 'domain3', term: 'IDS vs IPS', definition: 'IDS (Intrusion Detection System) monitors and alerts on suspicious activity. IPS (Intrusion Prevention System) actively blocks threats. IPS is inline; IDS is passive.' },

  // Domain 4
  { id: 'f17', domain: 'domain4', term: 'SIEM', definition: 'Security Information and Event Management. Aggregates and correlates log data from across the network to detect anomalies and potential security incidents in real time.' },
  { id: 'f18', domain: 'domain4', term: 'Incident Response Phases', definition: 'Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. (PICERL). Know the order for the exam.' },
  { id: 'f19', domain: 'domain4', term: 'RBAC', definition: 'Role-Based Access Control. Access permissions are assigned to roles, not individuals. Users inherit permissions based on their assigned role. Simplifies access management at scale.' },
  { id: 'f20', domain: 'domain4', term: 'Chain of Custody', definition: 'Documentation that tracks the handling of evidence from collection through trial. Critical in digital forensics to ensure evidence admissibility and integrity.' },

  // Domain 5
  { id: 'f21', domain: 'domain5', term: 'Risk = Threat × Vulnerability × Impact', definition: 'The fundamental risk formula. Risk is reduced by lowering threat likelihood, patching vulnerabilities, or reducing impact through controls and insurance.' },
  { id: 'f22', domain: 'domain5', term: 'BIA', definition: 'Business Impact Analysis. Identifies critical business functions and the impact of disrupting them. Determines Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).' },
  { id: 'f23', domain: 'domain5', term: 'GDPR', definition: 'General Data Protection Regulation. EU regulation governing data privacy and protection. Requires explicit consent, data minimization, breach notification within 72 hours.' },
  { id: 'f24', domain: 'domain5', term: 'Pen Testing vs Vulnerability Scanning', definition: 'Vulnerability scanning is automated and identifies known weaknesses. Penetration testing is manual/active and attempts to exploit vulnerabilities to prove impact.' },
];

export const QUIZ_QUESTIONS = [
  {
    id: 'q1', domain: 'domain1',
    question: "Which component of the CIA Triad is MOST concerned with ensuring that data has not been altered by unauthorized parties?",
    options: ["Confidentiality", "Availability", "Integrity", "Authentication"],
    answer: 2,
    explanation: "Integrity ensures data is accurate and unchanged. Hashing (SHA-256) is the primary tool — it creates a fingerprint of data so any modification is detectable.",
    topic: "CIA Triad"
  },
  {
    id: 'q2', domain: 'domain1',
    question: "A security team requires users to provide a password AND scan their fingerprint to log in. Which security concept does this BEST represent?",
    options: ["Single Sign-On (SSO)", "Multi-Factor Authentication (MFA)", "Role-Based Access Control", "Least Privilege"],
    answer: 1,
    explanation: "MFA requires two or more factors from different categories: something you know (password) + something you are (fingerprint biometric). Using two passwords would NOT be MFA.",
    topic: "Authentication"
  },
  {
    id: 'q3', domain: 'domain2',
    question: "A user receives an email appearing to be from their CEO asking them to urgently wire money to a new vendor. What attack type is this?",
    options: ["Vishing", "Business Email Compromise (BEC) / Spear Phishing", "Ransomware", "SQL Injection"],
    answer: 1,
    explanation: "This is Business Email Compromise (BEC), a targeted spear phishing attack impersonating an executive. The urgency and financial request are classic BEC indicators.",
    topic: "Social Engineering"
  },
  {
    id: 'q4', domain: 'domain2',
    question: "Which of the following BEST defends against SQL Injection attacks?",
    options: ["Firewalls", "Parameterized queries and input validation", "Antivirus software", "VPN"],
    answer: 1,
    explanation: "SQL Injection exploits unsanitized user input. Parameterized queries (prepared statements) separate SQL code from data, preventing injection. Firewalls and antivirus don't address application-layer code flaws.",
    topic: "Application Attacks"
  },
  {
    id: 'q5', domain: 'domain3',
    question: "A hospital segments its clinical device network from its guest Wi-Fi network. Which technology is MOST likely being used?",
    options: ["VPN", "VLAN", "DMZ", "NAT"],
    answer: 1,
    explanation: "VLANs (Virtual LANs) logically segment networks on the same physical infrastructure. This is standard practice in healthcare IT to isolate clinical devices from general traffic — exactly what you see at Vanderbilt.",
    topic: "Network Design"
  },
  {
    id: 'q6', domain: 'domain4',
    question: "During an incident, the security team isolates an infected workstation from the network to prevent further spread. Which incident response phase is this?",
    options: ["Identification", "Eradication", "Containment", "Recovery"],
    answer: 2,
    explanation: "Containment limits the damage and prevents spread. Isolating (quarantining) the infected host is the hallmark containment action. Eradication comes later — actually removing the malware.",
    topic: "Incident Response"
  },
  {
    id: 'q7', domain: 'domain4',
    question: "Which tool aggregates log data from firewalls, endpoints, and servers to detect security anomalies in real time?",
    options: ["IDS", "SIEM", "WAF", "DLP"],
    answer: 1,
    explanation: "SIEM (Security Information and Event Management) collects and correlates logs from multiple sources. It's the central nervous system of a SOC — tools like Splunk, Microsoft Sentinel, and Security Onion are SIEMs.",
    topic: "Security Monitoring"
  },
  {
    id: 'q8', domain: 'domain5',
    question: "A company determines that the cost of implementing a control ($50,000/year) exceeds the value of the asset being protected ($20,000). What should they do?",
    options: ["Implement the control anyway", "Accept the risk", "Transfer the risk via insurance", "Avoid the risk by eliminating the asset"],
    answer: 1,
    explanation: "When control cost exceeds asset value, risk acceptance is rational. The four risk responses are: Accept, Avoid, Transfer, Mitigate. This is a cost-benefit analysis — a core GRC concept.",
    topic: "Risk Management"
  },
];
