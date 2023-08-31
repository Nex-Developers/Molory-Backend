import { listStats, listTransactions } from "../../core/use-cases/global";
import makeGetStatsController from "./get-stats";
import makeGetTransactionsController from "./get-transactions";


const getStatsController = makeGetStatsController({ listStats })
const getTransactionsController = makeGetTransactionsController({ listTransactions });

export { getStatsController, getTransactionsController };