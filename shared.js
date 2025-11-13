// =======================================================
// shared.js (CORRIGÉ ET COMPLET avec 6 utilisateurs)
// =======================================================

const STORAGE_KEY = 'bankAppUsers';

// --- Données initiales ---
const initialUsers = [
    // 1. UTILISATEUR ADMIN (Initial)
    {
        name: "Admin Général",
        clientCode: "0000000000",
        pin: "000000",
        solde: 999999.00,
        isAdmin: true,
        isLocked: false,
        lockReason: "",
        rib: "FR76 0000 0000 0000 0000 0000 000",
        bic: "ADMINXXX",
        phone: "0100000000",
        email: "admin@banque.com",
        address: "Siège Social, 75000 Paris",
        advisor: "Le Système",
        cardNumber: "9999000000009999",
        cardHolderName: "ADMIN GENERAL",
        expiryDate: "12/99",
        cardType: "MASTERCARD",
        history: [],
        beneficiaries: [],
        futureTransactions: [],
        lastConnection: "03/05/2020 à 13h51"
    },
    // 2. UTILISATEUR 1
     {
        name: "MR LAVISSE JEAN-PIERRE",
        clientCode: "8529637411",
        pin: "765382",
        solde: 308875.00,
        isAdmin: true,
        isLocked: false,
        lockReason: "",
        rib: "CI93 0210 0481 0020 3145 0097 028",
        bic: "AFDBCIAB",
        phone: "0600000000",
        email: "lavisse-jeanpierre@email.com",
        address: "92 RUE RICHELIEU, 76600 LE HAVRE",
        advisor: "Le Système",
        cardNumber: "5244074127859002",
        cardHolderName: "LAVISSE JEAN-PIERRE",
        expiryDate: "12/30",
        cardType: "MASTERCARD",
        history: [],
        beneficiaries: [],
        futureTransactions: [],
        lastConnection: "03/05/2025 à 13h51"
    },
    // 3. UTILISATEUR 2
    {
        name: "Petit Sophie",
        clientCode: "2222222222",
        pin: "222222",
        solde: 12500.80,
        isAdmin: false,
        isLocked: false,
        lockReason: "",
        rib: "FR76 2222 2222 2222 2222 2222 222",
        bic: "PETISOPH",
        phone: "0622222222",
        email: "sophie.petit@mail.com",
        address: "22 Avenue des Champs, 75008 Paris",
        advisor: "Mr Dupont",
        cardNumber: "4000222222222222",
        cardHolderName: "SOPHIE PETIT",
        expiryDate: "05/28",
        cardType: "VISA PREMIUM",
        history: [{ date: "05/11/2025", label: "Achat Ordinateur", amount: -1200.00, type: "Débit" }],
        beneficiaries: [],
        futureTransactions: [{ date: "01/12/2025", label: "Loyer", amount: -850.00, status: "Prévu" }],
        lastConnection: "13/11/2025 à 09h00"
    },
    // 4. UTILISATEUR 3
    {
        name: "Lefevre Pierre",
        clientCode: "3333333333",
        pin: "333333",
        solde: 350.00,
        isAdmin: false,
        isLocked: false,
        lockReason: "",
        rib: "FR76 3333 3333 3333 3333 3333 333",
        bic: "LEFEP",
        phone: "0633333333",
        email: "pierre.lefevre@mail.com",
        address: "33 Rue de la Gare, 31000 Toulouse",
        advisor: "Mme Martin",
        cardNumber: "4000333333333333",
        cardHolderName: "PIERRE LEFEVRE",
        expiryDate: "03/26",
        cardType: "MASTERCARD",
        history: [{ date: "10/11/2025", label: "Courses Carrefour", amount: -75.50, type: "Débit" }],
        beneficiaries: [],
        futureTransactions: [],
        lastConnection: "12/11/2025 à 18h30"
    },
    // 5. UTILISATEUR 4
    {
        name: "Durand Camille",
        clientCode: "4444444444",
        pin: "444444",
        solde: 45000.00,
        isAdmin: false,
        isLocked: false,
        lockReason: "",
        rib: "FR76 4444 4444 4444 4444 4444 444",
        bic: "DURACAM",
        phone: "0644444444",
        email: "camille.durand@mail.com",
        address: "4 Rue du Soleil, 13008 Marseille",
        advisor: "Mr Dubois",
        cardNumber: "4000444444444444",
        cardHolderName: "CAMILLE DURAND",
        expiryDate: "07/29",
        cardType: "VISA PLATINUM",
        history: [{ date: "01/11/2025", label: "Versement Épargne", amount: 5000.00, type: "Crédit" }],
        beneficiaries: [],
        futureTransactions: [],
        lastConnection: "13/11/2025 à 07h45"
    },
    // 6. UTILISATEUR 5
    {
        name: "Leroy Paul",
        clientCode: "5555555555",
        pin: "555555",
        solde: 1500.00,
        isAdmin: false,
        isLocked: true, // Compte verrouillé
        lockReason: "Compte en attente de vérification",
        rib: "FR76 5555 5555 5555 5555 5555 555",
        bic: "LEROYPAU",
        phone: "0655555555",
        email: "paul.leroy@mail.com",
        address: "55 Place du Marché, 34000 Montpellier",
        advisor: "Mme Martin",
        cardNumber: "4000555555555555",
        cardHolderName: "PAUL LEROY",
        expiryDate: "01/26",
        cardType: "MASTERCARD",
        history: [{ date: "08/11/2025", label: "Remboursement Mutuelle", amount: 150.00, type: "Crédit" }],
        beneficiaries: [],
        futureTransactions: [],
        lastConnection: "11/11/2025 à 16h00"
    }
];

// --- Fonctions de base (pas de changement) ---
function getUsers() {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!users || users.length === 0) {
        users = initialUsers;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
    return users;
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function updateUser(updatedUser) {
    let users = getUsers();
    const index = users.findIndex(u => u.clientCode === updatedUser.clientCode);
    if (index !== -1) {
        users[index] = updatedUser;
        saveUsers(users);
        return true;
    }
    return false;
}

function createUser(newUser) {
    let users = getUsers();
    if (users.some(u => u.clientCode === newUser.clientCode)) {
        return false;
    }
    const defaultCardName = newUser.name ? newUser.name.toUpperCase() : "NOUVEAU CLIENT";
    const finalUser = {
        ...newUser,
        history: [],
        beneficiaries: [],
        futureTransactions: [],
        lastConnection: new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'}),
        cardHolderName: newUser.cardHolderName || defaultCardName,
        lockReason: newUser.isLocked ? newUser.lockReason || 'Nouveau compte à vérifier.' : ''
    };
    users.push(finalUser);
    saveUsers(users);
    return true;
}

function addPastHistory(clientCode, transaction) {
    let users = getUsers();
    const user = users.find(u => u.clientCode === clientCode);
    if (user) {
        user.history = user.history || [];
        user.history.push({ ...transaction });
        user.solde = user.solde + transaction.amount;
        user.history.sort((a, b) => new Date(b.date) - new Date(a.date));
        saveUsers(users);
        return true;
    }
    return false;
}

// --- Fonctions utilitaires (pas de changement) ---
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
}

function checkAuth(adminOnly = false) {
    const sessionClientCode = localStorage.getItem('currentClientCode');
    const users = getUsers();
    const currentUser = users.find(u => u.clientCode === sessionClientCode);

    if (!currentUser) {
        window.location.href = 'index.html';
        return null;
    }

    if (adminOnly && !currentUser.isAdmin) {
        window.location.href = 'dashboard.html';
        return null;
    }

    const userInfoElement = document.querySelector('.user-info span:first-child');
    if (userInfoElement) {
        userInfoElement.textContent = `Bienvenue ${currentUser.name}`;
    }

    const lastConnElement = document.querySelector('.last-conn');
    if (lastConnElement) {
        lastConnElement.textContent = `Dernière connexion le ${currentUser.lastConnection}`;
    }

    const logoutLink = document.querySelector('.status');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentClientCode');
            window.location.href = 'index.html';
        });
    }

    return currentUser;
}