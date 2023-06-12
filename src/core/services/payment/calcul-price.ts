export default function makeCalculPrice() {
    return ({
        distance,
        pricing
    }) => {
        let { unitPrice } = pricing.find(item => item.lowerDistance <= distance && item.upperDistance > distance)
        if (!unitPrice) unitPrice = 0
        return Math.round(distance * unitPrice)
    }
}