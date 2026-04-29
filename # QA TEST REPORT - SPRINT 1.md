# 🧪 QA TEST REPORT - SPRINT 1

Project: MedicalApp  
Role: QA / Tester  
Date: Sprint 1 Validation

---

# 📌 1. OBJECTIF DU TEST

Valider les fonctionnalités du Sprint 1 :

- US01 : Gestion des utilisateurs
- US02 : Authentification
- US03 : Dashboard médecin
- US04 : Prise de rendez-vous + réclamations

---

# ✅ 2. TESTS RÉALISÉS

## 🔐 US02 - AUTH SYSTEM

✔ Login fonctionnel (patient / doctor / admin)  
✔ Register fonctionne  
✔ Logout fonctionne  
✔ Session maintenue après login

🟢 RESULTAT : OK

---

## 👥 US01 - USERS MANAGEMENT (ADMIN)

✔ Liste des utilisateurs affichée  
✔ Jointure médecin (spécialité OK)

❌ PROBLÈMES :

- API accessible sans contrôle admin
- absence de sécurité backend

🟡 RESULTAT : PARTIEL

---

## 👨‍⚕️ US03 - DOCTOR DASHBOARD

✔ Consultation des rendez-vous  
✔ Affichage des disponibilités

❌ PROBLÈMES :

- création de disponibilité non implémentée (backend missing)

🟡 RESULTAT : PARTIEL

---

## 👤 US04 - PATIENT SYSTEM

✔ Liste des rendez-vous patient  
✔ Consultation des réclamations

❌ PROBLÈMES :

- création de claim non implémentée
- vulnérabilité sur user_id (claims.php)

🟡 RESULTAT : PARTIEL

---

# 🚨 3. PROBLÈMES DE SÉCURITÉ

❌ stats.php non protégé  
❌ users.php accessible sans auth  
❌ claims.php vulnérable (IDOR - user_id modifiable)  
❌ availabilities.php CRUD incomplet

---

# 📊 4. RÉSULTAT GLOBAL

| Module  | Statut  |
| ------- | ------- |
| Auth    | OK      |
| Users   | PARTIEL |
| Doctor  | PARTIEL |
| Patient | PARTIEL |

---

# 🧠 5. CONCLUSION

Le Sprint 1 est fonctionnel mais incomplet sur :

- sécurité backend
- complétude CRUD
- validation des accès

✔ Système global utilisable  
⚠️ nécessite amélioration en Sprint 2

---

# QA SIGNATURE

MALEK BOUKHARI
Tester: QA Member
