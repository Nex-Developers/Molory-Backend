export default function makeCalculPrice({

}: any = {}) {
    return ({
        distance,
        pricing
    }) => {
        let { unitPrice } = pricing.find(item => item.lowerDistance >=  distance && item.upperDistance >  distance )
        if (!unitPrice) unitPrice = 0
        return distance * unitPrice
    }
}