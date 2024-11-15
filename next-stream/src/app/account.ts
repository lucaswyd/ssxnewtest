// src/app/account.ts

export interface Account {
    name: string;
    accessKey: string;
    favoriteTeams: string[]; // Add this field for favorite teams
}

const accounts: Account[] = [
    { name: "lp tha don", accessKey: "the don", favoriteTeams: ["Dallas Cowboys", "Texas Longhorns", "Green Bay Packers", "Chicago Bears", "Wisconsin Badgers"] },
    { name: "Dad", accessKey: "daddymack", favoriteTeams: ["Green Bay Packers", "Texas Longhorns", "Dallas Cowboys", "Wisconsin Badgers", "Arizona State Sun Devils"] },
    { name: "Mom", accessKey: "mom", favoriteTeams: ["Dallas Cowboys", "Texas Longhorns", "Chicago Bears", "Green Bay Packers", "Arizona State Sun Devils", "Illinois Fighting Illini", "Colorado Buffaloes"] },
];

export const getAccountByAccessKey = (accessKey: string) => {
    return accounts.find(account => account.accessKey === accessKey);
};
