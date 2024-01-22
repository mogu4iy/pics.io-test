db = db.getSiblingDB('db');
db.createUser({
    user: 'user',
    pwd: process.env.USER_PASSWORD,
    roles: [{ role: 'readWrite', db: 'db' }],
});
