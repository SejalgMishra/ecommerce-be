"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      mobile: {
        type: Sequelize.INTEGER,
      },
      paymentMethod: {
        type: Sequelize.ENUM("COD", "ONLINE", "CARD"),
      },
      paymentId: {
        type: Sequelize.INTEGER,
      },
      creditCard : {
        type: Sequelize.INTEGER,
      },
      cvv : {
        type: Sequelize.INTEGER,
      },
      upiId : {
        type: Sequelize.STRING
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add foreign key constraints
    await queryInterface.addConstraint("Orders", {
      fields: ["userId"],
      type: "foreign key",
      name: "fk_orders_userId",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Orders", {
      fields: ["productId"],
      type: "foreign key",
      name: "fk_orders_productId",
      references: {
        table: "Products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
