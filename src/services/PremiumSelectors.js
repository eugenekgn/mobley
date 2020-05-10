import { last } from 'lodash'
// utils.js
const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const pickPremiumSofa = (furniture, filters) => {
    const sofas = furniture
        .filter((m) => m.type === "sofa"
            && m.tone === filters.tone
            && m.textileColor === filters.textileColor)
        .sort((a, b) => a.price - b.price)

    const randIndex = getRandom(1, sofas.length - 1);
    return sofas[randIndex] || { message: 'tone and color combination does not exist' }
};

export const pickPremiumSideChair = (furniture, filters) => {

    const sideChairs = furniture
        .filter(
            (m) =>
                m.type === "sideChair"
                && m.tone === filters.tone
                && m.textileColor === filters.textileColor
        )
        .sort((a, b) => a.price - b.price);

    const randIndex = getRandom(0, sideChairs.length - 1);
    return sideChairs[randIndex] || { message: 'tone and color combination does not exist' }
}

export const pickPremiumCoffeTable = (furniture, filters, mostExpensive = false) => {
    const coffeTables = furniture
        .filter((m) => m.type === "coffeeTable"
            && m.tone === filters.tone
        )
        .sort((a, b) => a.price - b.price)

    const randIndex = getRandom(0, coffeTables.length - 1);
    return mostExpensive ? last(coffeTables) : coffeTables[randIndex]
}
export const pickPremiumEndTable = (furniture, filters, mostExpensive = false) => {
    const endTables = furniture
        .filter((m) => m.type === "endTable"
            && m.tone === filters.tone)
        .sort((a, b) => a.price - b.price);

    const randIndex = getRandom(0, endTables.length - 1);
    return mostExpensive ? last(endTables) : endTables[randIndex]
}
export const pickPremiumFloorLamp = (furniture, filters) => {
    const floorLamps = furniture
        .filter((m) => m.type === "floorLamp"
            && m.tone === filters.tone
        )
        .sort((a, b) => a.price - b.price);

    const randIndex = getRandom(0, floorLamps.length - 1);
    return floorLamps[randIndex]
}


export const pickPremiumSofaFiller = (furniture, filters) => {
    const sofas = furniture
        .filter((m) => m.type === "sofa")
        .sort((a, b) => a.price - b.price)

    return last(sofas)
};

export const pickPremiumSideChairFiller = (furniture, filters) => {

    const sideChairs = furniture
        .filter(
            (m) =>
                m.type === "sideChair"
        )
        .sort((a, b) => a.price - b.price);


    return last(sideChairs);
};

export const buildPremiumEnsureSelections = (livingRoom, filters, data) => {
    const modifiedLivingroom = {}
    for (const item in livingRoom) {

        const value = livingRoom[item]
        if (value.message) {
            switch (item) {
                case 'sofa':
                    modifiedLivingroom[item] = { ...value, ...pickPremiumSofaFiller(data, filters), }
                    break
                case 'sideChair':
                    modifiedLivingroom[item] = { ...value, ...pickPremiumSideChairFiller(data, filters) }
                    break
                default:
                    break
            }
        }
    }

    return { ...livingRoom, ...modifiedLivingroom }
}