import { isEmpty, get, first, last } from 'lodash'

export const pickBaseSofa = (furniture, filters) => {
    const sofas = furniture
        .filter((m) => m.type === "sofa"
            && m.tone === filters.tone
            && m.textileColor === filters.textileColor)
        .sort((a, b) => a.price - b.price)


    return first(sofas) || { message: 'tone and color combination does not exist' }
};

export const pickBaseSideChair = (furniture, filters) => {

    const sideChairs = furniture
        .filter(
            (m) =>
                m.type === "sideChair"
                && m.tone === filters.tone
                && m.textileColor === filters.textileColor
        )
        .sort((a, b) => a.price - b.price);


    return first(sideChairs) || { message: 'tone and color combination does not exist' }
};

export const pickBaseCoffeTable = (furniture, filters) => {
    const coffeTables = furniture
        .filter((m) => m.type === "coffeeTable"
            && m.tone === filters.tone
        )
        .sort((a, b) => a.price - b.price);

    return first(coffeTables)
};


export const pickBaseEndTable = (furniture, filters) => {
    const endTables = furniture
        .filter((m) => m.type === "endTable"
            && m.tone === filters.tone)
        .sort((a, b) => a.price - b.price);

    return first(endTables)
};

export const pickBaseFloorLamp = (furniture, filters) => {
    const floorLamps = furniture
        .filter((m) => m.type === "floorLamp"
            && m.tone === filters.tone
        )
        .sort((a, b) => a.price - b.price);

    return first(floorLamps)
};


export const pickBaseSofaFiller = (furniture, filters) => {
    const sofas = furniture
        .filter((m) => m.type === "sofa")
        .sort((a, b) => a.price - b.price)

    return first(sofas)
};

export const pickBaseSideChairFiller = (furniture, filters) => {

    const sideChairs = furniture
        .filter(
            (m) =>
                m.type === "sideChair"
        )
        .sort((a, b) => a.price - b.price);


    return sideChairs[Math.floor(Math.random() * sideChairs.length)];
};