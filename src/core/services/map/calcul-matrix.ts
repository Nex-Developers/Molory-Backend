export default function makeCalculMatrix({
    gmapCalculMatrix
}: any = {}) {
    return async ({
        departure,
        arrival
    }) => {
       const res = await gmapCalculMatrix()
       return { distance: res.distance, duration: res.duration }
    }
}