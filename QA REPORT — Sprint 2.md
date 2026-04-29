# QA REPORT — Sprint 2

**QA : Malek Boukhari**

---

## 🎯 User Stories testées

- US04 : Prendre RDV
- US05 : Annuler RDV
- US06 : Gestion RDV médecin

---

## 🧪 Tests réalisés

### 🔹 US04

- Réserver RDV avec slot libre
- Tester réservation double

### 🔹 US05

- Annuler RDV
- Vérifier disponibilité après

### 🔹 US06

- Voir RDV médecin
- Vérifier affichage

---

## ✅ Résultats

✔ US04 : Partiel
✔ US05 : Partiel
✔ US06 : Pass

---

## 🐞 Bugs détectés

- Double réservation possible
- Disponibilité non mise à jour
- Annulation ne libère pas le créneau

---

## ⚠️ Contrainte technique

- Problème de synchronisation entre tables (appointments / availabilities)

---

## 📝 Conclusion

Les User Stories sont implémentées mais contiennent des bugs critiques liés à la logique des disponibilités.
