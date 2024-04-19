import Family from '../models/familyModel.js'

const findAll = async (request, response) => {
    try {
        const allFamilies = await Family.find({})
        return response.status(200).json({ allFamilies })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

const findById = async (request, response) => {
    try {
        const { id } = request.params
        const family = await Family.findById(id)
        return response.status(200).json(family)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

const createFamily = async (request, response) => {
    try {

        if (!request.body.name) {
            return response.status(400).send({ message: "O nome da família é obrigátorio" })
        }

        const newFamily = {
            name: request.body.name,
            bannerLink: request.body.bannerLink,
            qbmCode: request.body.qbmCode,
            desc: request.body.desc,
            canvaLink: request.body.canvaLink,
            addInfoLink: request.body.addInfoLink,
            products: request.body.products,
            tecInfoLink: request.body.tecInfoLink
        }
        console.log(newFamily)
        const family = await Family.create(newFamily)
        return response.status(201).send(family)
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

const editFamily = async (request, response) => {
    try {

        if (!request.body.name) {
            return response.status(400).send({ message: "O nome da família é obrigátorio" })
        }

        const { id } = request.params
        const result = await Family.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).send({ message: "Família não encontrada" })
        }

        return response.status(200).send({ message: "Família atualizada com sucesso" })

    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

const deleteFamily = async (request, response) => {
    try {
        const { id } = request.params
        const result = await Family.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).send("Família não encontrada")
        }
        return response.status(200).send({ message: `${result.name}: excluido com sucesso` })
    } catch (error) {
        console.log(error)
        return response.status(500).send({ message: error.message })
    }
}

export { findAll, findById, createFamily, editFamily, deleteFamily }