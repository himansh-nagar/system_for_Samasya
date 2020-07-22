const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
  }
  
  module.exports = {
    ROLE: ROLE,
    users: [
      { id: 1, name: 'Druv', role: ROLE.ADMIN },
      { id: 2, name: 'honey', role: ROLE.BASIC },
      { id: 3, name: 'Joe', role: ROLE.BASIC }
    ],
    writes: [
      { id: 1, Cwrite: "Dielivery", userId: 1 },
      { id: 2, Cwrite: "Atranscribed", userId: 2 },
      { id: 3, Cwrite: "Jan Aushadi", userId: 3 }
    ]
  }