🐞 RAPPORT DE BUGS - SPRINT 1

Projet : MedicalApp
Rôle : QA / Testeur
Date : Sprint 1

📌 1. RÉSUMÉ

Lors des tests du Sprint 1, plusieurs problèmes fonctionnels et de sécurité ont été identifiés dans l’application MedicalApp.

🚨 2. BUGS CRITIQUES (SÉVÉRITÉ ÉLEVÉE)
🔴 BUG #1 - Vulnérabilité IDOR sur les réclamations

Fichier : claims.php

Description :

Un utilisateur peut accéder aux réclamations d’un autre utilisateur en modifiant le paramètre user_id dans l’URL.
Résultat attendu :

L’utilisateur doit voir uniquement ses propres réclamations.

Résultat actuel :

Accès possible aux réclamations d’autres utilisateurs.

Sévérité :

🔴 CRITIQUE (faille de sécurité - IDOR)

🔴 BUG #2 - API statistiques non protégée

Fichier : stats.php

Description :

L’API des statistiques est accessible sans authentification.

Résultat attendu :

Seuls les administrateurs doivent y avoir accès.

Résultat actuel :

Toute personne peut consulter les statistiques globales du système.

Sévérité :

🔴 CRITIQUE

🔴 BUG #3 - API utilisateurs non protégée

Fichier : users.php

Description :

La liste des utilisateurs est accessible sans vérification d’authentification.

Sévérité :

🔴 CRITQUE

🟠 BUG #4 - Création de disponibilité manquante

Fichier : availabilities.php

Description :

Le frontend permet d’ajouter une disponibilité, mais le backend ne gère pas cette fonctionnalité.

Sévérité :

🟠 MOYEN (fonctionnalité incomplète)

🟠 BUG #5 - Création de réclamation manquante

Fichier : claims.php

Description :

Les patients ne peuvent pas créer de réclamation via l’API.

Sévérité :

🟠 MOYEN

🟡 4. BUGS MINEURS
🟡 Incohérence des réponses API

Certains endpoints retournent :

uniquement un tableau
d’autres un objet avec erreur
Impact :

Difficulté d’intégration côté frontend.

6.  RECOMMANDATIONS
    Ajouter une authentification obligatoire sur toutes les API
    Supprimer les paramètres sensibles comme user_id (utiliser la session)
    Compléter les fonctionnalités CRUD manquantes
    Uniformiser les réponses API (format standard avec success/error)

SIGNATURE QA
MALEK BOUKHARI
Testeur : QA Member
Sprint : 1
