export default function makeGenerateOtp({
    randomNum
}: any = {}) {
    return async function generateOtp() {
        return await randomNum(4)
        // return 1234
    }
}
