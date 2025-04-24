import prisma from "../../prisma/prisma.js";

class CardModel {
    // Obter todqs as cartas
    async findAll() {
        const cartas = await prisma.card.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                collection: true,
            },
        });

        // console.log(cartas);

        return cartas;
    }

    // Obter uma carta pelo ID
    async findById(id) {
        const carta = await prisma.card.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                collection: true,
            },
        });

        return carta;
    }

    // Criar uma nova carta
    async create(name, rarity, attackPoints, defensePoints, imageUrl, collectionId) {
        const novaCarta = await prisma.card.create({
            data: {
                name,
                rarity,
                attackPoints,
                defensePoints,
                imageUrl,
                collectionId: Number(collectionId),
            },
        });

        return novaCarta;
    }

    // Atualizar uma carta existente
    async update(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
    ) {
        const carta = await this.findById(id);

        if (!carta) {
            return null;
        }

        // Atualiza a carta existente com os novos dados

        const cartaAtualizada = await prisma.card.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                rarity,
                attackPoints,
                defensePoints,
                imageUrl,
                collectionId: Number(collectionId),
            },
        });

        return cartaAtualizada;
    }

    // Remover uma carta
    async delete(id) {
        const carta = await this.findById(id);

        if (!carta) {
            return null;
        }

        await prisma.card.delete({
            where: {
                id: Number(id),
            },
        });

        return true;
    }
}

export default new CardModel();
