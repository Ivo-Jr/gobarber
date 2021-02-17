// Migration que adicionou uma nova coluna chamada "avatar_id" à tabela users.
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
