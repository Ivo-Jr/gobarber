// Migration que adicionou uma nova coluna chamada "avatar_id" à tabela users;
// obs: addColumn('nome da tab. que executará o método "addColumn" ', 'nome da coluna que será adicionada');
module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.addColumn('users', 'avatar_id', {
            type: Sequelize.INTEGER,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        }),

    down: async (queryInterface) =>
        queryInterface.removeColum('users', 'avatar_id'),
};
