# 🏗️ Architecture Souveraine CED HalalTech™

Ce document décrit l'architecture haute disponibilité de notre écosystème, hébergée 100% en Suisse chez Infomaniak.

## Vue d'ensemble (Schéma Conceptuel)

Le flux de données est conçu pour ne jamais quitter la souveraineté suisse (Genève), avec une vérification éthique synchrone à chaque étape critique.

```mermaid
graph TD
    User[Utilisateurs (41k+)] --> LB[Load Balancer Infomaniak]
    LB --> Front[Frontend React/Next.js - Cluster Kubernetes]
    Front --> API[API Gateway - Node.js]
    
    subgraph "Zone Souveraine (Genève)"
        API --> Auth[Service Auth & RBAC]
        API --> Core[Coeur Métier (Banque, Takaful, Academy)]
        API --> IA[Super IARP Pro (IA Éthique)]
        
        Core --> DB[(PostgreSQL Cluster - Répliqué)]
        Core --> Cache[(Redis - Session)]
        IA --> VectorDB[(Base Vectorielle - RAG)]
        
        Core --> Audit[Journal d'Audit Immutable (Fiqh)]
    end
    
    subgraph "Sécurité & Conformité"
        Audit --> Watchdog[Gardien Éthique Automatisé]
        Watchdog -->|Alerte Riba/Gharar| Admin[Équipe Conformité]
    end
    
    style User fill:#f9f,stroke:#333
    style LB fill:#27ae60,stroke:#333,color:#fff
    style Core fill:#2980b9,stroke:#333,color:#fff
    style Audit fill:#e67e22,stroke:#333,color:#fff
