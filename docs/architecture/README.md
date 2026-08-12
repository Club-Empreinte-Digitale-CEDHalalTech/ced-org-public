# 🏗️ Architecture Souveraine CED HalalTech™

Ce document décrit l'architecture haute disponibilité de notre écosystème, hébergée 100% en Suisse chez Infomaniak.

## Vue d'ensemble (Schéma Conceptuel)

Le flux de données est conçu pour ne jamais quitter la souveraineté suisse (Genève), avec une vérification éthique synchrone à chaque étape critique.

```mermaid
graph TD
    User[Utilisateurs 41k+] --> LB[Load Balancer Infomaniak]
    LB --> Front[Frontend React Next.js Cluster Kubernetes]
    Front --> API[API Gateway Node.js]
    
    subgraph "Zone Souveraine Geneve"
        API --> Auth[Service Auth et RBAC]
        API --> Core[Coeur Metier Banque Takaful Academy]
        API --> IA[Super IARP Pro IA Ethique]
        
        Core --> DB[PostgreSQL Cluster Replique]
        Core --> Cache[Redis Session]
        IA --> VectorDB[Base Vectorielle RAG]
        
        Core --> Audit[Journal d'Audit Immutable Fiqh]
    end
    
    subgraph "Securite et Conformite"
        Audit --> Watchdog[Gardien Ethique Automatise]
        Watchdog -->|Alerte Riba Gharar| Admin[Equipe Conformite]
    end
    
    style User fill:#f9f,stroke:#333
    style LB fill:#27ae60,stroke:#333,color:#fff
    style Core fill:#2980b9,stroke:#333,color:#fff
    style Audit fill:#e67e22,stroke:#333,color:#fff
```
## Principes de Conception (Wasatiyyah Technique)

Notre architecture applique le principe du juste milieu à chaque niveau :

- **Sobriété** : Auto-scaling basé sur la charge réelle pour minimiser l'empreinte carbone.
- **Résilience** : Réplication des données sur deux zones de disponibilité distinctes en Suisse.
- **Souveraineté** : Aucun flux de données ne sort du territoire suisse (LPD/RGPD).
- **Auditabilité** : Chaque transaction financière déclenche une vérification synchrone des règles de Fiqh.
