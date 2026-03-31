"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DashboardService = class DashboardService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getMonthlyKpi() {
        const [kpiRows, amountRows] = await Promise.all([
            this.dataSource.query(`SELECT * FROM v_monthly_kpi WHERE year_month = to_char(NOW(), 'YYYY-MM')`),
            this.dataSource.query(`
        SELECT
          to_char(claimed_at, 'YYYY-MM') AS year_month,
          SUM(CASE WHEN type IN ('A', 'B') THEN COALESCE(amount, 0) ELSE 0 END) AS amount_ab,
          SUM(CASE WHEN type = 'C' THEN COALESCE(amount, 0) ELSE 0 END) AS amount_c
        FROM claims
        WHERE deleted_at IS NULL
          AND claimed_at >= date_trunc('month', NOW() - INTERVAL '1 month')
          AND claimed_at  < date_trunc('month', NOW() + INTERVAL '1 month')
        GROUP BY 1
        ORDER BY 1
      `),
        ]);
        const row = kpiRows[0];
        const amountMap = new Map();
        for (const r of amountRows) {
            amountMap.set(r.year_month, r);
        }
        const currentMonth = new Date();
        const thisYM = toYearMonth(currentMonth);
        const lastYM = toYearMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
        const thisAb = parseAmount(amountMap.get(thisYM)?.amount_ab);
        const lastAb = parseAmount(amountMap.get(lastYM)?.amount_ab);
        const thisC = parseAmount(amountMap.get(thisYM)?.amount_c);
        const lastC = parseAmount(amountMap.get(lastYM)?.amount_c);
        return {
            totalClaims: row?.total_claims ?? 0,
            typeA: row?.type_a ?? 0,
            typeB: row?.type_b ?? 0,
            typeC: row?.type_c ?? 0,
            pendingApproval: row?.pending_approval ?? 0,
            lossRateAb: calcChangeRate(thisAb, lastAb),
            lossRateC: calcChangeRate(thisC, lastC),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], DashboardService);
function toYearMonth(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${yyyy}-${mm}`;
}
function parseAmount(val) {
    if (val === undefined || val === null)
        return 0;
    const n = Number(val);
    return isNaN(n) ? 0 : n;
}
function calcChangeRate(current, previous) {
    if (previous === 0)
        return 0;
    const rate = ((current - previous) / previous) * 100;
    return Math.round(rate * 10) / 10;
}
//# sourceMappingURL=dashboard.service.js.map