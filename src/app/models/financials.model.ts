
export class FinancialsModel {
    statements: StatementModel[];
    transactions: TransactionModel[];
    balances: BalanceModel[];
    accounts: string[];
    sections: string[];
    years: number[];
    months: string[];

    constructor(data: any) {
        this.statements = data.statements.map(s => new StatementModel(s));
        this.balances = data.balances.map(b => new BalanceModel(b));
        this.transactions = data.transactions.map(t => new TransactionModel(t));
        this.accounts = data.accounts;
        this.sections = data.sections;
        this.years = data.years;
        this.months = data.months;
    }
}

export class StatementModel {
    class: string;
    id: string;
    owner_id: string;
    scheme_id: string;
    date: Date;
    beginning_balance: number;
    account: string;
    bank: string;
    stats: statisticsModel

    constructor(data: any) {
        this.class = 'statement';
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.scheme_id = data.scheme_id;
        this.date = new Date(data.date.split('-')[0], data.date.split('-')[1] - 1, data.date.split('-')[2]);
        this.beginning_balance = data.beginning_balance;
        this.account = data.account;
        this.bank = data.bank;
        this.stats = data.stats;
    }
}

export class TransactionModel {
    class: string;
    id: string;
    statement_id: string;
    owner_id: string;
    scheme_id: string;
    account: string;
    bank: string;
    date: Date;
    amount: number;
    balance: number;
    description: string;
    operation: string;
    section: string;
    pull: string;
    key: string;

    constructor(data: any) {
        this.class = 'transaction';
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.scheme_id = data.scheme_id;
        this.date = new Date(data.date.split('-')[0], data.date.split('-')[1] - 1, data.date.split('-')[2]);
        this.statement_id = data.statement_id;
        this.account = data.account;
        this.bank = data.bank;
        this.amount = data.amount;
        this.balance = data.balance;
        this.description = data.description;
        this.operation = data.operation;
        this.section = data.section;
        this.pull = data.pull;
        this.key = data.key;
    }
}

export class BalanceModel {
    class: string;
    id: string;
    owner_id: string;
    statement_id: string;
    date: Date;
    balance: number;
    stats: statisticsModel;
    account: string;
    bank: string;

    constructor(data: any) {
        this.class = 'balance';
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.date = new Date(data.date.split('-')[0], data.date.split('-')[1] - 1, data.date.split('-')[2]);
        this.statement_id = data.statement_id;
        this.account = data.account;
        this.bank = data.bank;
        this.balance = data.balance;
        this.stats = data.stats;
    }
}

export interface statisticsModel {
    deposits: statsModel;
    withdrawals: statsModel;
    revenue: statsModel;
    credits: statsModel;
    positions: statsModel;
    payments: statsModel;
    transfer_in: statsModel;
    transfer_out: statsModel;
}

export class statsModel {
    avg: number;
    count: number;
    max: number;
    min: number;
    stddev: number;
    total: number;
}

export class monthlyModel {
    class: string;
    month: Date;
    avg_balance: number;
    deposits: number;
    count_deposits: number;
    net_deposits: number;
    negative_days: number;
    negative_balance: number;
    net_transfers: number;
    payments: number;
    revenue: number;

    constructor(data: any) {
        this.class = 'monthly';
        this.month = new Date(data.month.split('-')[0], data.month.split('-')[1] - 1, data.month.split('-')[2]);
        this.avg_balance = data.avg_balance;
        this.deposits = data.deposits;
        this.count_deposits = data.count_deposits;
        this.net_deposits = data.net_deposits;
        this.negative_days = data.negative_days;
        this.negative_balance = data.negative_balance;
        this.net_transfers = data.net_transfers;
        this.payments = data.negative_days;
        this.revenue = data.negative_balance;
    }
}

export class DisplayedStatisticsModel {
    statements: number;
    accounts: number;
    transactions: number;

    balance: {
        negative: number;
        count: number;
        daily: DisplayedStatsModel;
    };
    deposits: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel;
        daily: DisplayedStatsModel;
        single: DisplayedStatsModel;
    };
    withdrawals: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel;
        daily: DisplayedStatsModel;
        single: DisplayedStatsModel;
    };
    revenue: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel,
        daily: DisplayedStatsModel,
        single: DisplayedStatsModel
    };
    credits: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel,
        daily: DisplayedStatsModel,
        single: DisplayedStatsModel
    };
    positions: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel,
        daily: DisplayedStatsModel,
        single: DisplayedStatsModel
    };
    payments: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel,
        daily: DisplayedStatsModel,
        single: DisplayedStatsModel
    };
    transfers_in: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel,
        daily: DisplayedStatsModel,
        single: DisplayedStatsModel
    }
    transfers_out: {
        total: number;
        count: number;
        monthly: DisplayedStatsModel,
        daily: DisplayedStatsModel,
        single: DisplayedStatsModel
    }

    constructor(transactions: TransactionModel[], balances: BalanceModel[], statements: StatementModel[]) {

        const deposits = transactions.filter(t => t.operation === 'deposit');
        const withdrawals = transactions.filter(t => t.operation === 'withdrawal');
        const revenue = transactions.filter(t => t.operation === 'deposit' && t.key === null);
        const credits = transactions.filter(t => t.operation === 'deposit' && t.key === 'credit');
        const payments = transactions.filter(t => t.operation === 'withdrawal' && t.key === 'funder');
        const transfers_in = transactions.filter(t => t.operation === 'deposit' && t.key === 'transfer');
        const transfers_out = transactions.filter(t => t.operation === 'withdrawal' && t.key === 'transfer');

        this.statements = statements.length;
        this.accounts = new Set(statements.map(s => s.account)).size;
        this.transactions = transactions.length;

        this.balance = {
            negative: balances.filter(balance => balance.balance < 0).length,
            count: balances.length,
            daily: new DisplayedStatsModel(balances.map(b => b.balance)),
        }

        this.deposits = {
            total: balances.reduce((acc, balance) => acc + balance.stats.deposits.total, 0),
            count: deposits.length,
            single: new DisplayedStatsModel(deposits.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.deposits.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.deposits.total)),
        }

        this.withdrawals = {
            total: balances.reduce((acc, balance) => acc + balance.stats.withdrawals.total, 0),
            count: withdrawals.length,
            single: new DisplayedStatsModel(withdrawals.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.withdrawals.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.withdrawals.total)),
        }

        this.revenue = {
            total: balances.reduce((acc, balance) => acc + balance.stats.revenue.total, 0),
            count: revenue.length,
            single: new DisplayedStatsModel(revenue.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.revenue.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.revenue.total)),
        }

        this.credits = {
            total: balances.reduce((acc, balance) => acc + balance.stats.credits.total, 0),
            count: credits.length,
            single: new DisplayedStatsModel(credits.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.credits.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.credits.total)),
        }

        this.payments = {
            total: balances.reduce((acc, balance) => acc + balance.stats.payments.total, 0),
            count: payments.length,
            single: new DisplayedStatsModel(payments.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.payments.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.payments.total)),
        }

        this.transfers_in = {
            total: balances.reduce((acc, balance) => acc + balance.stats.transfer_in.total, 0),
            count: transfers_in.length,
            single: new DisplayedStatsModel(transfers_in.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.payments.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.transfer_in.total)),
        }

        this.transfers_out = {
            total: balances.reduce((acc, balance) => acc + balance.stats.transfer_out.total, 0),
            count: transfers_out.length,
            single: new DisplayedStatsModel(transfers_out.map(t => t.amount)),
            daily: new DisplayedStatsModel(balances.map(b => b.stats.payments.total)),
            monthly: new DisplayedStatsModel(statements.map(s => s.stats.transfer_out.total)),
        }

        
    }
}

export class DisplayedStatsModel {
    AVG: number;
    MIN: number;
    MAX: number;
    VOL: number;
    Growth: number;

    constructor(numbers: number[]) {
        const n = numbers.length;
        if (n > 0) {
            this.MIN = Math.min(...numbers.filter(num => num !== 0));
            this.MAX = Math.max(...numbers);
            this.AVG = numbers.reduce((acc, val) => acc + val, 0) / n;
            this.VOL = this.AVG !== 0 ? Math.sqrt(numbers.reduce((acc, val) => acc + Math.pow(val - this.AVG, 2), 0) / n) / this.AVG : 0;
            let totalGrowth = 0;
            for (let i = 1; i < n; i++) {
                if (numbers[i - 1] !== 0) {
                    totalGrowth += (numbers[i] - numbers[i - 1]) / numbers[i - 1];
                } else {
                    totalGrowth += numbers[i];
                }
            }
            this.Growth = totalGrowth / (n - 1) / 100;
        } else {
            this.AVG = this.MIN = this.MAX = this.VOL = this.Growth = 0;
        }
    }
}
